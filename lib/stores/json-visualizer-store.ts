import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSelectors } from "./create-selectores";

export type TabValue = "input" | "tree" | "editor";
export enum EditType {
  PAST = "past",
  COPY = "copy",
  FORMAT = "format",
  REMOVEWHITESPACES = "removeWhiteSpaces",
  CLEAR = "clear",
}

interface JsonInitialState {
  activeTab: TabValue;
  jsonInput: string;
  jsonParsed: object | null;
  error: null | string;

  past: boolean;
  copy: boolean;
  format: boolean;
  removeWhiteSpaces: boolean;
  clear: boolean;
}

interface JsonAction {
  setActiveTab: (tab: TabValue) => void;
  setJsonInput: (input: string) => void;
  setParsedJson: (input: object | null) => void;
  setError: (err: string | null) => void;

  updateEditActions: (editType: EditType) => void;
}

const useJsonStoreBase = create<JsonInitialState & JsonAction>()(
  persist(
    (set) => ({
      activeTab: "input",
      jsonInput: "",
      jsonParsed: null,
      error: null,

      past: false,
      copy: false,
      format: false,
      removeWhiteSpaces: false,
      clear: false,

      setActiveTab: (tab) => set({ activeTab: tab }),
      setJsonInput: (value) => set({ jsonInput: value }),
      setParsedJson: (value) => set({ jsonParsed: value }),
      setError: (err) => set({ error: err }),

      updateEditActions: (editType) => {
        switch (editType) {
          case EditType.PAST:
            set({ past: true });
            setTimeout(() => {
              set({ past: false });
            }, 2000);
            break;
          case EditType.COPY:
            set({ copy: true });
            setTimeout(() => {
              set({ copy: false });
            }, 2000);
            break;
          case EditType.REMOVEWHITESPACES:
            set({ removeWhiteSpaces: true });
            setTimeout(() => {
              set({ removeWhiteSpaces: false });
            }, 2000);
            break;
          case EditType.FORMAT:
            set({ format: true });
            setTimeout(() => {
              set({ format: false });
            }, 2000);
            break;
          case EditType.CLEAR:
            set({ clear: true });
            setTimeout(() => {
              set({ clear: false });
            }, 2000);
          default:
        }
      },
    }),
    {
      name: "json-visulizer-storage", // item name in the storage must be unique
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// auto generates selectors
export const useJsonVisuliazerStore = createSelectors(useJsonStoreBase);
