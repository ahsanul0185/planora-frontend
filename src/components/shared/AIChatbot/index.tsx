"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatWithAI, IChatMessage } from "@/services/ai.services";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
    { label: "Find upcoming events", prompt: "What are the upcoming events?" },
    { label: "Suggestion for me", prompt: "Can you suggest some events I might like?" },
    { label: "Tech events", prompt: "Show me some technology related events." },
];

export const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<IChatMessage[]>([
        { role: "assistant", content: "Hello! I'm Planora AI. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Focus input when chat opens or loading ends
    useEffect(() => {
        if (isOpen && !isLoading) {
            inputRef.current?.focus();
        }
    }, [isOpen, isLoading]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    const handleSend = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const newMessages: IChatMessage[] = [...messages, { role: "user", content: text }];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await chatWithAI(newMessages);
            setMessages(prev => [...prev, { role: "assistant", content: response }]);
        } catch (error) {
            console.log(error);
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div ref={chatContainerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] sm:w-[450px] h-[600px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 text-primary-foreground flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-accent-content" />
                                <span className="font-semibold text-lg tracking-tight">Planora AI</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary-foreground hover:bg-black/10 h-8 w-8"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <ScrollArea className="flex-1 min-h-0">
                            <div className="p-4 space-y-6">

                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "flex gap-3",
                                            msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                            msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground border border-border"
                                        )}>
                                            {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                                        </div>
                                        <div className={cn(
                                            "p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[80%] markdown-container",
                                            msg.role === "user" 
                                                ? "bg-primary text-primary-foreground rounded-tr-none" 
                                                : "bg-muted text-foreground rounded-tl-none border border-border/50"
                                        )}>
                                            <ReactMarkdown 
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                                                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                                                    h3: ({ children }) => <h3 className="text-base font-bold mb-2 text-primary">{children}</h3>,
                                                    a: ({ href, children }) => (
                                                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80 break-all">
                                                            {children}
                                                        </a>
                                                    ),
                                                    img: ({ src, alt }) => (
                                                        <img src={src} alt={alt} className="rounded-lg my-2 w-full object-cover shadow-sm bg-white" />
                                                    )
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-muted text-primary border border-border flex items-center justify-center shrink-0 shadow-sm">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        <div className="bg-muted p-3.5 rounded-2xl rounded-tl-none border border-border/50 flex items-center gap-2 shadow-sm">
                                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                            <span className="text-xs text-muted-foreground font-medium">Planora is thinking...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} className="h-2" />
                            </div>
                        </ScrollArea>

                        {/* Footer & Quick Actions */}
                        <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm space-y-4">
                            {messages.length < 3 && !isLoading && (
                                <div className="flex flex-wrap gap-2">
                                    {QUICK_ACTIONS.map((action, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSend(action.prompt)}
                                            className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-sm"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <form
                                className="relative flex items-center"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend(input);
                                }}
                            >
                                <Input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your question here..."
                                    className="pr-12 h-11 bg-muted/30 border-border focus-visible:ring-primary/20"
                                    disabled={isLoading}
                                />

                                <div className="absolute right-1.5">
                                    <Button 
                                        size="icon" 
                                        disabled={isLoading || !input.trim()} 
                                        type="submit"
                                        className="h-8 w-8 rounded-lg shadow-sm"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </form>
                            <p className="text-[10px] text-center text-muted-foreground opacity-60">Planora AI can make mistakes. Verify important info.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:bg-primary/95 transition-all duration-300 relative group"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 fill-current" />}
            </motion.button>
        </div>
    );
};
