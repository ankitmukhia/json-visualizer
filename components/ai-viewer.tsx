"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { ArrowUpIcon, Loader2 } from "lucide-react";
import { useShikiHighlighter } from "react-shiki";
import { sampleInput } from "@/constants/tokyo-moon";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Panel,
	type PanelProps,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";

export const AiViewer = () => {
	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/json",
		}),
	});
	const [isMobile, setIsMobile] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const highlightRef = useRef<HTMLDivElement>(null);
	const [currentJson, setCurrentJson] = useState(sampleInput.trim());
	const [selectedText, setSelectedText] = useState("");

	const [selectionStart, setSelectionStart] = useState(0);
	const [selectionEnd, setSelectionEnd] = useState(0);
	const [highlightInstruction, setHighlightInstruction] = useState("");

	const [instruction, setInstruction] = useState("");
	const [showAskInput, setShowAskInput] = useState(false);

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
		"kanagawa-dragon",
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

	/* const handleHighlightChange = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const content = `I have the following text: "${selectedText}"
					Please modify it according to this instruction: ${instruction}
				  Return ONLY the modified text without any explanation or additional formatting.`;
		sendMessage({ text: content });
	}; */

	const handleOnSubmit = () => {
		const content = `Given this JSON: ${currentJson}\n\nInstruction: ${instruction}`;
		sendMessage({ text: content });
		setShowAskInput(false);
		setInstruction("");
	};

	useEffect(() => {
		function detectMobileSizeScreen() {
			const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			return screenWidth < 768 ? setIsMobile(true) : setIsMobile(false);
		}
		detectMobileSizeScreen();

		window.addEventListener("resize", detectMobileSizeScreen);
		return () => {
			window.removeEventListener("resize", detectMobileSizeScreen);
		};
	}, [])

	useEffect(() => {
		if (highlightRef.current && textareaRef.current) {
			const scrollToBottom = () => {
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

	const jsonViewPanelProps = (): PanelProps => {
		if (!isMobile) {
			return {
				defaultSize: 75,
				minSize: 65,
			};
		};

		return {
			maxSize: 90,
		};
	};

	const aiViewPanelProps = (): PanelProps => {
		if (!isMobile) {
			return {
				defaultSize: 25,
				minSize: 25,
			};
		};

		return {
			maxSize: 10,
		};
	};

	const commonStyles = "absolute inset-0 w-full h-full no-scrollbar font-mono leading-relaxed border-0 m-0 box-border whitespace-pre overflow-auto";

	return (
		<div className="relative flex h-full flex-col mt-2">
			<PanelGroup direction={isMobile ? "vertical" : "horizontal"} className="h-full w-full rounded-lg gap-2">
				<Panel {...jsonViewPanelProps()}>
					<div className={cn(
						"relative h-full bg-muted border-2 border-input rounded-lg",
						status === "submitted" && "pointer-events-none"
					)}>
						{status === "submitted" && (
							<div className="absolute inset-0 z-100 flex items-center justify-center bg-black/50 cursor-not-allowed pointer-events-none">
								Generating...
							</div>
						)}

						<div
							ref={highlightRef}
							className={cn(
								commonStyles,
							)}
						>
							<div className="m-0 p-0 text-wrap bg-transparent leading-relaxed">
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
								"z-10 text-transparent dark:text-transparent bg-transparent dark:bg-transparent caret-white resize-none border-none focus:outline-none rounded-md focus-visible:ring-[1.6px] focus-visible:border-none focus-visible:ring-ring/80 px-[2.86rem]",
							)}
							spellCheck={false}
							autoCapitalize="off"
							autoComplete="off"
							autoCorrect="off"
							data-gramm="false"
							data-gramm_editor="false"
							data-enable-grammarly="false"
						/>

						{/* {showAskInput && (
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
												<ArrowUpIcon className="size-4 " />
											</button>
										</div>
									</form>
								</div>
							</div>
						)} */}
					</div>
				</Panel>

				<PanelResizeHandle className="group flex gap-1">
					<div className="bg-linear-to-t from-background via-accent to-background h-full w-[2px]" />
				</PanelResizeHandle>

				<Panel {...aiViewPanelProps()} className="p-1">
					<div className="flex items-center gap-1 justify-center w-full h-full">
						<textarea
							placeholder="What do you want me to do?"
							className="w-full px-3 py-2 shadow-sm resize-none h-full md:h-[60px] rounded-lg no-scrollbar outline-2 outline-ring/80 focus-visible:ring-0 text-sm placeholder:text-muted-foreground"
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
								setInstruction(e.target.value)
							}
							spellCheck={false}
						/>
						<Button
							size="icon"
							className="h-full md:h-[55px] w-12"
							onClick={handleOnSubmit}
						>
							<ArrowUpIcon className="size-6" />
						</Button>
					</div>
				</Panel>
			</PanelGroup>
		</div>
	);
};
