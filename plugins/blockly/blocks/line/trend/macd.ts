import Blockly from "blockly";

Blockly.Blocks["macd"] = {
  init: function () {
    this.appendDummyInput().appendField("MACD");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
  },
};

Blockly.JavaScript["macd"] = function (_) {
  const code = "indicatorts.macd(stock.closings).macdLine";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
