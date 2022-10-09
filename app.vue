<template>
  <div>
    <ClientOnly>
      <Editor @generate="test" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Stock } from "./stock/stock";
import { Ticker } from "./types/stock/ticker";
import { runtime } from "~/plugins/blockly/runtume";
const indicatorts = await import("indicatorts");

const config = useRuntimeConfig();
const { data: stockData } = await useFetch<Ticker>(
  `${config.public.apiBaseUrl}/tickers/2330.TW/historical-data?start=1980-01-01`,
);

// prepare runtime
const stock = new Stock(stockData.value);

if (indicatorts && stock && runtime && process.client) {
  console.log("Runtime ready");
}

function test(code: string) {
  console.log(code);
  eval(code);
}
</script>
