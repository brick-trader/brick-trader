import Blockly from "blockly";

Blockly.Blocks["apo"] = {
  init: function () {
    this.appendDummyInput().appendField("APO");
    this.appendDummyInput()
      .appendField("(fast period =")
      .appendField(new Blockly.FieldNumber(14, 0), "FAST_PERIOD")
      .appendField("days)");
    this.appendDummyInput()
      .appendField("(slow period =")
      .appendField(new Blockly.FieldNumber(30, 0), "SLOW_PERIOD")
      .appendField("days)");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("trend");
  },
};

Blockly.JavaScript["apo"] = function (block) {
  const number_fast_period: number = block.getFieldValue("FAST_PERIOD");
  const number_slow_period: number = block.getFieldValue("SLOW_PERIOD");
  const code =
    "indicatorts.absolutePriceOscillator(" +
    number_fast_period +
    ", " +
    number_slow_period +
    ", stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
