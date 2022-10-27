import Blockly from "blockly";

Blockly.Blocks["qstick"] = {
  init: function () {
    this.appendDummyInput().appendField("Qstick");
    this.appendDummyInput()
      .appendField("(period =")
      .appendField(new Blockly.FieldNumber(14, 0), "PERIOD")
      .appendField("days)");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("trend");
  },
};

Blockly.JavaScript["qstick"] = function (block) {
  const number_period: number = block.getFieldValue("PERIOD");
  const code =
    "indicatorts.qstick(" + number_period + ", stock.openings, stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
