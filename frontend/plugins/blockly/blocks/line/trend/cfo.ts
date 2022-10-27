import Blockly from "blockly";

Blockly.Blocks["cfo"] = {
  init: function () {
    this.appendDummyInput().appendField("CFO");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("trend");
  },
};

Blockly.JavaScript["cfo"] = function (block) {
  const code = "indicatorts.chandeForecastOscillator(stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
