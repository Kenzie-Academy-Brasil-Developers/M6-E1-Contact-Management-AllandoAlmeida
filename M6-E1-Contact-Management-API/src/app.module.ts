import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { ContactsModule } from './modules/contacts/contacts.module'
import { CustomersModule } from './modules/customers/customers.module'
import { PrismaService } from './database/prisma.service'
import { ContactsService } from './modules/contacts/contacts.service'

@Module({
  imports: [AuthModule, ContactsModule, CustomersModule],
  controllers: [],
  providers: [PrismaService, ContactsService],
})
export class AppModule {}
