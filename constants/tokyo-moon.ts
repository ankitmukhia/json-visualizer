interface TokyoMoonTypes {
  name: string;
  style: string;
  background: {
    [key: string]: string;
  };
  foreground: {
    [key: string]: string;
  };
  comments: {
    [key: string]: string;
  };
  alerts: {
    [key: string]: string;
  };
  diff: {
    [key: string]: string;
  };
  git: {
    [key: string]: string;
  };
  border: {
    [key: string]: string;
  };
  colors: {
    [key: string]: string;
  };
  terminal: {
    [key: string]: string;
  };
  misc: {
    none: string;
    rainbow: Array<string>;
  };
}

export const tokyoMoon: TokyoMoonTypes = {
  name: "tokyonight_moon",
  style: "moon",
  background: {
    bg: "#222436",
    bg_dark: "#1e2030",
    bg_dark1: "#191B29",
    bg_float: "#1e2030",
    bg_highlight: "#2f334d",
    bg_popup: "#1e2030",
    bg_search: "#3e68d7",
    bg_sidebar: "#1e2030",
    bg_statusline: "#1e2030",
    bg_visual: "#2d3f76",
    black: "#1b1d2b",
  },

  foreground: {
    fg: "#c8d3f5",
    fg_dark: "#828bb8",
    fg_float: "#c8d3f5",
    fg_gutter: "#3b4261",
    fg_sidebar: "#828bb8",
  },

  comments: {
    comment: "#636da6",
    dark3: "#545c7e",
    dark5: "#737aa2",
  },

  alerts: {
    error: "#c53b53",
    warning: "#ffc777",
    info: "#0db9d7",
    hint: "#4fd6be",
    todo: "#82aaff",
  },

  diff: {
    add: "#2a4556",
    change: "#252a3f",
    delete: "#4b2a3d",
    text: "#394b70",
  },

  git: {
    add: "#b8db87",
    change: "#7ca1f2",
    delete: "#e26a75",
    ignore: "#545c7e",
  },

  border: {
    border: "#1b1d2b",
    border_highlight: "#589ed7",
  },

  // Core Colors
  colors: {
    blue: "#82aaff",
    blue0: "#3e68d7",
    blue1: "#65bcff",
    blue2: "#0db9d7",
    blue5: "#89ddff",
    blue6: "#b4f9f8",
    blue7: "#394b70",
    cyan: "#86e1fc",
    green: "#c3e88d",
    green1: "#4fd6be",
    green2: "#41a6b5",
    magenta: "#c099ff",
    magenta2: "#ff007c",
    orange: "#ff966c",
    purple: "#fca7ea",
    red: "#ff757f",
    red1: "#c53b53",
    teal: "#4fd6be",
    yellow: "#ffc777",
  },

  terminal: {
    black: "#1b1d2b",
    black_bright: "#444a73",
    blue: "#82aaff",
    blue_bright: "#9ab8ff",
    cyan: "#86e1fc",
    cyan_bright: "#b2ebff",
    green: "#c3e88d",
    green_bright: "#c7fb6d",
    magenta: "#c099ff",
    magenta_bright: "#caabff",
    red: "#ff757f",
    red_bright: "#ff8d94",
    white: "#828bb8",
    white_bright: "#c8d3f5",
    yellow: "#ffc777",
    yellow_bright: "#ffd8ab",
    terminal_black: "#444a73",
  },

  misc: {
    none: "NONE",
    rainbow: [
      "#82aaff",
      "#ffc777",
      "#c3e88d",
      "#4fd6be",
      "#c099ff",
      "#fca7ea",
      "#ff966c",
      "#ff757f",
    ],
  },
};

export const sampleInput = `
[
  {
    "name": "Adeel Solangi",
    "language": "Sindhi",
    "id": "V59OF92YF627HFY0",
    "bio": "Donec lobortis eleifend condimentum. Cras dictum dolor lacinia lectus vehicula rutrum. Maecenas quis nisi nunc. Nam tristique feugiat est vitae mollis. Maecenas quis nisi nunc.",
    "version": 6.1
  },
  {
    "name": "Napoleon Bonaparte",
    "era": "Napoleonic Wars",
    "id": "NAPO001BONA",
    "bio": "Born in Corsica, Napoleon rose through the ranks of the French military during the French Revolution and became Emperor of the French.",
    "key_event": "Coup of 18 Brumaire"
  },
  {
    "name": "Napoleon Bonaparte",
    "era": "First Empire",
    "id": "NAPO002EMPI",
    "bio": "His reign was marked by military expansion and significant reforms, including the Napoleonic Code.",
    "key_event": "Battle of Austerlitz"
  },
  {
    "name": "Napoleon Bonaparte",
    "era": "Peninsular War",
    "id": "NAPO003PENS",
    "bio": "A costly and protracted conflict in Spain and Portugal that drained French resources.",
    "key_event": "Siege of Zaragoza"
  },
  {
    "name": "Napoleon Bonaparte",
    "era": "Russian Campaign",
    "id": "NAPO004RUSS",
    "bio": "His disastrous invasion of Russia in 1812 led to a significant turning point in the Napoleonic Wars.",
    "key_event": "Burning of Moscow"
  },
  {
    "name": "Napoleon Bonaparte",
    "era": "Exile to Elba",
    "id": "NAPO005ELBA",
    "bio": "After his defeat by the Sixth Coalition, he was exiled to the island of Elba in 1814.",
    "key_event": "Treaty of Fontainebleau"
  },
  {
    "name": "Napoleon Bonaparte",
    "era": "Hundred Days",
    "id": "NAPO006HUND",
    "bio": "He escaped from Elba in 1815 and briefly returned to power, known as the Hundred Days.",
    "key_event": "Escape from Elba"
  },
  {
    "name": "Napoleon Bonaparte",
    "era": "Battle of Waterloo",
    "id": "NAPO007WATE",
    "bio": "His final defeat came at the Battle of Waterloo against a coalition led by the Duke of Wellington.",
    "key_event": "Battle of Waterloo"
  },
  {
    "name": "Napoleon Bonaparte",
    "era": "Exile to St. Helena",
    "id": "NAPO008HELE",
    "bio": "He was exiled to the remote island of St. Helena, where he died in 1821.",
    "key_event": "Death on St. Helena"
  }
]
`;
