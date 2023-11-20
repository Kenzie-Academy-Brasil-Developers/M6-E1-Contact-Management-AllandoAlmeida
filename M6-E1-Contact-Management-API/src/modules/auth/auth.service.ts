import { Injectable } from '@nestjs/common'
import { CustomersService } from '../customers/customers.service'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'
import { compare } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.customersService.findOneWithUserName(username)
    if (user && (await compare(pass, user.password))) {
      const { ...result } = user
      return result
    }
    return null
  }

  async login(user: LoginDto) {
    const payload = {
      username: user.username,
      sub: user.id,
    }

    return {
      ...user,
      accessToken: this.jwtService.sign(payload, {
        //expiresIn: process.env.EXPIRES_IN,
        expiresIn: '6d',
      }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    }
  }

  async refreshToken(user: LoginDto) {
    const { id, username } = user
    const payload = {
      id: user.id,
      username: user.username,
      sub: user.id,
    }

    return {
      id,
      username,
      accessToken: this.jwtService.sign(payload),
    }
  }
}
