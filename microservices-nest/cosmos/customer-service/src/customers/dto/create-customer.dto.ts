import {IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: String;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: String;
  
  @IsOptional()
  @IsString()
  address: String;
}
