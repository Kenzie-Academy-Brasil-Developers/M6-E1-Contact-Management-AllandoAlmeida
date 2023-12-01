import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { CustomersService } from '../customers/customers.service'
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
import { SessionDto } from './dto/session'

@ApiTags('Authentication and registration section')
@ApiResponse({
  status: 201,
  description: 'The request was made successfully.',
})
@ApiUnauthorizedResponse({
  status: 401,
  description: 'User not authorized to make this request.',
})
@Controller('api/')
export class AuthController {
  constructor(
    private authService: AuthService,
    private customersService: CustomersService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The request was made successfully.',
  })
  @Post('session')
  @UseGuards(AuthLocalGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async session(@Request() request, @Body() sessionDto: SessionDto) {
    return this.authService.session(request.user)
  }

  @ApiBadRequestResponse({
    status: 400,
    description: '<key> should not be empty.',
  })
  @ApiConflictResponse({
    status: 409,
    description: 'This " < key, value > " already exists',
  })
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
