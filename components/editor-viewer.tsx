"use client";

import { TriangleAlert } from "lucide-react";
import { CodeBlock } from "@/components/editor-block";
import { useJsonVisuliazerStore } from "@/lib/stores/json-visualizer-store";

export const EditorViewer = () => {
  const jsonInput = useJsonVisuliazerStore.use.jsonInput();
  const error = useJsonVisuliazerStore.use.error();

  return (
    <div className="mt-2">
      {error && (
        <div className="flex items-center bg-secondary gap-2 w-fit py-2 px-2 rounded-md text-sm">
          <TriangleAlert className="size-4" /> {error}
        </div>
      )}
      {jsonInput && <CodeBlock>{jsonInput}</CodeBlock>}
    </div>
  );
};
