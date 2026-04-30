"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Bell, CreditCard } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col flex-1 min-h-screen bg-secondary/10 w-full overflow-hidden">
                {/* Topbar inside the content area */}
                <header className="h-16 flex items-center px-4 md:px-6 bg-background border-b border-border/50 shrink-0">
                    <SidebarTrigger className="mr-4" />
                    <div className="flex-1" />
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard/subscriptions" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary/60 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground">
                            <CreditCard className="w-4 h-4" />
                            <span className="hidden md:inline">Subscriptions</span>
                        </Link>
                        <button className="relative p-2 rounded-lg hover:bg-secondary/60 transition-colors">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mx-auto max-w-6xl">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}
