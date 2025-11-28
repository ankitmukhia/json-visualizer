"use client";

import { useState, useRef, useEffect } from "react";
import { Suspense } from "react";
import { ShuffleIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { ChevronDownIcon } from "lucide-react";
const ReactJsonView = dynamic(() => import("react-json-view"));
import { ThemeKeys } from "react-json-view";
import { rjvThemes } from "@/constants/react-json-view-theme";
import { useTheme } from "next-themes";

export const JsonViewer = ({
  jsonInput,
  error,
}: {
  jsonInput: object | null;
  error: null | string;
}) => {
  const { theme } = useTheme();
  const editorTheme = theme === "light" ? "grayscale:inverted" : "ashes";
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<true | false>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeKeys | undefined>(
    editorTheme,
  );
  const themeItemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (isOpen) {
      const currentThemeItem = rjvThemes.findIndex(
        (theme) => theme.value === currentTheme,
      );
      if (currentThemeItem !== -1) {
        const scrollTimeout = setTimeout(() => {
          themeItemsRef.current[currentThemeItem]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);

        return () => {
          clearTimeout(scrollTimeout);
        };
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setCurrentTheme(editorTheme);
  }, [theme]);

  const handleShuffleTheme = () => {
    const randomTheme = rjvThemes[Math.floor(Math.random() * rjvThemes.length)];
    setCurrentTheme(randomTheme.value as ThemeKeys);
  };

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center flex-wrap flex-row gap-2 py-2">
        <Button variant="outline" onClick={handleShuffleTheme}>
          <ShuffleIcon className="size-4" />
        </Button>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {rjvThemes.find((theme) => theme.value === currentTheme)?.label}
              <ChevronDownIcon
                className={`size-4 text-muted-foreground/70 transition-transform duration-150 ease-in-out ${isOpen && "rotate-180"}`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-xs p-1" align="start">
            <div className="flex flex-col gap-1 max-h-[300px] overflow-auto no-scrollbar">
              {rjvThemes.map((theme, index) => (
                <div
                  key={theme.label}
                  ref={(el) => {
                    themeItemsRef.current[index] = el;
                  }}
                  onClick={() => {
                    themeItemsRef.current[index]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                    setCurrentTheme(theme.value as ThemeKeys);
                  }}
                  className={`rounded-xs p-[9px] text-sm ${currentTheme === theme.value && "bg-accent"}`}
                >
                  {theme.label}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex items-center space-x-2">
          <Switch
            id="collapsed"
            className="bg-background border h-9 w-14 rounded-md"
            checked={collapsed}
            onCheckedChange={setCollapsed}
          />
        </div>
      </div>

      {error && (
        <>
          {error.includes("Invalid JSON: Unexpected end of JSON input") ? (
            <div className="flex items-center gap-2 bg-muted w-fit py-2 px-2 rounded-md text-sm">
              <div>
                <span className="text-muted-foreground">
                  No JSON input provided.
                </span>{" "}
                <span className="text-muted-foreground border border-dashed border-muted-foreground/40 p-[3px]">
                  Go to the input tab to add JSON.
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-destructive/20 w-fit py-2 px-2 rounded-md text-sm">
              <div>
                <span className="text-destructive/60">{error}</span>{" "}
                <span className="text-muted-foreground border border-dashed border-muted-foreground/40 p-[3px]">
                  Go back to input tab and fix it.
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {jsonInput && (
        <Suspense fallback={<Loading />}>
          <ReactJsonView
            src={jsonInput}
            theme={currentTheme}
            collapsed={collapsed}
            iconStyle="circle"
            style={{
              backgroundColor: "var(--muted)",
              fontSize: "var(--font-size-sm)",
              padding: 10,
              borderRadius: "var(--radius-lg)",
            }}
          />
        </Suspense>
      )}
    </div>
  );
};
