"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles, Bot, Play, Save,
    MessageSquare, Mail, Instagram,
    CheckCircle2, ArrowRight, Loader2,
    Settings, FileText, Blocks, Smartphone
} from "lucide-react";

const LOADING_STEPS = [
    "Analyzing your request...",
    "Designing the automation workflow...",
    "Configuring AI chatbot logic...",
    "Generating message templates...",
    "Finalizing omnichannel integration..."
];

export default function ConversationalAIBuilder() {
    const [prompt, setPrompt] = useState("");
    const [stage, setStage] = useState<'idle' | 'generating' | 'complete'>('idle');
    const [loadingStepList, setLoadingStepList] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState<'workflow' | 'chatbot' | 'templates'>('workflow');

    useEffect(() => {
        if (stage === 'generating') {
            let current = 0;
            const interval = setInterval(() => {
                setLoadingStepList(prev => [...prev, current]);
                current++;
                if (current >= LOADING_STEPS.length) {
                    clearInterval(interval);
                    setTimeout(() => setStage('complete'), 1000);
                }
            }, 1200);
            return () => clearInterval(interval);
        }
    }, [stage]);

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        setStage('generating');
        setLoadingStepList([]);
    };

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center py-12 px-4 selection:bg-primary/20">
            <AnimatePresence mode="wait">
                {stage === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="max-w-3xl w-full flex flex-col items-center text-center space-y-8"
                    >
                        <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-primary via-chatbot to-blue-500 p-[2px] shadow-2xl shadow-chatbot/20">
                            <div className="w-full h-full bg-background rounded-[2rem] flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-chatbot" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
                                What do you want to automate?
                            </h1>
                            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                                Just describe your ideal workflow in plain English. Our AI will build the logic, write the templates, and wire up the integrations in seconds.
                            </p>
                        </div>

                        <div className="w-full relative group mt-8">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-chatbot to-blue-500 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-focus-within:opacity-50 group-focus-within:duration-200"></div>
                            <div className="relative bg-background border-2 border-border/50 rounded-[2rem] p-4 flex flex-col shadow-2xl">
                                <Textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="e.g. Create a WhatsApp bot that books doctor appointments, asks for symptoms, and sends a follow-up SMS reminder 24 hours before the visit."
                                    className="min-h-[120px] resize-none border-none focus-visible:ring-0 text-xl font-medium bg-transparent p-4 placeholder:text-muted-foreground/40"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleGenerate();
                                        }
                                    }}
                                />
                                <div className="flex justify-between items-center mt-2 px-2 pb-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        <Bot className="w-4 h-4" /> Powered by AutoFlow AI
                                    </div>
                                    <Button
                                        onClick={handleGenerate}
                                        disabled={!prompt.trim()}
                                        className="h-12 rounded-xl px-8 font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all w-full sm:w-auto"
                                    >
                                        Build It Now <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Suggestion Chips */}
                        <div className="flex flex-wrap justify-center gap-3 mt-4">
                            {["E-commerce Abandoned Cart", "Restaurant Reservation Bot", "Real Estate Lead Qualifier"].map((hint) => (
                                <button
                                    key={hint}
                                    onClick={() => setPrompt(`Create a ${hint.toLowerCase()} automation that...`)}
                                    className="px-4 py-2 rounded-full border bg-secondary/50 text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                                >
                                    {hint}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {stage === 'generating' && (
                    <motion.div
                        key="generating"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-xl w-full flex flex-col items-center justify-center space-y-12"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                            <div className="w-32 h-32 relative flex items-center justify-center">
                                <Loader2 className="w-16 h-16 text-primary animate-spin absolute" />
                                <Bot className="w-8 h-8 text-foreground animate-pulse relative z-10" />
                            </div>
                        </div>

                        <div className="w-full space-y-6">
                            {LOADING_STEPS.map((step, idx) => {
                                const isActive = loadingStepList.includes(idx);
                                const isCurrent = loadingStepList.length === idx;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: isActive || isCurrent ? 1 : 0.3, x: 0 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center ${isActive ? 'bg-emerald-500/20 text-emerald-500' : isCurrent ? 'bg-primary/20 text-primary animate-pulse' : 'bg-secondary text-muted-foreground'}`}>
                                            {isActive ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                        </div>
                                        <h3 className={`text-lg font-bold ${isActive ? 'text-foreground' : isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {step}
                                        </h3>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {stage === 'complete' && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-6xl space-y-8"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black tracking-tight">Automation Ready</h2>
                                    <p className="text-muted-foreground font-medium">Your customized flow has been built successfully.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => setStage('idle')} className="rounded-xl h-12 font-bold px-6">Start Over</Button>
                                <Button className="rounded-xl h-12 px-8 font-black bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                                    <Play className="w-4 h-4 mr-2" /> Activate & Deploy
                                </Button>
                            </div>
                        </div>

                        {/* Generated Output Dashboard */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="col-span-1 flex flex-col gap-2">
                                {[
                                    { id: 'workflow', label: 'Workflow Canvas', icon: Blocks },
                                    { id: 'chatbot', label: 'AI Chatbot Logic', icon: Bot },
                                    { id: 'templates', label: 'Message Templates', icon: FileText },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as 'workflow' | 'chatbot' | 'templates')}
                                        className={`p-4 rounded-2xl flex items-center gap-4 font-bold transition-all text-left ${activeTab === tab.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-secondary/50 text-foreground hover:bg-secondary'}`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="col-span-1 lg:col-span-3 bg-secondary/20 border-2 rounded-[2rem] min-h-[500px] p-6 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                                {activeTab === 'workflow' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex flex-col items-center justify-center h-full gap-8 py-12">
                                        <div className="p-4 bg-background border rounded-2xl shadow-xl flex items-center gap-4 min-w-[300px]">
                                            <div className="w-12 h-12 rounded-xl bg-whatsapp/10 text-whatsapp flex items-center justify-center"><MessageSquare className="w-6 h-6" /></div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Trigger</p>
                                                <p className="font-bold">WhatsApp Keyword: &quot;Doctor&quot;</p>
                                            </div>
                                        </div>
                                        <div className="w-px h-12 bg-border relative">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-border" />
                                        </div>
                                        <div className="p-4 bg-background border-2 border-chatbot rounded-2xl shadow-xl shadow-chatbot/10 flex items-center gap-4 min-w-[300px]">
                                            <div className="w-12 h-12 rounded-xl bg-chatbot/10 text-chatbot flex items-center justify-center"><Bot className="w-6 h-6" /></div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-chatbot tracking-widest">AI Action</p>
                                                <p className="font-bold">Qualify & Find Slots</p>
                                            </div>
                                        </div>
                                        <div className="w-px h-12 bg-border relative">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-border" />
                                        </div>
                                        <div className="p-4 bg-background border rounded-2xl shadow-xl flex items-center gap-4 min-w-[300px]">
                                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center"><Smartphone className="w-6 h-6" /></div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Action (Wait 24h)</p>
                                                <p className="font-bold">Send SMS Reminder</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'chatbot' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 p-4 h-full">
                                        <h3 className="text-xl font-black mb-6">AI Agent System Prompt</h3>
                                        <div className="bg-background rounded-2xl p-6 border shadow-inner font-mono text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                                            {`You are an automated medical receptionist for the clinic.\nYour goal is to book appointments seamlessly via WhatsApp.\n\nRULES:\n1. Be polite, professional, and empathetic.\n2. Ask for the patient's full name, date of birth, and symptoms.\n3. Offer the next 3 available slots between 9 AM and 5 PM.\n4. If symptoms sound like a severe emergency (e.g., chest pain, difficulty breathing), immediately instruct them to call 911.`}
                                        </div>
                                        <Button className="mt-6 rounded-xl font-bold" variant="secondary"><Settings className="w-4 h-4 mr-2" /> Configure AI Logic</Button>
                                    </motion.div>
                                )}

                                {activeTab === 'templates' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 p-4 h-full grid gap-4 grid-cols-1 md:grid-cols-2">
                                        <div className="bg-background border rounded-2xl p-6 space-y-4">
                                            <div className="flex items-center gap-2 text-whatsapp font-bold text-sm"><MessageSquare className="w-4 h-4" /> WhatsApp Confirmation</div>
                                            <p className="text-sm bg-secondary/50 p-4 rounded-xl">{`"Hello {{name}}, your appointment with Dr. Smith is confirmed for {{date}} at {{time}}. Please arrive 15 mins early."`}</p>
                                        </div>
                                        <div className="bg-background border rounded-2xl p-6 space-y-4">
                                            <div className="flex items-center gap-2 text-purple-500 font-bold text-sm"><Smartphone className="w-4 h-4" /> SMS 24h Reminder</div>
                                            <p className="text-sm bg-secondary/50 p-4 rounded-xl">{`"REMINDER: You have a doctor's appointment tomorrow at {{time}}. Reply CANCEL if you need to reschedule."`}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
