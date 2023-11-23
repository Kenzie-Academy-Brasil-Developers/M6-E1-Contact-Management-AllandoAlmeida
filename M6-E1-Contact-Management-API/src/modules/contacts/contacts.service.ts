import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common'
import { Contact as ContactModel } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'
import { checkFieldsExistence } from 'src/Hooks/checkFieldsExistence'

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateContactDto,
    user: { id: string },
  ): Promise<ContactModel> {
    const { name, telephone, email } = data

    const existingContact = await this.prisma.contact.findFirst({
      where: { name },
      include: { customers: true },
    })

    if (existingContact) {
      const isAssociated = existingContact.customers.some(
        (customer) => customer.id === user.id,
      )

      if (!isAssociated) {
        await this.prisma.contactToCustomer.create({
          data: {
            customerId: user.id,
            contactId: existingContact.id,
          },
        })

        return { ...existingContact }
      } else {
        throw new ConflictException(
          'Customer is already associated with this contact',
        )
      }
    } else {
      const newContact = await this.prisma.contact.create({
        data: {
          name,
          phones: { create: [{ telephone }] },
          emails: { create: [{ email }] },
          customers: { connect: [{ id: user.id }] },
        },
        include: { phones: true, emails: true, customers: true },
      })

      console.log('newContact', newContact)
      return { ...newContact }
    }
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
            name: true,
          },
        },
      },
    })
    console.log('findContacts', findContacts)

    const contacts = findContacts.map((cc) => cc)

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
            name: true,
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
    @Request() request,
  ) {
    const { name, telephone, email } = data

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

    console.log('checkContact', checkContact)

    if (!checkContact || checkContact.customers.length === 0) {
      throw new ForbiddenException(
        'Contact not found or not associated with the requesting customer',
      )
    }

    const associatedCustomers = checkContact.customers.map(
      (customer) => customer.id,
    )

    if (!associatedCustomers.includes(request.user.id)) {
      throw new ForbiddenException(
        'Contact not associated with the requesting customer',
      )
    }

    if ('name' in data && data.name !== undefined) {
      await checkFieldsExistence(
        'name',
        data.name,
        `This name '${name}' already exists`,
        this.prisma.contact,
      )
    }

    const updatedContact = await this.prisma.contact.update({
      where: {
        id,
      },
      data: {
        name,
        phones: {
          upsert: telephone
            ? {
                where: { id: checkContact.phones[0].id },
                update: { telephone },
                create: { telephone },
              }
            : undefined,
        },
        emails: {
          upsert: email
            ? {
                where: { id: checkContact.emails[0].id },
                update: { email },
                create: { email },
              }
            : undefined,
        },
      },
    })

    return updatedContact
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

    const contactToCustomer = await this.prisma.contactToCustomer.findFirst({
      where: {
        customerId: customerId,
        contactId: contactId,
      },
    })

    if (!contactToCustomer) {
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
