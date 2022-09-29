import { IsDate, IsInt, IsNumber } from "class-validator";

export class createHistoricalDataDto {
  @IsInt()
  tickerId: number;
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
