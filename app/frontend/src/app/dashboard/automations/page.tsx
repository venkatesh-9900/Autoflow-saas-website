"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Activity, Bot, Zap, Clock, AlertTriangle,
    MessageCircle, Instagram, Mail, MessageSquare,
    CheckCircle2, PauseCircle, PlayCircle, Settings2, MoreHorizontal
} from "lucide-react";

const MOCK_AUTOMATIONS = [
    { id: 1, name: "IG Comment Auto-DM", platform: "Instagram", icon: <Instagram className="w-4 h-4" />, status: "Active", runs: 1240, successRate: "99.8%", lastRun: "2 mins ago" },
    { id: 2, name: "WhatsApp Booking Agent", platform: "WhatsApp", icon: <MessageCircle className="w-4 h-4" />, status: "Active", runs: 856, successRate: "97.5%", lastRun: "15 mins ago" },
    { id: 3, name: "Abandoned Cart Recovery", platform: "Email", icon: <Mail className="w-4 h-4" />, status: "Paused", runs: 4320, successRate: "100%", lastRun: "2 days ago" },
    { id: 4, name: "Facebook Lead Capture", platform: "Facebook", icon: <MessageSquare className="w-4 h-4" />, status: "Error", runs: 342, successRate: "82.4%", lastRun: "1 hour ago" },
];

export default function AutomationsPage() {
    const [stats] = useState({
        active: 12,
        totalRuns: '24.5k',
        savedHours: 142,
        errorRate: '0.2%'
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Command Center</h1>
                    <p className="text-muted-foreground font-medium">Monitor and control all your active AI agents and automation flows.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6 font-bold border-border/60 glass rounded-[1rem]">
                        <Settings2 className="w-4 h-4 mr-2" /> Global Settings
                    </Button>
                    <Button className="h-11 px-6 font-bold shadow-lg shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600 text-white border-0 rounded-[1rem]">
                        <Zap className="w-4 h-4 mr-2 fill-current" /> New Automation
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Active Automations" value={stats.active} icon={<Bot className="w-5 h-5 text-primary" />} trend="+2 this week" />
                <StatCard title="Total Executions" value={stats.totalRuns} icon={<Activity className="w-5 h-5 text-blue-500" />} trend="+15% vs last month" />
                <StatCard title="Hours Saved" value={stats.savedHours} icon={<Clock className="w-5 h-5 text-purple-500" />} trend="Estimated based on manual effort" />
                <StatCard title="System Error Rate" value={stats.errorRate} icon={<AlertTriangle className="w-5 h-5 text-amber-500" />} trend="All systems nominal" />
            </div>

            {/* Main Dashboard */}
            <Card className="rounded-[2rem] border-border/50 shadow-xl overflow-hidden glass p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" /> Active Workflows
                    </h2>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="font-bold">All (24)</Badge>
                        <Badge variant="outline" className="font-medium text-muted-foreground border-transparent">Active (12)</Badge>
                        <Badge variant="outline" className="font-medium text-muted-foreground border-transparent">Errors (1)</Badge>
                    </div>
                </div>

                <div className="space-y-4">
                    {MOCK_AUTOMATIONS.map((auto) => (
                        <div key={auto.id} className="group p-4 rounded-2xl border border-border/40 bg-background/50 hover:bg-background transition-all flex items-center justify-between hover:shadow-md">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${auto.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' :
                                        auto.status === 'Error' ? 'bg-red-500/10 text-red-500' :
                                            'bg-secondary text-muted-foreground'
                                    }`}>
                                    {auto.status === 'Active' ? <PlayCircle className="w-6 h-6" /> :
                                        auto.status === 'Error' ? <AlertTriangle className="w-6 h-6" /> :
                                            <PauseCircle className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{auto.name}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-xs font-semibold text-muted-foreground">
                                        <span className="flex items-center gap-1 bg-secondary px-2 rounded-md py-0.5">{auto.icon} {auto.platform}</span>
                                        <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {auto.runs.toLocaleString()} runs</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {auto.lastRun}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Success Rate</p>
                                    <p className={`font-bold ${auto.status === 'Error' ? 'text-red-500' : 'text-emerald-500'}`}>{auto.successRate}</p>
                                </div>
                                <div className="h-10 w-px bg-border/50" />
                                <div className="flex gap-2 relative z-10">
                                    <Button variant="outline" className="rounded-xl font-bold bg-background">Edit</Button>
                                    <Button variant="ghost" size="icon" className="rounded-xl"><MoreHorizontal className="w-4 h-4" /></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string | number, icon: React.ReactNode, trend: string }) {
    return (
        <Card className="p-6 rounded-[2rem] border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-secondary/50 rounded-xl group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="text-4xl font-black mb-1 tracking-tight">{value}</h3>
                <p className="font-bold text-foreground/80 mb-2">{title}</p>
                <p className="text-xs font-semibold text-muted-foreground/60">{trend}</p>
            </div>
        </Card>
    );
}
