import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { HistoricalDataService } from "./historical-data.service";
import { HistoricalData as HistoricalDataModel } from "@prisma/client";

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
    historicalData: {
      tickerId: number;
      date: Date;
      open: number;
      high: number;
      low: number;
      close: number;
      adjClose: number;
      volume: number;
    },
  ): Promise<HistoricalDataModel> {
    const { tickerId, date, open, high, low, close, adjClose, volume } =
      historicalData;
    return this.historicalDataService.createHistoricalData({
      ticker: {
        connect: { id: tickerId },
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
    @Param("id") id: string,
  ): Promise<HistoricalDataModel> {
    return this.historicalDataService.historicalData({ id: Number(id) });
  }
}
