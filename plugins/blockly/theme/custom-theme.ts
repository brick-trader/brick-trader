import Blockly from "blockly/core";

const defaultBlockStyles = {
  colour_blocks: {
    colourPrimary: "#05427f",
    colourSecondary: "#2974c0",
    colourTertiary: "#2d74bb",
  },
  list_blocks: {
    colourPrimary: "#b69ce8",
    colourSecondary: "#ccbaef",
    colourTertiary: "#9176c5",
  },
  logic_blocks: {
    colourPrimary: "#9fd2f1",
    colourSecondary: "#c0e0f4",
    colourTertiary: "#74bae5",
  },
  loop_blocks: {
    colourPrimary: "#aa1846",
    colourSecondary: "#d36185",
    colourTertiary: "#7c1636",
  },
  math_blocks: {
    colourPrimary: "#e6da39",
    colourSecondary: "#f3ec8e",
    colourTertiary: "#f2eeb7",
  },
  procedure_blocks: {
    colourPrimary: "#590721",
    colourSecondary: "#8c475d",
    colourTertiary: "#885464",
  },
  text_blocks: {
    colourPrimary: "#058863",
    colourSecondary: "#5ecfaf",
    colourTertiary: "#04684c",
  },
  variable_blocks: {
    colourPrimary: "#4b2d84",
    colourSecondary: "#816ea7",
    colourTertiary: "#83759e",
  },
  variable_dynamic_blocks: {
    colourPrimary: "#4b2d84",
    colourSecondary: "#816ea7",
    colourTertiary: "#83759e",
  },
};

const categoryStyles = {
  colour_category: {
    colour: "#05427f",
  },
  list_category: {
    colour: "#b69ce8",
  },
  logic_category: {
    colour: "#9fd2f1",
  },
  loop_category: {
    colour: "#aa1846",
  },
  math_category: {
    colour: "#e6da39",
  },
  procedure_category: {
    colour: "#590721",
  },
  text_category: {
    colour: "#058863",
  },
  variable_category: {
    colour: "#4b2d84",
  },
  variable_dynamic_category: {
    colour: "#4b2d84",
  },
};

export default Blockly.Theme.defineTheme("custom_theme", {
  base: Blockly.Themes.Classic,
  blockStyles: defaultBlockStyles,
  categoryStyles: categoryStyles,
  componentStyles: {
    workspaceBackgroundColour: "#777",
    toolboxBackgroundColour: "blackBackground",
    toolboxForegroundColour: "#fff",
    flyoutBackgroundColour: "#252526",
    flyoutForegroundColour: "#ccc",
    flyoutOpacity: 1,
    scrollbarColour: "#797979",
    insertionMarkerColour: "#fff",
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.4,
    cursorColour: "#d0d0d0",
    blackBackground: "#333",
  },
});
