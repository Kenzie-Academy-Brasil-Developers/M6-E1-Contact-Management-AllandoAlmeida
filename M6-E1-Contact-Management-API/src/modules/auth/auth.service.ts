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
    console.log('user', user)
    console.log('user', user ? true : false)
    console.log('isActive1', user.isActive ? true : false)
    console.log('pass', await compare(pass, user.password))

    const isPassword = await compare(pass, user.password)

    if (user && user.isActive && isPassword) {
      //const { ...result } = user
      //console.log('result', result)
      return user
    }

    return null
  }

  async login(user: LoginDto) {
    const isValidUser = await this.validateUser(user.username, user.password)
    console.log('isValidUser2', isValidUser)
    const payload = {
      username: user.username,
      sub: user.id,
    }

    return {
      ...user,
      accessToken: this.jwtService.sign(payload, {
        expiresIn: process.env.EXPIRES_IN,
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
