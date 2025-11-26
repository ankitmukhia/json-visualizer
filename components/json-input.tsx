import { useJsonVisuliazerStore } from "@/lib/stores/json-visualizer-store";
import {
  Clipboard,
  Copy,
  Code,
  X,
  TriangleAlertIcon,
  CheckIcon,
} from "lucide-react";
import { LoadJson } from "@/components/load-json";
import { Textarea } from "@/components/ui/textarea";
import { EditType } from "@/lib/stores/json-visualizer-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const JsonInput = ({
  jsonInput,
  setJsonInput,
}: {
  jsonInput: string;
  setJsonInput: (value: string) => void;
}) => {
  const error = useJsonVisuliazerStore.use.error();
  const past = useJsonVisuliazerStore.use.past();
  const copy = useJsonVisuliazerStore.use.copy();
  const format = useJsonVisuliazerStore.use.format();
  const removeWhiteSpaces = useJsonVisuliazerStore.use.removeWhiteSpaces();
  const clear = useJsonVisuliazerStore.use.clear();
  const editAction = useJsonVisuliazerStore.use.updateEditActions();

  const handleOnPast = async () => {
    try {
      const clipboardVal = await navigator.clipboard.readText();
      setJsonInput(clipboardVal);
      editAction(EditType.PAST);
    } catch (err) {
      console.log(err);
      toast.error("Faild to past from clipboard");
    }
  };

  const handleOnCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonInput);
      editAction(EditType.COPY);
    } catch (err) {
      console.log(err);
      toast.error("Faild to Copy from clipboard");
    }
  };

  const handleOnFormat = () => {
    try {
      const convertedObj = JSON.parse(jsonInput);
      const formatData = JSON.stringify(convertedObj, null, 2);
      setJsonInput(formatData);
      editAction(EditType.FORMAT);
    } catch (err) {
      console.log(err);
      toast.error("Failed to format.");
    }
  };

  const handleOnWhiteSpace = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const compact = JSON.stringify(parsed);
      setJsonInput(compact);
      editAction(EditType.REMOVEWHITESPACES);
    } catch (err) {
      console.log(err);
      toast.error("Invalid JSON: Unable to remove whitespace");
    }
  };

  const handleOnClear = () => {
    setJsonInput("");
    editAction(EditType.CLEAR);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap flex-row gap-2 py-2">
        <Button
          size="sm"
          onClick={handleOnPast}
          className={`${past && "bg-chart-1/40 text-chart-1"}`}
        >
          {past ? (
            <>
              <CheckIcon /> Pasted
            </>
          ) : (
            <>
              <Clipboard /> Past
            </>
          )}
        </Button>
        <Button
          size="sm"
          onClick={handleOnCopy}
          className={`${copy && "bg-chart-1/40 text-chart-1"}`}
        >
          {copy ? (
            <>
              <CheckIcon /> Copied
            </>
          ) : (
            <>
              <Copy /> Copy
            </>
          )}
        </Button>
        <Button
          size="sm"
          onClick={handleOnFormat}
          className={`${format && "bg-chart-1/40 text-chart-1"}`}
        >
          {format ? (
            <>
              <CheckIcon /> Formated
            </>
          ) : (
            <>
              <Code /> Format
            </>
          )}
        </Button>
        <Button
          size="sm"
          onClick={handleOnWhiteSpace}
          className={`${removeWhiteSpaces && "bg-chart-1/20 text-chart-1"}`}
        >
          {removeWhiteSpaces ? (
            <>
              <CheckIcon /> Removed Whitespaces
            </>
          ) : (
            <>
              <X />
              Remove Whitespace
            </>
          )}
        </Button>
        <Button
          size="sm"
          onClick={handleOnClear}
          className={`${clear && "bg-chart-1/40 text-chart-1"}`}
        >
          {clear ? (
            <>
              <CheckIcon /> Cleared
            </>
          ) : (
            <span>Clear</span>
          )}
        </Button>

        <LoadJson loadJsonInput={setJsonInput} />
      </div>
      <div className="relative bg-muted rounded-lg h-full w-full">
        <Textarea
          value={jsonInput}
          onChange={handleInputChange}
          spellCheck={false}
          className="grow resize-none font-mono bg-transparent dark:bg-transparent rounded-none h-full border-none focus-visible:ring-[1.6px] focus-visible:border-none focus-visible:ring-ring/80 rounded-bl-md rounded-br-md rounded-tl-md"
          placeholder="Pest your JSON here..."
        />

        {error && jsonInput !== "" && (
          <div className="absolute bg-yellow-400/20 top-0 right-0 z-10 py-1 px-2 rounded-bl-md transition duration-700 ease-in-out">
            <div className="flex items-center gap-2 font-light text-yellow-500">
              <TriangleAlertIcon className="size-4" /> <span>{error}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
