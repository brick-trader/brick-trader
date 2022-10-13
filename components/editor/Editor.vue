<template>
  <div id="blocklyDiv" ref="blocklyDiv"></div>
  <button @click="emits('generate', generateCode())">Generate Code</button>
  <button @click="saveWorkspace">Save</button>
  <button @click="loadWorkspace">Load</button>
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

function saveWorkspace() {
  const blocks = Blockly.serialization.workspaces.save(workspace);
  // download blocks
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(blocks));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  // with date
  downloadAnchorNode.setAttribute(
    "download",
    `blocks-${new Date().toISOString()}.json`,
  );
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function loadWorkspace() {
  // upload json file and load blocks
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (text) {
          const blocks = JSON.parse(text as string);
          Blockly.serialization.workspaces.load(blocks, workspace);
        }
      };
      reader.readAsText(file);
    }
  };

  input.click();
}

// in setup life hook, dom is not ready yet
onMounted(() => {
  const toolbox = {
    kind: "flyoutToolbox",
    contents: [
      {
        kind: "block",
        type: "math_number",
      },
      {
        kind: "block",
        type: "math_arithmetic",
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
  };

  workspace = Blockly.inject("blocklyDiv", {
    // type declaration is wrong
    // track issue: https://github.com/google/blockly/issues/6215
    // eslint-disable-next-line
    // @ts-ignore
    toolbox: toolbox,
    renderer: "custom_renderer",
    // theme: "custom_theme",
    move: {
      scrollbars: {
        horizontal: true,
        vertical: true,
      },
      drag: true,
      wheel: false,
    },
    grid: {
      spacing: 50,
      length: 50,
      colour: "#f0f0f0",
    },
    trashcan: true,
  });
});

function generateCode() {
  if (!workspace) return;
  return Blockly.JavaScript.workspaceToCode(workspace);
}
</script>
