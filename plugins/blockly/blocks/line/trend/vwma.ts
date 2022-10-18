import Blockly from "blockly";

Blockly.Blocks["vwma"] = {
  init: function () {
    this.appendDummyInput().appendField("VWMA");
    this.appendDummyInput()
      .appendField("(period =")
      .appendField(new Blockly.FieldNumber(15, 1), "PERIOD")
      .appendField("days)");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
  },
};

Blockly.JavaScript["vwma"] = function (block) {
  const number_period: number = block.getFieldValue("PERIOD");
  const code =
    "indicatorts.vwma(" + number_period + ", stock.closings, stock.volumes)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
