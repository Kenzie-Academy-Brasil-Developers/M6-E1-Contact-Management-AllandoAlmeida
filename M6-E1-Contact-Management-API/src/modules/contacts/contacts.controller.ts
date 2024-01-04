import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Param,
  Patch,
  HttpCode,
  Delete,
} from '@nestjs/common'
import { ContactsService } from './contacts.service'
import { AuthJwtGuard } from '../auth/authGuards/auth-jwt.guard'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UpdateContactDto } from './dto/update-contact.dto'
import { PrismaService } from 'src/database/prisma.service'
import { CreateContactDto } from './dto/create-contact.dto'

@ApiBearerAuth()
@Controller('api/contacts')
@ApiTags('Contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @UseGuards(AuthJwtGuard)
  async create(@Body() createContactDto: CreateContactDto, @Request() req) {
    return await this.contactsService.create(createContactDto, req.user.id)
  }

  @ApiResponse({
    status: 200,
    description: 'The request was made successfully.',
  })
  @Get()
  @UseGuards(AuthJwtGuard)
  findAll(@Request() request) {
    const userId = request.user.id
    return this.contactsService.findAll(userId)
  }

  @ApiResponse({
    status: 200,
    description: 'The request was made successfully.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The ID doesn't exist",
  })
  @Get(':id')
  @UseGuards(AuthJwtGuard)
  findOne(@Param('id') id: string, @Request() request) {
    const userId = request.user.id
    return this.contactsService.findOne(userId, id)
  }

  @ApiResponse({
    status: 200,
    description: 'The request was made successfully.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: '<key> should not be empty.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The ID doesn't exist",
  })
  @ApiConflictResponse({
    status: 409,
    description: 'This " < key, value > " already exists',
  })
  @Patch(':id')
  @UseGuards(AuthJwtGuard)
  update(
    @Param('id') id: string,
    @Request() request, // Alteração aqui
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const userId = request.user.id
    return this.contactsService.update(userId, id, updateContactDto, request) // Alteração aqui
  }
/* 
  @ApiResponse({
    status: 204,
    description: 'The request was made successfully.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The ID doesn't exist",
  })
  @ApiConflictResponse({
    status: 409,
    description: 'Customer is already associated with this contact',
  })
  @HttpCode(204)
  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  remove(@Param('id') id: string, @Request() request) {
    const userId = request.user.id
    return this.contactsService.remove(userId, id)
  } */
}
