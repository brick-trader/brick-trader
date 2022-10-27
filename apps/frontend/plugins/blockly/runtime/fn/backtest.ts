import * as indicatorts from "indicatorts";
import { StrategyInfo, StrategyResult } from "indicatorts";
import { Stock } from "~~/stock/stock";

export function backtest(
  stock: Stock,
  strategyInfos: StrategyInfo[],
): StrategyResult[] {
  const result = indicatorts.backtest(stock, strategyInfos);

  console.log(result);

  return result;
}
