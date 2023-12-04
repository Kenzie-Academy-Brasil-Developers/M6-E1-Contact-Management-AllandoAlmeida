import { Injectable, NotFoundException, Request } from '@nestjs/common'
import { Contact as ContactModel } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'
import { checkFieldsExistence } from 'src/Hooks/checkFieldsExistence'

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto, customerId: string) {
    const newContact = await this.prisma.contact.create({
      data: {
        name: createContactDto.name,
        zipCode: createContactDto.zipCode,
        street: createContactDto.street,
        complement: createContactDto.complement,
        district: createContactDto.district,
        locality: createContactDto.locality,
        state: createContactDto.state,
        phones: {
          create: {
            telephone: createContactDto.telephone,
          },
        },
        emails: {
          create: {
            email: createContactDto.email,
          },
        },
        customers: {
          createMany: {
            data: [{ customerId: customerId }],
          },
        },
      },
      include: {
        phones: {
          select: {
            id: true,
            telephone: true,
          },
        },
        emails: {
          select: {
            id: true,
            email: true,
          },
        },
        customers: {
          select: {
            id: true,
          },
        },
      },
    })

    return newContact
  }

  async findAll(customerId: string): Promise<ContactModel[]> {
    const findContacts = await this.prisma.contact.findMany({
      where: {
        customers: {
          some: {
            id: customerId,
          },
        },
      },
      include: {
        phones: {
          select: {
            id: true,
            telephone: true,
          },
        },
        emails: {
          select: {
            id: true,
            email: true,
          },
        },
        customers: {
          select: {
            id: true,
          },
        },
      },
    })

    const contacts = findContacts.map((cc) => {
      const { customers, ...rest } = cc
      return {
        ...rest,

        customers: customers.map((c) => ({ id: c.id })),
      }
    })

    return contacts
  }

  async findOne(customerId: string, id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: {
        id,
      },
      include: {
        phones: {
          select: {
            id: true,
            telephone: true,
          },
        },
        emails: {
          select: {
            id: true,
            email: true,
          },
        },
        customers: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!contact) {
      throw new NotFoundException('Contact not found')
    }

    return contact
  }

  async update(
    customerId: string,
    id: string,
    data: UpdateContactDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Request() request,
  ) {
    const { name } = data

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const checkContact = await this.prisma.contact.findUnique({
      where: {
        id,
      },
      include: {
        customers: true,
        phones: true,
        emails: true,
      },
    })

    if ('name' in data && data.name !== undefined) {
      await checkFieldsExistence(
        'name',
        data.name,
        `This name '${name}' already exists`,
        this.prisma.contact,
      )
    }

    // Atualiza o contato
    const updatedContact = await this.prisma.contact.update({
      where: {
        id,
      },
      data: {
        name,
      },
      include: {
        phones: {
          select: {
            id: true,
            telephone: true,
          },
        },
        emails: {
          select: {
            id: true,
            email: true,
          },
        },
        customers: {
          select: {
            id: true,
          },
        },
      },
    })
    const { phones, emails, customers, ...rest } = updatedContact
    return {
      ...rest,
      phones: phones.map((p) => ({ id: p.id, telephone: p.telephone })),
      emails: emails.map((e) => ({ id: e.id, email: e.email })),
      customers: customers.map((c) => ({ id: c.id })),
    }
  }

  async remove(customerId: string, contactId: string) {
    const contact = await this.prisma.contact.findUnique({
      where: {
        id: contactId,
      },
    })

    if (!contact || !contact.isActive) {
      throw new NotFoundException(`Contact ${contactId} is not active`)

      return
    }

    const customerToContact = await this.prisma.contactToCustomer.findFirst({
      where: {
        customerId: customerId,
        contactId: contactId,
      },
    })

    if (!customerToContact) {
      throw new NotFoundException(
        `Contact not associated with customer ${customerId}`,
      )

      return
    }

    await this.prisma.contactToCustomer.deleteMany({
      where: {
        customerId: customerId,
        contactId: contactId,
      },
    })

    const remainingAssociations = await this.prisma.contactToCustomer.findMany({
      where: {
        contactId: contactId,
      },
    })

    if (remainingAssociations.length === 0) {
      await this.prisma.contact.update({
        where: {
          id: contactId,
        },
        data: {
          isActive: false,
        },
      })
    }
  }
}
