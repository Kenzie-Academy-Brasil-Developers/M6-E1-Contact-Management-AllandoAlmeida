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
      this.prisma.customer,
    )

    const customer = await this.prisma.customer.create({
      data: {
        name,
        username,
        telephone,
        email,
        password: data.password,
      },
      include: {
        contacts: true,
      },
    })
    return excludedFields(customer, this.excludedFields)
  }

  async findAll(): Promise<CustomerModel[]> {
    const customers = await this.prisma.customer.findMany({
      include: {
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
        contacts: {
          select: {
            id: true,
            name: true,
            zipCode: true,
            street: true,
            complement: true,
            district: true,
            locality: true,
            state: true,
            telephone: true,
            email: true,
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

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerModel> {
    const checkCustomer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    })

    if (!checkCustomer) {
      throw new NotFoundException("The ID doesn't exist")
    }

    const updateData = await this.prisma.customer.update({
      where: { id },
      data: { ...updateCustomerDto },
    })

    return excludedFields(updateData, this.excludedFields)
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
