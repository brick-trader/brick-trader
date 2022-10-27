import Blockly from "blockly";

Blockly.Blocks["sma"] = {
  init: function () {
    this.appendDummyInput().appendField("SMA");
    this.appendDummyInput()
      .appendField("(period =")
      .appendField(new Blockly.FieldNumber(10, 1), "PERIOD")
      .appendField("days)");
    this.appendDummyInput()
      .appendField("for (")
      .appendField(
        new Blockly.FieldDropdown([
          ["close", "closings"],
          ["adj close", "adjCloses"],
          ["open", "openings"],
        ]),
        "TYPE",
      )
      .appendField(")");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("trend");
  },
};

Blockly.JavaScript["sma"] = function (block) {
  const number_period: number = block.getFieldValue("PERIOD");
  const dropdown_type: string = block.getFieldValue("TYPE");
  const code = `indicatorts.sma(${number_period}, stock.${dropdown_type})`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
