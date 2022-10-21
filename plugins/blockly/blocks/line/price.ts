import Blockly from "blockly";

Blockly.Blocks["price"] = {
  init: function () {
    this.appendDummyInput().appendField("price");
    this.appendDummyInput()
      .appendField("(")
      .appendField(
        new Blockly.FieldDropdown([
          ["open", "openings"],
          ["close", "closings"],
          ["adj close", "adjCloses"],
        ]),
        "TYPE",
      )
      .appendField(")");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("function");
  },
};

Blockly.JavaScript["price"] = function (block) {
  const dropdown_type: string = block.getFieldValue("TYPE");
  const code = `stock.${dropdown_type}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
