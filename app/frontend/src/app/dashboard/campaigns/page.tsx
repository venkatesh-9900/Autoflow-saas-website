"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pause, Settings, ArrowDown, Mail, Smartphone, MessageSquare, Loader2, Trash2 } from "lucide-react";
import { api } from "@/lib/api-client";

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

interface Campaign {
    id: string;
    name: string;
    type: 'WHATSAPP' | 'EMAIL' | 'SMS';
    status: string;
    workflow: Record<string, unknown> | null;
    updatedAt: string;
}

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    async function fetchCampaigns() {
        try {
            setLoading(true);
            const data = await api.get('/campaigns');
            setCampaigns(data);
            if (data.length > 0 && !selectedCampaign) {
                setSelectedCampaign(data[0]);
            }
        } catch (err: unknown) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCampaigns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreateSuccess = () => {
        setIsCreateOpen(false);
        fetchCampaigns();
    };

    const handleDeleteCampaign = async (id: string) => {
        if (!confirm("Are you sure you want to delete this campaign?")) return;
        try {
            await api.delete(`/campaigns/${id}`);
            if (selectedCampaign?.id === id) {
                setSelectedCampaign(null);
            }
            fetchCampaigns();
        } catch (err: unknown) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
                    <p className="text-muted-foreground mt-2">Design and manage your automated workflows.</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="rounded-full shadow-md shadow-primary/20">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Campaign
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-2xl">
                        <CreateCampaignForm onSuccess={handleCreateSuccess} />
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : error ? (
                <div className="text-center py-10 text-destructive bg-destructive/10 rounded-xl border border-destructive/20">
                    Error: {error}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Sidebar list of campaigns */}
                    <Card className="md:col-span-1 border-border/50 shadow-sm">
                        <CardHeader>
                            <CardTitle>Active Flows</CardTitle>
                            <CardDescription>Your running automation sequences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {campaigns.length === 0 ? (
                                <p className="text-center text-sm text-muted-foreground py-4">No campaigns found.</p>
                            ) : (
                                campaigns.map((campaign) => (
                                    <div key={campaign.id} onClick={() => setSelectedCampaign(campaign)}>
                                        <CampaignListItem
                                            title={campaign.name}
                                            status={campaign.status}
                                            stats={`${campaign.type}`}
                                            active={selectedCampaign?.id === campaign.id}
                                            onDelete={() => handleDeleteCampaign(campaign.id)}
                                        />
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Visual Workflow Builder Area */}
                    <Card className="md:col-span-2 border-border/50 shadow-sm bg-secondary/10">
                        {selectedCampaign ? (
                            <>
                                <CardHeader className="flex flex-row items-center justify-between bg-background border-b border-border/50 pb-4">
                                    <div>
                                        <CardTitle>{selectedCampaign.name}</CardTitle>
                                        <CardDescription>Primary channel: {selectedCampaign.type}</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-2" /> Settings</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px] rounded-2xl">
                                                <EditCampaignForm campaign={selectedCampaign} onSuccess={() => {
                                                    setIsEditOpen(false);
                                                    fetchCampaigns();
                                                    // Also update selected campaign to reflect changes locally if needed
                                                    // or just let fetchCampaigns handle it if it refreshes the list
                                                }} />
                                            </DialogContent>
                                        </Dialog>
                                        <Button size="sm"><Pause className="w-4 h-4 mr-2" /> {selectedCampaign.status === 'ACTIVE' ? 'Pause Flow' : 'Resume Flow'}</Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8 flex flex-col items-center justify-start min-h-[500px]">
                                    {/* Trigger Node */}
                                    <WorkflowNode icon={<Plus className="w-5 h-5 text-primary" />} title="Trigger: Manual/Event" desc="Starts when conditions are met" />

                                    <WorkflowConnector />

                                    {/* Email Action */}
                                    <WorkflowNode
                                        icon={selectedCampaign.type === 'EMAIL' ? <Mail className="w-5 h-5 text-blue-500" /> : selectedCampaign.type === 'WHATSAPP' ? <MessageSquare className="w-5 h-5 text-green-500" /> : <Smartphone className="w-5 h-5 text-orange-500" />}
                                        title={`Send ${selectedCampaign.type}`}
                                        desc="Primary step in this sequence"
                                    />

                                    <WorkflowConnector delay="Wait 2 days" />

                                    {/* Condition Node placeholder */}
                                    <div className="flex items-center gap-4 w-full justify-center">
                                        <div className="flex flex-col items-center flex-1">
                                            <WorkflowNode className="border-green-500/50" icon={<Plus className="w-5 h-5 text-green-500" />} title="Success Path" desc="Action performed correctly" />
                                        </div>

                                        <div className="flex flex-col items-center flex-1 opacity-50">
                                            <WorkflowNode className="border-red-500/50" icon={<Plus className="w-5 h-5 text-red-500" />} title="Failure Path" desc="Delivery failed or timed out" />
                                        </div>
                                    </div>

                                    <Button variant="outline" className="mt-8 rounded-full border-dashed border-2">
                                        <Plus className="w-4 h-4 mr-2" /> Add Step
                                    </Button>
                                </CardContent>
                            </>
                        ) : (
                            <div className="flex items-center justify-center min-h-[500px] text-muted-foreground">
                                Select a campaign to view workflow
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
}

function CampaignListItem({ title, status, stats, active = false, onDelete }: { title: string, status: string, stats: string, active?: boolean, onDelete: () => void }) {
    return (
        <div className={`p-4 rounded-xl border ${active ? 'border-primary bg-primary/5' : 'border-border/50 bg-background hover:bg-secondary/30'} cursor-pointer transition-colors group relative`}>
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">{title}</h4>
                <div className="flex items-center gap-2">
                    <Badge variant={status === 'ACTIVE' || status === 'Active' ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0 h-4">
                        {status}
                    </Badge>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        <Trash2 className="w-3 h-3" />
                    </Button>
                </div>
            </div>
            <p className="text-xs text-muted-foreground">{stats}</p>
        </div>
    );
}

function WorkflowNode({ icon, title, desc, className = "" }: { icon: React.ReactNode, title: string, desc: string, className?: string }) {
    return (
        <div className={`w-64 bg-background border border-border/80 shadow-sm rounded-xl p-4 flex items-center gap-4 z-10 ${className}`}>
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <h5 className="font-semibold text-sm">{title}</h5>
                <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
        </div>
    )
}

function WorkflowConnector({ delay }: { delay?: string }) {
    return (
        <div className="flex flex-col items-center my-2">
            <div className="w-px h-8 bg-border" />
            {delay && (
                <Badge variant="outline" className="bg-background text-[10px] my-1 text-muted-foreground py-0">
                    {delay}
                </Badge>
            )}
            <div className="w-px h-8 bg-border" />
            <ArrowDown className="w-4 h-4 text-muted-foreground -mt-2" />
        </div>
    )
}

function CreateCampaignForm({ onSuccess }: { onSuccess: () => void }) {
    const [name, setName] = useState("");
    const [type, setType] = useState<string>("WHATSAPP");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post('/campaigns', { name, type });
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
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                    Define your campaign name and primary communication channel.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                        id="name"
                        placeholder="e.g. Welcome Sequence"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="type">Channel</Label>
                    <Select value={type} onValueChange={setType}>
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
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full rounded-full">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    Create Campaign
                </Button>
            </DialogFooter>
        </form>
    );
}

function EditCampaignForm({ campaign, onSuccess }: { campaign: Campaign, onSuccess: () => void }) {
    const [name, setName] = useState(campaign.name);
    const [type, setType] = useState<string>(campaign.type);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.patch(`/campaigns/${campaign.id}`, { name, type });
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
                <DialogTitle>Edit Campaign</DialogTitle>
                <DialogDescription>
                    Update your campaign details.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="edit-name">Campaign Name</Label>
                    <Input
                        id="edit-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="edit-type">Channel</Label>
                    <Select value={type} onValueChange={setType}>
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
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full rounded-full">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Settings className="w-4 h-4 mr-2" />}
                    Save Changes
                </Button>
            </DialogFooter>
        </form>
    );
}

