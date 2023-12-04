import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

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
  @IsNumberString()
  zipCode: string

  @ApiProperty()
  @IsString()
  street: string

  @ApiProperty()
  @IsString()
  complement: string

  @ApiProperty()
  @IsString()
  district: string

  @ApiProperty()
  @IsString()
  locality: string

  @ApiProperty()
  @IsString()
  @MaxLength(2)
  state: string
}
