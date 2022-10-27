import { IsString, MinLength } from "class-validator";

export class CreateTickerDto {
  @IsString()
  @MinLength(1)
  symbol: string;
  @IsString()
  @MinLength(1)
  name: string;
}
