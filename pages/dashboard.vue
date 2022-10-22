<script setup lang="ts">
import { Ticker } from "~~/types/stock/ticker";
import { runtime } from "~/plugins/blockly/runtime";
import { Action, StrategyInfo } from "indicatorts";
import { Backtest } from "~~/types/backtest/backtest";
import { Stock } from "~~/stock/stock";
import { useStrategy } from "~~/stores/strategy";
import date from "date-and-time";
import { useDashboard } from "~~/stores/dashboard";
import gsap from "gsap";
import { Power2 } from "gsap";

definePageMeta({
  pageTransition: {
    mode: "default",
  },
});

const indicatorts = await import("indicatorts");

const config = useRuntimeConfig();
const dashboardState = useDashboard();
const symbol = ref(dashboardState.symbol);
const startDateFilterInput = ref(dashboardState.startDateFilterInput);
const endDateFilterInput = ref(dashboardState.endDateFilterInput);
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
    if (actions[i] === Action.BUY && lastBuy === -1) {
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
  if (lastBuy !== -1) {
    actionCount++;
    if (closings[closings.length - 1] - closings[lastBuy] > 0) winCount++;
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

  const backtestDataSnapshot = backtestData.value;
  gsap.fromTo(
    backtestData.value,
    {
      gains: backtestDataSnapshot.gains,
      winRate: 0,
      result: 0,
      actionCount: 0,
      winCount: 0,
    },
    {
      gains: backtestData.value.gains,
      winRate: backtestData.value.winRate,
      result: backtestData.value.result,
      actionCount: backtestData.value.actionCount,
      winCount: backtestData.value.winCount,
      duration: 2,
      ease: Power2.easeOut,
    },
  );
}

async function refreshData() {
  await refresh();
  updateDashboard();
}

// register filter listener
watch(() => startDateFilterInput.value, refreshData);
watch(() => endDateFilterInput.value, refreshData);

onMounted(() => {
  if (!backtestData.value) return;

  const backtestDataSnapshot = backtestData.value;
  gsap.fromTo(
    backtestData.value,
    {
      gains: backtestDataSnapshot.gains,
      winRate: 0,
      result: 0,
      actionCount: 0,
      winCount: 0,
    },
    {
      gains: backtestData.value.gains,
      winRate: backtestData.value.winRate,
      result: backtestData.value.result,
      actionCount: backtestData.value.actionCount,
      winCount: backtestData.value.winCount,
      duration: 2,
      ease: Power2.easeOut,
    },
  );
});
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
      <input
        v-model="startDateFilterInput"
        type="date"
        @click="(event) => (event.target as HTMLInputElement).showPicker()"
      />
      <input
        v-model="endDateFilterInput"
        type="date"
        @click="(event) => (event.target as HTMLInputElement).showPicker()"
      />
    </div>
    <hr />
    <ClientOnly v-if="backtestData">
      <div id="infos">
        <DashboardCard title="Total Closed Trades">
          <p>{{ Math.round(backtestData.actionCount) }}</p>
        </DashboardCard>
        <DashboardCard title="Total Win">
          <p>{{ Math.round(backtestData.winCount) }}</p>
        </DashboardCard>
        <DashboardCard title="Win Rate">
          <p>
            {{
              isNaN(backtestData.winRate)
                ? 0
                : Math.round(backtestData.winRate)
            }}%
          </p>
        </DashboardCard>
        <DashboardCard title="Net Profit">
          <p>{{ Math.round(backtestData.result) }}%</p>
        </DashboardCard>
      </div>
      <div id="chart-container">
        <DashboardCard title="Chart">
          <Chart :data="chartData" />
        </DashboardCard>
      </div>
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

.container {
  margin-top: 3em;
  padding: 0 1em;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 999;
}

.container > input {
  margin-left: 1em;
  min-width: 200px;
  padding: 0 1em;
  border: none;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.container > input:focus {
  outline: 1px solid #ddd;
}

#infos {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1em 0.5em 0 0.5em;
}

#infos > div {
  margin: 0 0.5em;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#infos > div > p {
  padding: 0.5em 0 0.2em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: #888;
}

#chart-container {
  display: flex;
  justify-content: center;
  margin: 1em;
  width: 100%;
}

#chart-container > div {
  display: flex;
  justify-content: center;
  width: 100%;
}

hr {
  width: 100%;
  margin: 3em 1em 2em 1em;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #eee;
}
</style>
