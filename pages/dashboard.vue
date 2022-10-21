<script setup lang="ts">
import { Ticker } from "~~/types/stock/ticker";
import { runtime } from "~/plugins/blockly/runtime";
import { Action, StrategyInfo } from "indicatorts";
import { Backtest } from "~~/types/backtest/backtest";
import { Stock } from "~~/stock/stock";
import { useStrategy } from "~~/stores/strategy";
import date from "date-and-time";

definePageMeta({
  pageTransition: {
    mode: "default",
  },
});

const indicatorts = await import("indicatorts");

const config = useRuntimeConfig();
// TODO: change stock
const { data: stockData } = await useFetch<Ticker>(
  `${config.public.apiBaseUrl}/tickers/2330.TW/historical-data?start=1980-01-01`,
);

// prepare runtime
const stock = new Stock(stockData.value);

if (indicatorts && stock && runtime && process.client) {
  console.log("Backtest runtime ready");
}

const strategyCode = useStrategy().code;

if (!strategyCode) {
  console.log("Strategy not found");
}

const backtestData = ref(backtest(strategyCode));
console.log(backtestData.value);
const chartData = ref(generateChart(backtestData.value));
console.log(chartData.value);

function calculateStrategyActions(
  actions: Action[],
  closings: number[],
): { actionCount: number; winCount: number } {
  let actionCount = 0;
  let winCount = 0;
  let lastBuy = -1;
  for (let i = 0; i < actions.length; i++) {
    if (actions[i] === Action.BUY) {
      lastBuy = i;
      continue;
    }

    if (actions[i] === Action.SELL && lastBuy !== -1) {
      actionCount++;
      if (closings[i] - closings[lastBuy] > 0) winCount++;
      lastBuy = -1;
      continue;
    }
  }
  return { actionCount, winCount };
}

function backtest(code: string): Backtest {
  if (!code) return;

  console.log(code);

  const strategy: StrategyInfo = eval(code);
  const actions = strategy.strategy(stock);
  // TODO: verify type
  const gains = indicatorts
    .applyActions(stock.closings, actions)
    .map((gain) => Math.round(gain * 100));
  const { actionCount, winCount } = calculateStrategyActions(
    actions,
    stock.closings,
  );
  const winRate = Math.round((winCount / actionCount) * 100);
  const result = Math.round(
    indicatorts.backtest(stock, [strategy])[0].gain * 100,
  );
  const t = { gains, winRate, actionCount, winCount, result };
  console.log(t);
  return t;
}

function generateChart(backtestData: Backtest) {
  if (!backtestData) return;

  return {
    labels: stock.dates.map((d) => date.format(d, "YYYY-MM-DD")),
    datasets: [
      {
        label: "Gain",
        data: backtestData.gains,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
      },
    ],
  };
}
</script>

<template>
  <div class="dashboard">
    <ClientOnly v-if="backtestData">
      <DashboardCard title="Total Actions">
        <p>{{ backtestData.actionCount }}</p>
      </DashboardCard>
      <DashboardCard title="Total Win">
        <p>{{ backtestData.winCount }}</p>
      </DashboardCard>
      <DashboardCard title="Win Rate">
        <p>{{ isNaN(backtestData.winRate) ? 0 : backtestData.winRate }}%</p>
      </DashboardCard>
      <DashboardCard title="Final Gain">
        <p>{{ backtestData.result }}%</p>
      </DashboardCard>
      <DashboardCard title="Chart">
        <Chart :data="chartData" />
      </DashboardCard>
    </ClientOnly>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.dashboard > div {
  margin: 0.25rem;
}
</style>
