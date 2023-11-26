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

  /* async create(
    data: CreateContactDto,
    user: { id: string },
  ): Promise<ContactModel> {
    const { name } = data

    const existingContact = await this.prisma.contact.findFirst({
      where: { name },
      include: { customers: true },
    })

    if (existingContact) {
      const isAssociated = existingContact.customers.some(
        (customer) => customer.id === user.id,
      )

      if (!isAssociated) {
        // Conecte o cliente ao contato
        await this.prisma.ContactToCustomer.create({
          data: {
            customerId: user.id,
            contactId: existingContact.id,
          },
        })

        // Retorne o contato existente
        return existingContact
      } else {
        // Cliente já está associado a este contato, retorne um erro 409
        throw new ConflictException(
          'Customer is already associated with this contact',
        )
      }
    } else {
      // Se o contato não existir, crie um novo
      const newContact = await this.prisma.contact.create({
        data: {
          ...data,
          phones: { create: data.phones },
          emails: { create: data.emails },
          customers: { connect: [{ id: user.id }] },
        },
        include: { phones: true, emails: true, customers: true },
      })

      console.log('newContact', newContact)
      return { ...newContact }
    }
  } */

  /*  async createContact(
    customerId: string,
    data: CreateContactDto,
  ): Promise<ContactModel> {
    try {
      console.log('Before duplicate check')
      // Verifica se o contato já existe
      const existingContact = await this.prisma.contact.findFirst({
        where: { name: data.name },
      })
      console.log('Existing Contact:', existingContact)
      console.log('Data received:', data)

      const duplicateCount = await this.prisma.contact.count({
        where: { name: data.name },
      })

      if (duplicateCount > 0) {
        throw new ConflictException('Contact already exists')
      }

      console.log('After duplicate check')

      if (existingContact) {
        throw new ConflictException('Contact already exists')
      }

      // Cria um novo contato
      const newContact = await this.prisma.contact.create({
        data: {
          ...data,
          phones: { create: data.phones },
          emails: { create: data.emails },
          customers: {
            create: Array.isArray(data.contactToCustomers)
              ? data.contactToCustomers.map((customer) => ({
                  ...customer,
                  assignedAt: new Date(),
                }))
              : [],
          },
        },
        include: { phones: true, emails: true, customers: true },
      })

      console.log('Contact created:', newContact)
      // Verifica se o contato já está associado ao cliente
      const existingAssociation = await this.prisma.contactToCustomer.findFirst(
        {
          where: {
            contactId: newContact.id,
            customerId,
          },
        },
      )
      console.log('existingAssociation', existingAssociation)

      if (existingAssociation) {
        // Se já está associado, lança uma exceção de conflito
        throw new ConflictException(
          'Contact is already associated with the customer',
        )
      }

      const existingCustomer = await this.prisma.customer.findUnique({
        where: { id: customerId },
      })

      if (!existingCustomer) {
        throw new NotFoundException('Customer not found')
      }

      // Se não está associado, faz a associação
      await this.prisma.contactToCustomer.create({
        data: {
          customerId,
          contactId: newContact.id,
          assignedAt: new Date(),
        },
      })

      return newContact
    } catch (error) {
      console.error('Error creating contact:', error)
      throw new ConflictException('ConflictException Contact already exists')
    }
  } */

  async createContact(
    customerId: string,
    data: CreateContactDto,
  ): Promise<ContactModel> {
    try {
      // Verifica se o contato já existe
      const existingContact = await this.prisma.contact.findFirst({
        where: { name: data.name },
      })

      if (existingContact) {
        throw new ConflictException('Contact already exists')
      }

      // Cria um novo contato
      const newContact = await this.prisma.contact.create({
        data: {
          ...data,
          phones: { create: data.phones },
          emails: { create: data.emails },
          customers: {
            create: Array.isArray(data.contactToCustomers)
              ? data.contactToCustomers.map((customer) => ({
                  ...customer,
                  assignedAt: new Date(),
                }))
              : [],
          },
        },
        include: { phones: true, emails: true, customers: true },
      })

      console.log('antes:')

      // Verifica se o contato já está associado ao cliente
      const existingAssociation = await this.prisma.contactToCustomer.findFirst(
        {
          where: {
            contactId: newContact.id,
            customerId,
          },
        },
      )

      console.log('existingAssociation', existingAssociation)

      // Faz a associação
      await this.prisma.contactToCustomer.create({
        data: {
          customerId,
          contactId: newContact.id,
          assignedAt: new Date(),
        },
      })

      return newContact
    } catch (error) {
      console.error('Error creating contact:', error)
      throw error // Rejeitar a exceção para que seja capturada pela resposta da API
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
          },
        },
      },
    })

    const contacts = findContacts.map((cc) => {
      const { phones, emails, customers, ...rest } = cc
      return {
        ...rest,
        phones: phones.map((p) => ({ id: p.id, telephone: p.telephone })),
        emails: emails.map((e) => ({ id: e.id, email: e.email })),
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
    @Request() request,
  ) {
    const { name } = data

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

    console.log('customerToContact', customerToContact)

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
