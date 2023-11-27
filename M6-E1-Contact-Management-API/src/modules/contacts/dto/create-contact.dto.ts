import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

class PhoneDto {
  @ApiProperty()
  @IsString()
  telephone: string
}

class EmailDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string
}

export class CreateContactDto {
  @ApiProperty({
    description: 'Enter at least 6 characters',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  name: string

  @ApiProperty({ type: [PhoneDto] })
  @ValidateNested({ each: true })
  @Type(() => PhoneDto)
  phones: PhoneDto[]

  @ApiProperty({ type: [EmailDto] })
  @ValidateNested({ each: true })
  @Type(() => EmailDto)
  emails: EmailDto[]

  @ApiProperty()
  @IsString()
  zidCode: string

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
