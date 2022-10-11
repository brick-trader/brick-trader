import Blockly from "blockly";

Blockly.Blocks["backtest"] = {
  init: function () {
    this.appendDummyInput().appendField("backtest");
    this.appendValueInput("STRATEGY_INFO").setCheck("StrategyInfo");
    this.setOutput(true, "StrategyResult[]");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["backtest"] = function (block) {
  const value_strategy_info: string = Blockly.JavaScript.valueToCode(
    block,
    "STRATEGY_INFO",
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const code = `runtime.fn.backtest(stock, [${value_strategy_info}])`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
