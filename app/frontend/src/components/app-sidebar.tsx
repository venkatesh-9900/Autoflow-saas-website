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
} from "@/components/ui/sidebar"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    return (
        <Sidebar>
            <SidebarHeader className="h-16 flex items-center px-6 border-b border-sidebar-border">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-semibold text-lg tracking-tight">AutoFlow</span>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mt-6 mb-2 px-6">Overview</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-3 gap-1">
                            {mainNav.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-sidebar-accent/50 transition-colors h-11 px-3 rounded-xl">
                                        <Link href={item.href}>
                                            <item.icon className="w-5 h-5 text-sidebar-foreground/70" />
                                            <span className="font-semibold">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mt-6 mb-2 px-6">Omnichannel</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-3 gap-1">
                            {channelNav.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-sidebar-accent/50 transition-colors h-11 px-3 rounded-xl">
                                        <Link href={item.href}>
                                            <item.icon className={`w-5 h-5 ${item.color || 'text-sidebar-foreground/70'}`} />
                                            <span className="font-semibold">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mt-6 mb-2 px-6">Platforms</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-3 gap-1">
                            {platformNav.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-sidebar-accent/50 transition-colors h-11 px-3 rounded-xl">
                                        <Link href={item.href}>
                                            <item.icon className={`w-5 h-5 ${item.color || 'text-sidebar-foreground/70'}`} />
                                            <span className="font-semibold">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="h-12 hover:bg-sidebar-accent/50 transition-colors px-2">
                            <Link href="/dashboard/settings" className="flex items-center gap-3">
                                <Avatar className="w-8 h-8 rounded-md border border-border">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col flex-1 overflow-hidden">
                                    <span className="text-sm font-medium truncate">Admin User</span>
                                    <span className="text-xs text-muted-foreground truncate">admin@company.com</span>
                                </div>
                                <Settings className="w-4 h-4 text-muted-foreground ml-auto" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
