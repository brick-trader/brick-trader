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

  @Get("tickers/:slug")
  async getTickerById(@Param("slug") slug: any): Promise<TickerModel> {
    const regExp = /[a-zA-Z]/g;

    const id = parseInt(slug);
    if (!regExp.test(slug) && !isNaN(id)) {
      return this.tickerService.ticker({ id });
    }

    return this.tickerService.ticker({ symbol: slug });
  }

  @Get("tickers/:slug/historical-data")
  async getTickerWithFilteredHistoricalData(
    @Param("slug") slug: any,
    @Query("start") start: Date,
  ): Promise<
    TickerModel & {
      historicalData: HistoricalDataModel[];
    }
  > {
    if (!(start instanceof Date && !isNaN(start.valueOf())))
      throw new BadRequestException("Must provide a valid start date");

    const regExp = /[a-zA-Z]/g;

    const id = parseInt(slug);
    if (!regExp.test(slug) && !isNaN(id)) {
      return this.tickerService.getTickerWithFilteredHistoricalData(
        { id },
        {
          date: {
            gte: start,
          },
        },
      );
    }

    return this.tickerService.getTickerBySymbolWithFilteredHistoricalData(
      { symbol: slug },
      {
        date: {
          gte: start,
        },
      },
    );
  }
}
