import Blockly from "blockly";

Blockly.Blocks["cross"] = {
  init: function () {
    this.appendValueInput("LEFT").setCheck(["Array", "Number"]);
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["crossover", "CROSSOVER"],
        ["crossdown", "CROSSDOWN"],
      ]),
      "OP",
    );
    this.appendValueInput("RIGHT").setCheck(["Array", "Number"]);
    this.setOutput(true, "Boolean[]");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["cross"] = function (block) {
  const value_left: string = Blockly.JavaScript.valueToCode(
    block,
    "LEFT",
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const dropdown_op: string = block.getFieldValue("OP");
  const value_right: string = Blockly.JavaScript.valueToCode(
    block,
    "RIGHT",
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const code = `runtime.fn.cross(${
    value_left === "" ? "[]" : value_left
  }, "${dropdown_op}", ${value_right === "" ? "[]" : value_right})`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
