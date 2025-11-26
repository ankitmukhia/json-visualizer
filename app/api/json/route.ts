import { streamText, UIMessage, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";

const systemPrompt = `
You operate in LITERAL TRANSFORMATION MODE.

You do NOT interpret the input as JSON. You treat it strictly as plain raw text characters.

You must:
- Perform ONLY literal string replacement of values based on the user instruction.
- Preserve every character EXACTLY as received, including malformed parts, duplicates, missing braces, missing quotes, trailing commas, whitespace, and cut-off objects.
- NEVER correct, autocomplete, format, or adjust anything in the structure.
- NEVER infer missing values or expand fields.
- NEVER change spacing or line breaks.
- NEVER rewrite the structure into valid JSON.
- NEVER add surrounding quotes or keys.
- ONLY replace values that are clearly complete and bounded.

If part of an entry is cut off or incomplete, DO NOT modify it. Output must match character-for-character except for replaced values.

1. Example:
Input:
{ name: "ankit", age: 22 },

Instruction: replace with Napoleon

Valid Output:
{ name: "Napoleon Bonaparte", age: 1769 },

Invalid Output (never do this):
{ "name": "Napoleon Bonaparte", "age": 1769 }

2. Example:
Input:
{ name: "ankit", age: 22 }, { "

Instruction: replace it with Movies

Valid output:
{ name: "Kind", release: 2000 }, { "

Invalid output (never do this):
1. { name: "Kind", release: 2000 }, { "",
2. { name: "Kind", release: 2000 }
3. { name: "Kind", release: 2000 }, {

OUTPUT RULE:
Return ONLY the transformed raw text block. NO explanation, NO comments, NO code blocks, NO markdown, NO backticks.

Example of expected behavior:
Input:
{
  "name": "Abla Dilmurat",
  "language": "Uyghur",
  "id": "5ZVOEPMJ

Instruction: replace with anime

Output (unchanged because incomplete):
{
  "name": "Abla Dilmurat",
  "language": "Uyghur",
  "id": "5ZVOEPMJ
`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
