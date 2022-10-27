import Blockly from "blockly";

Blockly.Blocks["bop"] = {
  init: function () {
    this.appendDummyInput().appendField("BOP");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("trend");
  },
};

Blockly.JavaScript["bop"] = function (block) {
  const code =
    "indicatorts.balanceOfPower(stock.openings, stock.highs, stock.lows, stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
