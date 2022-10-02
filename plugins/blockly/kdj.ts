import Blockly from "blockly";

Blockly.Blocks["kdj"] = {
  init: function () {
    this.appendDummyInput().appendField("KDJ");
    this.appendDummyInput()
      .appendField("(RSI period =")
      .appendField(new Blockly.FieldNumber(9, 2), "R_PERIOD")
      .appendField("days)");
    this.appendDummyInput()
      .appendField("(K period =")
      .appendField(new Blockly.FieldNumber(3, 2), "K_PERIOD")
      .appendField("days)");
    this.appendDummyInput()
      .appendField("(D period =")
      .appendField(new Blockly.FieldNumber(3, 2), "D_PERIOD")
      .appendField("days)");
    this.appendDummyInput()
      .appendField("(")
      .appendField(
        new Blockly.FieldDropdown([
          ["K", "K"],
          ["D", "D"],
          ["J", "J"],
        ]),
        "KDJ",
      )
      .appendField(")");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["kdj"] = function (block) {
  const number_r_period: number = block.getFieldValue("R_PERIOD");
  const number_k_period: number = block.getFieldValue("K_PERIOD");
  const number_d_period: number = block.getFieldValue("D_PERIOD");
  const dropdown_kdj: string = block.getFieldValue("KDJ").toLowerCase();
  const code =
    "indicatorts.kdj(" +
    number_r_period +
    ", " +
    number_k_period +
    ", " +
    number_d_period +
    ", stock.highs, stock.lows, stock.closings)." +
    dropdown_kdj;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
