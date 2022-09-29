import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  ParseIntPipe,
  BadRequestException,
} from "@nestjs/common";
import { TickerService } from "./ticker.service";
import {
  Ticker as TickerModel,
  HistoricalData as HistoricalDataModel,
} from "@prisma/client";
import { CreateTickerDto } from "./dtos/create-ticker.dto";

@Controller()
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}
  @Get("tickers")
  async getTickers(): Promise<TickerModel[]> {
    return this.tickerService.tickers({});
  }

  @Post("tickers")
  async createTicker(
    @Body() createTickerDto: CreateTickerDto,
  ): Promise<TickerModel> {
    const { symbol, name } = createTickerDto;
    return this.tickerService.createTicker({
      symbol,
      name,
      updatedAt: new Date(),
    });
  }

  @Get("tickers/:id")
  async getTickerById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<TickerModel> {
    return this.tickerService.ticker({ id });
  }

  @Get("tickers/:id/historical-data")
  async getTickerWithFilteredHistoricalData(
    @Param("id", ParseIntPipe) id: number,
    @Query("start") start: Date,
  ): Promise<
    TickerModel & {
      historicalData: HistoricalDataModel[];
    }
  > {
    if (!(start instanceof Date && !isNaN(start.valueOf())))
      throw new BadRequestException("Must provide a valid start date");
    return this.tickerService.getTickerWithFilteredHistoricalData(
      { id: Number(id) },
      {
        date: {
          gte: start,
        },
      },
    );
  }
}
