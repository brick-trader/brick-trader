<template>
  <div>
    <ClientOnly>
      <Editor ref="editor" />
      <button @click="backtest()">Backtest</button>
      <button @click="showChart()">Show Chart</button>
      <Chart v-if="chartVisable" :data="chartData" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Ticker } from "~~/types/stock/ticker";
import { runtime } from "~/plugins/blockly/runtime";
import Editor from "~/components/editor/Editor.vue";
import Blockly from "blockly";
import { Action, StrategyInfo } from "indicatorts";
import { Backtest } from "~~/types/backtest/backtest";
import { Stock } from "~~/stock/stock";
const indicatorts = await import("indicatorts");

const config = useRuntimeConfig();
const { data: stockData } = await useFetch<Ticker>(
  `${config.public.apiBaseUrl}/tickers/2330.TW/historical-data?start=1980-01-01`,
);
const editor = ref<InstanceType<typeof Editor>>();
const chartVisable = ref(false);
const chartData = ref(null);

// prepare runtime
const stock = new Stock(stockData.value);

if (indicatorts && stock && runtime && process.client) {
  console.log("Runtime ready");
}

function calculateWinRate(actions: Action[], closings: number[]): number {
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
  return winCount / actionCount;
}

function backtest(): Backtest {
  const workspace = editor.value.workspace;
  if (!workspace) return;
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  const strategy: StrategyInfo = eval(code);
  const actions = strategy.strategy(stock);
  // TODO: verify type
  const gains = indicatorts.applyActions(stock.closings, actions);
  const winRate = calculateWinRate(actions, stock.closings);
  const result = indicatorts.backtest(stock, [strategy])[0].gain;
  const t = { gains, winRate, result };
  console.log(t);
  return t;
}

function showChart() {
  const result = backtest();
  chartData.value = {
    labels: stock.dates,
    datasets: [
      {
        label: "Gain",
        data: result.gains,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
      },
    ],
  };
  chartVisable.value = true;
}
</script>
