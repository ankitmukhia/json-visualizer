import dynamic from "next/dynamic";

const ReactJsonView = dynamic(() => import("react-json-view"));

export const JsonViewer = ({
  jsonInput,
  error,
}: {
  jsonInput: object | null;
  error: null | string;
}) => {
  return (
    <>
      {error && <div className="font-large">{error}</div>}
      {jsonInput && <ReactJsonView src={jsonInput} />}
    </>
  );
};
