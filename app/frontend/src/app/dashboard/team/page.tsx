"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, ShieldCheck, Mail, MoreHorizontal } from "lucide-react";

interface Member {
    name: string;
    email: string;
    role: "Owner" | "Admin" | "Member";
    status: "Active" | "Pending";
    avatar: string;
}

const teamMembers: Member[] = [
    {
        name: "Admin User",
        email: "admin@acmecorp.com",
        role: "Owner",
        status: "Active",
        avatar: "https://github.com/shadcn.png"
    },
    {
        name: "Sarah Jenkins",
        email: "sarah@acmecorp.com",
        role: "Admin",
        status: "Active",
        avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        name: "Michael Chen",
        email: "michael@acmecorp.com",
        role: "Member",
        status: "Active",
        avatar: "https://i.pravatar.cc/150?u=chen"
    },
    {
        name: "Jessica Taylor",
        email: "jessica@acmecorp.com",
        role: "Member",
        status: "Pending",
        avatar: "https://i.pravatar.cc/150?u=jessica"
    }
];

export default function TeamPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
                    <p className="text-muted-foreground mt-2">Manage team members, assign permissions, and control organization access.</p>
                </div>
                <Button className="rounded-full shadow-md shadow-primary/20">
                    <UserPlus className="w-4 h-4 mr-2" /> Invite Member
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-border/50 shadow-sm p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Members</p>
                            <p className="text-2xl font-black mt-1">4 / 10</p>
                        </div>
                    </div>
                </Card>
                <Card className="border-border/50 shadow-sm p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Admins & Owners</p>
                            <p className="text-2xl font-black mt-1">2</p>
                        </div>
                    </div>
                </Card>
                <Card className="border-border/50 shadow-sm p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pending Invites</p>
                            <p className="text-2xl font-black mt-1">1</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle>Organization Members</CardTitle>
                    <CardDescription>Colleagues with access to this AutoFlow organization workspace.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-border/40">
                        {teamMembers.map((member) => (
                            <div key={member.email} className="p-4 sm:p-6 flex items-center justify-between gap-4 hover:bg-secondary/10 transition-colors">
                                <div className="flex items-center gap-4 min-w-0">
                                    <Avatar className="w-10 h-10 rounded-xl border border-border">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm truncate">{member.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="outline"
                                        className={`rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                            member.role === "Owner"
                                                ? "bg-primary/10 text-primary border-primary/20"
                                                : member.role === "Admin"
                                                ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                                : "bg-secondary text-muted-foreground"
                                        }`}
                                    >
                                        {member.role}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className={`rounded-md text-[10px] font-bold uppercase tracking-wider hidden sm:inline-flex ${
                                            member.status === "Active"
                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                        }`}
                                    >
                                        {member.status}
                                    </Badge>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
