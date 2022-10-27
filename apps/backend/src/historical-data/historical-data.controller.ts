import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { HistoricalDataService } from "./historical-data.service";
import { HistoricalData as HistoricalDataModel } from "@prisma/client";
import { createHistoricalDataDto } from "./dtos/create-historical-data.dto";

@Controller()
export class HistoricalDataController {
  constructor(private readonly historicalDataService: HistoricalDataService) {}

  @Get("historical-data")
  async getHistoricalDatas(): Promise<HistoricalDataModel[]> {
    return this.historicalDataService.historicalDatas({});
  }

  @Post("historical-data")
  async createHistoricalData(
    @Body()
    createHistoricalData: createHistoricalDataDto,
  ): Promise<HistoricalDataModel> {
    const { tickerSymbol, date, open, high, low, close, adjClose, volume } =
      createHistoricalData;
    return this.historicalDataService.createHistoricalData({
      ticker: {
        connect: { symbol: tickerSymbol },
      },
      date,
      open,
      high,
      low,
      close,
      adjClose,
      volume,
    });
  }

  @Get("historical-data/:id")
  async getHistoricalDataById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<HistoricalDataModel> {
    return this.historicalDataService.historicalData({ id });
  }
}
