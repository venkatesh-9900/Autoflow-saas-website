"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Users, Target, Plus, Edit2, CheckCircle2
} from "lucide-react";

interface SegmentItem {
    id: string;
    name: string;
    desc: string;
    count: number;
    tags: string[];
    lastUpdated: string;
    filterKey: string;
}

const INITIAL_SEGMENTS: SegmentItem[] = [
    {
        id: "s1",
        name: "VIP Customers",
        desc: "Customers with more than 5 purchases and total spend > $500.",
        count: 124,
        tags: ['E-commerce', 'High Value'],
        lastUpdated: "2 minutes ago",
        filterKey: "High LTV (> $500)",
    },
    {
        id: "s2",
        name: "New Signups (SMS Only)",
        desc: "Users who signed up in the last 7 days and only verified phone.",
        count: 89,
        tags: ['SMS', 'Lead'],
        lastUpdated: "1 hour ago",
        filterKey: "Purchased in 30d",
    },
    {
        id: "s3",
        name: "Abandoned Cart - Email Series",
        desc: "Users who left items in cart and haven't clicked the first link.",
        count: 2402,
        tags: ['Retention', 'Email'],
        lastUpdated: "4 hours ago",
        filterKey: "Never Opened Email",
    },
    {
        id: "s4",
        name: "Instagram Viral Referrals",
        desc: "Users acquired via Instagram Story mentions and referral links.",
        count: 301,
        tags: ['Social', 'Instagram'],
        lastUpdated: "Yesterday",
        filterKey: "Social Referrals",
    },
];

export default function SegmentsPage() {
    const [segments, setSegments] = useState<SegmentItem[]>(INITIAL_SEGMENTS);
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Create form state
    const [segName, setSegName] = useState("");
    const [segDesc, setSegDesc] = useState("");
    const [segTags, setSegTags] = useState("");

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!segName.trim()) return;

        const newSegment: SegmentItem = {
            id: `s_${Date.now()}`,
            name: segName.trim(),
            desc: segDesc.trim() || "Dynamic behavioral rule segment.",
            count: Math.floor(Math.random() * 200) + 15,
            tags: segTags ? segTags.split(",").map(t => t.trim()).filter(Boolean) : ["Custom"],
            lastUpdated: "Just now",
            filterKey: activeFilter !== "All" ? activeFilter : "Custom",
        };

        setSegments([newSegment, ...segments]);
        setSegName("");
        setSegDesc("");
        setSegTags("");
        setIsCreateOpen(false);
    };

    const filteredSegments = activeFilter === "All"
        ? segments
        : segments.filter(s => s.filterKey === activeFilter || s.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-gradient">Smart Segments</h1>
                    <p className="text-muted-foreground text-lg md:text-xl font-medium">Dynamic groups that update automatically based on behavior.</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="rounded-2xl h-14 px-8 font-black shadow-xl shadow-primary/20 bg-primary text-primary-foreground">
                            <Plus className="w-5 h-5 mr-3" /> Create Segment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px] rounded-2xl">
                        <form onSubmit={handleCreate} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Create Smart Segment</DialogTitle>
                                <DialogDescription>
                                    Define rules to automatically group customers based on activity.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 py-2">
                                <div className="space-y-1.5">
                                    <Label htmlFor="s-name">Segment Name *</Label>
                                    <Input
                                        id="s-name"
                                        placeholder="e.g. High Intent Buyers"
                                        value={segName}
                                        onChange={(e) => setSegName(e.target.value)}
                                        required
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="s-desc">Rule Description</Label>
                                    <Input
                                        id="s-desc"
                                        placeholder="e.g. Customers with > 3 orders in last 60 days"
                                        value={segDesc}
                                        onChange={(e) => setSegDesc(e.target.value)}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="s-tags">Channel Tags (comma separated)</Label>
                                    <Input
                                        id="s-tags"
                                        placeholder="e.g. E-Commerce, High Value, WhatsApp"
                                        value={segTags}
                                        onChange={(e) => setSegTags(e.target.value)}
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="rounded-xl">
                                    Cancel
                                </Button>
                                <Button type="submit" className="rounded-xl shadow-md shadow-primary/20">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Save Segment
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Card className="lg:col-span-1 border-border/60 shadow-sm rounded-[2.5rem] p-6 glass space-y-6 h-fit">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Quick Filters</h3>
                            {activeFilter !== "All" && (
                                <button
                                    onClick={() => setActiveFilter("All")}
                                    className="text-[11px] font-bold text-primary hover:underline"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                        <div className="space-y-2">
                            <FilterItem
                                label="All Segments"
                                count={segments.length}
                                active={activeFilter === "All"}
                                onClick={() => setActiveFilter("All")}
                            />
                            <FilterItem
                                label="Purchased in 30d"
                                count={12}
                                active={activeFilter === "Purchased in 30d"}
                                onClick={() => setActiveFilter("Purchased in 30d")}
                            />
                            <FilterItem
                                label="Never Opened Email"
                                count={85}
                                active={activeFilter === "Never Opened Email"}
                                onClick={() => setActiveFilter("Never Opened Email")}
                            />
                            <FilterItem
                                label="High LTV (> $500)"
                                count={22}
                                active={activeFilter === "High LTV (> $500)"}
                                onClick={() => setActiveFilter("High LTV (> $500)")}
                            />
                            <FilterItem
                                label="Social Referrals"
                                count={301}
                                active={activeFilter === "Social Referrals"}
                                onClick={() => setActiveFilter("Social Referrals")}
                            />
                        </div>
                    </div>
                </Card>

                <div className="lg:col-span-3 space-y-6">
                    {filteredSegments.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-border/50 rounded-[2.5rem]">
                            No segments match &quot;{activeFilter}&quot;.
                        </div>
                    ) : (
                        filteredSegments.map((seg) => (
                            <SegmentCard
                                key={seg.id}
                                name={seg.name}
                                desc={seg.desc}
                                count={seg.count}
                                tags={seg.tags}
                                lastUpdated={seg.lastUpdated}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function FilterItem({
    label,
    count,
    active,
    onClick,
}: {
    label: string;
    count: number;
    active?: boolean;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className={`p-3.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                active
                    ? 'bg-primary/10 text-primary border border-primary/20 font-bold'
                    : 'hover:bg-secondary/20 text-muted-foreground border border-transparent'
            }`}
        >
            <span className="text-xs">{label}</span>
            <span className="text-[10px] font-black">{count}</span>
        </div>
    );
}

function SegmentCard({
    name,
    desc,
    count,
    tags,
    lastUpdated
}: {
    name: string;
    desc: string;
    count: number;
    tags: string[];
    lastUpdated: string;
}) {
    const [inCampaign, setInCampaign] = useState(false);

    return (
        <Card className="border-border/60 shadow-sm rounded-[2.5rem] p-8 glass hover:shadow-2xl transition-all duration-500 overflow-hidden relative group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black">{name}</h3>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                                    <Users className="w-3 h-3" /> {count.toLocaleString()} Contacts
                                </span>
                                <span className="text-[10px] font-bold text-muted-foreground/60">• Updated {lastUpdated}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-2xl">{desc}</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <Badge key={tag} variant="outline" className="rounded-lg bg-background border-border/60 text-[9px] font-black uppercase tracking-widest py-1">{tag}</Badge>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[150px] shrink-0">
                    <Button
                        onClick={() => setInCampaign(!inCampaign)}
                        className={`rounded-xl h-12 font-black transition-all ${
                            inCampaign ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'shadow-lg shadow-primary/10'
                        }`}
                    >
                        {inCampaign ? (
                            <>
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Linked
                            </>
                        ) : (
                            "Use in Campaign"
                        )}
                    </Button>
                    <Button variant="ghost" className="rounded-xl h-12 font-bold text-xs">
                        <Edit2 className="w-3.5 h-3.5 mr-2" /> Edit Rules
                    </Button>
                </div>
            </div>
            {/* Visual background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-1000" />
        </Card>
    );
}

