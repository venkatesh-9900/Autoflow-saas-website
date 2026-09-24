"use client";

type Category = "Templates" | "AI Agents";

import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search, Filter, ShoppingCart,
    Calendar, CheckCircle2, ArrowRight,
    Star, Heart, Zap, TrendingUp, Rocket, Flame, Loader2, Check, Bot, MessageCircle
} from "lucide-react";

type Template = {
    id: string;
    name: string;
    desc: string;
    category: string;
    price: string;
    channel: string;
    color: string;
    icon: string;
    stats: string;
    type: Category;
};

// Map string icons to Lucide components dynamically or statically
const iconMap: Record<string, React.ReactNode> = {
    ShoppingCart: <ShoppingCart className="w-8 h-8" />,
    Calendar: <Calendar className="w-8 h-8" />,
    TrendingUp: <TrendingUp className="w-8 h-8" />,
    Rocket: <Rocket className="w-6 h-6" />,
    Heart: <Heart className="w-6 h-6" />,
    CheckCircle2: <CheckCircle2 className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    Star: <Star className="w-6 h-6" />,
    Bot: <Bot className="w-8 h-8" />,
    MessageCircle: <MessageCircle className="w-6 h-6" />
};

export default function TemplateMarketplace() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<Category>("Templates");

    // Simulate fetch from Backend 'GET /templates/marketplace'
    useEffect(() => {
        const fetchTemplates = async () => {
            // Simulated network delay
            await new Promise(r => setTimeout(r, 1000));
            setTemplates([
                { id: 'm1', type: 'Templates', name: 'Abandoned Cart Recovery', desc: 'Boost e-commerce revenue with multi-channel reminders.', category: 'E-commerce', price: 'Free', channel: 'WHATSAPP', color: 'from-orange-500 to-red-500', icon: 'ShoppingCart', stats: '1.2k imports' },
                { id: 'm2', type: 'Templates', name: 'Webinar Engagement Funnel', desc: 'Automated reminders and replay sequences via DM & Email.', category: 'Events', price: 'Free', channel: 'EMAIL', color: 'from-blue-500 to-indigo-600', icon: 'Calendar', stats: '850 imports' },
                { id: 'm3', type: 'Templates', name: 'Viral Lead Generation', desc: 'Automated welcome sequences for high-growth campaigns.', category: 'Growth', price: 'Free', channel: 'INSTAGRAM', color: 'from-emerald-500 to-teal-600', icon: 'TrendingUp', stats: '2.4k imports' },
                { id: 'm4', type: 'Templates', name: 'Customer Onboarding', desc: 'Welcome new users and guide them through setup.', category: 'Retention', price: 'Free', channel: 'EMAIL', color: 'from-purple-500 to-pink-500', icon: 'Rocket', stats: '3.1k imports' },
                { id: 'm5', type: 'AI Agents', name: 'Customer Support Bot', desc: 'AI-trained agent that resolves 80% of Tier 1 queries instantly.', category: 'Support', price: 'Free', channel: 'WHATSAPP', color: 'from-cyan-500 to-blue-500', icon: 'Bot', stats: '5.6k installs' },
                { id: 'm6', type: 'Templates', name: 'Feedback Collection', desc: 'Automated survey sequences.', category: 'Survey', price: 'Free', channel: 'EMAIL', color: 'from-yellow-400 to-orange-500', icon: 'CheckCircle2', stats: '920 imports' },
                { id: 'm7', type: 'AI Agents', name: 'Sales Closer Agent', desc: 'Negotiates and closes leads directly in DMs.', category: 'Sales', price: 'Pro', channel: 'INSTAGRAM', color: 'from-pink-500 to-rose-500', icon: 'Zap', stats: '1.5k installs' },
                { id: 'm8', type: 'AI Agents', name: 'Appointment Booker', desc: 'Syncs with your calendar to book qualified leads.', category: 'Booking', price: 'Pro', channel: 'SMS', color: 'from-violet-500 to-purple-600', icon: 'Calendar', stats: '430 installs' }
            ]);
            setLoading(false);
        };
        fetchTemplates();
    }, []);

    const filtered = templates.filter(t =>
        t.type === activeTab &&
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const topTrending = filtered.slice(0, 3);
    const allOthers = filtered.slice(3);

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Marketplace</h1>
                    <p className="text-muted-foreground text-xl font-medium">Discover ready-made AI agents and automation templates.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Category)} className="h-14 shrink-0">
                        <TabsList className="h-full rounded-[1.5rem] bg-secondary/30 p-1">
                            <TabsTrigger value="Templates" className="rounded-2xl h-full px-6 text-sm font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Templates</TabsTrigger>
                            <TabsTrigger value="AI Agents" className="rounded-2xl h-full px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">AI Agents</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="relative flex-1 sm:w-72">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                        <Input
                            className="bg-secondary/20 border-border/60 pl-12 pr-12 rounded-[1.5rem] h-14 w-full text-base focus:ring-primary/20 transition-all font-medium"
                            placeholder={`Search ${activeTab.toLowerCase()}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-semibold"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                    <p className="font-bold">Loading Marketplace...</p>
                </div>
            ) : (
                <>
                    {/* Trending Section */}
                    {searchTerm === "" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {topTrending.map(t => (
                                <FeaturedTemplate key={t.id} template={t} />
                            ))}
                        </div>
                    )}

                    {/* Main Listing */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black flex items-center gap-3">
                                <Flame className="w-6 h-6 text-orange-500" /> {searchTerm ? "Search Results" : "Hot & New"}
                            </h2>
                            {!searchTerm && <Button variant="ghost" className="font-bold text-primary">View all <ArrowRight className="ml-2 w-4 h-4" /></Button>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {(searchTerm ? filtered : allOthers).map(t => (
                                <TemplateCard key={t.id} template={t} />
                            ))}
                            {filtered.length === 0 && (
                                <div className="col-span-full py-12 text-center text-muted-foreground font-medium">
                                    No templates found matching your search.
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function FeaturedTemplate({ template }: { template: Template }) {
    const [importing, setImporting] = useState(false);
    const [imported, setImported] = useState(false);

    const handleImport = async () => {
        setImporting(true);
        // Simulate clone post to /api/templates/marketplace/:id/clone
        await new Promise(r => setTimeout(r, 1500));
        setImporting(false);
        setImported(true);
    };

    return (
        <Card className={`border-none rounded-[2.5rem] overflow-hidden group relative min-h-[320px] flex flex-col justify-end p-8 text-white shadow-2xl transition-all duration-300 hover:shadow-primary/20`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-90 group-hover:scale-110 transition-transform duration-1000 -z-10`} />
            <div className="absolute top-8 right-8 w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white">
                {iconMap[template.icon]}
            </div>
            <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-none font-black uppercase tracking-widest text-[9px] w-fit">{template.category}</Badge>
                <CardTitle className="text-3xl font-black leading-tight">{template.name}</CardTitle>
                <p className="text-white/80 font-medium text-sm leading-relaxed">{template.desc}</p>
                <div className="pt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{template.stats}</span>
                    <Button
                        onClick={handleImport}
                        disabled={importing || imported}
                        className={`bg-white text-foreground hover:bg-white/90 rounded-xl font-bold px-6 transition-all ${imported ? 'bg-emerald-500 text-white hover:bg-emerald-500' : ''}`}
                    >
                        {importing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : imported ? <Check className="w-4 h-4 mr-2" /> : null}
                        {importing ? "Importing" : imported ? "Imported" : "Preview"}
                    </Button>
                </div>
            </div>
        </Card>
    );
}

function TemplateCard({ template }: { template: Template }) {
    const [importing, setImporting] = useState(false);
    const [imported, setImported] = useState(false);

    const handleImport = async () => {
        setImporting(true);
        // Simulate clone post
        await new Promise(r => setTimeout(r, 1000));
        setImporting(false);
        setImported(true);
    };

    return (
        <Card className="border-border/60 shadow-sm rounded-[1.5rem] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between group bg-card">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {iconMap[template.icon] || <Rocket className="w-6 h-6" />}
                    </div>
                    {template.price === 'Pro' ? (
                        <Badge className="bg-primary/10 text-primary border-none font-black uppercase tracking-widest text-[9px]">Pro</Badge>
                    ) : (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black uppercase tracking-widest text-[9px]">Free</Badge>
                    )}
                </div>
                <h3 className="font-black text-lg leading-tight group-hover:text-primary transition-colors">{template.name}</h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{template.category}</p>
            </div>
            <div className="mt-8 flex gap-2">
                <Button variant="outline" className="flex-1 rounded-xl h-10 text-xs font-bold border-border/60">Details</Button>
                <Button
                    onClick={handleImport}
                    disabled={importing || imported}
                    className={`flex-1 rounded-xl h-10 text-xs font-black shadow-lg transition-all ${imported ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20' : 'shadow-primary/10'}`}
                >
                    {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : imported ? <Check className="w-4 h-4 mr-1" /> : null}
                    {importing ? "" : imported ? "Saved" : "Import"}
                </Button>
            </div>
        </Card>
    );
}
