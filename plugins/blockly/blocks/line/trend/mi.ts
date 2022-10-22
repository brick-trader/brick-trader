import Blockly from "blockly";

Blockly.Blocks["mi"] = {
  init: function () {
    this.appendDummyInput().appendField("MI");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("trend");
  },
};

Blockly.JavaScript["mi"] = function (block) {
  const code = "indicatorts.massIndex(stock.highs, stock.lows)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
