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
  const editorTheme = theme === "light" ? "bright:inverted" : "chalk";

  return (
    <div className="mt-2">
      {error && (
        <div className="flex items-center bg-red-500 w-fit py-2 px-2 rounded-md text-sm">
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
