import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class SessionDto {
  @ApiProperty({
    description: 'Schema Customer',
  })
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string
  id: string
  name: string
}
