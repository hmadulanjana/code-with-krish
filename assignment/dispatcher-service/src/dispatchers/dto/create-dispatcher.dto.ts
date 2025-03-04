import { IsInt, IsString, } from 'class-validator';

export class DispatcherDto {
  @IsString()
  vehicle_number: string;
  @IsString()
  city: string;
}