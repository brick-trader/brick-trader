import Blockly from "blockly";

Blockly.Blocks["rsi"] = {
  init: function () {
    this.appendDummyInput().appendField("RSI");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["rsi"] = function (_) {
  const code = "indicatorts.rsi(stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
