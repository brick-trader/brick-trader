// add blockly block with three input
// left input is a list of boolean
// middle input is a boolean operator: and, or, xor, nand, nor, xnor
// right input is a list of boolean or a singe boolean
// output is a list of boolean

import Blockly from "blockly";

Blockly.Blocks["boolean_algebra"] = {
  init: function () {
    this.appendValueInput("LEFT").setCheck("Boolean[]");
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["and", "AND"],
        ["or", "OR"],
        ["xor", "XOR"],
        ["nand", "NAND"],
        ["nor", "NOR"],
        ["xnor", "XNOR"],
      ]),
      "OP",
    );
    this.appendValueInput("RIGHT").setCheck(["Boolean[]", "Boolean"]);
    this.setOutput(true, "Boolean[]");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["boolean_algebra"] = function (block) {
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
  const code = `boolean_algebra(${
    value_left === "" ? "[]" : value_left
  }, "${dropdown_op}", ${value_right === "" ? "[]" : value_right})`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
