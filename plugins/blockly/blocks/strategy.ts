import Blockly from "blockly";

Blockly.Blocks["strategy"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput("NewStrategy"),
      "STRATEGY_NAME",
    );
    this.appendDummyInput().appendField("");
    this.appendDummyInput().appendField("Apply actions: ");
    this.appendDummyInput().appendField("");
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ["sell", "SELL"],
          ["buy", "BUY"],
        ]),
        "DECISION0",
      )
      .appendField("when");
    this.appendValueInput("ACTION0").setCheck("Boolean[]");
    this.setOutput(true, "Strategy");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");

    this.setMutator(new Blockly.Mutator(["additional_action"]));
    this.numAdditionalActions = 0;
  },
  mutationToDom: function () {
    if (!this.numAdditionalActions) {
      return null;
    }
    const container = document.createElement("mutation");
    container.setAttribute("num_additional_actions", this.numAdditionalActions);
    return container;
  },
  domToMutation: function (xmlElement: HTMLElement) {
    this.numAdditionalActions =
      parseInt(xmlElement.getAttribute("num_additional_actions"), 10) || 0;
    for (let i = 1; i <= this.numAdditionalActions; i++) {
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldDropdown([
            ["sell", "SELL"],
            ["buy", "BUY"],
          ]),
          "DECISION" + i,
        )
        .appendField("when");
      this.appendValueInput("ACTION" + i).setCheck("Boolean[]");
    }
  },
  decompose: function (workspace: Blockly.Workspace) {
    const containerBlock = workspace.newBlock(
      "action_container",
    ) as Blockly.BlockSvg;
    containerBlock.initSvg();

    let connection = containerBlock.getInput("STACK").connection;
    for (let i = 1; i <= this.numAdditionalActions; i++) {
      const actionBlock = workspace.newBlock(
        "additional_action",
      ) as Blockly.BlockSvg;
      actionBlock.initSvg();
      connection.connect(actionBlock.previousConnection);
      connection = actionBlock.nextConnection;
    }

    return containerBlock;
  },
  compose: function (containerBlock: Blockly.BlockSvg) {
    // Disconnect the else input blocks and remove the inputs.
    for (let i = 1; i <= this.numAdditionalActions; i++) {
      this.removeInput("DECISION" + i);
      this.removeInput("ACTION" + i);
    }
    this.numAdditionalActions = 0;

    let actionBlock = containerBlock.getInputTargetBlock("STACK");
    while (actionBlock) {
      this.numAdditionalActions++;
      const input = this.appendDummyInput()
        .appendField(
          new Blockly.FieldDropdown([
            ["sell", "SELL"],
            ["buy", "BUY"],
          ]),
          "DECISION" + this.numAdditionalActions,
        )
        .appendField("when");
      this.appendValueInput("ACTION" + this.numAdditionalActions).setCheck(
        "Boolean[]",
      );
      // Reconnect any child blocks.
      if ((actionBlock as any).valueConnection_) {
        input.connection.connect((actionBlock as any).valueConnection_);
      }
      actionBlock =
        actionBlock.nextConnection && actionBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function (containerBlock: Blockly.Block) {
    let actionBlock = containerBlock.getInputTargetBlock("STACK");
    let i = 1;
    while (actionBlock) {
      const inputDecision = this.getInput("DECISION" + i);
      const inputAction = this.getInput("ACTION" + i);
      (actionBlock as any).decisionConnection_ =
        inputDecision && inputDecision.connection.targetConnection;
      (actionBlock as any).valueConnection_ =
        inputAction && inputAction.connection.targetConnection;
      i++;
      actionBlock =
        actionBlock.nextConnection && actionBlock.nextConnection.targetBlock();
    }
  },
};

Blockly.Blocks["action_container"] = {
  init: function () {
    this.appendDummyInput().appendField("add action");
    this.appendStatementInput("STACK");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
    this.contextMenu = false;
  },
};

Blockly.Blocks["additional_action"] = {
  init: function () {
    this.appendDummyInput().appendField("additional_action");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("strategy");
    this.contextMenu = false;
  },
};

Blockly.Extensions.registerMutator("add_action", {
  mutationToDom: Blockly.Blocks["strategy"].mutationToDom,
  domToMutation: Blockly.Blocks["strategy"].domToMutation,
  decompose: Blockly.Blocks["strategy"].decompose,
  compose: Blockly.Blocks["strategy"].compose,
  saveConnections: Blockly.Blocks["strategy"].saveConnections,
});

Blockly.JavaScript["strategy"] = function (block: Blockly.Block) {
  const text_strategy_name: string = block.getFieldValue("STRATEGY_NAME");

  console.log(text_strategy_name);
  console.log(block.inputList);

  const desition_list = block.inputList
    .filter((input) => input.fieldRow.length > 0)
    .filter((input) =>
      (input.fieldRow[0].name === undefined
        ? ""
        : input.fieldRow[0].name
      ).startsWith("DECISION"),
    );
  const actions_list = block.inputList.filter((input) =>
    input.name.startsWith("ACTION"),
  );

  console.log(desition_list);
  console.log(actions_list);

  if (actions_list.length !== desition_list.length) {
    return [
      `({name: "${text_strategy_name}", strategy: (stock) => []})`,
      Blockly.JavaScript.ORDER_ATOMIC,
    ];
  }

  const actions = `runtime.fn.applyFirstMatch(${actions_list
    .map((action, index) => {
      const action_code: string = Blockly.JavaScript.valueToCode(
        block,
        action.name,
        Blockly.JavaScript.ORDER_ATOMIC,
      );
      const decision_code: string = desition_list[index].fieldRow[0].getValue();

      return `(${
        action_code === "" ? "[]" : action_code
      }).map((value) => value ? indicatorts.Action.${decision_code} : indicatorts.Action.HOLD)`;
    })
    .join(",")})`;

  console.log(actions);

  const code = `({name: "${text_strategy_name}", strategy: (stock) => ${actions}})`;

  console.log(code);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
