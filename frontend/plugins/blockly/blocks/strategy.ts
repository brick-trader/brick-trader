import Blockly from "blockly";

Blockly.Blocks["strategy"] = {
  init: function () {
    const strategyNameValidator = (newValue: string) => {
      const vaildationRegex = /^[A-Za-z][A-Za-z0-9]*$/;
      if (!newValue.match(vaildationRegex)) return null;
      return newValue;
    };

    const strategyNameField = new Blockly.FieldTextInput("NewStrategy");
    strategyNameField.setValidator(strategyNameValidator);
    this.appendDummyInput().appendField(strategyNameField, "STRATEGY_NAME");
    this.appendDummyInput().appendField("");
    this.appendDummyInput().appendField("Apply actions: ");
    this.appendDummyInput().appendField("");
    this.appendDummyInput("ACTION_DECISION0")
      .appendField(
        new Blockly.FieldDropdown([
          ["buy", "BUY"],
          ["sell", "SELL"],
        ]),
        "ACTION0",
      )
      .appendField("when");
    this.appendValueInput("SIGNALS0").setCheck("Boolean[]");
    this.appendDummyInput("ACTION_DECISION1")
      .appendField(
        new Blockly.FieldDropdown([
          ["sell", "SELL"],
          ["buy", "BUY"],
        ]),
        "ACTION1",
      )
      .appendField("when");
    this.appendValueInput("SIGNALS1").setCheck("Boolean[]");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setStyle("function");

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
    for (let i = 2; i <= this.numAdditionalActions; i++) {
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldDropdown([
            ["sell", "SELL"],
            ["buy", "BUY"],
          ]),
          "ACTION" + i,
        )
        .appendField("when");
      this.appendValueInput("SIGNALS" + i).setCheck("Boolean[]");
    }

    /**
     * Force add name (ACTION_DECISION + index) to ACTION blocks' dummy input parent
     * because when blockly doing serialization,
     * it won't serialize dummy input with name,
     * but only serialize its child dropdown field,
     * which is the ACTION block.
     *
     * But when using mutator,
     * it will use the parent name (dummy input's name)
     * to connect the corresponding field.
     */
    let action_index = 0;
    this.inputList.forEach((input) => {
      if (input.fieldRow.length > 0) {
        if (
          input.fieldRow[0].name &&
          input.fieldRow[0].name.startsWith("ACTION")
        ) {
          input.name = "ACTION_DECISION" + action_index++;
        }
      }
    });
  },
  decompose: function (workspace: Blockly.Workspace) {
    const containerBlock = workspace.newBlock(
      "action_container",
    ) as Blockly.BlockSvg;
    containerBlock.initSvg();

    let connection = containerBlock.getInput("STACK").connection;
    for (let i = 2; i <= this.numAdditionalActions; i++) {
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
    for (let i = 2; i <= this.numAdditionalActions; i++) {
      this.removeInput("ACTION_DECISION" + i);
      this.removeInput("SIGNALS" + i);
    }
    this.numAdditionalActions = 1;

    let actionBlock = containerBlock.getInputTargetBlock("STACK");
    while (actionBlock) {
      this.numAdditionalActions++;
      this.appendDummyInput("ACTION_DECISION" + this.numAdditionalActions)
        .appendField(
          new Blockly.FieldDropdown([
            ["sell", "SELL"],
            ["buy", "BUY"],
          ]),
          "ACTION" + this.numAdditionalActions,
        )
        .appendField("when");
      const signalsBlock = this.appendValueInput(
        "SIGNALS" + this.numAdditionalActions,
      ).setCheck("Boolean[]");
      if ((actionBlock as any).valueConnection_) {
        signalsBlock.connection.connect((actionBlock as any).valueConnection_);
      }
      actionBlock =
        actionBlock.nextConnection && actionBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function (containerBlock: Blockly.Block) {
    let actionBlock = containerBlock.getInputTargetBlock("STACK");
    let i = 2;
    while (actionBlock) {
      const inputSignals = this.getInput("SIGNALS" + i);
      (actionBlock as any).valueConnection_ =
        inputSignals && inputSignals.connection.targetConnection;
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

  console.log(block.inputList);

  const action_list = block.inputList
    .filter((input) => input.name.startsWith("ACTION_DECISION"))
    .filter(
      (input) =>
        input.fieldRow[0].name && input.fieldRow[0].name.startsWith("ACTION"),
    );
  const signals_list = block.inputList.filter((input) =>
    input.name.startsWith("SIGNALS"),
  );

  if (signals_list.length !== action_list.length) {
    return [
      `({name: "${text_strategy_name}", strategy: (stock) => []})`,
      Blockly.JavaScript.ORDER_ATOMIC,
    ];
  }

  const actions = `runtime.fn.applyFirstMatch(${signals_list
    .map((signals, index) => {
      const signals_data: string = Blockly.JavaScript.valueToCode(
        block,
        signals.name,
        Blockly.JavaScript.ORDER_ATOMIC,
      );
      const dropdown_action: string = action_list[index].fieldRow[0].getValue();

      return `(${
        signals_data === "" ? "[]" : signals_data
      }).map((value) => value ? indicatorts.Action.${dropdown_action} : indicatorts.Action.HOLD)`;
    })
    .join(",")})`;

  const code = `({name: "${text_strategy_name}", strategy: (stock) => ${actions}})`;

  console.log(code);
  return code;
};
