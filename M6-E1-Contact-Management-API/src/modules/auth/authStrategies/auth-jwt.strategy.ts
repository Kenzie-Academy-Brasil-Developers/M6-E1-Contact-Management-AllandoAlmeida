import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

interface IPayload {
  id: string
  sub: string
  username: string
}

export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }
  async validate(payload: IPayload) {
    console.log('payload', payload)
    return { id: payload.sub, username: payload.username }
  }
}
