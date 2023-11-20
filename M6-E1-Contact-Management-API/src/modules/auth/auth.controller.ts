import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { CustomersService } from '../customers/customers.service'
import { CreateCustomerDto } from '../customers/dto/create-customer.dto'
import { AuthLocalGuard } from './authGuards/auth-local.guard'
import { AuthService } from './auth.service'
import { AuthRefreshJwtGuard } from './authGuards/auth-refresh-jwt.guard'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'

@ApiTags('Authentication and registration section')
@ApiResponse({
  status: 201,
  description: 'The request was made successfully.',
})
@ApiUnauthorizedResponse({
  status: 401,
  description: 'User not authorized to make this request.',
})
@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private customersService: CustomersService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The request was made successfully.',
  })
  @Post('login')
  @UseGuards(AuthLocalGuard)
  async login(@Request() request, @Body() loginDto: LoginDto) {
    return this.authService.login(request.user)
  }

  @ApiBadRequestResponse({
    status: 400,
    description: '<key> should not be empty.',
  })
  @ApiConflictResponse({
    status: 409,
    description: 'This " < key, value > " already exists',
  })
  @Post('Register')
  async registerUser(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto)
  }

  @ApiResponse({
    status: 201,
    description: 'The request was made successfully.',
  })
  @UseGuards(AuthRefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() request) {
    return this.authService.refreshToken(request.user)
  }
}
