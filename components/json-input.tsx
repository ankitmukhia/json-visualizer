import { Clipboard, Copy, Code, X } from "lucide-react";
import { LoadJson } from "@/components/load-json";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const JsonInput = ({
  jsonInput,
  setJsonInput,
}: {
  jsonInput: string;
  setJsonInput: (value: string) => void;
}) => {
  const handleOnPast = async () => {
    try {
      const clipboardVal = await navigator.clipboard.readText();
      setJsonInput(clipboardVal);
      toast.success("Json pasted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Faild to past from clipboard");
    }
  };

  const handleOnCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonInput);
      toast.success("Json copyed to Clipboard");
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
      toast.success("Formatted successfully");
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
      toast.success("Whitespace removed successfully");
    } catch (err) {
      console.log(err);
      toast.error("Invalid JSON: Unable to remove whitespace");
    }
  };

  const handleOnClear = () => {
    setJsonInput("");
    toast.success("Successfully cleared");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-row gap-2 py-2">
        <Button
          onClick={handleOnPast}
          variant="outline"
          className="h-8 text-xs"
        >
          <Clipboard />
          Past
        </Button>
        <Button
          onClick={handleOnCopy}
          variant="outline"
          className="h-8 text-xs"
        >
          <Copy />
          Copy
        </Button>
        <Button
          onClick={handleOnFormat}
          variant="outline"
          className="h-8 text-xs"
        >
          <Code />
          Format
        </Button>
        <Button
          onClick={handleOnWhiteSpace}
          variant="outline"
          className="h-8 text-xs"
        >
          <X />
          Remove Whitespace
        </Button>
        <Button
          onClick={handleOnClear}
          variant="outline"
          className="h-8 text-xs"
        >
          Clear
        </Button>

        <LoadJson loadJsonInput={setJsonInput} />
      </div>
      <Textarea
        value={jsonInput}
        onChange={handleInputChange}
        className="flex-grow resize-none font-mono"
        placeholder="Pest your JSON here..."
      />
    </div>
  );
};
