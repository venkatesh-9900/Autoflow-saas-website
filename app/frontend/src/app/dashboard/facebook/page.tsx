"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Facebook, ToggleLeft, ToggleRight, Sparkles, MessageSquare,
    BarChart3, Shield, Users, Eye, ThumbsUp, Loader2, ArrowUpRight,
    FileText, UserPlus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AUTOMATION_TOGGLES = [
    { key: "FB_POST_AUTOMATION", label: "Post Automation", description: "Auto-schedule and publish posts to your page", icon: FileText },
    { key: "FB_COMMENT_MODERATION", label: "Comment Moderation", description: "AI-powered spam detection and sentiment filtering", icon: Shield },
    { key: "FB_MESSENGER_CHATBOT", label: "Messenger Chatbot", description: "AI chatbot for automated Messenger conversations", icon: MessageSquare },
    { key: "FB_LEAD_GENERATION", label: "Lead Generation", description: "Auto-qualify leads from page messages", icon: UserPlus },
];

export default function FacebookPage() {
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1877F2] to-[#0C5DC7] flex items-center justify-center shadow-lg shadow-[#1877F2]/20">
                    <Facebook className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Facebook Automation</h1>
                    <p className="text-muted-foreground">Automate posts, moderate comments, and deploy Messenger chatbots.</p>
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
                                    <p className="text-xs text-muted-foreground">Facebook Graph API via OAuth</p>
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
                                <Sparkles className={`w-5 h-5 ${aiActive ? 'text-chatbot' : 'text-muted-foreground'}`} />
                                <div>
                                    <p className="font-semibold">AI Agent</p>
                                    <p className="text-xs text-muted-foreground">{aiActive ? 'Moderating & generating replies' : 'Activate for AI moderation'}</p>
                                </div>
                            </div>
                            <button onClick={() => setAiActive(!aiActive)}>
                                {aiActive ? <ToggleRight className="w-12 h-7 text-chatbot" /> : <ToggleLeft className="w-12 h-7 text-muted-foreground" />}
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Page Views", value: "15.2K", icon: Eye, trend: "+8%" },
                    { label: "Page Likes", value: "8,400", icon: ThumbsUp, trend: "+5%" },
                    { label: "Conversations", value: "250", icon: MessageSquare, trend: "+22%" },
                    { label: "Response Rate", value: "94.5%", icon: Users, trend: "+2%" },
                ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                            <CardContent className="pt-5 pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <stat.icon className="w-4 h-4 text-facebook" />
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
                        <Sparkles className="w-5 h-5 text-facebook" />
                        Automation Toggles
                    </CardTitle>
                    <CardDescription>Configure your Facebook automation modules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {AUTOMATION_TOGGLES.map((toggle) => (
                        <div key={toggle.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#1877F2]/10 flex items-center justify-center">
                                    <toggle.icon className="w-4 h-4 text-facebook" />
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

            {/* Lead Workflow Preview */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-facebook" />
                        Lead Generation Workflow
                    </CardTitle>
                    <CardDescription>Automated lead qualification pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        {["New Message", "Detect Intent", "Qualify Lead", "Send Reply", "Add to CRM", "Notify Team"].map((step, i) => (
                            <div key={step} className="flex items-center gap-2 shrink-0">
                                <div className="px-3 py-2 rounded-lg bg-[#1877F2]/10 text-sm font-medium text-facebook whitespace-nowrap">
                                    {step}
                                </div>
                                {i < 5 && <ArrowUpRight className="w-4 h-4 text-muted-foreground rotate-90 md:rotate-0" />}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
