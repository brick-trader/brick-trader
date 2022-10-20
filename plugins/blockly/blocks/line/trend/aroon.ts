import Blockly from "blockly";

Blockly.Blocks["aroon"] = {
  init: function () {
    this.appendDummyInput().appendField("AROON");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
  },
};

Blockly.JavaScript["aroon"] = function (block) {
  const code = "indicatorts.aroon(stock.highs, stock.lows)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
