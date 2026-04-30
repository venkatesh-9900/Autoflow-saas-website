"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Globe, Send, Users, Layers,
    CheckCircle2, Zap,
    ArrowRight, Megaphone
} from "lucide-react";

export default function CommunityDashboard() {
    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Community & Broadcast</h1>
                    <p className="text-muted-foreground font-medium">Broadcast messages across WhatsApp groups and community channels.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl font-bold bg-background/50 border-border/60">
                        History
                    </Button>
                    <Button className="rounded-xl font-bold shadow-lg shadow-primary/20 bg-community hover:opacity-90 transition-opacity">
                        <Send className="w-4 h-4 mr-2" /> New Broadcast
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MiniStat title="Total Groups" value="48" icon={<Users className="w-4 h-4" />} />
                <MiniStat title="Subscribers" value="12.4k" icon={<Globe className="w-4 h-4" />} />
                <MiniStat title="Delivery Rate" value="99.2%" icon={<CheckCircle2 className="w-4 h-4" />} />
                <MiniStat title="Engagement" value="18.5%" icon={<Layers className="w-4 h-4" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-border/60 shadow-xl rounded-[2rem] overflow-hidden bg-background/50 backdrop-blur-xl border-t-4 border-t-community">
                    <CardHeader className="p-8">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-community/10 text-community flex items-center justify-center">
                                <Megaphone className="w-6 h-6" />
                            </div>
                            <Badge className="bg-community/20 text-community border-none uppercase font-black tracking-widest text-[10px]">Active Channels</Badge>
                        </div>
                        <CardTitle className="text-3xl font-black">Broadcast Channels</CardTitle>
                        <CardDescription className="text-lg">Manage your connected WhatsApp Communities and Groups.</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-4">
                        <ChannelRow name="Global Customer VIP" type="WhatsApp Community" count="4,200 members" />
                        <ChannelRow name="Product Updates v2" type="Announcement Group" count="1,150 members" />
                        <ChannelRow name="Feedback & Community" type="Interactive Group" count="840 members" />

                        <Button variant="outline" className="w-full h-14 border-dashed rounded-2xl font-bold border-2 border-border/60 hover:border-community/40 transition-colors mt-4">
                            <PlusIcon className="mr-2" /> Add New Channel
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <Card className="border-border/60 shadow-lg rounded-[2rem] p-8 bg-gradient-to-br from-community/5 to-transparent relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-community opacity-[0.03] rounded-full group-hover:scale-120 transition-transform duration-700" />
                        <CardTitle className="text-xl font-black mb-4">Quick Broadcast</CardTitle>
                        <textarea
                            className="w-full bg-secondary/30 border border-border/40 rounded-2xl p-4 text-sm h-40 focus:outline-none focus:ring-2 focus:ring-community/20 mb-6 font-medium placeholder:text-muted-foreground/40"
                            placeholder="Type reaching your entire community in seconds..."
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary/50" />)}
                                <div className="w-8 h-8 rounded-full border-2 border-background bg-community text-[10px] flex items-center justify-center text-white font-black">+45</div>
                            </div>
                            <Button className="rounded-full h-12 px-6 shadow-xl shadow-community/30 hover:scale-105 active:scale-95 transition-all">
                                Send Now <ArrowRight className="ml-2 w-4 h-4 text-white" />
                            </Button>
                        </div>
                    </Card>

                    <Card className="border-border/60 shadow-lg rounded-[2rem] p-8">
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Viral Loops
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-2xl">
                                <span className="font-bold text-sm">Join Link Tracking</span>
                                <div className="w-10 h-6 bg-community rounded-full flex items-center px-1">
                                    <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-2xl">
                                <span className="font-bold text-sm">Auto-Welcome Message</span>
                                <div className="w-10 h-6 bg-community rounded-full flex items-center px-1 shadow-inner">
                                    <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function MiniStat({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <Card className="border-border/60 shadow-sm rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground/50">
                    {icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">{title}</span>
            </div>
            <div className="text-2xl font-black tracking-tight">{value}</div>
        </Card>
    );
}

function ChannelRow({ name, type, count }: { name: string, type: string, count: string }) {
    return (
        <div className="flex items-center justify-between p-5 bg-secondary/5 border border-border/40 rounded-2xl hover:bg-secondary/10 hover:border-community/20 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-community/10 text-community flex items-center justify-center font-black">
                    {name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-black text-sm group-hover:text-community transition-colors">{name}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{type}</p>
                </div>
            </div>
            <div className="text-right">
                <div className="text-[10px] font-black uppercase text-muted-foreground mb-1">{count}</div>
                <div className="flex gap-1 justify-end">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 opactiy-30" />
                </div>
            </div>
        </div>
    );
}

function PlusIcon({ className }: { className?: string }) {
    return <svg className={`${className} w-4 h-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>;
}
