import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  // Put,
  // Delete,
} from "@nestjs/common";
import { TickerService } from "./ticker.service";
import { HistoricalDataService } from "./historical_data.service";
import {
  Ticker as TickerModel,
  HistoricalData as HistoricalDataModel,
} from "@prisma/client";

@Controller()
export class AppController {
  constructor(
    private readonly tickerService: TickerService,
    private readonly historicalDataService: HistoricalDataService,
  ) {}

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
