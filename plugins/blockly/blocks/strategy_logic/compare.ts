import Blockly from "blockly";

Blockly.Blocks["compare"] = {
  init: function () {
    this.appendValueInput("LEFT").setCheck("Array");
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["<", "LT"],
        ["<=", "LE"],
        [">", "GT"],
        [">=", "GE"],
        ["==", "EQ"],
        ["!=", "NE"],
      ]),
      "OP",
    );
    this.appendValueInput("RIGHT").setCheck(["Array", "Number"]);
    this.setOutput(true, "Boolean[]");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("function");
  },
};

Blockly.JavaScript["compare"] = function (block) {
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
  const code = `runtime.fn.compare(${
    value_left === "" ? "[]" : value_left
  }, "${dropdown_op}", ${value_right === "" ? "0" : value_right})`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
