import Blockly from "blockly";

Blockly.Blocks["psar"] = {
  init: function () {
    this.appendDummyInput().appendField("Parabolic SAR");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
  },
};

Blockly.JavaScript["psar"] = function (_) {
  const code =
    "indicatorts.parabolicSar(stock.highs, stock.lows, stock.closings).psar";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
