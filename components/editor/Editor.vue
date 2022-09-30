<template>
  <div id="blocklyDiv" style="height: 480px; width: 600px"></div>
  <button @click="emits('generate', generateCode())">Generate Code</button>
</template>

<script setup lang="ts">
import Blockly, { Workspace } from "blockly";

let workspace: Workspace | null = null;
const emits = defineEmits<{
  (event: "generate", code: string): void;
}>();

// in setup life hook, dom is not ready yet
onMounted(() => {
  const toolbox = {
    kind: "flyoutToolbox",
    contents: [
      {
        kind: "block",
        type: "controls_if",
      },
      {
        kind: "block",
        type: "controls_repeat_ext",
      },
      {
        kind: "block",
        type: "logic_compare",
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
    ],
  };
  workspace = Blockly.inject("blocklyDiv", {
    // type declaration is wrong
    // track issue: https://github.com/google/blockly/issues/6215
    // eslint-disable-next-line
    // @ts-ignore
    toolbox: toolbox,
  });
});

function generateCode() {
  if (!workspace) return;
  return Blockly.JavaScript.workspaceToCode(workspace);
}
</script>
