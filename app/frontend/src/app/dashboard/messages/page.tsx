"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Mail, Smartphone, MessageSquare, Edit2, Copy, Trash2 } from "lucide-react";

import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";
import { Loader2, History, Layout } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MessageLog {
    id: string;
    channel: string;
    status: string;
    to: string;
    content: string;
    createdAt: string;
}

interface Template {
    id: string;
    name: string;
    content: string;
    channel: 'WHATSAPP' | 'EMAIL' | 'SMS';
    updatedAt: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<MessageLog[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("templates");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        if (activeTab === "history") {
            fetchHistory();
        } else {
            fetchTemplates();
        }
    }, [activeTab]);

    async function fetchTemplates() {
        setLoading(true);
        try {
            const data = await api.get('/templates');
            setTemplates(data);
        } catch (err: unknown) {
            console.error((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchHistory() {
        setLoading(true);
        try {
            const data = await api.get('/messages');
            setMessages(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Messaging</h1>
                    <p className="text-muted-foreground mt-2">Manage your copy and track communication history.</p>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="rounded-full shadow-md shadow-primary/20">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Template
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-2xl">
                        <CreateTemplateForm onSuccess={() => {
                            setIsCreateOpen(false);
                            fetchTemplates();
                        }} />
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs defaultValue="templates" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md bg-secondary/50 rounded-xl p-1 mb-8">
                    <TabsTrigger value="templates" className="rounded-lg data-[state=active]:shadow-sm"><Layout className="w-4 h-4 mr-2" /> Templates</TabsTrigger>
                    <TabsTrigger value="history" className="rounded-lg data-[state=active]:shadow-sm"><History className="w-4 h-4 mr-2" /> History</TabsTrigger>
                </TabsList>

                <TabsContent value="templates" className="space-y-8 border-none p-0 outline-none">
                    <Tabs defaultValue="whatsapp" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 max-w-md bg-secondary/20 rounded-xl p-1">
                            <TabsTrigger value="whatsapp" className="rounded-lg data-[state=active]:shadow-sm"><MessageSquare className="w-4 h-4 mr-2" /> WhatsApp</TabsTrigger>
                            <TabsTrigger value="email" className="rounded-lg data-[state=active]:shadow-sm"><Mail className="w-4 h-4 mr-2" /> Email</TabsTrigger>
                            <TabsTrigger value="sms" className="rounded-lg data-[state=active]:shadow-sm"><Smartphone className="w-4 h-4 mr-2" /> SMS</TabsTrigger>
                        </TabsList>

                        <TabsContent value="whatsapp" className="mt-6 border-none p-0">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {templates.filter(t => t.channel === 'WHATSAPP').map(template => (
                                    <TemplateCard
                                        key={template.id}
                                        id={template.id}
                                        channel="whatsapp"
                                        title={template.name}
                                        content={template.content}
                                        onDelete={fetchTemplates}
                                        onEdit={fetchTemplates}
                                    />
                                ))}
                                {templates.filter(t => t.channel === 'WHATSAPP').length === 0 && (
                                    <div className="md:col-span-2 lg:grid-cols-3 text-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                                        No WhatsApp templates found.
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="email" className="mt-6 border-none p-0">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {templates.filter(t => t.channel === 'EMAIL').map(template => (
                                    <TemplateCard
                                        key={template.id}
                                        id={template.id}
                                        channel="email"
                                        title={template.name}
                                        content={template.content}
                                        onDelete={fetchTemplates}
                                        onEdit={fetchTemplates}
                                    />
                                ))}
                                {templates.filter(t => t.channel === 'EMAIL').length === 0 && (
                                    <div className="md:col-span-2 lg:grid-cols-3 text-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                                        No Email templates found.
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="sms" className="mt-6 border-none p-0">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {templates.filter(t => t.channel === 'SMS').map(template => (
                                    <TemplateCard
                                        key={template.id}
                                        id={template.id}
                                        channel="sms"
                                        title={template.name}
                                        content={template.content}
                                        onDelete={fetchTemplates}
                                        onEdit={fetchTemplates}
                                    />
                                ))}
                                {templates.filter(t => t.channel === 'SMS').length === 0 && (
                                    <div className="md:col-span-2 lg:grid-cols-3 text-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                                        No SMS templates found.
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </TabsContent>

                <TabsContent value="history" className="border-none p-0 outline-none">
                    <Card className="border-border/50 shadow-sm">
                        <CardHeader>
                            <CardTitle>Communication Log</CardTitle>
                            <CardDescription>Real-time history of all outgoing messages.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex justify-center items-center py-10">
                                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                                    No messages found in history.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border/50">
                                                <th className="text-left py-3 px-4 font-semibold">Channel</th>
                                                <th className="text-left py-3 px-4 font-semibold">Recipient</th>
                                                <th className="text-left py-3 px-4 font-semibold">Status</th>
                                                <th className="text-left py-3 px-4 font-semibold">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {messages.map((log) => (
                                                <tr key={log.id} className="border-b border-border/10 hover:bg-secondary/10 transition-colors">
                                                    <td className="py-3 px-4 uppercase text-[10px] font-bold tracking-wider">{log.channel}</td>
                                                    <td className="py-3 px-4">{log.to}</td>
                                                    <td className="py-3 px-4">
                                                        <Badge variant={log.status === 'DELIVERED' ? 'default' : log.status === 'FAILED' ? 'destructive' : 'secondary'} className="text-[10px] py-0 h-5">
                                                            {log.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-3 px-4 text-muted-foreground">{new Date(log.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>


        </div>
    );
}

function TemplateCard({ id, channel, title, content, onDelete, onEdit }: { id: string, channel: 'WHATSAPP' | 'EMAIL' | 'SMS' | 'whatsapp' | 'email' | 'sms', title: string, content: string, onDelete: () => void, onEdit: () => void }) {
    const Icon = (channel.toLowerCase() === 'whatsapp') ? MessageSquare : (channel.toLowerCase() === 'email') ? Mail : Smartphone;
    const colorClass = (channel.toLowerCase() === 'whatsapp') ? 'text-green-500' : (channel.toLowerCase() === 'email') ? 'text-blue-500' : 'text-purple-500';
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this template?")) return;
        try {
            await api.delete(`/templates/${id}`);
            onDelete();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="flex flex-col border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                    <div className={`w-8 h-8 rounded-full bg-secondary flex items-center justify-center ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                    </div>
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="bg-secondary/30 rounded-lg p-3 text-sm text-muted-foreground whitespace-pre-wrap font-mono relative overflow-hidden group">
                    {content}
                    <div className="absolute top-2 right-2 flex gap-1 bg-background/80 backdrop-blur rounded-md border border-border/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => navigator.clipboard.writeText(content)}><Copy className="w-3 h-3" /></Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-end gap-2">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8"><Edit2 className="w-3.5 h-3.5 mr-2" /> Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-2xl">
                        <EditTemplateForm
                            template={{ id, name: title, content, channel: channel.toUpperCase() as 'WHATSAPP' | 'EMAIL' | 'SMS', updatedAt: '' }}
                            onSuccess={() => {
                                setIsEditOpen(false);
                                onEdit();
                            }}
                        />
                    </DialogContent>
                </Dialog>
                <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive" onClick={handleDelete}><Trash2 className="w-3.5 h-3.5" /></Button>
            </CardFooter>
        </Card>
    )
}

function CreateTemplateForm({ onSuccess }: { onSuccess: () => void }) {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [channel, setChannel] = useState<string>("WHATSAPP");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post('/templates', { name, content, channel });
            onSuccess();
        } catch (err: unknown) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
                <DialogDescription>
                    Define your template name, channel, and content.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                        id="name"
                        placeholder="e.g. Welcome Message"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="channel">Channel</Label>
                    <Select value={channel} onValueChange={setChannel}>
                        <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select a channel" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                            <SelectItem value="EMAIL">Email</SelectItem>
                            <SelectItem value="SMS">SMS</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        placeholder="Write your message content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="rounded-xl min-h-[120px]"
                    />
                    <p className="text-[10px] text-muted-foreground">Use {"{{variable}}"} for dynamic content.</p>
                </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full rounded-full">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    Create Template
                </Button>
            </DialogFooter>
        </form>
    );
}

function EditTemplateForm({ template, onSuccess }: { template: Template, onSuccess: () => void }) {
    const [name, setName] = useState(template.name);
    const [content, setContent] = useState(template.content);
    const [channel, setChannel] = useState<string>(template.channel);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.patch(`/templates/${template.id}`, { name, content, channel });
            onSuccess();
        } catch (err: unknown) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <DialogHeader>
                <DialogTitle>Edit Template</DialogTitle>
                <DialogDescription>
                    Update your template details.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="edit-name">Template Name</Label>
                    <Input
                        id="edit-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="edit-channel">Channel</Label>
                    <Select value={channel} onValueChange={setChannel}>
                        <SelectTrigger className="rounded-xl">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                            <SelectItem value="EMAIL">Email</SelectItem>
                            <SelectItem value="SMS">SMS</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="edit-content">Content</Label>
                    <Textarea
                        id="edit-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="rounded-xl min-h-[120px]"
                    />
                </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full rounded-full">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
                    Save Changes
                </Button>
            </DialogFooter>
        </form>
    );
}
