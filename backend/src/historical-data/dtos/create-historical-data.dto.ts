import { IsDate, IsNumber, IsString, MinLength } from "class-validator";

export class createHistoricalDataDto {
  @IsString()
  @MinLength(1)
  tickerSymbol: string;
  @IsDate()
  date: Date;
  @IsNumber()
  open: number;
  @IsNumber()
  high: number;
  @IsNumber()
  low: number;
  @IsNumber()
  close: number;
  @IsNumber()
  adjClose: number;
  @IsNumber()
  volume: number;
}
