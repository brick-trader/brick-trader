import Blockly from "blockly";

Blockly.Blocks["ema"] = {
  init: function () {
    this.appendDummyInput().appendField("EMA");
    this.appendDummyInput()
      .appendField("(period =")
      .appendField(new Blockly.FieldNumber(14, 0), "PERIOD")
      .appendField("days)");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["ema"] = function (block) {
  const number_period: number = block.getFieldValue("PERIOD");
  const code = "indicatorts.ema(" + number_period + ", stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
