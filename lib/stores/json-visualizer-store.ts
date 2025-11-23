import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSelectors } from "./create-selectores";

export type TabValue = "input" | "tree" | "editor";

interface JsonInitialState {
  activeTab: TabValue;
  jsonInput: string;
  jsonParsed: object | null;
  error: null | string;
}

interface JsonAction {
  setActiveTab: (tab: TabValue) => void;
  setJsonInput: (input: string) => void;
  setParsedJson: (input: object | null) => void;
  setError: (err: string | null) => void;
}

const useJsonStoreBase = create<JsonInitialState & JsonAction>()(
  persist(
    (set) => ({
      activeTab: "input",
      jsonInput: "",
      jsonParsed: null,
      error: null,

      setActiveTab: (tab) => set({ activeTab: tab }),
      setJsonInput: (value) => set({ jsonInput: value }),
      setParsedJson: (value) => set({ jsonParsed: value }),
      setError: (err) => set({ error: err }),
    }),
    {
      name: "json-visulizer-storage", // item name in the storage must be unique
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// auto generates selectors
export const useJsonVisuliazerStore = createSelectors(useJsonStoreBase);
