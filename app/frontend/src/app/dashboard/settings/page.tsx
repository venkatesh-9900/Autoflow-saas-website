"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, CreditCard, Users, Link2, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings Workspace</h1>
                <p className="text-muted-foreground mt-2">Manage your organization, billing, and team members.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-secondary/50 rounded-xl p-1 mb-8">
                    <TabsTrigger value="general" className="rounded-lg data-[state=active]:shadow-sm"><Building2 className="w-4 h-4 mr-2 hidden sm:block" /> General</TabsTrigger>
                    <TabsTrigger value="team" className="rounded-lg data-[state=active]:shadow-sm"><Users className="w-4 h-4 mr-2 hidden sm:block" /> Team</TabsTrigger>
                    <TabsTrigger value="billing" className="rounded-lg data-[state=active]:shadow-sm"><CreditCard className="w-4 h-4 mr-2 hidden sm:block" /> Billing</TabsTrigger>
                    <TabsTrigger value="api" className="rounded-lg data-[state=active]:shadow-sm"><Link2 className="w-4 h-4 mr-2 hidden sm:block" /> API & Webhooks</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <Card className="border-border/50 shadow-sm">
                        <CardHeader>
                            <CardTitle>Organization Details</CardTitle>
                            <CardDescription>Update your company&apos;s core information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="w-20 h-20 rounded-2xl border border-border">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" size="sm">Upload Logo</Button>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="orgName">Organization Name</Label>
                                    <Input id="orgName" defaultValue="AutoFlow Inc." className="max-w-md h-10 rounded-lg" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="domain">Verified Domain</Label>
                                    <div className="flex gap-2 max-w-md">
                                        <Input id="domain" defaultValue="autoflow.ai" readOnly className="h-10 rounded-lg bg-secondary/30 text-muted-foreground" />
                                        <Button variant="secondary" className="px-6 rounded-lg">Verify</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-secondary/10 border-t border-border/50 py-4 flex justify-between items-center rounded-b-xl">
                            <p className="text-xs text-muted-foreground">Changes will be saved automatically.</p>
                            <Button className="rounded-lg shadow-md shadow-primary/20">Save Changes</Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-red-200 shadow-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-red-500" />
                                <CardTitle className="text-red-500">Danger Zone</CardTitle>
                            </div>
                            <CardDescription>Irreversible actions related to your account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-medium mb-4">Deleting your organization will immediately terminate all active campaigns and destroy all associated data.</p>
                            <Button variant="destructive" className="rounded-lg font-semibold">Delete Organization</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Mock content for other tabs */}
                <TabsContent value="team" className="animate-in fade-in duration-300">
                    <Card className="border-border/50 shadow-sm">
                        <CardHeader>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>Invite your colleagues and manage their permissions (Owner, Admin, Member).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-40 flex items-center justify-center bg-secondary/10 border border-dashed rounded-xl">
                                <Button variant="outline"><Users className="w-4 h-4 mr-2" /> Invite Member</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="billing" className="animate-in fade-in duration-300">
                    <Card className="border-border/50 shadow-sm">
                        <CardHeader>
                            <CardTitle>Subscription Plan</CardTitle>
                            <CardDescription>You are currently on the <strong className="text-primary">Pro Plan</strong> ($49/month).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-40 flex items-center justify-center bg-secondary/10 border border-dashed rounded-xl">
                                <Button className="rounded-full shadow-md shadow-primary/20">Upgrade to Enterprise</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="api" className="animate-in fade-in duration-300">
                    <Card className="border-border/50 shadow-sm">
                        <CardHeader>
                            <CardTitle>Developer API Keys</CardTitle>
                            <CardDescription>Manage your secret keys for external integrations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-40 flex flex-col items-center justify-center bg-secondary/10 border border-dashed rounded-xl gap-4">
                                <span className="font-mono text-sm bg-background px-4 py-2 border rounded-md blur-sm hover:blur-none transition-all cursor-pointer">sk_live_1234567890abcdef...</span>
                                <Button variant="secondary" size="sm">Generate New Key</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
}
