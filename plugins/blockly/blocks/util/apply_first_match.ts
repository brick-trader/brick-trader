import Blockly from "blockly";

Blockly.Blocks["apply_first_match"] = {
  init: function () {
    this.appendDummyInput().appendField("Apply first match");
    this.appendValueInput("ACTIONS_ONE").setCheck("Action[]");
    this.appendValueInput("ACTIONS_TWO").setCheck("Action[]");
    this.setOutput(true, "Action[]");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["apply_first_match"] = function (block) {
  const value_actions_1: string = Blockly.JavaScript.valueToCode(
    block,
    "ACTIONS_ONE",
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const value_actions_2: string = Blockly.JavaScript.valueToCode(
    block,
    "ACTIONS_TWO",
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const code = `applyFirstMatch(${
    value_actions_1 === "" ? "[]" : value_actions_1
  }, ${value_actions_2 === "" ? "[]" : value_actions_2})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
