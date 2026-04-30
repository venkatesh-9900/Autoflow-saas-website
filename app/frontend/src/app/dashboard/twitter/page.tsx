"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Twitter, ToggleLeft, ToggleRight, Sparkles, TrendingUp,
    BarChart3, Send, MessageSquare, Loader2, Hash, Users, Eye,
    Heart, Repeat, ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AUTOMATION_TOGGLES = [
    { key: "TWEET_SCHEDULE", label: "Tweet Scheduling", description: "Auto-schedule and publish tweets at optimal times", icon: Send },
    { key: "AUTO_MENTION_REPLY", label: "Auto Mention Reply", description: "AI generates and sends replies to @mentions", icon: MessageSquare },
    { key: "TRENDING_DETECT", label: "Trending Detection", description: "Monitor and alert on trending topics in your niche", icon: TrendingUp },
    { key: "ENGAGEMENT_MONITOR", label: "Engagement Monitor", description: "Real-time tracking of impressions, likes, retweets", icon: BarChart3 },
];

export default function TwitterPage() {
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
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1DA1F2] to-[#0D8ECF] flex items-center justify-center shadow-lg shadow-[#1DA1F2]/20">
                    <Twitter className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Twitter/X Automation</h1>
                    <p className="text-muted-foreground">Schedule tweets, auto-reply to mentions, and detect trends.</p>
                </div>
            </div>

            {/* Connection + AI Status */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border/50 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 shadow-sm shadow-green-500/50' : 'bg-red-500'}`} />
                                <div>
                                    <p className="font-semibold">{connected ? 'Connected' : 'Not Connected'}</p>
                                    <p className="text-xs text-muted-foreground">Twitter/X API via OAuth 2.0</p>
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
                                    <p className="text-xs text-muted-foreground">{aiActive ? 'Analyzing mentions & trends' : 'Activate to unlock AI features'}</p>
                                </div>
                            </div>
                            <button onClick={() => setAiActive(!aiActive)}>
                                {aiActive ? <ToggleRight className="w-12 h-7 text-chatbot" /> : <ToggleLeft className="w-12 h-7 text-muted-foreground" />}
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Analytics Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Impressions", value: "45.2K", icon: Eye, trend: "+12%" },
                    { label: "Engagements", value: "3,150", icon: Heart, trend: "+8%" },
                    { label: "Retweets", value: "420", icon: Repeat, trend: "+15%" },
                    { label: "Follower Growth", value: "+85", icon: Users, trend: "+3%" },
                ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                            <CardContent className="pt-5 pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <stat.icon className="w-4 h-4 text-twitter" />
                                    <span className="text-xs text-green-500 font-medium flex items-center gap-0.5">{stat.trend} <ArrowUpRight className="w-3 h-3" /></span>
                                </div>
                                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Automation Toggles */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-twitter" />
                        Automation Toggles
                    </CardTitle>
                    <CardDescription>Enable or disable individual automation rules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {AUTOMATION_TOGGLES.map((toggle) => (
                        <div key={toggle.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center">
                                    <toggle.icon className="w-4 h-4 text-twitter" />
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

            {/* Trending Hashtags */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Hash className="w-5 h-5 text-twitter" />
                        Trending Hashtags
                    </CardTitle>
                    <CardDescription>Current trending topics in your niche</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {["#AI", "#Automation", "#SaaS", "#Growth", "#TechStartup", "#ContentCreator"].map((tag) => (
                            <span key={tag} className="px-3 py-1.5 rounded-full bg-[#1DA1F2]/10 text-twitter text-sm font-medium hover:bg-[#1DA1F2]/20 transition-colors cursor-pointer">
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
