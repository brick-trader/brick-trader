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
function mergeActions(actions1: Action[], actions2: Action[]) {
  return actions1.map((action, index) => {
    if (
      action === indicatorts.Action.HOLD &&
      actions2[index] !== indicatorts.Action.HOLD
    )
      return actions2[index];
    return action;
  });
}

function compare(
  left: number[],
  op: string,
  right: number | number[],
): boolean[] {
  const result: boolean[] = left.map((value, index) => {
    switch (op) {
      case "GT":
        if (Array.isArray(right)) {
          return value > right[index];
        }
        return value > right;
      case "LT":
        if (Array.isArray(right)) {
          return value < right[index];
        }

        return value < right;
      case "EQ":
        if (Array.isArray(right)) {
          return value === right[index];
        }

        return value === right;
      case "GE":
        if (Array.isArray(right)) {
          return value >= right[index];
        }

        return value >= right;
      case "LE":
        if (Array.isArray(right)) {
          return value <= right[index];
        }

        return value <= right;
      case "NE":
        if (Array.isArray(right)) {
          return value !== right[index];
        }

        return value !== right;
      default:
        return false;
    }
  });

  console.log(result);

  return result;
}

function boolean_algebra(
  left: boolean[],
  op: string,
  right: boolean[] | boolean,
): boolean[] {
  const result: boolean[] = left.map((value, index) => {
    switch (op) {
      case "AND":
        if (Array.isArray(right)) {
          return value && right[index];
        }
        return value && right;
      case "OR":
        if (Array.isArray(right)) {
          return value || right[index];
        }

        return value || right;
      case "XOR":
        if (Array.isArray(right)) {
          return value !== right[index];
        }

        return value !== right;
      default:
        return false;
    }
  });

  console.log(result);

  return result;
}

if (
  indicatorts &&
  stock &&
  mergeActions &&
  compare &&
  boolean_algebra &&
  process.client
) {
  console.log("Runtime ready");
}
/* eslint-enable */
function test(code: string) {
  console.log(code);
  eval(code);
}
</script>
