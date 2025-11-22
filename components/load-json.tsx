import { useState } from "react";
import { FileJson } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const LoadJson = ({
  loadJsonInput,
}: {
  loadJsonInput: (value: string) => void;
}) => {
  const [loadValue, setLoadValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadValue(e.target.value);
  };

  const handleOnSubmit = async () => {
    if (loadValue === "") {
      toast.error("Don't joke with me put URL there.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(loadValue);
      if (!res.ok) {
        return;
      }
      const json = await res.json();
      loadJsonInput(JSON.stringify(json, null, 2));
      setLoading(false);
      setIsOpen(false);
      toast.success("JSON loaded successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to load JSON from URL");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 text-xs">
          <FileJson />
          Load JSON
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Load URl</DialogTitle>
        </DialogHeader>
        <Input
          className="flex-grow resize-none font-mono"
          onChange={handleOnChange}
          placeholder="https://api.example.com/data.json"
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <div className="flex flex-row justify-end">
          <Button variant="outline" onClick={handleOnSubmit} disabled={loading}>
            {loading ? "Loading..." : "Load"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
