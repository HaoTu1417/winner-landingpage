"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  console.log("content", content);
  const formattedContent = content.replace(/\\n/g, "<br />"); // convert literal \n to newline

  return (
    <div className="prose lg:prose-lg max-w-full">
      <div className="prose max-w-none">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{formattedContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownRenderer;
