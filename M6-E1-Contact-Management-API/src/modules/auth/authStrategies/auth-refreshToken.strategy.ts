import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

interface IPayload {
  sub: string
  username: string
  isActive: boolean
}

export class AuthRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }
  async validate(payload: IPayload) {
    return { id: payload.sub, username: payload.username }
  }
}
