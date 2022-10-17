<template>
  <div id="blocklyDiv" ref="blocklyDiv"></div>
  <button @click="emits('generate', generateCode())">Generate Code</button>
</template>

<script setup lang="ts">
import Blockly, { Workspace } from "blockly";

const blocklyDiv = ref<HTMLElement>();

// TODO: use a better way to set blocklyDiv size
onMounted(() => {
  let w = window.innerWidth * 0.95;
  let h = window.innerHeight * 0.95;

  blocklyDiv.value.style.width = w + "px";
  blocklyDiv.value.style.height = h + "px";

  window.addEventListener("resize", () => {
    w = window.innerWidth * 0.95;
    h = window.innerHeight * 0.95;

    blocklyDiv.value.style.width = w + "px";
    blocklyDiv.value.style.height = h + "px";
  });
});

let workspace: Workspace | null = null;
const emits = defineEmits<{
  (event: "generate", code: string): void;
}>();

// in setup life hook, dom is not ready yet
onMounted(() => {
  const toolbox = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Math",
        colour: "#f78b2d",
        contents: [
          {
            kind: "label",
            text: "Math Blocks",
          },
          {
            kind: "block",
            type: "math_number",
          },
          {
            kind: "block",
            type: "math_arithmetic",
          },
        ],
      },
      {
        kind: "category",
        name: "Result",
        colour: "#21a346",
        contents: [
          {
            kind: "label",
            text: "Result Blocks",
          },
          {
            kind: "block",
            type: "text",
          },
          {
            kind: "block",
            type: "text_print",
          },
        ],
      },
      {
        kind: "category",
        name: "Strategy",
        colour: "#9B52E4",
        contents: [
          {
            kind: "category",
            name: "Trend Indicators",
            colour: "#9B52E4",
            contents: [
              {
                kind: "block",
                type: "apo",
              },
              {
                kind: "block",
                type: "ema",
              },
              {
                kind: "block",
                type: "sma",
              },
              {
                kind: "block",
                type: "macd",
              },
              {
                kind: "block",
                type: "psar",
              },
              {
                kind: "block",
                type: "kdj",
              },
              {
                kind: "block",
                type: "vwma",
              },
            ],
          },
          {
            kind: "category",
            name: "Momentum Indicator",
            colour: "#9B52E4",
            contents: [
              {
                kind: "block",
                type: "rsi",
              },
              {
                kind: "block",
                type: "custom_rsi",
              },
            ],
          },
          {
            kind: "label",
            text: "Strategy Blocks",
          },

          {
            kind: "block",
            type: "strategy",
          },
          {
            kind: "block",
            type: "action",
          },
          {
            kind: "block",
            type: "apply_first_match",
            mutator: "add_action",
          },
          {
            kind: "block",
            type: "compare",
          },
          {
            kind: "block",
            type: "boolean_algebra",
          },
          {
            kind: "block",
            type: "cross",
          },
          {
            kind: "block",
            type: "backtest",
          },
          {
            kind: "block",
            type: "price",
          },
        ],
      },
      {
        kind: "category",
        name: "All",
        colour: "#00B0FF",
        contents: [
          {
            kind: "label",
            text: "Math Blocks",
          },
          {
            kind: "block",
            type: "math_number",
          },
          {
            kind: "block",
            type: "math_arithmetic",
          },
          {
            kind: "label",
            text: "Result Blocks",
          },
          {
            kind: "block",
            type: "text",
          },
          {
            kind: "block",
            type: "text_print",
          },
          {
            kind: "label",
            text: "Strategy Blocks",
          },
          {
            kind: "block",
            type: "rsi",
          },
          {
            kind: "block",
            type: "custom_rsi",
          },
          {
            kind: "block",
            type: "ema",
          },
          {
            kind: "block",
            type: "apo",
          },
          {
            kind: "block",
            type: "sma",
          },
          {
            kind: "block",
            type: "macd",
          },
          {
            kind: "block",
            type: "psar",
          },
          {
            kind: "block",
            type: "kdj",
          },
          {
            kind: "block",
            type: "vwma",
          },
          {
            kind: "block",
            type: "strategy",
          },
          {
            kind: "block",
            type: "action",
          },
          {
            kind: "block",
            type: "apply_first_match",
            mutator: "add_action",
          },
          {
            kind: "block",
            type: "compare",
          },
          {
            kind: "block",
            type: "boolean_algebra",
          },
          {
            kind: "block",
            type: "cross",
          },
          {
            kind: "block",
            type: "backtest",
          },
          {
            kind: "block",
            type: "price",
          },
        ],
      },
    ],
  };

  workspace = Blockly.inject("blocklyDiv", {
    // type declaration is wrong
    // track issue: https://github.com/google/blockly/issues/6215
    // eslint-disable-next-line
    // @ts-ignore
    toolbox: toolbox,
    renderer: "custom_renderer",
    theme: "custom_theme",
  });
});

function generateCode() {
  if (!workspace) return;
  return Blockly.JavaScript.workspaceToCode(workspace);
}
</script>
