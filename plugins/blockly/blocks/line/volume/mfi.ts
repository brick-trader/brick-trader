import Blockly from "blockly";

Blockly.Blocks["mfi"] = {
  init: function () {
    this.appendDummyInput().appendField("MFI");
    this.appendDummyInput()
      .appendField("(period =")
      .appendField(new Blockly.FieldNumber(14, 1), "PERIOD")
      .appendField("days)");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
  },
};

Blockly.JavaScript["mfi"] = function (block) {
  const number_period: number = block.getFieldValue("PERIOD");
  const code =
    "indicatorts.moneyFlowIndex(" +
    number_period +
    ", stock.highs, stock.lows, stock.closings, stock.volumes)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
