import Blockly from "blockly";

Blockly.Blocks["custom_rsi"] = {
  init: function () {
    this.appendDummyInput().appendField("RSI");
    this.appendDummyInput()
      .appendField("(period =")
      .appendField(new Blockly.FieldNumber(14, 2), "PERIOD")
      .appendField("days)");
    this.setInputsInline(true);
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
  },
};

Blockly.JavaScript["custom_rsi"] = function (block) {
  const number_period: number = block.getFieldValue("PERIOD");
  const code = "indicatorts.customRsi(" + number_period + ", stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
