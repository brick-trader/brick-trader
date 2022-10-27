import Blockly from "blockly/core";
// import 'https://fonts.googleapis.com/css2?family=Merriweather&display=swap';

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
    colourPrimary: "#1a1a1a",
    colourSecondary: "#c0e0f4",
    colourTertiary: "#74bae5",
  },
  loop_blocks: {
    colourPrimary: "#aa1846",
    colourSecondary: "#d36185",
    colourTertiary: "#7c1636",
  },

  /**
   *  orange blocks which represent math operator blocks
   */
  math_blocks: {
    colourPrimary: "#F78B2D",
    colourSecondary: "#F3EC8E",
    colourTertiary: "#F79B3D",
  },
  procedure_blocks: {
    colourPrimary: "#590721",
    colourSecondary: "#8c475d",
    colourTertiary: "#885464",
  },

  /**
   * green blocks which represent text blocks
   */
  text_blocks: {
    colourPrimary: "#21a346",
    colourSecondary: "#5ecfaf",
    colourTertiary: "#31b356",
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
  function_blocks: {
    colourPrimary: "#1A1A1A",
    colourSecondary: "#816EA7",
    colourTertiary: "#83759E",
  },
  strategy: {
    colourPrimary: "#00BCD4",
    colourSecondary: "#00BCD4",
    colourTertiary: "#10CCE4",
  },
  trend: {
    colourPrimary: "#FF9F1C",
    colourSecondary: "#FF9F1C",
    colourTertiary: "#FFAF2C",
  },
  function: {
    colourPrimary: "#9B52E4",
    colourSecondary: "#9B52E4",
    colourTertiary: "#AB62F4",
  },
  volume: {
    colourPrimary: "#4B5AFF",
    colourSecondary: "#4B5AFF",
    colourTertiary: "#5B6AFF",
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
  strategy: {
    colourPrimary: "#6200EE",
    colourSecondary: "#816ea7",
    colourTertiary: "#83759e",
  },
};

export default Blockly.Theme.defineTheme("custom_theme", {
  base: Blockly.Themes.Classic,
  blockStyles: defaultBlockStyles,
  categoryStyles: categoryStyles,
  componentStyles: {
    // right workspace
    toolboxBackgroundColour: "#ddd",
    toolboxForegroundColour: "#1a1a1a",
    flyoutBackgroundColour: "#8a8a8a", // sub sidebar color
    flyoutForegroundColour: "#1a1a1a", // sidebar word
    flyoutOpacity: 0.5,
    toolboxOpacity: 0.5,
    scrollbarColour: "#fff",
    insertionMarkerColour: "#fff",
    insertionMarkerOpacity: 0.1,
    scrollbarOpacity: 0.4,
    cursorColour: "#d0d0d0",
    blackBackground: "#ddd",
  },
  fontStyle: {
    family: "Quantico, monospace",
    size: 12,
  },
});
