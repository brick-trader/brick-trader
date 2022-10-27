import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { PrismaService } from "src/prisma.service";
import { TickerController } from "./ticker.controller";
import { TickerService } from "./ticker.service";

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: { log: ["info"] },
        explicitConnect: true,
      },
    }),
  ],
  controllers: [TickerController],
  providers: [TickerService, PrismaService],
})
export class TickerModule {}
