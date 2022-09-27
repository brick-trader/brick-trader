import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Ticker, Prisma } from "@prisma/client";

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
}
