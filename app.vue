<template>
  <div>
    <ClientOnly>
      <Editor @generate="test" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Action } from "indicatorts";
import { Stock } from "./stock/stock";
import { Ticker } from "./types/stock/ticker";

const config = useRuntimeConfig();
const { data: stockData } = await useFetch<Ticker>(
  `${config.public.apiBaseUrl}/tickers/2330.TW/historical-data?start=1980-01-01`,
);

// prepare runtime
/* eslint-disable */
const indicatorts = await import("indicatorts");
const stock = new Stock(stockData.value);
function applyFirstMatch(actions1: Action[], actions2: Action[]) {
  return actions1.map((action, index) => {
    if (
      action === indicatorts.Action.HOLD &&
      actions2[index] !== indicatorts.Action.HOLD
    )
      return actions2[index];
    return action;
  });
}
if (indicatorts && stock && applyFirstMatch && process.client) {
  console.log("Runtime ready");
}
/* eslint-enable */
function test(code: string) {
  console.log(code);
  eval(code);
}
</script>
