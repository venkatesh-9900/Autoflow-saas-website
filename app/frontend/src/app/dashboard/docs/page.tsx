"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Search, BookOpen, ChevronRight, PlayCircle, Zap, ShieldAlert, X } from "lucide-react";

interface Article {
    title: string;
    category: string;
    time: string;
    description: string;
}

const ARTICLES: Article[] = [
    {
        title: "How to authenticate your WhatsApp Business account",
        category: "Integrations",
        time: "5 min read",
        description: "Step-by-step setup for Meta Cloud API and permanent token generation."
    },
    {
        title: "Building your first multi-channel automated funnel",
        category: "Workflows",
        time: "12 min read",
        description: "Connect Instagram comments to WhatsApp nurturing sequences with AI prompts."
    },
    {
        title: "Connecting custom SMTP for higher email deliverability",
        category: "Email",
        time: "8 min read",
        description: "Configure SendGrid, Resend, or Amazon SES with SPF and DKIM records."
    },
    {
        title: "Why did my Instagram Auto-DM fail?",
        category: "Troubleshooting",
        time: "3 min read",
        description: "Resolve 24-hour messaging window and Meta permissions limits."
    },
    {
        title: "Fine-tuning AI Agent system prompts for sales",
        category: "Workflows",
        time: "7 min read",
        description: "Best practices for temperature, context memory, and brand voice guidelines."
    },
    {
        title: "Setting up webhook triggers with n8n and AutoFlow",
        category: "Integrations",
        time: "10 min read",
        description: "Listen to real-time events and orchestrate background workflows."
    },
];

export default function DocumentationCenter() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredArticles = ARTICLES.filter((article) => {
        const matchesCategory = selectedCategory ? article.category.toLowerCase() === selectedCategory.toLowerCase() : true;
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = query
            ? article.title.toLowerCase().includes(query) ||
              article.category.toLowerCase().includes(query) ||
              article.description.toLowerCase().includes(query)
            : true;
        return matchesCategory && matchesQuery;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Documentation Center</h1>
                    <p className="text-muted-foreground font-medium">Learn how to build automations and connect your favorite tools.</p>
                </div>
            </div>

            <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search guides, tutorials, and troubleshooting..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-background border-2 border-border/60 rounded-2xl py-4 pl-12 pr-12 text-base focus:outline-none focus:border-primary transition-colors shadow-sm"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Category Quick Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DocsCategory
                    title="Getting Started"
                    desc="Basics of AutoFlow AI & quick start"
                    icon={<PlayCircle className="w-5 h-5 text-blue-500" />}
                    active={selectedCategory === "Workflows"}
                    onClick={() => setSelectedCategory(selectedCategory === "Workflows" ? null : "Workflows")}
                />
                <DocsCategory
                    title="Integrations API"
                    desc="Connect Meta, Twilio & SMTP"
                    icon={<Zap className="w-5 h-5 text-emerald-500" />}
                    active={selectedCategory === "Integrations"}
                    onClick={() => setSelectedCategory(selectedCategory === "Integrations" ? null : "Integrations")}
                />
                <DocsCategory
                    title="Troubleshooting"
                    desc="Fixing common delivery issues"
                    icon={<ShieldAlert className="w-5 h-5 text-orange-500" />}
                    active={selectedCategory === "Troubleshooting"}
                    onClick={() => setSelectedCategory(selectedCategory === "Troubleshooting" ? null : "Troubleshooting")}
                />
            </div>

            <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold tracking-tight">
                        {selectedCategory ? `${selectedCategory} Articles` : "Popular Articles"}
                        <span className="text-sm font-normal text-muted-foreground ml-2">({filteredArticles.length})</span>
                    </h3>
                    {selectedCategory && (
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="text-xs font-semibold text-primary hover:underline"
                        >
                            View All Categories
                        </button>
                    )}
                </div>

                {filteredArticles.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border/50 rounded-2xl">
                        No documentation articles found matching &quot;{searchQuery}&quot;.
                    </div>
                ) : (
                    filteredArticles.map((article) => (
                        <ArticleRow
                            key={article.title}
                            title={article.title}
                            category={article.category}
                            time={article.time}
                            description={article.description}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function DocsCategory({
    title,
    desc,
    icon,
    active,
    onClick
}: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    active?: boolean;
    onClick: () => void;
}) {
    return (
        <Card
            onClick={onClick}
            className={`border-border/60 shadow-sm rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer group ${
                active ? "ring-2 ring-primary/40 bg-primary/5" : ""
            }`}
        >
            <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                {icon}
            </div>
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-sm font-medium text-muted-foreground">{desc}</p>
        </Card>
    );
}

function ArticleRow({
    title,
    category,
    time,
    description
}: {
    title: string;
    category: string;
    time: string;
    description: string;
}) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:bg-secondary/10 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                    <BookOpen className="w-4 h-4" />
                </div>
                <div>
                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{description}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">{category}</span>
                        <span className="text-[10px] text-muted-foreground font-bold">• {time}</span>
                    </div>
                </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </div>
    );
}

