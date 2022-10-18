import Blockly from "blockly";

Blockly.Blocks["strategy"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Strategy name: ")
      .appendField(new Blockly.FieldTextInput("NewStrategy"), "STRATEGY_NAME");
    this.appendValueInput("ACTION").setCheck("Action[]").appendField("Action");
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
  },
};

Blockly.JavaScript["strategy"] = function (block) {
  const text_strategy_name: string = block.getFieldValue("STRATEGY_NAME");
  const statements_strategy: string = Blockly.JavaScript.statementToCode(
    block,
    "STRATEGY",
  );
  const value_action: string = Blockly.JavaScript.valueToCode(
    block,
    "ACTION",
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const code = `({name: "${text_strategy_name}", strategy: (stock) => ${
    value_action === "" ? "[]" : value_action
  }})`;
  return code;
};
