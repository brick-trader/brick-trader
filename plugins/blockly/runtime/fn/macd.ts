import * as indicatorts from "indicatorts";

export function macd(closings: number[]): number[] {
  const ema12 = indicatorts.ema(12, closings);
  const ema26 = indicatorts.ema(26, closings);
  const macdLine = indicatorts.subtract(ema12, ema26);
  const signalLine = indicatorts.ema(9, macdLine);

  return indicatorts.subtract(macdLine, signalLine);
}
