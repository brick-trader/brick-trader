import { Ticker } from "~~/types/stock/ticker";

export class Stock {
  private readonly _ticker: Ticker;
  private _dates: Date[] | undefined;
  private _openings: number[] | undefined;
  private _closings: number[] | undefined;
  private _highs: number[] | undefined;
  private _lows: number[] | undefined;
  private _volumes: number[] | undefined;
  private _adjCloses: number[] | undefined;

  constructor(ticker: Ticker) {
    this._ticker = ticker;
  }

  public get dates(): Date[] {
    if (this._dates === undefined) {
      this._dates = this._ticker.historicalData.map((data) => data.date);
    }
    return this._dates;
  }

  public get openings(): number[] {
    if (this._openings === undefined) {
      this._openings = this._ticker.historicalData.map((data) => data.open);
    }
    return this._openings;
  }

  public get closings(): number[] {
    if (this._closings === undefined) {
      this._closings = this._ticker.historicalData.map((data) => data.close);
    }
    return this._closings;
  }

  public get highs(): number[] {
    if (this._highs === undefined) {
      this._highs = this._ticker.historicalData.map((data) => data.high);
    }
    return this._highs;
  }

  public get lows(): number[] {
    if (this._lows === undefined) {
      this._lows = this._ticker.historicalData.map((data) => data.low);
    }
    return this._lows;
  }

  public get volumes(): number[] {
    if (this._volumes === undefined) {
      this._volumes = this._ticker.historicalData.map((data) => data.volume);
    }
    return this._volumes;
  }

  public get adjCloses(): number[] {
    if (this._adjCloses === undefined) {
      this._adjCloses = this._ticker.historicalData.map(
        (data) => data.adjClose,
      );
    }
    return this._adjCloses;
  }
}
