import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-local'

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException(
        'Credenciais inválidas ou usuário inativo',
      )
    }
    return user
  }
}
