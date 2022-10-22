<template>
  <div id="editor-container">
    <div id="blocklyDiv" ref="blocklyDiv"></div>
    <div id="button-container">
      <button @click="exportWorkspace">Export</button>
      <button @click="importWorkspace">Import</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Blockly, { Workspace } from "blockly";
import { useEditor } from "~~/stores/editor";
import { useStrategy } from "~~/stores/strategy";

const editorState = useEditor();
const blocklyDiv = ref<HTMLElement>();

let workspace = shallowRef<Workspace>();

defineExpose({ workspace });

function exportWorkspace() {
  const currentWorkspace = Blockly.serialization.workspaces.save(
    workspace.value,
  );

  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(currentWorkspace));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);

  downloadAnchorNode.setAttribute(
    "download",
    `workspace-${new Date().toISOString()}.json`,
  );
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function importWorkspace() {
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
          const importWorkspace = JSON.parse(text as string);
          const originalWorkspace = Blockly.serialization.workspaces.save(
            workspace.value,
          );

          if (Object.keys(originalWorkspace).length === 0) {
            Blockly.serialization.workspaces.load(
              importWorkspace,
              workspace.value,
            );
            return;
          }

          originalWorkspace.blocks.blocks =
            originalWorkspace.blocks.blocks.concat(
              importWorkspace.blocks.blocks,
            );
          Blockly.serialization.workspaces.load(
            originalWorkspace,
            workspace.value,
          );
        }
      };
      reader.readAsText(file);
    }
  };

  input.click();
}

function saveStrategyState(workspace: Blockly.Workspace) {
  if (!workspace) return;
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(code);
  // TODO: remove unnecessary code
  useStrategy().code = code;
}

function saveEditorState(workspace: Blockly.Workspace) {
  if (!workspace) return;
  const currentWorkspace = Blockly.serialization.workspaces.save(workspace);
  editorState.workspaceSnapshot = currentWorkspace;
}

// in setup life hook, dom is not ready yet
onMounted(() => {
  const emInPx = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );

  // TODO: use a better way to set blocklyDiv size
  blocklyDiv.value.style.width = window.innerWidth + "px";
  blocklyDiv.value.style.height = window.innerHeight - 4 * emInPx + "px";

  window.addEventListener("resize", () => {
    blocklyDiv.value.style.width = window.innerWidth + "px";
    blocklyDiv.value.style.height = window.innerHeight - 4 * emInPx + "px";
  });

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
            type: "text_print",
          },
        ],
      },
      {
        kind: "category",
        name: "Function",
        colour: "#EC407A",
        contents: [
          {
            kind: "label",
            text: "Strategy Blocks",
          },

          {
            kind: "block",
            type: "strategy",
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
            type: "price",
          },
        ],
      },
      {
        kind: "category",
        name: "Trend Indicators",
        colour: "#9b52e4",
        contents: [
          {
            kind: "block",
            type: "apo",
          },
          {
            kind: "block",
            type: "aroon",
          },
          {
            kind: "block",
            type: "bop",
          },
          {
            kind: "block",
            type: "cfo",
          },
          {
            kind: "block",
            type: "cmi",
          },
          {
            kind: "block",
            type: "dema",
          },
          {
            kind: "block",
            type: "ema",
          },
          {
            kind: "block",
            type: "kdj",
          },
          {
            kind: "block",
            type: "macd",
          },
          {
            kind: "block",
            type: "mi",
          },
          {
            kind: "block",
            type: "mmax",
          },
          {
            kind: "block",
            type: "mmin",
          },
          {
            kind: "block",
            type: "msum",
          },
          {
            kind: "block",
            type: "psar",
          },
          {
            kind: "block",
            type: "qstick",
          },
          {
            kind: "block",
            type: "rma",
          },
          {
            kind: "block",
            type: "sma",
          },
          {
            kind: "block",
            type: "tema",
          },
          {
            kind: "block",
            type: "trima",
          },
          {
            kind: "block",
            type: "trix",
          },
          {
            kind: "block",
            type: "typical_price",
          },
          {
            kind: "block",
            type: "vortex",
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
        colour: "#00BCD4",
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
        kind: "category",
        name: "Volume Indicator",
        colour: "#4b5aff",
        contents: [
          {
            kind: "block",
            type: "mfi",
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
            type: "aroon",
          },
          {
            kind: "block",
            type: "bop",
          },
          {
            kind: "block",
            type: "cfo",
          },
          {
            kind: "block",
            type: "cmi",
          },
          {
            kind: "block",
            type: "dema",
          },
          {
            kind: "block",
            type: "ema",
          },
          {
            kind: "block",
            type: "kdj",
          },
          {
            kind: "block",
            type: "macd",
          },
          {
            kind: "block",
            type: "mi",
          },
          {
            kind: "block",
            type: "mmax",
          },
          {
            kind: "block",
            type: "mmin",
          },
          {
            kind: "block",
            type: "msum",
          },
          {
            kind: "block",
            type: "psar",
          },
          {
            kind: "block",
            type: "qstick",
          },
          {
            kind: "block",
            type: "rma",
          },
          {
            kind: "block",
            type: "sma",
          },
          {
            kind: "block",
            type: "tema",
          },
          {
            kind: "block",
            type: "trima",
          },
          {
            kind: "block",
            type: "trix",
          },
          {
            kind: "block",
            type: "typical_price",
          },
          {
            kind: "block",
            type: "vortex",
          },
          {
            kind: "block",
            type: "vwma",
          },
          {
            kind: "block",
            type: "mfi",
          },
          {
            kind: "block",
            type: "strategy",
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
            type: "price",
          },
        ],
      },
    ],
  };

  workspace.value = Blockly.inject("blocklyDiv", {
    // type declaration is wrong
    // track issue: https://github.com/google/blockly/issues/6215
    // eslint-disable-next-line
    // @ts-ignore
    toolbox: toolbox,
    renderer: "custom_renderer",
    theme: "custom_theme",
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
  workspace.value.addChangeListener(() => saveStrategyState(workspace.value));
  workspace.value.addChangeListener(() => saveEditorState(workspace.value));

  if (editorState.workspaceSnapshot) {
    // load previous state
    Blockly.serialization.workspaces.load(
      editorState.workspaceSnapshot,
      workspace.value,
    );
  }
});
</script>

<style scoped>
#editor-container {
  height: calc(100vh - 4em);
  overflow: hidden;
}

#button-container {
  position: absolute;
  bottom: 5.5em;
  right: 0;
  width: 7.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em;
}

button {
  width: 5em;
  height: 5em;
  color: #fff;
  background-color: #a0a0a0;
  border: 1px solid #a0a0a0;
  border-radius: 5px;
  margin-bottom: 2em;
  font-size: 14px;
  letter-spacing: 1.5px;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
}

button:hover {
  opacity: 1;
}
</style>
