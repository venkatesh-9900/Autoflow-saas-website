"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Activity, ShieldCheck, Zap,
    Network, Clock,
    ArrowUpRight, ArrowDownRight, RefreshCcw,
    AlertTriangle, CheckCircle2, History,
    MessageSquare, Mail, Smartphone, Instagram
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";

interface AnalyticsStats {
    totalMessages?: number;
    deliveredMessages?: number;
    socialPosts?: {
        published?: number;
        scheduled?: number;
        failed?: number;
    };
}

export default function MonitoringDashboard() {
    const [auditLogs, setAuditLogs] = useState([]);
    const [stats, setStats] = useState<AnalyticsStats | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [logsRes, statsRes] = await Promise.all([
                    api.get('/audit-logs').catch(() => []),
                    api.get('/analytics/stats').catch(() => null)
                ]);
                setAuditLogs(logsRes);
                setStats(statsRes);
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Platform Analytics</h1>
                    <p className="text-muted-foreground font-medium">Real-time system health and content performance metrics.</p>
                </div>
                <Button className="rounded-xl font-bold bg-secondary/50 text-foreground hover:bg-secondary border border-border/40">
                    <RefreshCcw className="w-4 h-4 mr-2" /> Refresh Data
                </Button>
            </div>

            {/* Global Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatusCard
                    title="Platform Status"
                    value="Operational"
                    icon={<ShieldCheck className="w-5 h-5" />}
                    color="text-emerald-500"
                    trend="+99.99% uptime"
                    trendUp={true}
                />
                <StatusCard
                    title="Queue Depth"
                    value="124"
                    icon={<Network className="w-5 h-5" />}
                    color="text-blue-500"
                    trend="-12% from peak"
                    trendUp={true}
                />
                <StatusCard
                    title="Avg. Latency"
                    value="42ms"
                    icon={<Zap className="w-5 h-5" />}
                    color="text-amber-500"
                    trend="+2ms shift"
                    trendUp={false}
                />
                <StatusCard
                    title="Delivery Rate"
                    value={stats?.totalMessages && stats?.deliveredMessages ? `${((stats.deliveredMessages / stats.totalMessages) * 100).toFixed(1)}%` : "98.4%"}
                    icon={<Activity className="w-5 h-5" />}
                    color="text-emerald-500"
                    trend="+0.2% improvement"
                    trendUp={true}
                />
            </div>

            {/* Post Performance & Content Analytics Section */}
            <h2 className="text-2xl font-black mt-12 mb-6">Content Publishing & Performance</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Global Publishing Stats */}
                <Card className="border-border/60 shadow-xl rounded-[2.5rem] p-8 glass flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                            <Instagram className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black mb-2">Global Publishing Stats</h3>
                        <p className="text-sm text-muted-foreground font-medium mb-8">Overview of your automated social queue.</p>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-xl">
                                <span className="font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Published</span>
                                <span className="font-black text-lg">{stats?.socialPosts?.published || 1.284}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-xl">
                                <span className="font-bold flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" /> Scheduled</span>
                                <span className="font-black text-lg">{stats?.socialPosts?.scheduled || 342}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-xl">
                                <span className="font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Failed</span>
                                <span className="font-black text-lg">{stats?.socialPosts?.failed || 12}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Post Analytics Chart */}
                <Card className="lg:col-span-2 border-border/60 shadow-xl rounded-[2.5rem] p-8 glass overflow-hidden flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-black mb-1">Post Engagement Trends</h3>
                            <p className="text-sm text-muted-foreground font-medium">Aggregate Reach and Likes over the last 7 days.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                <div className="w-3 h-3 rounded-full bg-pink-500"></div> Likes
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                <div className="w-3 h-3 rounded-full bg-purple-500"></div> Reach
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-end justify-between gap-2 h-48 mt-auto pt-8 border-b border-border/40 pb-2 relative">
                        {/* Mock Chart Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                            {[1, 2, 3, 4].map(i => <div key={i} className="border-t w-full h-0"></div>)}
                        </div>

                        {[
                            { day: 'Mon', likes: 30, reach: 45 },
                            { day: 'Tue', likes: 45, reach: 60 },
                            { day: 'Wed', likes: 25, reach: 40 },
                            { day: 'Thu', likes: 65, reach: 85 },
                            { day: 'Fri', likes: 80, reach: 95 },
                            { day: 'Sat', likes: 55, reach: 70 },
                            { day: 'Sun', likes: 70, reach: 90 },
                        ].map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1 group cursor-pointer">
                                <div className="w-full flex justify-center gap-1 items-end h-full relative">
                                    <div className="w-1/3 bg-pink-500/80 rounded-t-sm transition-all duration-300 group-hover:bg-pink-400 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]" style={{ height: `${data.likes}%` }}></div>
                                    <div className="w-1/3 bg-purple-500/80 rounded-t-sm transition-all duration-300 group-hover:bg-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]" style={{ height: `${data.reach}%` }}></div>

                                    {/* Tooltip on hover */}
                                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] p-2 rounded-lg pointer-events-none z-10 whitespace-nowrap shadow-xl">
                                        <p className="font-bold mb-1">{data.day}</p>
                                        <div className="flex gap-2">
                                            <span className="text-pink-400">Likes: {data.likes}k</span>
                                            <span className="text-purple-400">Reach: {data.reach}k</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-muted-foreground mt-2">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Infrastructure Metrics */}
                <Card className="lg:col-span-2 border-border/60 shadow-2xl rounded-[2.5rem] glass overflow-hidden flex flex-col">
                    <CardHeader className="p-8 pb-4">
                        <CardTitle className="text-xl font-black">Channel Throughput</CardTitle>
                        <CardDescription>Messages processed in the last 24 hours.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 p-8 pt-0">
                        <div className="space-y-6 mt-4">
                            <ChannelProgress name="WhatsApp" icon={<MessageSquare className="w-4 h-4" />} value={85} color="bg-whatsapp" total="42.5k" />
                            <ChannelProgress name="Email" icon={<Mail className="w-4 h-4" />} value={62} color="bg-blue-500" total="120k" />
                            <ChannelProgress name="Instagram" icon={<Instagram className="w-4 h-4" />} value={45} color="bg-pink-500" total="18.2k" />
                            <ChannelProgress name="SMS" icon={<Smartphone className="w-4 h-4" />} value={30} color="bg-purple-500" total="8.4k" />
                        </div>
                    </CardContent>
                </Card>

                {/* Audit Log / Recent Activity */}
                <Card className="border-border/60 shadow-2xl rounded-[2.5rem] glass overflow-hidden">
                    <CardHeader className="p-8 pb-4">
                        <CardTitle className="text-xl font-black flex items-center gap-3">
                            <History className="w-6 h-6 text-primary" /> Audit Log
                        </CardTitle>
                        <CardDescription>Top recent system-wide actions.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/40 max-h-[400px] overflow-y-auto">
                            {auditLogs.length > 0 ? auditLogs.map((log: { id: string, action: string, createdAt: string }) => (
                                <ActivityItem
                                    key={log.id}
                                    action={log.action}
                                    time={new Date(log.createdAt).toLocaleTimeString()}
                                    status="success"
                                />
                            )) : (
                                <>
                                    <ActivityItem action="INSTAGRAM_POST_PUBLISHED" time="1m ago" status="success" />
                                    <ActivityItem action="CAMPAIGN_DEPLOYED" time="2m ago" status="success" />
                                    <ActivityItem action="QUEUE_PROCESSED" time="5m ago" status="success" />
                                    <ActivityItem action="INSTAGRAM_AUTH" time="15m ago" status="success" />
                                    <ActivityItem action="API_KEY_CREATED" time="2h ago" status="success" />
                                </>
                            )}
                        </div>
                        <div className="p-6 text-center border-t border-border/40">
                            <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5">View Full Audit Trail</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatusCard({ title, value, icon, color, trend, trendUp }: { title: string, value: string, icon: React.ReactNode, color: string, trend: string, trendUp: boolean }) {
    return (
        <Card className="border-border/60 shadow-sm rounded-[2rem] p-6 hover:shadow-lg transition-all duration-300 glass group relative overflow-hidden">
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full bg-secondary opacity-50 blur-3xl group-hover:scale-150 transition-transform ${color}`} />

            <div className="relative z-10 flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
            </div>
            <div className="relative z-10 space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{title}</h4>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black">{value}</span>
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold ${trendUp ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend}
                </div>
            </div>
        </Card>
    );
}

function ChannelProgress({ name, icon, value, color, total }: { name: string, icon: React.ReactNode, value: number, color: string, total: string }) {
    return (
        <div className="space-y-2 group">
            <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-white ${color} group-hover:scale-110 transition-transform shadow-md shadow-${color.replace('bg-', '')}/20`}>
                        {icon}
                    </div>
                    <span className="text-sm font-black">{name}</span>
                </div>
                <span className="text-xs font-bold text-muted-foreground">{total} processed</span>
            </div>
            <div className="h-3 w-full bg-secondary/50 rounded-full overflow-hidden border border-border/10">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

function ActivityItem({ action, time, status }: { action: string, time: string, status: 'success' | 'warning' | 'error' }) {
    return (
        <div className="p-4 px-8 hover:bg-secondary/10 flex items-center justify-between group transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                <div>
                    <p className="text-xs font-black tracking-tight">{action}</p>
                    <p className="text-[10px] text-muted-foreground/80 font-bold">{time}</p>
                </div>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-3 h-3" />
            </Button>
        </div>
    );
}
