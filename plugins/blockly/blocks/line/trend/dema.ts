import Blockly from "blockly";

Blockly.Blocks["dema"] = {
  init: function () {
    this.appendDummyInput().appendField("DEMA");
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

Blockly.JavaScript["dema"] = function (block) {
  const number_period: number = block.getFieldValue("PERIOD");
  const code = "indicatorts.dema(" + number_period + ", stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
