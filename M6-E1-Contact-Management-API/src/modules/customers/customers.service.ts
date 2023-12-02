import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { PrismaService } from 'src/database/prisma.service'
import { Customer as CustomerModel } from '@prisma/client'
import { excludedFields } from 'src/Hooks/excludeFields'
import { checkFieldsExistence } from 'src/Hooks/checkFieldsExistence'

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  private readonly excludedFields: (keyof CustomerModel)[] = ['password']

  async create(data: CreateCustomerDto): Promise<CustomerModel> {
    const { name, username, telephone, email } = data
    await checkFieldsExistence(
      'name',
      name,
      `This name '${name}' already exists`,
      this.prisma.customer,
    )
    await checkFieldsExistence(
      'username',
      username,
      `This username '${username}' already exists`,
      this.prisma.customer,
    )
    await checkFieldsExistence(
      'email',
      email,
      `This email '${email}' already exists`,
      this.prisma.email,
    )

    const customer = await this.prisma.customer.create({
      data: {
        name,
        username,
        phones: {
          create: [{ telephone }],
        },
        emails: {
          create: [{ email }],
        },
        password: data.password,
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

        contacts: true,
      },
    })
    return excludedFields(customer, this.excludedFields)
  }

  async findAll(): Promise<CustomerModel[]> {
    const customers = await this.prisma.customer.findMany({
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

        contacts: true,
      },
    })
    return customers.map((customer) => {
      return excludedFields<CustomerModel>(customer, this.excludedFields)
    })
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
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
        contacts: {
          select: {
            contact: {
              select: {
                id: true,
                name: true,
                zipCode: true,
                street: true,
                complement: true,
                district: true,
                locality: true,
                state: true,
                phones: true,
                emails: true,
              },
            },
          },
        },
      },
    })
    if (!customer) throw new NotFoundException("The ID doesn't exist")
    return excludedFields<CustomerModel>(customer, this.excludedFields)
  }

  async findOneWithUserName(username: string) {
    return await this.prisma.customer.findFirst({
      where: { username: username },
    })
  }

  async update(id: string, data: UpdateCustomerDto): Promise<CustomerModel> {
    const { name, username, password, telephone, email } = data

    const checkCustomer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        phones: true,
        emails: true,
      },
    })

    if (!checkCustomer) {
      throw new NotFoundException("The ID doesn't exist")
    }

    if ('name' in data && data.name !== undefined) {
      await checkFieldsExistence(
        'name',
        data.name,
        `This name '${data.name}' already exists`,
        this.prisma.customer,
      )
    }

    if ('username' in data && data.username !== undefined) {
      await checkFieldsExistence(
        'username',
        data.username,
        `This username '${data.username}' already exists`,
        this.prisma.customer,
      )
    }

    const customer = await this.prisma.customer.update({
      where: { id },
      data: {
        name,
        username,
        password,
        phones: {
          upsert: telephone
            ? {
                where: { id: checkCustomer.phones[0]?.id },
                update: { telephone },
                create: { telephone },
              }
            : undefined,
        },
        emails: {
          upsert: email
            ? {
                where: { id: checkCustomer.emails[0]?.id },
                update: { email },
                create: { email },
              }
            : undefined,
        },
      },
    })

    return excludedFields(customer, this.excludedFields)
  }

  async remove(id: string): Promise<void> {
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { id },
    })

    if (!existingCustomer) {
      throw new NotFoundException('Customer not found')
    }

    if (!existingCustomer || !existingCustomer.isActive) {
      throw new NotFoundException(`Contact ${id} is not active`)

      return
    }

    await this.prisma.customer.update({
      where: { id },
      data: { isActive: false },
    })
  }
}
