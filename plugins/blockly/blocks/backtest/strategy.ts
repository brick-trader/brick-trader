import Blockly from "blockly";

Blockly.Blocks["strategy"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Strategy name: ")
      .appendField(new Blockly.FieldTextInput("NewStrategy"), "STRATEGY_NAME");
    this.appendStatementInput("STRATEGY").setCheck(null);
    this.setOutput(true, "StrategyInfo");
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["strategy"] = function (block) {
  const text_strategy_name: string = block.getFieldValue("STRATEGY_NAME");
  const statements_strategy: string = Blockly.JavaScript.statementToCode(
    block,
    "STRATEGY",
  );
  const code = `{name: "${text_strategy_name}", strategy: (stock) => {${statements_strategy}}}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
