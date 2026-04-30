"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { api } from "@/lib/api-client";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export default function AiPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "assistant", content: "Hello! I'm your AI Assistant. How can I help you today? I can help you generate message templates, optimize your campaigns, or summarize contacts." }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSend() {
        if (!input.trim() || loading) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const data = await api.post('/ai/generate', { prompt: input });
            const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: data.content };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (error: unknown) {
            const errorMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: `Error: ${(error as Error).message || 'Unknown error'}` };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-[calc(100vh-10rem)] flex flex-col gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
                <p className="text-muted-foreground mt-2">Harness AI to automate your workflows and personalize communications.</p>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden border-border/50 shadow-lg bg-background/50 backdrop-blur-sm">
                <CardHeader className="border-b border-border/50 bg-secondary/10 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-base text-primary flex items-center gap-2">
                                AutoFlow Intelligence
                                <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            </CardTitle>
                            <CardDescription className="text-xs">Always ready to help</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden p-0">
                    <ScrollArea className="h-full p-6">
                        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <Avatar className={`w-8 h-8 ${message.role === 'assistant' ? 'bg-primary/10 border border-primary/20' : 'bg-secondary'}`}>
                                        {message.role === 'assistant' ? (
                                            <Bot className="w-4 h-4 text-primary" />
                                        ) : (
                                            <User className="w-4 h-4" />
                                        )}
                                    </Avatar>
                                    <div className={`flex flex-col gap-2 max-w-[80%] ${message.role === 'user' ? 'items-end' : ''}`}>
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground shadow-sm rounded-tr-none'
                                            : 'bg-secondary/40 text-foreground shadow-sm border border-border/30 rounded-tl-none'
                                            }`}>
                                            {message.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex gap-4">
                                    <Avatar className="w-8 h-8 bg-primary/10 border border-primary/20">
                                        <Bot className="w-4 h-4 text-primary" />
                                    </Avatar>
                                    <div className="bg-secondary/40 p-4 rounded-2xl rounded-tl-none border border-border/30">
                                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>

                <div className="p-4 border-t border-border/50 bg-secondary/5">
                    <div className="max-w-3xl mx-auto flex gap-3 relative">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me to generate a 'Welcome Email' template..."
                            className="h-12 pr-12 rounded-xl border-border/80 focus-visible:ring-primary shadow-sm"
                        />
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            className="absolute right-1 top-1 h-10 w-10 p-0 rounded-lg"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </Button>
                    </div>
                    <p className="text-[10px] text-center text-muted-foreground mt-2 uppercase tracking-widest font-semibold opacity-50">
                        Powered by AutoFlow AI Engine
                    </p>
                </div>
            </Card>
        </div>
    );
}
