import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsNumber,
  MaxLength,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

class ContactToCustomerDto {
  customerId: string
  contactId: string
  assignedAt: Date
}

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
  cep: string

  @ApiProperty()
  @IsString()
  address: string

  @ApiProperty()
  @IsString()
  complement: string

  @ApiProperty()
  @IsString()
  neighborhood: string

  @ApiProperty()
  @IsString()
  locality: string

  @ApiProperty()
  @IsString()
  @MaxLength(2)
  uf: string

  @ApiProperty()
  @IsNumber()
  gia: number

  @ApiProperty()
  @IsNumber()
  ddd: number

  // Adicionando a relação contactToCustomer
  @ApiProperty({ type: [ContactToCustomerDto] })
  @ValidateNested({ each: true })
  @Type(() => ContactToCustomerDto)
  contactToCustomers: ContactToCustomerDto[]
}
