import { Test, TestingModule } from "@nestjs/testing";
import { Ticker } from "@prisma/client";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HistoricalDataService } from "./historical_data.service";
import { PrismaService } from "./prisma.service";
import { TickerService } from "./ticker.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        PrismaService,
        TickerService,
        HistoricalDataService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("get tickers", () => {
    it("should be an array of tickers", () => {
      expect(appController.getTickers()).toBeInstanceOf(Promise<Ticker[]>);
    });
  });
});
