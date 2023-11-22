import { Module } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CustomersController } from './customers.controller'
import { PrismaService } from 'src/database/prisma.service'
import { ContactsModule } from '../contacts/contacts.module'

@Module({
  imports: [ContactsModule],
  controllers: [CustomersController],
  providers: [CustomersService, PrismaService],
  exports: [CustomersService],
})
export class CustomersModule {}
