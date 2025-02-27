import { IsInt, Min } from 'class-validator';

export class ValidateProductDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
