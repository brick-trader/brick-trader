import Blockly from "blockly";

Blockly.Blocks["cmi"] = {
  init: function () {
    this.appendDummyInput().appendField("CMI");
    this.appendDummyInput()
      .appendField("(period =")
      .appendField(new Blockly.FieldNumber(20, 0), "PERIOD")
      .appendField("days)");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
  },
};

Blockly.JavaScript["cmi"] = function (block) {
  const number_period: number = block.getFieldValue("PERIOD");
  const code =
    "indicatorts.communityChannelIndex(" +
    number_period +
    ", stock.highs, stock.lows, stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
