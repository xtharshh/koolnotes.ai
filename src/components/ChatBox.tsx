"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "src/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "src/components/ui/input";
import { ScrollArea } from "src/components/ui/scroll-area";
import { X,  Send, Loader2, Bot, BotMessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const {
    messages, 
    input, 
    handleInputChange,
    handleSubmit, 
    isLoading, 
    stop, 
    reload, 
    error
  } = useChat({ api: "/api/gemini" });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              size="icon"
              className="dark:bg-beige bg-cream text-black dark:text-white dark:text-cream rounded-full size-16
               p-2 shadow-lg"
            >
              {!isChatOpen ? (
                <BotMessageSquare className="size-18 text-black dark:text-white" style={{ width: "28px", height: "28px" }} /> 
              ) : (
                <X className="dark:text-white text-black" style={{ width: "28px", height: "28px"}} />
                
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed font-newGab bottom-20 right-4 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="border-2 border-gray-300 dark:border-gray-700 dark:text-yellow-100
             text-black dark:bg-black bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-bold">
                  Chat with Kool.ai
                </CardTitle>
                <Button
                  onClick={toggleChat}
                  size="sm"
                  variant="ghost"
                  className="px-2 py-2 text-black dark:text-yellow-100 font-newLuck font-bold"
                >
                  <X className="size-4" />
                  <span className="sr-only">Close Chat</span>
                </Button>
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
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    value={input}
                    onChange={handleInputChange}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBox;
