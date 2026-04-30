"use client";

import { Card } from "@/components/ui/card";
import { Search, BookOpen, ChevronRight, PlayCircle, Zap, ShieldAlert } from "lucide-react";

export default function DocumentationCenter() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Documentation Center</h1>
                    <p className="text-muted-foreground font-medium">Learn how to build automations and connect your favorite tools.</p>
                </div>
            </div>

            <div className="relative max-w-2xl mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search guides, tutorials, and troubleshooting..."
                    className="w-full bg-background border-2 border-border/60 rounded-2xl py-4 pl-12 pr-4 text-base focus:outline-none focus:border-primary transition-colors shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <DocsCategory
                    title="Getting Started"
                    desc="Basics of AutoFlow AI"
                    icon={<PlayCircle className="w-5 h-5 text-blue-500" />}
                />
                <DocsCategory
                    title="Integrations API"
                    desc="Connect Meta, Twilio & SMTP"
                    icon={<Zap className="w-5 h-5 text-emerald-500" />}
                />
                <DocsCategory
                    title="Troubleshooting"
                    desc="Fixing common delivery issues"
                    icon={<ShieldAlert className="w-5 h-5 text-orange-500" />}
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight mb-4">Popular Articles</h3>
                <ArticleRow title="How to authenticate your WhatsApp Business account" category="Integrations" time="5 min read" />
                <ArticleRow title="Building your first multi-channel automated funnel" category="Workflows" time="12 min read" />
                <ArticleRow title="Connecting custom SMTP for higher email deliverability" category="Email" time="8 min read" />
                <ArticleRow title="Why did my Instagram Auto-DM fail?" category="Troubleshooting" time="3 min read" />
            </div>
        </div>
    );
}

function DocsCategory({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <Card className="border-border/60 shadow-sm rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                {icon}
            </div>
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-sm font-medium text-muted-foreground">{desc}</p>
        </Card>
    );
}

function ArticleRow({ title, category, time }: { title: string, category: string, time: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:bg-secondary/10 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                    <BookOpen className="w-4 h-4" />
                </div>
                <div>
                    <h4 className="font-bold text-sm">{title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">{category}</span>
                        <span className="text-[10px] text-muted-foreground font-bold">• {time}</span>
                    </div>
                </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
    );
}
