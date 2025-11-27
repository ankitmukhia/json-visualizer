"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { TriangleAlert, ShuffleIcon } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";
import { CodeBlock } from "@/components/editor-block";
import { useJsonVisuliazerStore } from "@/lib/stores/json-visualizer-store";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { shikiThemes } from "@/constants/shiki-theme";
import { Button } from "@/components/ui/button";

export const EditorViewer = () => {
	const { theme } = useTheme();
	const defaultTheme = theme === "light" ? "github-light-default" : "kanagawa-dragon";
	const [isOpen, setIsOpen] = useState(false);
	const [currentTheme, setCurrentTheme] = useState(defaultTheme);
	const themeItemsRef = useRef<Array<HTMLDivElement | null>>([]);

	useEffect(() => {
		if (isOpen) {
			const currentIndex = shikiThemes.findIndex(
				(theme) => theme.value === currentTheme,
			);
			if (currentIndex !== -1) {
				// Defer the scroll operation to ensure the DOM has updated and elements are rendered.
				const scrollTimeout = setTimeout(() => {
					themeItemsRef.current[currentIndex]?.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				}, 0); // A timeout of 0ms defers execution until the current call stack is cleared.
				return () => clearTimeout(scrollTimeout);
			}
		}
	}, [isOpen]);

	useEffect(() => {
		setCurrentTheme(defaultTheme);
	}, [theme]);

	const jsonInput = useJsonVisuliazerStore.use.jsonInput();
	const error = useJsonVisuliazerStore.use.error();

	const handleShuffleTheme = () => {
		const randomTheme = shikiThemes[Math.floor(Math.random() * shikiThemes.length)];
		setCurrentTheme(randomTheme.value);
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
							{shikiThemes.find((theme) => theme.value === currentTheme)?.label}
							<ChevronDownIcon
								className={`size-4 text-muted-foreground/70 transition-transform duration-150 ease-in-out ${isOpen && "rotate-180"}`}
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-xs p-1"
						align="start"
					>
						<div className="flex flex-col gap-1 max-h-[300px] overflow-auto no-scrollbar">
							{shikiThemes.map((theme, index) => (
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
										setCurrentTheme(theme.value);
									}}
									className={`rounded-xs p-[9px] text-sm ${currentTheme === theme.value && "bg-accent"}`}
								>
									{theme.label}
								</div>
							))}
						</div>
					</PopoverContent>
				</Popover>
			</div>

			{error && (
				<div className="flex items-center bg-primary-foreground gap-2 w-fit py-2 px-2 rounded-md text-sm">
					<TriangleAlert className="size-4" /> {error}
				</div>
			)}
			{jsonInput && <CodeBlock theme={currentTheme}>{jsonInput}</CodeBlock>}
		</div>
	);
};
