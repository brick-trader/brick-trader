import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { TickerService } from "./ticker.service";
import {
  Ticker as TickerModel,
  HistoricalData as HistoricalDataModel,
} from "@prisma/client";

@Controller()
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}
  @Get("tickers")
  async getTickers(): Promise<TickerModel[]> {
    return this.tickerService.tickers({});
  }

  @Post("tickers")
  async createTicker(
    @Body() tickerData: { symbol: string; name: string },
  ): Promise<TickerModel> {
    const { symbol, name } = tickerData;
    return this.tickerService.createTicker({
      symbol,
      name,
      updatedAt: new Date(),
    });
  }

  @Get("tickers/:id")
  async getTickerById(@Param("id") id: string): Promise<TickerModel> {
    return this.tickerService.ticker({ id: Number(id) });
  }

  @Get("tickers/:id/historical-data/:date")
  async getTickerWithFilteredHistoricalData(
    @Param("id") id: string,
    @Param("date") date: string,
  ): Promise<
    TickerModel & {
      historicalData: HistoricalDataModel[];
    }
  > {
    return this.tickerService.getTickerWithFilteredHistoricalData(
      { id: Number(id) },
      {
        date: {
          gte: new Date(date),
        },
      },
    );
  }
}
