"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users, Mail, MessageSquare, ArrowUpRight, Loader2,
    Instagram, Twitter, Facebook, Smartphone, Bot, Zap, Check
} from "lucide-react";
import { api } from "@/lib/api-client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from "next/link";

interface Stats {
    totalMessages: number;
    deliveredMessages: number;
    failedMessages: number;
    activeCampaigns: number;
    totalContacts: number;
}

const chartData = [
    { name: 'Mon', delivered: 400 },
    { name: 'Tue', delivered: 300 },
    { name: 'Wed', delivered: 600 },
    { name: 'Thu', delivered: 800 },
    { name: 'Fri', delivered: 500 },
    { name: 'Sat', delivered: 900 },
    { name: 'Sun', delivered: 700 },
];

const platformStatuses = [
    { name: "Instagram", icon: Instagram, color: "text-instagram", bg: "bg-[#E4405F]/10", href: "/dashboard/instagram" },
    { name: "Twitter/X", icon: Twitter, color: "text-twitter", bg: "bg-[#1DA1F2]/10", href: "/dashboard/twitter" },
    { name: "Facebook", icon: Facebook, color: "text-facebook", bg: "bg-[#1877F2]/10", href: "/dashboard/facebook" },
    { name: "WhatsApp", icon: MessageSquare, color: "text-whatsapp", bg: "bg-[#25D366]/10", href: "/dashboard/whatsapp" },
    { name: "Email", icon: Mail, color: "text-email", bg: "bg-[#EA4335]/10", href: "/dashboard/email" },
    { name: "SMS", icon: Smartphone, color: "text-sms", bg: "bg-[#A855F7]/10", href: "/dashboard/subscriptions" },
    { name: "AI Chatbot", icon: Bot, color: "text-chatbot", bg: "bg-[#0EA5E9]/10", href: "/dashboard/chatbot" },
];

export default function DashboardOverview() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await api.get('/analytics/stats');
                setStats(data);
            } catch (err: unknown) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-destructive bg-destructive/10 rounded-xl border border-destructive/20">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                <p className="text-muted-foreground mt-2">Here&apos;s what&apos;s happening across your social automation platform.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total Contacts" value={stats?.totalContacts.toLocaleString() || "0"} icon={<Users className="w-4 h-4 text-muted-foreground" />} trend="All contacts" />
                <StatsCard title="Messages Sent" value={stats?.totalMessages.toLocaleString() || "0"} icon={<MessageSquare className="w-4 h-4 text-muted-foreground" />} trend={`${stats?.deliveredMessages} Delivered`} />
                <StatsCard title="Campaigns Active" value={stats?.activeCampaigns.toString() || "0"} icon={<Mail className="w-4 h-4 text-muted-foreground" />} trend="Running now" />
                <StatsCard title="Delivery Rate" value={stats?.totalMessages ? `${((stats.deliveredMessages / stats.totalMessages) * 100).toFixed(1)}%` : "0%"} icon={<ArrowUpRight className="w-4 h-4 text-muted-foreground" />} trend={`${stats?.failedMessages} Failed`} />
            </div>

            {/* Social Platform Connection Status */}
            <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                Connected Platforms
                            </CardTitle>
                            <CardDescription>Social accounts linked to your automation engine</CardDescription>
                        </div>
                        <Link href="/dashboard/subscriptions" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                            Manage <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {platformStatuses.map((p) => (
                            <Link key={p.name} href={p.href} className="group">
                                <div className="text-center p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-all group-hover:shadow-md group-hover:-translate-y-0.5">
                                    <div className={`w-10 h-10 mx-auto rounded-xl ${p.bg} flex items-center justify-center mb-2`}>
                                        <p.icon className={`w-5 h-5 ${p.color}`} />
                                    </div>
                                    <p className="text-xs font-semibold">{p.name}</p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                                        <span className="text-[10px] text-muted-foreground">Not linked</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-border/50 shadow-sm overflow-hidden">
                    <CardHeader>
                        <CardTitle>Delivery Performance</CardTitle>
                        <CardDescription>Messages delivered across all channels over the last 7 days.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px] p-0 pr-4 pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                    itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 600 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="delivered"
                                    stroke="var(--primary)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorDelivered)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="col-span-3 border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle>Organization Stats</CardTitle>
                        <CardDescription>Breakdown of your system usage.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6 flex flex-col pt-2">
                            <ActivityItem description="Contacts in Database" count={stats?.totalContacts || 0} />
                            <ActivityItem description="Campaigns Configured" count={stats?.activeCampaigns || 0} />
                            <ActivityItem description="Messages Delivered" count={stats?.deliveredMessages || 0} />
                            <ActivityItem description="Failed Delivery" count={stats?.failedMessages || 0} color="bg-destructive" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
    return (
        <Card className="border-border/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold tracking-tight">{value}</div>
                <p className="text-xs text-primary font-medium mt-1">{trend}</p>
            </CardContent>
        </Card>
    );
}

function ActivityItem({ description, count, color = "bg-primary" }: { description: string, count: number, color?: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className={`w-2 h-2 mt-0.5 rounded-full ${color} shrink-0 shadow-sm`} />
            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{description}</p>
                <p className="text-xs text-muted-foreground">{count.toLocaleString()}</p>
            </div>
        </div>
    )
}
