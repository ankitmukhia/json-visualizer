"use client";

import { useTheme } from "next-themes";
import ShikiHighlighter from "react-shiki";

export function CodeBlock({
  theme,
  children,
}: {
  theme: string;
  children: string;
}) {
  return (
    <ShikiHighlighter
      className="code-block"
      language="json"
      showLanguage={false}
      theme={theme}
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
