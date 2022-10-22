// Rolling Moving Average (RMA)
// The rma function calculates the rolling moving average for a given period.

// R[0] to R[p-1] is SMA(values)
// R[p] and after is R[i] = ((R[i-1]*(p-1)) + v[i]) / p
// import {rma} from 'indicatorts';

// const result = rma(period, values);

// build a block for rma

import Blockly from "blockly";

Blockly.Blocks["rma"] = {
  init: function () {
    this.appendDummyInput().appendField("RMA");
    this.appendDummyInput()
      .appendField("(period =")
      .appendField(new Blockly.FieldNumber(20, 0), "PERIOD")
      .appendField("days)");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("trend");
  },
};

Blockly.JavaScript["rma"] = function (block) {
  const number_period: number = block.getFieldValue("PERIOD");
  const code = "indicatorts.rma(" + number_period + ", stock.closings)";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
