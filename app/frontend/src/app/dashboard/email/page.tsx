"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail, ToggleLeft, ToggleRight, Sparkles, Send, BarChart3,
    Loader2, ArrowUpRight, MousePointer, AlertTriangle,
    Inbox, CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AUTOMATION_TOGGLES = [
    { key: "EMAIL_AUTO_REPLY", label: "Auto Reply", description: "AI-powered email auto-responder for incoming mail", icon: Inbox },
    { key: "EMAIL_CAMPAIGN_SCHEDULE", label: "Campaign Schedule", description: "Smart scheduling for email campaigns", icon: Send },
];

export default function EmailPage() {
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EA4335] to-[#C5221F] flex items-center justify-center shadow-lg shadow-[#EA4335]/20">
                    <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Email Automation</h1>
                    <p className="text-muted-foreground">Auto-reply to emails, schedule campaigns, and track analytics.</p>
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
                                    <p className="text-xs text-muted-foreground">Gmail API / SMTP</p>
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
                                <Sparkles className={`w-5 h-5 ${aiActive ? 'text-email' : 'text-muted-foreground'}`} />
                                <div>
                                    <p className="font-semibold">AI Agent</p>
                                    <p className="text-xs text-muted-foreground">{aiActive ? 'Analyzing incoming emails' : 'Activate for smart replies'}</p>
                                </div>
                            </div>
                            <button onClick={() => setAiActive(!aiActive)}>
                                {aiActive ? <ToggleRight className="w-12 h-7 text-email" /> : <ToggleLeft className="w-12 h-7 text-muted-foreground" />}
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Sent", value: "12.5K", icon: Send, trend: "+15%" },
                    { label: "Open Rate", value: "39.7%", icon: CheckCircle, trend: "+4%" },
                    { label: "Click Rate", value: "9.9%", icon: MousePointer, trend: "+2%" },
                    { label: "Bounce Rate", value: "3.3%", icon: AlertTriangle, trend: "-1%" },
                ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                            <CardContent className="pt-5 pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <stat.icon className="w-4 h-4 text-email" />
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
                        <Sparkles className="w-5 h-5 text-email" />
                        Automation Toggles
                    </CardTitle>
                    <CardDescription>Configure email automation modules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {AUTOMATION_TOGGLES.map((toggle) => (
                        <div key={toggle.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#EA4335]/10 flex items-center justify-center">
                                    <toggle.icon className="w-4 h-4 text-email" />
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
        </div>
    );
}
