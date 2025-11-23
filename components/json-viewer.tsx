import { Suspense } from "react";
import dynamic from "next/dynamic";
import { TriangleAlert } from "lucide-react";
import { Loading } from "@/components/ui/loading";
const ReactJsonView = dynamic(() => import("react-json-view"));
import { useTheme } from "next-themes";

export const JsonViewer = ({
  jsonInput,
  error,
}: {
  jsonInput: object | null;
  error: null | string;
}) => {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "#27272a" : "#f4f4f5";
  const editorTheme = theme === "dark" ? "ashes" : "bright:inverted";

  return (
    <div className="mt-2">
      {error && (
        <div className="flex items-center bg-secondary gap-2 w-fit py-2 px-2 rounded-md text-sm">
          <TriangleAlert className="size-4" /> {error}
        </div>
      )}
      {jsonInput && (
        <Suspense fallback={<Loading />}>
          <ReactJsonView
            src={jsonInput}
            theme={editorTheme}
            iconStyle="circle"
            style={{
              backgroundColor: currentTheme,
              fontSize: 12,
              padding: 10,
              borderRadius: 6,
            }}
          />
        </Suspense>
      )}
    </div>
  );
};
