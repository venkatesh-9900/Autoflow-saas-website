"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Instagram, Heart,
    AtSign, Search, Filter,
    MoreHorizontal, Sparkles
} from "lucide-react";
import { InstagramAgent } from "@/components/instagram-agent";

export default function InstagramDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Instagram Marketing</h1>
                    <p className="text-muted-foreground font-medium">Automate DMs, story replies, and comment engagements.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/monitoring">
                        <Button variant="outline" className="rounded-xl font-bold bg-background/50 border-border/60">
                            View Analytics
                        </Button>
                    </Link>
                    <Link href="/dashboard/integrations">
                        <Button className="rounded-xl font-bold shadow-lg shadow-primary/20 bg-gradient-to-r from-instagram to-pink-500 hover:opacity-90 transition-opacity">
                            <Instagram className="w-4 h-4 mr-2" /> Connect Account
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Active Automations"
                    value="12"
                    change="+2 this week"
                    icon={<Sparkles className="w-4 h-4 text-instagram" />}
                />
                <StatCard
                    title="Engagements"
                    value="1,284"
                    change="+15% organic"
                    icon={<Heart className="w-4 h-4 text-pink-500" />}
                />
                <StatCard
                    title="Conversion Rate"
                    value="4.2%"
                    change="+0.8% auto-DM"
                    icon={<AtSign className="w-4 h-4 text-blue-500" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-border/60 shadow-sm rounded-2xl overflow-hidden glass">
                    <CardHeader className="border-b border-border/40 bg-secondary/10 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">Recent Interactions</CardTitle>
                            <CardDescription>View and respond to automated conversations.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    className="bg-background border border-border/60 rounded-lg text-xs py-2 pl-9 pr-4 w-48 focus:outline-none focus:ring-2 focus:ring-instagram/20 transition-all"
                                    placeholder="Search username..."
                                />
                            </div>
                            <Button size="icon" variant="ghost" className="rounded-lg h-9 w-9">
                                <Filter className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/40">
                            <InteractionItem
                                user="@cosmic_traveler"
                                avatar="CT"
                                msg="Sent a DM from keyword trigger 'BOOK'"
                                time="2m ago"
                                status="Responded"
                            />
                            <InteractionItem
                                user="@design_guru"
                                avatar="DG"
                                msg="Story mention engagement sent"
                                time="15m ago"
                                status="Auto-replied"
                            />
                            <InteractionItem
                                user="@tech_ninja"
                                avatar="TN"
                                msg="Comment-to-DM automated"
                                time="1h ago"
                                status="Queued"
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-border/60 shadow-sm rounded-2xl p-6 bg-secondary/5 border-dashed border-2 flex flex-col items-center justify-center text-center py-12">
                        <div className="w-16 h-16 rounded-2xl bg-instagram/10 text-instagram flex items-center justify-center mb-6">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Keyword Automation</h3>
                        <p className="text-sm text-muted-foreground font-medium mb-6 px-4">Create triggers that automatically respond when users use specific words in DMs or comments.</p>
                        <Link href="/dashboard/builder" className="w-full">
                            <Button variant="outline" className="rounded-xl font-bold w-full">Create Trigger</Button>
                        </Link>
                    </Card>

                    <Card className="border-border/60 shadow-sm rounded-2xl p-6 bg-gradient-to-br from-instagram/10 to-transparent">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-instagram mb-4">Meta Status</h4>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-bold text-sm">Direct API Connected</span>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Dedicated In-Page Instagram AI Agent Section (Bottom of Page) & Floating Launcher */}
            <InstagramAgent />
        </div>
    );
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
    return (
        <Card className="border-border/60 shadow-sm rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest leading-none">{title}</span>
                <div className="p-2 bg-secondary/30 rounded-lg">
                    {icon}
                </div>
            </div>
            <div className="text-3xl font-black mb-1">{value}</div>
            <div className="text-xs font-bold text-emerald-500">{change}</div>
        </Card>
    );
}

function InteractionItem({ user, avatar, msg, time, status }: { user: string, avatar: string, msg: string, time: string, status: string }) {
    return (
        <Link href="/dashboard/inbox" className="p-6 flex items-center gap-4 hover:bg-secondary/10 transition-colors cursor-pointer group block">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-instagram/20 to-pink-500/20 flex items-center justify-center font-black text-instagram">
                {avatar}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-sm">{user}</span>
                    <span className="text-[10px] text-muted-foreground font-bold">• {time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate font-medium">{msg}</p>
            </div>
            <div className="flex items-center gap-4">
                <Badge variant="outline" className="rounded-md bg-background border-border/60 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                    {status}
                </Badge>
                <Button size="icon" variant="ghost" className="rounded-lg h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </div>
        </Link>
    );
}
