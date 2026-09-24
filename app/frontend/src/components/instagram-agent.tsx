"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    X,
    Send,
    Plus,
    Mic,
    MicOff,
    Image as ImageIcon,
    Video,
    Images,
    FileText,
    Paperclip,
    Copy,
    Check,
    Pencil,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export interface AttachmentItem {
    id: string;
    file: File;
    name: string;
    type: "image" | "video" | "media";
    previewUrl?: string;
    size: string;
}

interface ChatMessage {
    id: string;
    role: "user" | "agent";
    content: string;
    attachments?: AttachmentItem[];
    isProcessing?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
    {
        id: "welcome-msg",
        role: "agent",
        content:
            "Hi! I'm your Instagram Agent. You can use this chat to manage your Instagram automations and ask about your activity.",
    },
];

const QUICK_PROMPTS = [
    "Turn on automatic comment replies",
    "Pause Instagram automations",
    "Analyze story engagement",
    "Show today's activity",
    "Disable DM automation",
];

const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getMockResponse = (userPrompt: string, attachmentsCount = 0): string => {
    const lower = userPrompt.toLowerCase();

    if (attachmentsCount > 0) {
        return "I've received your content. Instagram publishing will be available once the Agent is connected.";
    }
    if (lower.includes("comment")) {
        return "Automatic comment replies will be available once the Instagram Agent is connected.";
    }
    if (lower.includes("pause")) {
        return "I can pause your Instagram automations once the Agent is connected.";
    }
    if (lower.includes("story") || lower.includes("engagement") || lower.includes("analyze")) {
        return "Story engagement analysis will be available once Instagram data is connected.";
    }
    if (lower.includes("activity") || lower.includes("today")) {
        return "Daily Instagram activity insights will be available once the Agent data pipeline is connected.";
    }
    if (lower.includes("dm")) {
        return "DM automation controls will be available once the Instagram Agent is connected.";
    }
    return "I received your request. Real Agent actions will be available once the Instagram Agent is connected.";
};

export function InstagramAgent() {
    const [isAgentOpen, setIsAgentOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
    const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState<boolean>(false);
    const [isAgentProcessing, setIsAgentProcessing] = useState<boolean>(false);
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);

    const agentSectionRef = useRef<HTMLDivElement>(null);
    const agentInputContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Hidden file inputs
    const singleImageInputRef = useRef<HTMLInputElement>(null);
    const multiImageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const mediaInputRef = useRef<HTMLInputElement>(null);

    const recognitionRef = useRef<{ stop: () => void } | null>(null);

    const handleOpen = () => {
        setIsAgentOpen(true);
    };

    const handleClose = () => {
        setIsAgentOpen(false);
        setIsAttachmentMenuOpen(false);
        if (isListening && recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                // Ignore
            }
            setIsListening(false);
        }
    };

    // Auto-scroll DOWN to Agent INPUT & focus textarea when launcher opens Agent
    useEffect(() => {
        if (isAgentOpen) {
            const scrollToInput = () => {
                if (agentInputContainerRef.current) {
                    agentInputContainerRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                    });
                }
            };

            // Immediate scroll initiate
            const timer1 = setTimeout(scrollToInput, 80);

            // Final scroll & focus after framer-motion finishes expanding (300ms transition)
            const timer2 = setTimeout(() => {
                scrollToInput();
                if (textareaRef.current) {
                    textareaRef.current.focus();
                    const valLen = textareaRef.current.value.length;
                    textareaRef.current.setSelectionRange(valLen, valLen);
                }
            }, 320);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [isAgentOpen]);

    // Auto-scroll conversation smoothly toward latest message / processing indicator
    useEffect(() => {
        if (isAgentOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [messages, isAgentProcessing, isAgentOpen]);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (isAttachmentMenuOpen) {
                    setIsAttachmentMenuOpen(false);
                } else if (isAgentOpen) {
                    handleClose();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isAgentOpen, isAttachmentMenuOpen]);

    // Click outside listener for attachment menu
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsAttachmentMenuOpen(false);
            }
        };
        if (isAttachmentMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isAttachmentMenuOpen]);

    // Clean up created object URLs on unmount
    useEffect(() => {
        return () => {
            attachments.forEach((att) => {
                if (att.previewUrl) URL.revokeObjectURL(att.previewUrl);
            });
        };
    }, [attachments]);

    // File selection handler
    const handleFilesSelected = (files: FileList | null, kind: "image" | "video" | "media") => {
        if (!files || files.length === 0) return;

        const newItems: AttachmentItem[] = [];
        Array.from(files).forEach((file) => {
            const isImg = file.type.startsWith("image/");
            const isVid = file.type.startsWith("video/");
            const itemType: "image" | "video" | "media" = isImg ? "image" : isVid ? "video" : "media";

            const previewUrl = isImg || isVid ? URL.createObjectURL(file) : undefined;
            newItems.push({
                id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                file,
                name: file.name,
                type: itemType,
                previewUrl,
                size: formatFileSize(file.size),
            });
        });

        setAttachments((prev) => [...prev, ...newItems]);
        setIsAttachmentMenuOpen(false);
        textareaRef.current?.focus();
    };

    const handleRemoveAttachment = (id: string) => {
        setAttachments((prev) => {
            const item = prev.find((a) => a.id === id);
            if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
            return prev.filter((a) => a.id !== id);
        });
    };

    const msgIdCounter = useRef(1);

    // Voice input implementation with browser SpeechRecognition
    const toggleVoiceInput = useCallback(() => {
        if (typeof window === "undefined") return;

        interface SpeechResult {
            results: {
                [index: number]: {
                    [index: number]: {
                        transcript: string;
                    };
                };
            };
        }

        interface SpeechError {
            error: string;
        }

        interface BrowserSpeechRecognition {
            continuous: boolean;
            interimResults: boolean;
            lang: string;
            onstart: () => void;
            onresult: (e: SpeechResult) => void;
            onerror: (e: SpeechError) => void;
            onend: () => void;
            start: () => void;
            stop: () => void;
        }

        interface WindowWithSpeech {
            SpeechRecognition?: new () => BrowserSpeechRecognition;
            webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
        }

        const win = window as unknown as WindowWithSpeech;
        const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

        if (!SpeechRecognitionClass) {
            setVoiceFeedback("Voice input isn't available in this browser.");
            setTimeout(() => setVoiceFeedback(null), 3000);
            return;
        }

        if (isListening) {
            if (recognitionRef.current) {
                try {
                    (recognitionRef.current as unknown as BrowserSpeechRecognition).stop();
                } catch {
                    // Ignore
                }
            }
            setIsListening(false);
            setVoiceFeedback(null);
            return;
        }

        try {
            const recognition = new SpeechRecognitionClass();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";

            recognition.onstart = () => {
                setIsListening(true);
                setVoiceFeedback("Listening...");
            };

            recognition.onresult = (event: SpeechResult) => {
                const transcript = event.results[0]?.[0]?.transcript;
                if (transcript) {
                    setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
                }
            };

            recognition.onerror = (event: SpeechError) => {
                setIsListening(false);
                if (event.error === "not-allowed") {
                    setVoiceFeedback("Microphone permission is required for voice input.");
                } else {
                    setVoiceFeedback("Voice input error. Try again.");
                }
                setTimeout(() => setVoiceFeedback(null), 3000);
            };

            recognition.onend = () => {
                setIsListening(false);
                setVoiceFeedback(null);
            };

            recognitionRef.current = recognition;
            recognition.start();
        } catch {
            setIsListening(false);
            setVoiceFeedback("Voice input isn't available in this browser.");
            setTimeout(() => setVoiceFeedback(null), 3000);
        }
    }, [isListening]);

    // Send message handler with three-dot wave processing indicator
    const handleSendMessage = useCallback((textToSend?: string) => {
        if (isAgentProcessing) return;

        const text = (textToSend !== undefined ? textToSend : inputMessage).trim();
        if (!text && attachments.length === 0) return;

        const currentAttachments = [...attachments];
        const userMsgId = `user-${msgIdCounter.current++}`;
        const agentMsgId = `agent-${msgIdCounter.current++}`;

        const userMessage: ChatMessage = {
            id: userMsgId,
            role: "user",
            content: text,
            attachments: currentAttachments.length > 0 ? currentAttachments : undefined,
        };

        // Add user message + processing placeholder for agent
        const processingPlaceholder: ChatMessage = {
            id: agentMsgId,
            role: "agent",
            content: "",
            isProcessing: true,
        };

        setMessages((prev) => [...prev, userMessage, processingPlaceholder]);
        setInputMessage("");
        setAttachments([]);
        setIsAgentProcessing(true);

        // Natural simulated delay between 700ms - 900ms
        const delay = 800;
        setTimeout(() => {
            const finalReply = getMockResponse(text, currentAttachments.length);
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === agentMsgId
                        ? { ...msg, content: finalReply, isProcessing: false }
                        : msg
                )
            );
            setIsAgentProcessing(false);

            // Refocus textarea for next prompt
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 50);
        }, delay);
    }, [isAgentProcessing, inputMessage, attachments]);

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // User message action: Copy prompt
    const handleCopyPrompt = async (messageId: string, text: string) => {
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            setCopiedMessageId(messageId);
            setTimeout(() => {
                setCopiedMessageId((prev) => (prev === messageId ? null : prev));
            }, 1500);
        } catch (err) {
            console.error("Failed to copy prompt:", err);
        }
    };

    // User message action: Edit prompt (loads into textarea & focuses)
    const handleEditPrompt = (text: string) => {
        setInputMessage(text);
        if (agentInputContainerRef.current) {
            agentInputContainerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                const len = text.length;
                textareaRef.current.setSelectionRange(len, len);
            }
        }, 80);
    };

    const isSendDisabled =
        isAgentProcessing || (!inputMessage.trim() && attachments.length === 0);

    return (
        <TooltipProvider>
            {/* Hidden File Inputs */}
            <input
                type="file"
                ref={singleImageInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    handleFilesSelected(e.target.files, "image");
                    e.target.value = "";
                }}
            />
            <input
                type="file"
                ref={multiImageInputRef}
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                    handleFilesSelected(e.target.files, "image");
                    e.target.value = "";
                }}
            />
            <input
                type="file"
                ref={videoInputRef}
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                    handleFilesSelected(e.target.files, "video");
                    e.target.value = "";
                }}
            />
            <input
                type="file"
                ref={mediaInputRef}
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={(e) => {
                    handleFilesSelected(e.target.files, "media");
                    e.target.value = "";
                }}
            />

            {/* IN-PAGE AGENT SECTION (LOCATED AT VERY BOTTOM OF DASHBOARD) */}
            <AnimatePresence>
                {isAgentOpen && (
                    <motion.div
                        ref={agentSectionRef}
                        id="instagram-agent-section"
                        initial={{ opacity: 0, height: 0, y: -16 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -16 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden pt-4"
                    >
                        <Card className="border-border/60 shadow-2xl rounded-3xl overflow-hidden glass bg-card/75 backdrop-blur-xl border border-instagram/20 relative">
                            {/* Agent Header */}
                            <div className="border-b border-border/40 bg-secondary/15 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-instagram/20 to-pink-500/20 text-instagram flex items-center justify-center shadow-sm">
                                        <Sparkles className="w-5 h-5 text-instagram" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-black text-base md:text-lg tracking-tight">
                                            Instagram Agent
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Ready status with live subtle pulse on green dot only */}
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>Ready</span>
                                    </div>

                                    {/* Close Button */}
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                onClick={handleClose}
                                                aria-label="Close Instagram Agent"
                                                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-instagram/40 cursor-pointer"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="left" className="font-semibold text-xs">
                                            Close
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>

                            {/* Agent Body / Conversation Area */}
                            <div className="p-4 md:p-6 space-y-5">
                                {/* Disclaimer Banner */}
                                <div className="flex justify-center">
                                    <span className="text-[11px] font-medium text-muted-foreground bg-secondary/40 px-3.5 py-1 rounded-full border border-border/40 text-center">
                                        Frontend prototype — Agent actions are not connected yet.
                                    </span>
                                </div>

                                {/* Conversation List */}
                                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 scroll-smooth">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex flex-col gap-1.5 ${
                                                msg.role === "user" ? "items-end" : "items-start"
                                            }`}
                                        >
                                            <div
                                                className={`flex gap-3 max-w-[88%] md:max-w-[78%] ${
                                                    msg.role === "user" ? "justify-end" : "justify-start"
                                                }`}
                                            >
                                                {msg.role === "agent" && (
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-instagram/20 to-pink-500/20 text-instagram flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                                        <Sparkles className="w-4 h-4 text-instagram" />
                                                    </div>
                                                )}

                                                <div
                                                    className={`rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed shadow-sm space-y-2 ${
                                                        msg.role === "user"
                                                            ? "bg-gradient-to-r from-instagram to-pink-500 text-white rounded-br-sm"
                                                            : "bg-secondary/40 border border-border/50 text-foreground rounded-bl-sm backdrop-blur-sm"
                                                    }`}
                                                >
                                                    {/* Attachments inside user message */}
                                                    {msg.attachments && msg.attachments.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 pb-1">
                                                            {msg.attachments.map((att) => (
                                                                <div
                                                                    key={att.id}
                                                                    className="flex items-center gap-2 p-1.5 bg-black/20 rounded-lg text-xs"
                                                                >
                                                                    {att.previewUrl && att.type === "image" ? (
                                                                        <img
                                                                            src={att.previewUrl}
                                                                            alt={att.name}
                                                                            className="w-10 h-10 object-cover rounded"
                                                                        />
                                                                    ) : att.previewUrl && att.type === "video" ? (
                                                                        <div className="w-10 h-10 bg-black/30 rounded flex items-center justify-center">
                                                                            <Video className="w-5 h-5 text-white/90" />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="w-10 h-10 bg-black/30 rounded flex items-center justify-center">
                                                                            <FileText className="w-5 h-5 text-white/90" />
                                                                        </div>
                                                                    )}
                                                                    <div className="max-w-[120px] truncate text-left">
                                                                        <p className="truncate font-semibold text-[11px]">
                                                                            {att.name}
                                                                        </p>
                                                                        <p className="text-[9px] opacity-80">{att.size}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Processing Indicator: Three-Dot Wave Animation */}
                                                    {msg.isProcessing ? (
                                                        <div
                                                            className="flex items-center gap-1.5 py-1 px-1"
                                                            role="status"
                                                            aria-live="polite"
                                                            aria-label="Agent is thinking"
                                                        >
                                                            <span className="sr-only">Instagram Agent is thinking...</span>
                                                            <motion.span
                                                                className="w-2 h-2 rounded-full bg-instagram"
                                                                animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                                                                transition={{
                                                                    duration: 0.8,
                                                                    repeat: Infinity,
                                                                    ease: "easeInOut",
                                                                    delay: 0,
                                                                }}
                                                            />
                                                            <motion.span
                                                                className="w-2 h-2 rounded-full bg-instagram"
                                                                animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                                                                transition={{
                                                                    duration: 0.8,
                                                                    repeat: Infinity,
                                                                    ease: "easeInOut",
                                                                    delay: 0.15,
                                                                }}
                                                            />
                                                            <motion.span
                                                                className="w-2 h-2 rounded-full bg-instagram"
                                                                animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                                                                transition={{
                                                                    duration: 0.8,
                                                                    repeat: Infinity,
                                                                    ease: "easeInOut",
                                                                    delay: 0.3,
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        msg.content && <p>{msg.content}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* User Message Action Bar: Edit & Copy Buttons */}
                                            {msg.role === "user" && msg.content && (
                                                <div className="flex items-center gap-1 px-1">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCopyPrompt(msg.id, msg.content)}
                                                                aria-label="Copy prompt"
                                                                className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
                                                            >
                                                                {copiedMessageId === msg.id ? (
                                                                    <>
                                                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                                        <span className="text-emerald-500 font-semibold">
                                                                            Copied
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Copy className="w-3.5 h-3.5" />
                                                                        <span>Copy</span>
                                                                    </>
                                                                )}
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="bottom" className="text-xs">
                                                            {copiedMessageId === msg.id ? "Copied" : "Copy prompt"}
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEditPrompt(msg.content)}
                                                                aria-label="Edit prompt"
                                                                className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
                                                            >
                                                                <Pencil className="w-3.5 h-3.5" />
                                                                <span>Edit</span>
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="bottom" className="text-xs">
                                                            Edit prompt
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Quick Prompt Suggestions */}
                                <div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2.5">
                                        Quick Prompts
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {QUICK_PROMPTS.map((prompt) => (
                                            <button
                                                key={prompt}
                                                type="button"
                                                disabled={isAgentProcessing}
                                                onClick={() => handleSendMessage(prompt)}
                                                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-secondary/30 hover:bg-instagram/10 hover:text-instagram border border-border/50 hover:border-instagram/30 transition-all text-muted-foreground cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Attachment Previews Container */}
                                {attachments.length > 0 && (
                                    <div className="flex flex-wrap gap-2 p-2 bg-secondary/20 rounded-xl border border-border/40">
                                        {attachments.map((att) => (
                                            <div
                                                key={att.id}
                                                className="flex items-center gap-2 p-1.5 bg-background border border-border/60 rounded-lg text-xs shadow-sm"
                                            >
                                                {att.previewUrl && att.type === "image" ? (
                                                    <img
                                                        src={att.previewUrl}
                                                        alt={att.name}
                                                        className="w-8 h-8 object-cover rounded"
                                                    />
                                                ) : att.type === "video" ? (
                                                    <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-instagram">
                                                        <Video className="w-4 h-4" />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-muted-foreground">
                                                        <Paperclip className="w-4 h-4" />
                                                    </div>
                                                )}
                                                <div className="max-w-[140px]">
                                                    <p className="truncate font-semibold text-[11px]">{att.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">{att.size}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveAttachment(att.id)}
                                                    aria-label={`Remove ${att.name}`}
                                                    className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Voice status indicator feedback if active */}
                                {voiceFeedback && (
                                    <div className="flex items-center gap-2 text-xs font-semibold text-instagram animate-fade-in">
                                        <span className="w-2 h-2 rounded-full bg-instagram animate-pulse" />
                                        <span>{voiceFeedback}</span>
                                    </div>
                                )}

                                {/* Agent Input Area (Left: +, Center: Textarea, Right: Mic + Send) */}
                                <div
                                    ref={agentInputContainerRef}
                                    className="relative rounded-2xl border border-border/60 bg-background/85 focus-within:border-instagram/50 focus-within:ring-2 focus-within:ring-instagram/20 transition-all shadow-sm"
                                >
                                    <div className="flex items-end gap-2 p-2.5">
                                        {/* LEFT: Add Content (+) Button & Popover */}
                                        <div className="relative shrink-0" ref={menuRef}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsAttachmentMenuOpen((prev) => !prev)}
                                                        aria-label="Add content"
                                                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-instagram/40 cursor-pointer"
                                                    >
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="font-semibold text-xs">
                                                    Add content
                                                </TooltipContent>
                                            </Tooltip>

                                            {/* Attachment Menu Dropdown */}
                                            <AnimatePresence>
                                                {isAttachmentMenuOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                                        animate={{ opacity: 1, scale: 1, y: -8 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="absolute bottom-full left-0 mb-1 w-52 rounded-xl bg-card border border-border/60 shadow-xl p-1.5 z-50 backdrop-blur-md"
                                                    >
                                                        <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 mb-1">
                                                            Add content
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => singleImageInputRef.current?.click()}
                                                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-secondary/60 hover:text-instagram transition-colors cursor-pointer text-left"
                                                        >
                                                            <ImageIcon className="w-4 h-4 text-instagram" />
                                                            <span>Image</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => videoInputRef.current?.click()}
                                                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-secondary/60 hover:text-instagram transition-colors cursor-pointer text-left"
                                                        >
                                                            <Video className="w-4 h-4 text-pink-500" />
                                                            <span>Video</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => multiImageInputRef.current?.click()}
                                                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-secondary/60 hover:text-instagram transition-colors cursor-pointer text-left"
                                                        >
                                                            <Images className="w-4 h-4 text-purple-500" />
                                                            <span>Multiple images</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => mediaInputRef.current?.click()}
                                                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-secondary/60 hover:text-instagram transition-colors cursor-pointer text-left"
                                                        >
                                                            <FileText className="w-4 h-4 text-blue-500" />
                                                            <span>Media</span>
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* CENTER: Multiline Textarea */}
                                        <div className="flex-1 min-w-0">
                                            <textarea
                                                ref={textareaRef}
                                                value={inputMessage}
                                                onChange={(e) => setInputMessage(e.target.value)}
                                                onKeyDown={handleInputKeyDown}
                                                placeholder="Ask your Instagram Agent..."
                                                rows={1}
                                                aria-label="Ask your Instagram Agent"
                                                className="w-full resize-none bg-transparent px-2 py-2 text-sm placeholder:text-muted-foreground/70 focus:outline-none min-h-[40px] max-h-[140px] leading-relaxed"
                                            />
                                        </div>

                                        {/* RIGHT: Voice Input (Mic) + Send Button */}
                                        <div className="flex items-center gap-1.5 shrink-0 pb-0.5">
                                            {/* Microphone Button */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        type="button"
                                                        onClick={toggleVoiceInput}
                                                        aria-label="Use voice input"
                                                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                                                            isListening
                                                                ? "bg-instagram text-white shadow-md shadow-instagram/30 animate-pulse"
                                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                                                        }`}
                                                    >
                                                        {isListening ? (
                                                            <MicOff className="w-4 h-4" />
                                                        ) : (
                                                            <Mic className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="font-semibold text-xs">
                                                    {isListening ? "Stop listening" : "Voice input"}
                                                </TooltipContent>
                                            </Tooltip>

                                            {/* Send Button */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => handleSendMessage()}
                                                        disabled={isSendDisabled}
                                                        aria-label="Send message"
                                                        className="rounded-xl h-9 px-3.5 font-bold bg-gradient-to-r from-instagram to-pink-500 text-white hover:opacity-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
                                                    >
                                                        <Send className="w-4 h-4 mr-1.5" />
                                                        <span>Send</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="font-semibold text-xs">
                                                    Send message
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    {/* Keyboard hint bar */}
                                    <div className="px-3 py-1.5 border-t border-border/30 bg-secondary/5 flex items-center justify-between text-[11px] text-muted-foreground">
                                        <span className="hidden sm:inline">
                                            Press <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground text-[10px] font-mono border border-border/50">Enter ↵</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground text-[10px] font-mono border border-border/50">Shift + Enter</kbd> for newline
                                        </span>
                                        <span className="sm:hidden">
                                            Shift + Enter for newline
                                        </span>
                                        <span>Local Prototype</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLOATING AI AGENT LAUNCHER (BOTTOM-RIGHT) */}
            <AnimatePresence>
                {!isAgentOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 16 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50"
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    onClick={handleOpen}
                                    aria-label="Instagram AI Agent"
                                    className="group relative flex items-center gap-2.5 px-4 py-3 md:px-5 md:py-3.5 rounded-full bg-gradient-to-r from-instagram to-pink-500 text-white font-bold shadow-lg shadow-instagram/25 hover:shadow-xl hover:shadow-instagram/35 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-instagram"
                                >
                                    <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                                    <span className="text-sm font-semibold tracking-wide">Instagram AI Agent</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="font-semibold text-xs py-1.5 px-3">
                                Instagram AI Agent
                            </TooltipContent>
                        </Tooltip>
                    </motion.div>
                )}
            </AnimatePresence>
        </TooltipProvider>
    );
}
