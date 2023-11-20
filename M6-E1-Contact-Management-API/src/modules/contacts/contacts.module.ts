import { Module } from '@nestjs/common'
import { ContactsService } from './contacts.service'
import { ContactsController } from './contacts.controller'
import { PrismaService } from 'src/database/prisma.service'
import { AuthService } from '../auth/auth.service'
import { CustomersService } from '../customers/customers.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    CustomersService,
    AuthService,
    PrismaService,
    JwtService,
  ],
})
export class ContactsModule {}
