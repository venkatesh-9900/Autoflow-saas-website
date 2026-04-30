"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Users, Target, Plus, Edit2
} from "lucide-react";

export default function SegmentsPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tight mb-4 text-gradient">Smart Segments</h1>
                    <p className="text-muted-foreground text-xl font-medium">Dynamic groups that update automatically based on behavior.</p>
                </div>
                <Button className="rounded-2xl h-14 px-8 font-black shadow-xl shadow-primary/20 bg-primary text-primary-foreground">
                    <Plus className="w-5 h-5 mr-3" /> Create Segment
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Card className="lg:col-span-1 border-border/60 shadow-sm rounded-[2.5rem] p-8 glass space-y-8 h-fit">
                    <div className="space-y-2">
                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Quick Filters</h3>
                        <div className="space-y-2">
                            <FilterItem label="Purchased in 30d" count={12} active />
                            <FilterItem label="Never Opened Email" count={85} />
                            <FilterItem label="High LTV (> $500)" count={22} />
                            <FilterItem label="Social Referrals" count={301} />
                        </div>
                    </div>
                </Card>

                <div className="lg:col-span-3 space-y-6">
                    <SegmentCard
                        name="VIP Customers"
                        desc="Customers with more than 5 purchases and total spend > $500."
                        count={124}
                        tags={['E-commerce', 'High Value']}
                        lastUpdated="2 minutes ago"
                    />
                    <SegmentCard
                        name="New Signups (SMS Only)"
                        desc="Users who signed up in the last 7 days and only verified phone."
                        count={89}
                        tags={['SMS', 'Lead']}
                        lastUpdated="1 hour ago"
                    />
                    <SegmentCard
                        name="Abandoned Cart - Email Series"
                        desc="Users who left items in cart and haven't clicked the first link."
                        count={2402}
                        tags={['Retention', 'Email']}
                        lastUpdated="4 hours ago"
                    />
                </div>
            </div>
        </div>
    );
}

function FilterItem({ label, count, active }: { label: string, count: number, active?: boolean }) {
    return (
        <div className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-secondary/20 text-muted-foreground border border-transparent'}`}>
            <span className="text-xs font-bold">{label}</span>
            <span className="text-[10px] font-black">{count}</span>
        </div>
    );
}

function SegmentCard({ name, desc, count, tags, lastUpdated }: { name: string, desc: string, count: number, tags: string[], lastUpdated: string }) {
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

                <div className="flex flex-col gap-2 min-w-[140px]">
                    <Button className="rounded-xl h-12 font-black shadow-lg shadow-primary/10">Use in Campaign</Button>
                    <Button variant="ghost" className="rounded-xl h-12 font-bold text-xs"><Edit2 className="w-3.5 h-3.5 mr-2" /> Edit Rules</Button>
                </div>
            </div>
            {/* Visual background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-1000" />
        </Card>
    );
}
