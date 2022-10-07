import Blockly from "blockly";

Blockly.Blocks["action"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ["sell", "SELL"],
          ["buy", "BUY"],
        ]),
        "ACTION",
      )
      .appendField("when");
    this.appendValueInput("DECISION").setCheck("Array");
    this.setInputsInline(true);
    this.setOutput(true, "Action[]");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["action"] = function (block) {
  const dropdown_action: string = block.getFieldValue("ACTION");
  const value_decision: string = Blockly.JavaScript.valueToCode(
    block,
    "DECISION",
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const code = `${
    value_decision === "" ? "[]" : value_decision
  }.map((value) => value ? indicatorts.Action.${dropdown_action} : indicatorts.Action.HOLD)`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
