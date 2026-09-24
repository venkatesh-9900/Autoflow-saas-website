"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Bell, CreditCard, CheckCheck, Sparkles, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [unreadCount, setUnreadCount] = useState(3);
    const [notifications, setNotifications] = useState([
        {
            id: "1",
            title: "Instagram Agent Ready",
            desc: "AI auto-reply funnel active with 4 prompt suggestions.",
            time: "10m ago",
            icon: Sparkles,
            color: "text-chatbot",
        },
        {
            id: "2",
            title: "Multi-channel Sync",
            desc: "WhatsApp & Twitter webhook listener running smoothly.",
            time: "1h ago",
            icon: Zap,
            color: "text-primary",
        },
        {
            id: "3",
            title: "Security & Encryption",
            desc: "All platform tokens encrypted and backed up.",
            time: "4h ago",
            icon: ShieldCheck,
            color: "text-emerald-500",
        },
    ]);

    const handleClearAll = () => {
        setUnreadCount(0);
    };

    return (
        <SidebarProvider className="h-svh overflow-hidden">
            <AppSidebar />
            <div className="flex flex-col flex-1 h-svh bg-secondary/10 w-full overflow-hidden">
                {/* Topbar inside the content area */}
                <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-background border-b border-border/50 shrink-0">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="md:hidden mr-2 shrink-0" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest hidden sm:inline">Workspace</span>
                        <span className="text-xs text-muted-foreground/40 hidden sm:inline">/</span>
                        <span className="text-sm font-bold tracking-tight">AutoFlow AI</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard/subscriptions"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all shadow-xs"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Pro Plan Active</span>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="relative p-2 rounded-xl hover:bg-secondary/60 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                                    aria-label="Notifications"
                                >
                                    <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    )}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl border-border/60 shadow-xl bg-card">
                                <div className="flex items-center justify-between px-3 py-2">
                                    <DropdownMenuLabel className="p-0 font-bold text-sm">Notifications</DropdownMenuLabel>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={handleClearAll}
                                            className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                                        >
                                            <CheckCheck className="w-3 h-3" /> Mark read
                                        </button>
                                    )}
                                </div>
                                <DropdownMenuSeparator />
                                <div className="space-y-1 py-1 max-h-72 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <p className="text-xs text-muted-foreground text-center py-4">No new notifications</p>
                                    ) : (
                                        notifications.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <DropdownMenuItem
                                                    key={item.id}
                                                    className="flex items-start gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-secondary/40 transition-colors focus:bg-secondary/40"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 mt-0.5">
                                                        <Icon className={`w-4 h-4 ${item.color}`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-1">
                                                            <p className="text-xs font-bold truncate">{item.title}</p>
                                                            <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
                                                        </div>
                                                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{item.desc}</p>
                                                    </div>
                                                </DropdownMenuItem>
                                            );
                                        })
                                    )}
                                </div>
                                <DropdownMenuSeparator />
                                <div className="p-1">
                                    <Link
                                        href="/dashboard/monitoring"
                                        className="w-full block text-center py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
                                    >
                                        View System Health
                                    </Link>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8" data-lenis-prevent>
                    <div className="mx-auto max-w-6xl">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}
