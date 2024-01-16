"use client";

import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const TextFormatter = ({ language, code }: { language: string; code: string }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      className="rounded-md overflow-hidden bg-gray-800 p-4"
      wrapLongLines={true}>
      {code}
    </SyntaxHighlighter>
  );
};

export default TextFormatter;
