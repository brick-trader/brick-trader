import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Ticker, Prisma, HistoricalData } from "@prisma/client";
import yahooFinance from "yahoo-finance2";

@Injectable()
export class TickerService {
  constructor(private prisma: PrismaService) {}

  async ticker(
    tickerWhereUniqueInput: Prisma.TickerWhereUniqueInput,
  ): Promise<Ticker | null> {
    return this.prisma.ticker.findUnique({
      where: tickerWhereUniqueInput,
    });
  }

  async tickers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TickerWhereUniqueInput;
    where?: Prisma.TickerWhereInput;
    orderBy?: Prisma.TickerOrderByWithRelationInput;
  }): Promise<Ticker[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ticker.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTicker(data: Prisma.TickerCreateInput): Promise<Ticker> {
    return this.prisma.ticker.create({
      data,
    });
  }

  async updateTicker(params: {
    where: Prisma.TickerWhereUniqueInput;
    data: Prisma.TickerUpdateInput;
  }): Promise<Ticker> {
    const { where, data } = params;
    return this.prisma.ticker.update({
      data,
      where,
    });
  }

  async deleteTicker(where: Prisma.TickerWhereUniqueInput): Promise<Ticker> {
    return this.prisma.ticker.delete({
      where,
    });
  }

  async getTickerWithFilteredHistoricalData(
    tickerWhereUniqueInput: Prisma.TickerWhereUniqueInput,
    historicalDataWhereInput: Prisma.HistoricalDataWhereInput,
  ): Promise<
    | (Ticker & {
        historicalData: HistoricalData[];
      })
    | null
  > {
    let tickerWithHistoricalData = await this.prisma.ticker.findUnique({
      where: tickerWhereUniqueInput,
      include: {
        historicalData: {
          orderBy: {
            date: "asc",
          },
          where: historicalDataWhereInput,
        },
      },
    });
    let newHistoricalData: HistoricalData[] = [];

    if (tickerWithHistoricalData) {
      if (tickerWithHistoricalData.historicalData.length !== 0) {
        // get historical data from external api
        // if the date range is not included in the database
        const startDate = tickerWithHistoricalData.historicalData[0].date;
        const endDate =
          tickerWithHistoricalData.historicalData[
            tickerWithHistoricalData.historicalData.length - 1
          ].date;
        const givenDate = (
          historicalDataWhereInput.date as Prisma.DateTimeFilter
        ).gte;

        if (givenDate < startDate) {
          try {
            newHistoricalData = await yahooFinance
              .historical(tickerWithHistoricalData.symbol, {
                period1: givenDate,
                period2: startDate,
              })
              .then((data) => {
                return data as HistoricalData[];
              });
          } catch (error) {
            if (error instanceof yahooFinance.errors.HTTPError) {
              console.warn(
                `Skipping yahooFinance.historical("${tickerWithHistoricalData.symbol}"): [${error.name}] ${error.message}`,
              );
            } else {
              throw new InternalServerErrorException(
                error,
                "Error while fetching historical data from external API",
              );
            }
          }
        }

        if (givenDate > endDate) {
          try {
            newHistoricalData = newHistoricalData.concat(
              await yahooFinance
                .historical(tickerWithHistoricalData.symbol, {
                  period1: endDate,
                  period2: givenDate,
                })
                .then((data) => {
                  return data as HistoricalData[];
                }),
            );
          } catch (error) {
            if (error instanceof yahooFinance.errors.HTTPError) {
              console.warn(
                `Skipping yahooFinance.historical("${tickerWithHistoricalData.symbol}"): [${error.name}] ${error.message}`,
              );
            } else {
              throw new InternalServerErrorException(
                error,
                "Error while fetching historical data from external API",
              );
            }
          }
        }
      } else {
        // get historical data from external api
        // start with the given date
        const startDate = (
          historicalDataWhereInput.date as Prisma.DateTimeFilter
        ).gte;
        try {
          newHistoricalData = await yahooFinance
            .historical(tickerWithHistoricalData.symbol, {
              period1: startDate,
            })
            .then((data) => {
              return data as HistoricalData[];
            });
        } catch (error) {
          if (error instanceof yahooFinance.errors.HTTPError) {
            console.warn(
              `Skipping yahooFinance.historical("${tickerWithHistoricalData.symbol}"): [${error.name}] ${error.message}`,
            );
          } else {
            throw new InternalServerErrorException(
              error,
              "Error while fetching historical data from external API",
            );
          }
        }
      }

      if (newHistoricalData.length > 0) {
        // add historical data to database
        for (let i = 0; i < newHistoricalData.length; i++) {
          const data = newHistoricalData[i];
          await this.prisma.historicalData.create({
            data: {
              date: data.date,
              open: data.open,
              high: data.high,
              low: data.low,
              close: data.close,
              adjClose: data.adjClose,
              volume: data.volume,
              ticker: {
                connect: {
                  symbol: tickerWithHistoricalData.symbol,
                },
              },
            },
          });

          await this.prisma.ticker.update({
            where: {
              symbol: tickerWithHistoricalData.symbol,
            },
            data: {
              updatedAt: new Date(),
            },
          });
        }

        // get ticker with historical data from database
        tickerWithHistoricalData = await this.prisma.ticker.findUnique({
          where: tickerWhereUniqueInput,
          include: {
            historicalData: {
              orderBy: {
                date: "asc",
              },
              where: historicalDataWhereInput,
            },
          },
        });
      }
    }

    return tickerWithHistoricalData;
  }

  async getTickerBySymbolWithFilteredHistoricalData(
    tickerWhereUniqueInput: Prisma.TickerWhereUniqueInput,
    historicalDataWhereInput: Prisma.HistoricalDataWhereInput,
  ): Promise<
    | (Ticker & {
        historicalData: HistoricalData[];
      })
    | null
  > {
    let ticker = await this.prisma.ticker.findUnique({
      where: tickerWhereUniqueInput,
    });

    if (!ticker) {
      // fetch ticker from external api
      try {
        ticker = await yahooFinance
          .quote(tickerWhereUniqueInput.symbol)
          .then((data) => {
            return {
              symbol: data.symbol,
              name: data.shortName,
              updatedAt: new Date(),
            } as Ticker;
          });

        // add ticker to database
        ticker = await this.prisma.ticker.create({
          data: ticker,
        });
      } catch (error) {
        if (error instanceof yahooFinance.errors.HTTPError) {
          console.warn(
            `Skipping yahooFinance.quote("${tickerWhereUniqueInput.symbol}"): [${error.name}] ${error.message}`,
          );
        } else {
          throw new InternalServerErrorException(
            error,
            "Error while fetching ticker from external API",
          );
        }
      }
    }

    return this.getTickerWithFilteredHistoricalData(
      tickerWhereUniqueInput,
      historicalDataWhereInput,
    );
  }
}
