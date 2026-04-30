"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    MessageSquare, ToggleLeft, ToggleRight, Sparkles,
    BarChart3, Bot, Calendar, Headset, ShoppingCart,
    Loader2, ArrowUpRight, Clock, CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AUTOMATION_TOGGLES = [
    { key: "WA_CHATBOT_REPLY", label: "AI Chatbot Reply", description: "AI auto-responds to incoming WhatsApp messages", icon: Bot },
    { key: "WA_APPOINTMENT_BOOKING", label: "Appointment Booking", description: "Customers can book appointments via chat", icon: Calendar },
    { key: "WA_CUSTOMER_SUPPORT", label: "Customer Support", description: "AI-powered support ticket automation", icon: Headset },
    { key: "WA_SALES_ASSISTANT", label: "Sales Assistant", description: "AI sales conversation and product recommendations", icon: ShoppingCart },
];

export default function WhatsAppPage() {
    const [connected, setConnected] = useState(false);
    const [aiActive, setAiActive] = useState(false);
    const [toggles, setToggles] = useState<Record<string, boolean>>({});
    const [connecting, setConnecting] = useState(false);

    const handleConnect = async () => {
        setConnecting(true);
        await new Promise((r) => setTimeout(r, 1500));
        setConnected(!connected);
        setConnecting(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg shadow-[#25D366]/20">
                    <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">WhatsApp Automation</h1>
                    <p className="text-muted-foreground">AI chatbot, appointment booking, support, and sales automation.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border/50 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 shadow-sm shadow-green-500/50' : 'bg-red-500'}`} />
                                <div>
                                    <p className="font-semibold">{connected ? 'Connected' : 'Not Connected'}</p>
                                    <p className="text-xs text-muted-foreground">WhatsApp Business API</p>
                                </div>
                            </div>
                            <button onClick={handleConnect} disabled={connecting}>
                                {connecting ? <Loader2 className="w-6 h-6 animate-spin" /> :
                                    connected ? <ToggleRight className="w-12 h-7 text-green-500" /> : <ToggleLeft className="w-12 h-7 text-red-400" />}
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Sparkles className={`w-5 h-5 ${aiActive ? 'text-whatsapp' : 'text-muted-foreground'}`} />
                                <div>
                                    <p className="font-semibold">AI Agent</p>
                                    <p className="text-xs text-muted-foreground">{aiActive ? 'Processing conversations' : 'Activate AI chatbot'}</p>
                                </div>
                            </div>
                            <button onClick={() => setAiActive(!aiActive)}>
                                {aiActive ? <ToggleRight className="w-12 h-7 text-whatsapp" /> : <ToggleLeft className="w-12 h-7 text-muted-foreground" />}
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Chats", value: "1,250", icon: MessageSquare, trend: "+18%" },
                    { label: "Avg Response", value: "30s", icon: Clock, trend: "-45%" },
                    { label: "Resolved", value: "94%", icon: CheckCircle, trend: "+5%" },
                    { label: "Appointments", value: "48", icon: Calendar, trend: "+12%" },
                ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                            <CardContent className="pt-5 pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <stat.icon className="w-4 h-4 text-whatsapp" />
                                    <span className="text-xs text-green-500 font-medium flex items-center gap-0.5">{stat.trend} <ArrowUpRight className="w-3 h-3" /></span>
                                </div>
                                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-whatsapp" />
                        Automation Toggles
                    </CardTitle>
                    <CardDescription>Configure WhatsApp automation modules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {AUTOMATION_TOGGLES.map((toggle) => (
                        <div key={toggle.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 flex items-center justify-center">
                                    <toggle.icon className="w-4 h-4 text-whatsapp" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{toggle.label}</p>
                                    <p className="text-xs text-muted-foreground">{toggle.description}</p>
                                </div>
                            </div>
                            <button onClick={() => setToggles((prev) => ({ ...prev, [toggle.key]: !prev[toggle.key] }))}>
                                {toggles[toggle.key] ? <ToggleRight className="w-10 h-6 text-green-500" /> : <ToggleLeft className="w-10 h-6 text-muted-foreground" />}
                            </button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Chatbot Workflow */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-whatsapp" />
                        Chatbot Workflow
                    </CardTitle>
                    <CardDescription>AI message processing pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        {["Message Received", "AI Intent Detection", "Generate Reply", "Send Response"].map((step, i) => (
                            <div key={step} className="flex items-center gap-2 shrink-0">
                                <div className="px-3 py-2 rounded-lg bg-[#25D366]/10 text-sm font-medium text-whatsapp whitespace-nowrap">
                                    {step}
                                </div>
                                {i < 3 && <ArrowUpRight className="w-4 h-4 text-muted-foreground rotate-90 md:rotate-0" />}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
