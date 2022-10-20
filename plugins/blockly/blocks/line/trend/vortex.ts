import Blockly from "blockly";

Blockly.Blocks["vortex"] = {
  init: function () {
    this.appendDummyInput().appendField("Vortex");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
  },
};

Blockly.JavaScript["vortex"] = function (block) {
  const code = "indicatorts.vortex(stock.highs, stock.lows, stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
