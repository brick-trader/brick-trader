import Blockly from "blockly";

Blockly.Blocks["apply_first_match"] = {
  init: function () {
    this.appendDummyInput().appendField("apply first match");
    this.appendValueInput("ACTIONS0").setCheck("Action[]");
    this.setOutput(true, "Action[]");
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
    container.setAttribute("actions", this.numAdditionalActions);
    return container;
  },
  domToMutation: function (xmlElement: HTMLElement) {
    this.numAdditionalActions =
      parseInt(xmlElement.getAttribute("actions"), 10) || 0;
    for (let i = 1; i <= this.numAdditionalActions; i++) {
      this.appendValueInput("ACTIONS" + i).setCheck("Action[]");
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
      this.removeInput("ACTIONS" + i);
    }
    this.numAdditionalActions = 0;

    let actionBlock = containerBlock.getInputTargetBlock("STACK");
    while (actionBlock) {
      this.numAdditionalActions++;
      const actionInput = this.appendValueInput(
        "ACTIONS" + this.numAdditionalActions,
      ).setCheck("Action[]");

      if ((actionBlock as any).valueConnection_) {
        actionInput.connection.connect((actionBlock as any).valueConnection_);
      }
      actionBlock =
        actionBlock.nextConnection && actionBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function (containerBlock: Blockly.Block) {
    let actionBlock = containerBlock.getInputTargetBlock("STACK");
    let i = 1;
    while (actionBlock) {
      const actionInput = this.getInput("ACTIONS" + i);
      (actionBlock as any).valueConnection_ =
        actionInput && actionInput.connection.targetConnection;
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
  mutationToDom: Blockly.Blocks["apply_first_match"].mutationToDom,
  domToMutation: Blockly.Blocks["apply_first_match"].domToMutation,
  decompose: Blockly.Blocks["apply_first_match"].decompose,
  compose: Blockly.Blocks["apply_first_match"].compose,
  saveConnections: Blockly.Blocks["apply_first_match"].saveConnections,
});

Blockly.JavaScript["apply_first_match"] = function (block: Blockly.Block) {
  const code = `runtime.fn.applyFirstMatch(${block.inputList
    .filter((input) => input.name.startsWith("ACTIONS"))
    .map((input) => {
      const action: string = Blockly.JavaScript.valueToCode(
        block,
        input.name,
        Blockly.JavaScript.ORDER_ATOMIC,
      );
      return action === "" ? "[]" : action;
    })
    .join(",")})`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
