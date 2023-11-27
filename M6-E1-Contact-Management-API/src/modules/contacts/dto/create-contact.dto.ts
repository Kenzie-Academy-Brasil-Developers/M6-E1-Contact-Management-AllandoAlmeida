import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

class PhoneDto {
  @ApiProperty()
  @IsString({ message: 'phone must be a string' })
  telephone: string
}

class EmailDto {
  @ApiProperty()
  @IsString({ message: 'email must be a string' })
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
