import { Injectable } from '@nestjs/common'
import { CustomersService } from '../customers/customers.service'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { SessionDto } from './dto/session'

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.customersService.findOneWithUserName(username)
    const isPassword = await compare(pass, user.password)

    if (user && user.isActive && isPassword) {
      return user
    }

    return null
  }

  async session(user: SessionDto) {
    await this.validateUser(user.username, user.password)
    const payload = {
      username: user.username,
      name: user.name,
      sub: user.id,
    }

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: process.env.EXPIRES_IN,
      }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    }
  }

  async refreshToken(user: SessionDto) {
    const payload = {
      id: user.id,
      name: user.name,
      username: user.username,
      sub: user.id,
    }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
