"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Instagram, Twitter, Facebook, MessageSquare, Mail, Smartphone, Bot,
    ToggleLeft, ToggleRight, Sparkles, BarChart3, Bell, Settings,
    ChevronDown, ChevronUp, Zap, TrendingUp, Shield, Loader2,
    ArrowRight, Check, Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api-client";

// ─── Platform Configuration ──────────────────────────────────────
interface PlatformConfig {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
    gradient: string;
    glowColor: string;
    automationToggles: { key: string; label: string; description: string }[];
    pricing: { free: number; starter: number; pro: number; enterprise: number };
}

const PLATFORMS: PlatformConfig[] = [
    {
        id: "INSTAGRAM",
        name: "Instagram Automation",
        description: "Automate DMs, comments, content posting, and grow your audience with AI-powered engagement.",
        icon: Instagram,
        color: "text-instagram",
        gradient: "from-[#E4405F] via-[#F56040] to-[#FCAF45]",
        glowColor: "shadow-[#E4405F]/20",
        automationToggles: [
            { key: "AUTO_DM_REPLY", label: "Auto DM Reply", description: "AI responds to direct messages" },
            { key: "AUTO_COMMENT_REPLY", label: "Auto Comment Reply", description: "AI replies to post comments" },
            { key: "AUTO_FOLLOW_REPLY", label: "Auto Follow Reply", description: "Welcome new followers via DM" },
            { key: "AUTO_POST_CONTENT", label: "Auto Post Content", description: "Schedule & auto-publish posts" },
            { key: "AUTO_REELS_POSTING", label: "Auto Reels Posting", description: "Auto-create & post reels" },
            { key: "AUTO_CAROUSEL_POSTING", label: "Auto Carousel Posting", description: "Auto carousel content" },
            { key: "TRENDING_HASHTAG_GENERATOR", label: "Trending Hashtags", description: "AI hashtag optimization" },
            { key: "FOLLOWER_GROWTH_MONITOR", label: "Growth Monitor", description: "Track follower growth" },
        ],
        pricing: { free: 0, starter: 29, pro: 79, enterprise: 199 },
    },
    {
        id: "TWITTER",
        name: "Twitter/X Automation",
        description: "Schedule tweets, auto-reply to mentions, detect trends, and boost engagement on X.",
        icon: Twitter,
        color: "text-twitter",
        gradient: "from-[#1DA1F2] to-[#0D8ECF]",
        glowColor: "shadow-[#1DA1F2]/20",
        automationToggles: [
            { key: "TWEET_SCHEDULE", label: "Tweet Scheduling", description: "Auto-schedule & post tweets" },
            { key: "AUTO_MENTION_REPLY", label: "Auto Mention Reply", description: "AI replies to @mentions" },
            { key: "TRENDING_DETECT", label: "Trending Detection", description: "Monitor trending topics" },
            { key: "ENGAGEMENT_MONITOR", label: "Engagement Monitor", description: "Real-time engagement tracking" },
        ],
        pricing: { free: 0, starter: 19, pro: 49, enterprise: 129 },
    },
    {
        id: "FACEBOOK",
        name: "Facebook Automation",
        description: "Automate posts, moderate comments, run Messenger chatbots, and generate leads.",
        icon: Facebook,
        color: "text-facebook",
        gradient: "from-[#1877F2] to-[#0C5DC7]",
        glowColor: "shadow-[#1877F2]/20",
        automationToggles: [
            { key: "FB_POST_AUTOMATION", label: "Post Automation", description: "Auto-schedule & publish" },
            { key: "FB_COMMENT_MODERATION", label: "Comment Moderation", description: "AI spam & sentiment filter" },
            { key: "FB_MESSENGER_CHATBOT", label: "Messenger Chatbot", description: "AI-powered Messenger bot" },
            { key: "FB_LEAD_GENERATION", label: "Lead Generation", description: "Auto-qualify leads" },
        ],
        pricing: { free: 0, starter: 29, pro: 79, enterprise: 199 },
    },
    {
        id: "WHATSAPP",
        name: "WhatsApp Automation",
        description: "AI chatbot replies, appointment booking, customer support, and sales assistant.",
        icon: MessageSquare,
        color: "text-whatsapp",
        gradient: "from-[#25D366] to-[#128C7E]",
        glowColor: "shadow-[#25D366]/20",
        automationToggles: [
            { key: "WA_CHATBOT_REPLY", label: "Chatbot Reply", description: "AI auto-responds to chats" },
            { key: "WA_APPOINTMENT_BOOKING", label: "Appointment Booking", description: "Auto-schedule appointments" },
            { key: "WA_CUSTOMER_SUPPORT", label: "Customer Support", description: "AI support agent" },
            { key: "WA_SALES_ASSISTANT", label: "Sales Assistant", description: "AI sales conversation" },
        ],
        pricing: { free: 0, starter: 39, pro: 99, enterprise: 249 },
    },
    {
        id: "EMAIL",
        name: "Email Automation",
        description: "Auto-reply to emails, schedule campaigns, and track email performance analytics.",
        icon: Mail,
        color: "text-email",
        gradient: "from-[#EA4335] to-[#C5221F]",
        glowColor: "shadow-[#EA4335]/20",
        automationToggles: [
            { key: "EMAIL_AUTO_REPLY", label: "Auto Reply", description: "AI email auto-responder" },
            { key: "EMAIL_CAMPAIGN_SCHEDULE", label: "Campaign Schedule", description: "Smart email scheduling" },
        ],
        pricing: { free: 0, starter: 19, pro: 49, enterprise: 129 },
    },
    {
        id: "SMS",
        name: "SMS Automation",
        description: "Automate SMS replies, run text campaigns, and engage customers via text messaging.",
        icon: Smartphone,
        color: "text-sms",
        gradient: "from-[#A855F7] to-[#7C3AED]",
        glowColor: "shadow-[#A855F7]/20",
        automationToggles: [
            { key: "SMS_AUTO_REPLY", label: "Auto Reply", description: "AI SMS auto-responder" },
            { key: "SMS_CAMPAIGN_SCHEDULE", label: "Campaign Schedule", description: "Bulk SMS campaigns" },
        ],
        pricing: { free: 0, starter: 29, pro: 79, enterprise: 199 },
    },
    {
        id: "AI_CHATBOT",
        name: "AI Chatbot Agent",
        description: "Deploy a universal AI chatbot that works across all connected platforms simultaneously.",
        icon: Bot,
        color: "text-chatbot",
        gradient: "from-[#0EA5E9] to-[#6366F1]",
        glowColor: "shadow-[#0EA5E9]/20",
        automationToggles: [
            { key: "WA_CHATBOT_REPLY", label: "Cross-Platform Chat", description: "Unified AI chatbot" },
            { key: "WA_CUSTOMER_SUPPORT", label: "Smart Escalation", description: "Auto-escalate to humans" },
        ],
        pricing: { free: 0, starter: 49, pro: 129, enterprise: 299 },
    },
];

// ─── Main Page ────────────────────────────────────────────────────
export default function SubscriptionsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                            <Zap className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Platform Subscriptions</h1>
                    </div>
                    <p className="text-muted-foreground max-w-xl">
                        Connect your social accounts, enable AI agents, and activate automations. Each platform runs independently with its own AI brain.
                    </p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">All tokens encrypted &amp; stored securely</span>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MiniStat label="Connected" value="0" icon={<Check className="w-4 h-4" />} color="text-green-500" />
                <MiniStat label="Active Automations" value="0" icon={<Zap className="w-4 h-4" />} color="text-primary" />
                <MiniStat label="AI Agents" value="0" icon={<Bot className="w-4 h-4" />} color="text-chatbot" />
                <MiniStat label="Messages Today" value="0" icon={<MessageSquare className="w-4 h-4" />} color="text-blue-500" />
            </div>

            {/* Platform Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {PLATFORMS.map((platform, i) => (
                    <motion.div
                        key={platform.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                        <PlatformCard platform={platform} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ─── Mini Stat ────────────────────────────────────────────────────
function MiniStat({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
    return (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass transition-all hover:shadow-md">
            <div className={color}>{icon}</div>
            <div>
                <p className="text-lg font-bold tracking-tight">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>
        </div>
    );
}

// ─── Platform Card ────────────────────────────────────────────────
function PlatformCard({ platform }: { platform: PlatformConfig }) {
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [toggles, setToggles] = useState<Record<string, boolean>>({});
    const [aiActive, setAiActive] = useState(false);
    const Icon = platform.icon;

    const handleConnect = async () => {
        setLoading(true);
        // Simulate OAuth flow
        await new Promise((r) => setTimeout(r, 1500));
        setConnected(!connected);
        setLoading(false);
    };

    const handleToggle = (key: string) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const enabledCount = Object.values(toggles).filter(Boolean).length;

    return (
        <Card className={`relative overflow-hidden border-border/50 transition-all duration-300 hover:shadow-xl ${platform.glowColor} ${connected ? 'ring-1 ring-green-500/30' : ''}`}>
            {/* Gradient Top Bar */}
            <div className={`h-1.5 bg-gradient-to-r ${platform.gradient}`} />

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-lg ${platform.glowColor}`}>
                            <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-semibold">{platform.name}</CardTitle>
                            <p className="text-xs text-muted-foreground mt-0.5 max-w-[200px]">{platform.description}</p>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Connect Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 shadow-sm shadow-green-500/50' : 'bg-red-500'} transition-colors`} />
                        <span className="text-sm font-medium">{connected ? 'Connected' : 'Not Connected'}</span>
                    </div>
                    <button
                        onClick={handleConnect}
                        disabled={loading}
                        className="relative"
                        id={`connect-toggle-${platform.id}`}
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                        ) : connected ? (
                            <ToggleRight className="w-10 h-6 text-green-500 transition-colors" />
                        ) : (
                            <ToggleLeft className="w-10 h-6 text-red-400 transition-colors" />
                        )}
                    </button>
                </div>

                {/* AI Agent Status */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-2">
                        <Sparkles className={`w-4 h-4 ${aiActive ? 'text-chatbot' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-medium">AI Agent</span>
                    </div>
                    <button onClick={() => setAiActive(!aiActive)}>
                        {aiActive ? (
                            <ToggleRight className="w-10 h-6 text-chatbot transition-colors" />
                        ) : (
                            <ToggleLeft className="w-10 h-6 text-muted-foreground transition-colors" />
                        )}
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-secondary/30">
                        <p className="text-lg font-bold">{enabledCount}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Active</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-secondary/30">
                        <p className="text-lg font-bold">0</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Messages</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-secondary/30">
                        <p className="text-lg font-bold">0%</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Response</p>
                    </div>
                </div>

                {/* Expand/Collapse Automation Toggles */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors"
                    id={`expand-automations-${platform.id}`}
                >
                    <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Automation Toggles</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                            {enabledCount}/{platform.automationToggles.length}
                        </span>
                    </div>
                    {expanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                </button>

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-1.5 pt-1">
                                {platform.automationToggles.map((toggle) => (
                                    <div
                                        key={toggle.key}
                                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary/50 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{toggle.label}</p>
                                            <p className="text-xs text-muted-foreground truncate">{toggle.description}</p>
                                        </div>
                                        <button onClick={() => handleToggle(toggle.key)}>
                                            {toggles[toggle.key] ? (
                                                <ToggleRight className="w-9 h-5 text-green-500 shrink-0 transition-colors" />
                                            ) : (
                                                <ToggleLeft className="w-9 h-5 text-muted-foreground shrink-0 transition-colors" />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notifications Preview */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/30">
                    <Bell className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">No recent notifications</span>
                </div>

                {/* Subscribe / Manage Button */}
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 text-white bg-gradient-to-r ${platform.gradient} hover:opacity-90 hover:shadow-lg ${platform.glowColor}`}>
                    <Star className="w-4 h-4" />
                    {connected ? 'Manage Subscription' : `Subscribe • From $${platform.pricing.starter}/mo`}
                    <ArrowRight className="w-4 h-4" />
                </button>
            </CardContent>
        </Card>
    );
}
