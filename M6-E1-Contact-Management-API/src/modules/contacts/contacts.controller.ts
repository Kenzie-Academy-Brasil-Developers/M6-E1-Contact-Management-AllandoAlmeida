import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common'
import { ContactsService } from './contacts.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { AuthJwtGuard } from '../auth/authGuards/auth-jwt.guard'
import { ApiTags } from '@nestjs/swagger'
import { UpdateContactDto } from './dto/update-contact.dto'

@Controller('api/contacts')
@ApiTags('Contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(AuthJwtGuard)
  @Post()
  create(@Body() createContactDto: CreateContactDto, @Request() request) {
    const authenticatedUser = request.user
    console.log('authenticatedUser', authenticatedUser)

    const userId = authenticatedUser.id

    return this.contactsService.create(createContactDto, { id: userId })
  }
  @Get()
  @UseGuards(AuthJwtGuard)
  findAll(@Request() request) {
    const userId = request.user.id
    console.log('userId', userId)
    return this.contactsService.findAll(userId)
  }

  @Get(':id')
  @UseGuards(AuthJwtGuard)
  findOne(@Param('id') id: string, @Request() request) {
    const userId = request.user.id
    return this.contactsService.findOne(userId, id)
  }

  @Patch(':id')
  @UseGuards(AuthJwtGuard)
  update(
    @Param('id') id: string,
    @Req() request, // Alteração aqui
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const userId = request.user.id
    return this.contactsService.update(userId, id, updateContactDto, request) // Alteração aqui
  }

  /* 
  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  remove(@Param('id') id: string, @Request() request) {
    const userId = request.user.id
    return this.contactsService.remove(userId, id)
  } */
}
