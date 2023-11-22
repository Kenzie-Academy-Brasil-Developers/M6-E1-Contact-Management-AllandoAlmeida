import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator'
import { hashSync } from 'bcryptjs'
import { Transform } from 'class-transformer'

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Enter at least 6 characters',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  name: string

  @ApiProperty({
    description: 'Enter at least 6 characters',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  username: string

  @ApiProperty({
    description: 'Enter at least 8 characters alphanumerics',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['hashingPassword'],
  })
  password: string

  @ApiProperty()
  @IsString()
  telephone: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string
}
