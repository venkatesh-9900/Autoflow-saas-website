import {
    MessageSquare, LayoutDashboard, Users,
    Workflow, BarChart3, Settings, Instagram,
    Layout,
    Zap,
    Sparkles,
    Activity,
    Palette,
    Target,
    BookOpen,
    Library,
    Twitter,
    Facebook,
    Mail,
    Smartphone,
    CreditCard,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const mainNav = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Subscriptions", icon: CreditCard, href: "/dashboard/subscriptions" },
    { title: "Contacts", icon: Users, href: "/dashboard/contacts" },
    { title: "Segments", icon: Target, href: "/dashboard/contacts/segments" },
    { title: "Campaigns", icon: BarChart3, href: "/dashboard/campaigns" },
    { title: "System Health", icon: Activity, href: "/dashboard/monitoring" },
    { title: "White Label", icon: Palette, href: "/dashboard/white-label" },
    { title: "Team", icon: Users, href: "/dashboard/team" },
    { title: "Documentation", icon: BookOpen, href: "/dashboard/docs" },
];

const channelNav = [
    { title: "Unified Inbox", icon: MessageSquare, href: "/dashboard/inbox", color: "text-primary" },
    { title: "AI Builder", icon: Sparkles, href: "/dashboard/builder", color: "text-chatbot" },
    { title: "Workflow Canvas", icon: Workflow, href: "/dashboard/builder/canvas", color: "text-blue-500" },
    { title: "Marketplace", icon: Layout, href: "/dashboard/marketplace", color: "text-orange-500" },
    { title: "Integrations", icon: Zap, href: "/dashboard/integrations", color: "text-blue-500" },
    { title: "Templates", icon: Library, href: "/dashboard/templates", color: "text-emerald-500" },
];

const platformNav = [
    { title: "Instagram", icon: Instagram, href: "/dashboard/instagram", color: "text-instagram" },
    { title: "Twitter/X", icon: Twitter, href: "/dashboard/twitter", color: "text-twitter" },
    { title: "Facebook", icon: Facebook, href: "/dashboard/facebook", color: "text-facebook" },
    { title: "WhatsApp", icon: MessageSquare, href: "/dashboard/whatsapp", color: "text-whatsapp" },
    { title: "Email", icon: Mail, href: "/dashboard/email", color: "text-email" },
];


export function AppSidebar() {
    const { state, toggleSidebar } = useSidebar();
    const isCollapsed = state === "collapsed";
    const pathname = usePathname();

    const isItemActive = (href: string) => {
        if (!pathname) return false;
        if (href === "/dashboard") {
            return pathname === "/dashboard";
        }
        return pathname === href || pathname.startsWith(href + "/");
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-16 flex flex-row items-center justify-between px-4 border-b border-sidebar-border shrink-0 group-data-[state=collapsed]:p-2">
                <div className="flex items-center gap-2 group-data-[state=collapsed]:hidden">
                    <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                            <MessageSquare className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-semibold text-lg tracking-tight">AutoFlow</span>
                    </Link>
                    {/* Pulsing Green status indicator beside the text */}
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse ml-1 shrink-0" />
                </div>
                
                {/* Premium Gemini-style collapse trigger */}
                <div className="group-data-[state=collapsed]:w-full group-data-[state=collapsed]:flex group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:px-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SidebarMenuButton
                                onClick={toggleSidebar}
                                className="w-9 h-9 rounded-full bg-background border border-sidebar-border shadow-sm hover:bg-muted hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer"
                            >
                                {isCollapsed ? (
                                    <PanelLeftOpen className="w-4 h-4 text-sidebar-foreground/70" />
                                ) : (
                                    <PanelLeftClose className="w-4 h-4 text-sidebar-foreground/70" />
                                )}
                                <span className="sr-only">Toggle Sidebar</span>
                            </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center" sideOffset={10}>
                            {isCollapsed ? "Open sidebar" : "Close sidebar"}
                        </TooltipContent>
                    </Tooltip>
                </div>
            </SidebarHeader>

            <SidebarContent className="gap-6 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mt-2 mb-2 px-6">Overview</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-3 gap-2">
                            {mainNav.map((item) => {
                                const active = isItemActive(item.href);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={active}
                                            tooltip={item.title}
                                            className={`h-11 px-3 rounded-xl transition-all ${
                                                active
                                                    ? "bg-primary/10 text-primary font-bold shadow-xs hover:bg-primary/15"
                                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                            }`}
                                        >
                                            <Link href={item.href}>
                                                <item.icon className={`w-5 h-5 ${active ? "text-primary" : "text-sidebar-foreground/70"}`} />
                                                <span className="font-semibold">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mt-2 mb-2 px-6">Omnichannel</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-3 gap-2">
                            {channelNav.map((item) => {
                                const active = isItemActive(item.href);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={active}
                                            tooltip={item.title}
                                            className={`h-11 px-3 rounded-xl transition-all ${
                                                active
                                                    ? "bg-primary/10 text-primary font-bold shadow-xs hover:bg-primary/15"
                                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                            }`}
                                        >
                                            <Link href={item.href}>
                                                <item.icon className={`w-5 h-5 ${active ? "text-primary" : (item.color || 'text-sidebar-foreground/70')}`} />
                                                <span className="font-semibold">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mt-2 mb-2 px-6">Platforms</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-3 gap-2">
                            {platformNav.map((item) => {
                                const active = isItemActive(item.href);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={active}
                                            tooltip={item.title}
                                            className={`h-11 px-3 rounded-xl transition-all ${
                                                active
                                                    ? "bg-primary/10 text-primary font-bold shadow-xs hover:bg-primary/15"
                                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                            }`}
                                        >
                                            <Link href={item.href}>
                                                <item.icon className={`w-5 h-5 ${active ? "text-primary" : (item.color || 'text-sidebar-foreground/70')}`} />
                                                <span className="font-semibold">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border p-4 group-data-[state=collapsed]:p-2 shrink-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Admin User" className="h-12 hover:bg-sidebar-accent/50 transition-colors px-2">
                            <Link href="/dashboard/settings" className="flex items-center gap-3">
                                <Avatar className="w-8 h-8 rounded-md border border-border shrink-0">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col flex-1 overflow-hidden group-data-[state=collapsed]:hidden">
                                    <span className="text-sm font-medium truncate">Admin User</span>
                                    <span className="text-xs text-muted-foreground truncate">admin@company.com</span>
                                </div>
                                <Settings className="w-4 h-4 text-muted-foreground ml-auto group-data-[state=collapsed]:hidden" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
