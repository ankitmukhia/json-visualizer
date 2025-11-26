"use client";

import { useTheme } from "next-themes";
import ShikiHighlighter from "react-shiki";

export function CodeBlock({ children }: { children: string }) {
  const { theme } = useTheme();

  return (
    <ShikiHighlighter
      className="code-block"
      language="json"
      showLanguage={false}
      theme={theme === "light" ? "solarized-light" : "catppuccin-mocha"}
      showLineNumbers
      addDefaultStyles={false}
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      {children.trim()}
    </ShikiHighlighter>
  );
}
