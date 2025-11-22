import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSelectors } from "./create-selectores";

export type TabValue = "input" | "tree" | "grid" | "ai";

type JSONState = {
  activeTab: TabValue;
  jsonInput: string;
  jsonParsed: Object | null;
  error: null | string;
  setActiveTab: (tab: TabValue) => void;
  setJsonInput: (input: string) => void;
  setParsedJson: (input: string | null) => void;
  setError: (err: string | null) => void;
};

const useJsonStoreBase = create<JSONState>()(
  persist(
    (set) => ({
      activeTab: "input",
      jsonInput: "dddd",
      jsonParsed: null,
      error: null,
      setActiveTab: (tab) => set({ activeTab: tab }),
      setJsonInput: (value) => set({ jsonInput: value }),
      setParsedJson: (value) => set({ jsonParsed: value }),
      setError: (err) => set({ error: err }),
    }),
    {
      name: "json-visulizer-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useJsonVisuliazerStore = createSelectors(useJsonStoreBase);
