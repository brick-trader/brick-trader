import Blockly from "blockly";

Blockly.Blocks["aroon"] = {
  init: function () {
    this.appendDummyInput().appendField("AROON");
    this.appendDummyInput()
      .appendField("(")
      .appendField(
        new Blockly.FieldDropdown([
          ["up", "up"],
          ["down", "down"],
        ]),
        "TYPE",
      )
      .appendField(")");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("trend");
  },
};

Blockly.JavaScript["aroon"] = function (block) {
  const dropdown_type: string = block.getFieldValue("TYPE");
  const code = `indicatorts.aroon(stock.highs, stock.lows).${dropdown_type}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
