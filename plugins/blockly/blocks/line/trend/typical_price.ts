import Blockly from "blockly";

Blockly.Blocks["typical_price"] = {
  init: function () {
    this.appendDummyInput().appendField("Typical Price");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
  },
};

Blockly.JavaScript["typical_price"] = function (block) {
  const code =
    "indicatorts.typicalPrice(stock.highs, stock.lows, stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
