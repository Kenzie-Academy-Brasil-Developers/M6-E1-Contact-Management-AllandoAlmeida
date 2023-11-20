/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
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
import { request } from 'http'

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  /*   async create(
    data: CreateContactDto,
    user: { id: string },
  ): Promise<ContactModel> {
    const { name, telephone, email } = data

    await checkFieldsExistence(
      'name',
      name,
      `This name '${name}' already exists`,
      this.prisma.contact,
    )

    const contact = await this.prisma.contact.create({
      data: {
        customerId: user.id,
        name,
        phones: {
          create: [{ telephone }],
        },
        emails: {
          create: [{ email }],
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
      },
    })
    return contact
  } 

 

  async findAll(customerId: string) {
    const contacts = await this.prisma.contact.findMany({
      where: {
        customerId,
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
      },
    })
    return contacts
  }

  async findOne(customerId: string, id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: {
        customerId,
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
      },
    })

    if (!contact) {
      throw new NotFoundException('Contact not found')
    }

    return contact
  }

  async update(customerId: string, id: string, data: UpdateContactDto) {
    const checkId = await this.prisma.contact.findUnique({
      where: {
        id,
      },
    })
    if (!checkId) {
      throw new NotFoundException("Contact ID doesn't exist")
    }

    if (checkId.customerId !== customerId) {
      throw new NotFoundException(
        "Contact doesn't belong to the logged-in user",
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
    const contact = await this.prisma.contact.update({
      where: {
        id,
      },
      data,
    })
    return contact
  }

  async remove(customerId: string, contactId: string) {
    const checkContact = await this.prisma.contact.findUnique({
      where: { id: contactId },
      include: { customer: true },
    })

    if (!checkContact) {
      throw new NotFoundException("Contact ID doesn't exist")
    }

    if (checkContact.customerId !== customerId) {
      throw new NotFoundException(
        "Contact doesn't belong to the logged-in user",
      )
    }

    // Verificar se o contato está associado a mais de um cliente
    const associatedCustomers = await this.prisma.contact.count({
      where: {
        id: contactId,
        customerId: { notIn: [customerId] }, // Corrigindo a condição de contagem
      },
    })

    console.log('associatedCustomers', associatedCustomers)

    if (associatedCustomers > 0) {
      // Se o contato está associado a outros clientes, apenas desconecte o cliente logado
      await this.prisma.contact.updateMany({
        where: { id: contactId, customerId },
        data: { customerId: null },
      })
    } else {
      // Se o contato está associado apenas ao cliente logado, marque como excluído
      await this.prisma.contact.updateMany({
        where: { id: contactId, customerId },
        data: { deletedAt: true },
      })
    }
  }
}
*/

  async create(
    data: CreateContactDto,
    user: { id: string },
  ): Promise<ContactModel> {
    const { name, telephone, email } = data

    // Tente encontrar um contato existente
    const existingContact = await this.prisma.contact.findFirst({
      where: {
        name,
      },
      include: {
        phones: true,
        emails: true,
        customers: true,
      },
    })

    if (existingContact) {
      // Se o contato já existe, conecte-o ao cliente logado
      await this.prisma.customerContact.create({
        data: {
          customerId: user.id,
          contactId: existingContact.id,
        },
        include: {
          customer: true,
        },
      })

      return {
        ...existingContact,
      }
    } else {
      // Se o contato não existe, crie-o
      const newContact = await this.prisma.contact.create({
        data: {
          name,
          phones: {
            create: [{ telephone }],
          },
          emails: {
            create: [{ email }],
          },
          customers: {
            connect: [{ id: user.id }],
          },
        },
        include: {
          phones: true,
          emails: true,
          customers: true,
        },
      })

      return { ...newContact }
    }
  }

  async findAll(customerId: string): Promise<ContactModel[]> {
    const customerContacts = await this.prisma.customerContact.findMany({
      where: {
        customerId,
      },
      include: {
        contact: {
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
          },
        },
      },
    })

    // Mapeie os resultados para obter apenas os dados do contato
    const contacts = customerContacts.map((cc) => cc.contact)

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

    // Verifique se o ID do contato existe
    const checkId = await this.prisma.contact.findUnique({
      where: {
        id,
      },
      include: {
        CustomerContact: true,
        phones: true,
        emails: true,
      },
    })

    if (!checkId || checkId.CustomerContact.length === 0) {
      throw new ForbiddenException(
        'Contact not found or not associated with the requesting customer',
      )
    }

    // Verifique se o cliente logado é o mesmo que o cliente do contato
    const associatedCustomers = checkId.CustomerContact.map(
      (cc) => cc.customerId,
    )

    if (!associatedCustomers.includes(request.user.id)) {
      throw new ForbiddenException(
        'Contact not found or not associated with the requesting customer',
      )
    }

    // Verifique a existência do nome se estiver sendo atualizado
    if ('name' in data && data.name !== undefined) {
      await checkFieldsExistence(
        'name',
        data.name,
        `This name '${name}' already exists`,
        this.prisma.contact,
      )
    }

    // Atualize o contato
    const updatedContact = await this.prisma.contact.update({
      where: {
        id,
      },
      data: {
        name,
        phones: {
          upsert: telephone
            ? {
                where: { id: checkId.phones[0].id },
                update: { telephone },
                create: { telephone },
              }
            : undefined,
        },
        emails: {
          upsert: email
            ? {
                where: { id: checkId.emails[0].id },
                update: { email },
                create: { email },
              }
            : undefined,
        },
      },
    })

    return updatedContact
  }
}
