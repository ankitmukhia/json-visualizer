"use client";

import { useEffect } from "react";
import {
  TabValue,
  useJsonVisuliazerStore,
} from "@/lib/stores/json-visualizer-store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { JsonViewer } from "@/components/json-viewer";
import { ModeToggle } from "@/components/mode-toggle";
import { JsonInput } from "@/components/json-input";
import { GridViewer } from "@/components/grid-viewer";

export const DisplayJson = () => {
  const activeTab = useJsonVisuliazerStore.use.activeTab();
  const jsonInput = useJsonVisuliazerStore.use.jsonInput();
  const jsonParsed = useJsonVisuliazerStore.use.jsonParsed();
  const error = useJsonVisuliazerStore.use.error();
  const setActiveTab = useJsonVisuliazerStore.use.setActiveTab();
  const setJsonInput = useJsonVisuliazerStore.use.setJsonInput();
  const setParsedJson = useJsonVisuliazerStore.use.setParsedJson();
  const setError = useJsonVisuliazerStore.use.setError();

  const handleJsonInput = (value: string) => {
    setJsonInput(value);
  };

  useEffect(() => {
    try {
      const jsonConvertedVal = JSON.parse(jsonInput);
      setParsedJson(jsonConvertedVal);
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setParsedJson(null);
    }
  }, [jsonInput, setParsedJson, setError]);

  return (
    <div className="flex flex-col font-medium h-screen">
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
        className="flex-grow flex flex-col p-4"
      >
        <div className="flex flex-grow flex-col">
          <div className="flex flex-row justify-between">
            <TabsList>
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="tree">Tree</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>

            <ModeToggle />
          </div>

          <div className="flex flex-grow flex-col">
            <TabsContent value="input" className="flex-grow">
              <JsonInput jsonInput={jsonInput} setJsonInput={handleJsonInput} />
            </TabsContent>

            <TabsContent value="tree" className="flex-grow">
              <JsonViewer jsonInput={jsonParsed} error={error} />
            </TabsContent>

            <TabsContent value="grid" className="flex-grow">
              <GridViewer />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
