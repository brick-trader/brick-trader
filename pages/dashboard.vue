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
const symbol = ref("2330.TW");
const startDateFilterInput = ref("2020-01-01");
const endDateFilterInput = ref(date.format(new Date(), "YYYY-MM-DD"));
const startDateFilter = computed(() => new Date(startDateFilterInput.value));
const endDateFilter = computed(() => new Date(endDateFilterInput.value));
const url = computed(
  () => `${config.public.apiBaseUrl}/tickers/${symbol.value}/historical-data`,
);

const { data: stockData, refresh } = await useFetch<Ticker>(url, {
  params: {
    start: startDateFilter.value.toISOString(),
    end: endDateFilter.value.toISOString(),
  },
});

// prepare runtime
let stock = new Stock(stockData.value);

if (indicatorts && stock && runtime && process.client) {
  console.log("Backtest runtime ready");
}

const strategyCode = useStrategy().code;

if (!strategyCode && process.client) {
  console.log("Strategy not found");
}

const backtestData = ref(backtest(strategyCode));
const chartData = ref(generateChart(backtestData.value));

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

function updateDashboard() {
  stock = new Stock(stockData.value);
  backtestData.value = backtest(strategyCode);
  chartData.value = generateChart(backtestData.value);
}

async function refreshData() {
  await refresh();
  updateDashboard();
}

// register filter listener
watch(() => startDateFilterInput.value, refreshData);
watch(() => endDateFilterInput.value, refreshData);
</script>

<template>
  <div class="dashboard">
    <div class="container">
      <DashboardStockSearch
        :default-query="symbol"
        @do-search="
          async (newSymbol) => {
            symbol = newSymbol;
            await refresh();
            updateDashboard();
          }
        "
      />
      <input v-model="startDateFilterInput" type="date" />
      <input v-model="endDateFilterInput" type="date" />
    </div>
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

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 50;
}
</style>
