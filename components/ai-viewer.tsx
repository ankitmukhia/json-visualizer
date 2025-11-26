"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { useShikiHighlighter } from "react-shiki";
import { sampleInput } from "@/constants/tokyo-moon";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { cn } from "@/lib/utils";

// 1. Have ide editor simulation with shiki and textarea element. [Done]
// 2. Height specific line to be editied. [In progress...].
// 3. Can create/ask for new one.
// 4. Have populor api example topic prompt.

export const AiViewer = () => {
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/json",
    }),
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [currentJson, setCurrentJson] = useState(sampleInput.trim());
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [highlightInstruction, setHighlightInstruction] = useState("");
  const [instruction, setInstruction] = useState("");
  const [showAskInput, setShowAskInput] = useState(false);
  console.log("messages: ", messages);

  const codeToHighlight = useMemo(() => {
    if (!messages.length) return currentJson;

    const assistantText = [...messages]
      .reverse()
      .find((msg) => msg.role === "assistant" && msg.parts?.length)
      ?.parts.filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("")
      .trim();

    return assistantText || currentJson;
  }, [messages, currentJson]);

  const highlightedCode = useShikiHighlighter(
    codeToHighlight,
    "json",
    "catppuccin-mocha",
    {
      showLineNumbers: true,
      defaultColor: false,
    },
  );

  // Sync scroll between textarea and highlight layer
  const handleScrollSync = useCallback(() => {
    if (!textareaRef.current || !highlightRef.current) return;
    highlightRef.current.scrollTop = textareaRef.current.scrollTop;
    highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
  }, []);

  const handleTextSelect = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const startPoint = textarea.selectionStart;
    const endPoint = textarea.selectionEnd;
    const text = currentJson.substring(startPoint, endPoint);

    if (text.length > 0) {
      setSelectedText(text);
      setSelectionStart(startPoint);
      setSelectionEnd(endPoint);
      setShowAskInput(true);
    }
  };

  const handleHighlightChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = `I have the following text: "${selectedText}"
					Please modify it according to this instruction: ${instruction}
				  Return ONLY the modified text without any explanation or additional formatting.`;
    sendMessage({ text: content });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = `I have the following JSON: "${currentJson}"
		      Please create according to this instruction: ${instruction}`;

    sendMessage({ text: content });
  };

  /* useEffect(() => {
		if (!messages.length || !selectedText) return;

		async function updateModifiedData() {
			const lastMessage = messages[messages.length - 1];

			if (lastMessage.role === "assistant") {
				let modifiedText = "";
				for (const part of lastMessage.parts) {
					if (part.type === "text") {
						modifiedText += part.text;
					}
				}
				const newJson =
					currentJson.substring(0, selectionStart) +
					modifiedText +
					currentJson.substring(selectionEnd);
				setCurrentJson(newJson);
			}
		}

		updateModifiedData();
	}, [messages]); */

  useEffect(() => {
    if (highlightRef.current && textareaRef.current) {
      const scrollToBottom = () => {
        // scrollHeight: height of current area
        // scrollTo: scrolles to the bottom based on the changing height

        highlightRef.current?.scrollTo({
          top: highlightRef.current!.scrollHeight,
          behavior: "smooth",
        });

        textareaRef.current?.scrollTo({
          top: textareaRef.current!.scrollHeight,
          behavior: "smooth",
        });
      };

      setTimeout(scrollToBottom, 100);
    }
  }, [messages]);

  const commonStyles =
    "absolute inset-0 w-full h-full no-scrollbar font-mono text-sm leading-relaxed border-0 m-0 box-border whitespace-pre overflow-auto";

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="grow mt-2">
        <div className="relative h-full bg-muted rounded-lg">
          <div ref={highlightRef} className={cn(commonStyles)}>
            <div className="m-0 p-0 text-wrap bg-transparent font-mono text-sm leading-relaxed">
              {highlightedCode}
            </div>
          </div>

          <Textarea
            ref={textareaRef}
            value={codeToHighlight}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCurrentJson(e.target.value)
            }
            onScroll={handleScrollSync}
            onSelect={handleTextSelect}
            className={cn(
              commonStyles,
              "z-10 text-transparent dark:text-transparent bg-transparent dark:bg-transparent caret-white resize-none border-none py-2 px-10 focus:outline-none rounded-lg focus-visible:ring-[1.6px] focus-visible:border-none focus-visible:ring-ring/80",
            )}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
          />

          {showAskInput && (
            <div className="absolute z-100 bottom-60 px-4 w-full">
              <div className="w-full">
                <form
                  className="reative bg-sidebar border border-muted rounded-2xl max-w-xl px-2"
                  onSubmit={handleHighlightChange}
                >
                  <textarea
                    placeholder="Ask me..."
                    spellCheck={false}
                    className="resize-none w-full min-h-8 max-h-30 px-1 py-2 field-sizing-content outline-0 foucus:ring-0"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setHighlightInstruction(e.target.value)
                    }
                  />

                  <div className="flex items-center justify-end px-2 pb-2">
                    <button className="flex items-center p-1 text-ring rounded-full cursor-pointer">
                      <ArrowUpRightIcon className="size-4 " />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-3">
        <form
          className="relative bg-muted border backdrop-blur-3xl border-input rounded-lg px-4 min-w-2xl mx-auto field-sizing-content min-h-fit text-base shadow-xs transition-[color,box-shadow] outline-none disabled:opacity-50 md:text-sm"
          onSubmit={handleOnSubmit}
        >
          <textarea
            placeholder="Ask me..."
            className="resize-none w-full min-h-16 max-h-30 px-1 py-2 field-sizing-content outline-0 foucus:ring-0"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInstruction(e.target.value)
            }
          />

          <div className="absolute bottom-0 right-0 flex items-center">
            <button
              type="submit"
              className="flex items-center bg-primary p-2 rounded-full cursor-pointer"
            >
              <ArrowUpRightIcon className="size-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
