import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { ContactsModule } from './modules/contacts/contacts.module'
import { CustomersModule } from './modules/customers/customers.module'
import { EmailsModule } from './modules/emails/emails.module'
import { PhonesModule } from './modules/phones/phones.module'
import { PrismaService } from './database/prisma.service'
import { ContactsService } from './modules/contacts/contacts.service'

@Module({
  imports: [
    AuthModule,
    ContactsModule,
    CustomersModule,
    EmailsModule,
    PhonesModule,
  ],
  controllers: [],
  providers: [PrismaService, ContactsService],
})
export class AppModule {}
