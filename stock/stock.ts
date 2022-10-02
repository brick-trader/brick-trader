import { Ticker } from "~~/types/stock/ticker";

export class Stock {
  private readonly _ticker: Ticker;
  private _openings: number[] | undefined;
  private _closings: number[] | undefined;
  private _highs: number[] | undefined;
  private _lows: number[] | undefined;
  private _volumes: number[] | undefined;
  constructor(ticker: Ticker) {
    this._ticker = ticker;
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
}
