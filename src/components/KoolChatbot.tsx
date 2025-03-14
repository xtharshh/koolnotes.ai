"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, Loader2 } from "lucide-react";
import { useChat } from "@ai-sdk/react";


const CodeBlock: React.FC<{ inline?: boolean; children?: React.ReactNode } & React.HTMLAttributes<HTMLElement>> = ({ inline = false, children, ...props }) => {
  return inline ? (
    <code {...props} className="bg-gray-200 px-1 rounded">{children}</code>
  ) : (
    <pre {...props} className="bg-gray-200 p-2 rounded">
      <code>{children}</code>
    </pre>
  );
};

const KoolChatbot = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const { messages, append, isLoading, error } = useChat({
    api: "/api/gemini",
    initialMessages: [],
    onError: (err) => {
      console.error("Chat error:", err);
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await append({ role: "user", content: input });
    setInput("");
  };

    function reload(): void {
        throw new Error("Function not implemented.");
    }

  return (
    <Card className="w-[95%] md:w-[500px] border-2 border-gray-300 dark:border-gray-700 dark:text-yellow-100 text-black dark:bg-black bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="text-lg font-bold">Chat with Kool.ai</div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {messages?.length === 0 && !isLoading && !error && (
            <div className="flex flex-col pt-16 items-center justify-center h-full">
              <Bot width={100} height={100} />
              <h3 className="text-lg font-bold">Kool! Kool! Type Something</h3>
            </div>
          )}
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
              style={{ wordWrap: "break-word" }}
            >
              <div className={`inline-block rounded-lg p-4 border ${message.role === "user" ? "dark:bg-gray-700 bg-black text-white border-black" : "dark:bg-cream-900 dark:text-white bg-gray-200 text-black border-gray-200"}`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code: CodeBlock,
                    ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal ml-4">{children}</ol>,
                    a: ({ href, children, ...props }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" {...props} className="text-blue-800 break-words">
                        {children}
                      </a>
                    )
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="w-full items-center flex justify-center gap-3">
              <Loader2 className="animate-spin h-5 w-5 text-primary" />
              <button
                className="underline"
                type="button"
                onClick={() => stop()}
              >
                Abort
              </button>
            </div>
          )}
          {error && (
            <div className="w-full items-center flex justify-center gap-3">
              <span className="text-red-500">Error: {error.message}</span>
              <button
                className="underline"
                type="button"
                onClick={() => reload()}
              >
                Retry
              </button>
            </div>
          )}
          <div ref={scrollRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            placeholder="Ask Anything...?"
          />
          <Button
            type="submit"
            className="size-9 bg-black text-white"
            disabled={isLoading}
            size="icon"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default KoolChatbot;
