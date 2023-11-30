import { Injectable } from '@nestjs/common'
import { CustomersService } from '../customers/customers.service'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { SeccionDto } from './dto/seccion'

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

  async seccion(user: SeccionDto) {
    await this.validateUser(user.username, user.password)
    const payload = {
      username: user.username,
      sub: user.id,
    }

    return {
      name: user.name,
      id: user.id,
      accessToken: this.jwtService.sign(payload, {
        expiresIn: process.env.EXPIRES_IN,
      }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    }
  }

  async refreshToken(user: SeccionDto) {
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
