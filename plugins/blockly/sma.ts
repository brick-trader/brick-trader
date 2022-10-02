import Blockly from "blockly";

Blockly.Blocks["sma"] = {
  init: function () {
    this.appendDummyInput().appendField("SMA");
    this.appendDummyInput()
      .appendField("(period =")
      .appendField(new Blockly.FieldNumber(10, 1), "PERIOD")
      .appendField("days)");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["sma"] = function (block) {
  const number_period: number = block.getFieldValue("PERIOD");
  const code = "indicatorts.sma(" + number_period + ", stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
