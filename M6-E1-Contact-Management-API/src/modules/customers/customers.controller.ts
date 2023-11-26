import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Post,
} from '@nestjs/common'
import { CustomersService } from './customers.service'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { AuthJwtGuard } from '../auth/authGuards/auth-jwt.guard'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { CreateCustomerDto } from './dto/create-customer.dto'

@ApiBearerAuth()
@Controller('api/customers')
@ApiTags('Customers')
@ApiUnauthorizedResponse({
  status: 401,
  description: 'User not authorized to make this request.',
})
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('register')
  async registerUser(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto)
  }

  @ApiResponse({
    status: 200,
    description: 'The request was made successfully.',
  })
  @Get()
  /* @UseGuards(AuthJwtGuard) */
  findAll() {
    return this.customersService.findAll()
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
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id)
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
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto)
  }

  @ApiResponse({
    status: 204,
    description: 'The request was made successfully.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The ID doesn't exist",
  })
  @HttpCode(204)
  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  remove(@Param('id') id: string) {
    return this.customersService.remove(id)
  }
}
