import { Injectable } from "@nestjs/common";
import { HistoricalData, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class HistoricalDataService {
  constructor(private prisma: PrismaService) {}

  async historicalData(
    historicalDataWhereUniqueInput: Prisma.HistoricalDataWhereUniqueInput,
  ): Promise<HistoricalData | null> {
    return this.prisma.historicalData.findUnique({
      where: historicalDataWhereUniqueInput,
    });
  }

  async historicalDatas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.HistoricalDataWhereUniqueInput;
    where?: Prisma.HistoricalDataWhereInput;
    orderBy?: Prisma.HistoricalDataOrderByWithRelationInput;
  }): Promise<HistoricalData[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.historicalData.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createHistoricalData(
    data: Prisma.HistoricalDataCreateInput,
  ): Promise<HistoricalData> {
    return this.prisma.historicalData.create({
      data,
    });
  }

  async updateHistoricalData(params: {
    where: Prisma.HistoricalDataWhereUniqueInput;
    data: Prisma.HistoricalDataUpdateInput;
  }): Promise<HistoricalData> {
    const { where, data } = params;
    return this.prisma.historicalData.update({
      data,
      where,
    });
  }

  async deleteHistoricalData(
    where: Prisma.HistoricalDataWhereUniqueInput,
  ): Promise<HistoricalData> {
    return this.prisma.historicalData.delete({
      where,
    });
  }
}
