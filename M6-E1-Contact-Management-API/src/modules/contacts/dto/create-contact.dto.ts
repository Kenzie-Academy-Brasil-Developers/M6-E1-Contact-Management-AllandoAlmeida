import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator'

export class CreateContactDto {
  @ApiProperty({
    description: 'Enter at least 6 characters',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  name: string

  @ApiProperty()
  @IsString()
  telephone: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  customerId: string
}
