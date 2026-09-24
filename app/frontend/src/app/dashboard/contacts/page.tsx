"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Search, MoreHorizontal, Loader2, Sparkles, UserCheck } from "lucide-react";
import { api } from "@/lib/api-client";

interface Contact {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    pipelineStage: string;
    tags: string[];
}

const DEFAULT_SAMPLE_CONTACTS: Contact[] = [
    {
        id: "c1",
        name: "Sarah Jenkins",
        email: "sarah.j@acme.com",
        phone: "+1 (555) 234-5678",
        pipelineStage: "Customer",
        tags: ["VIP", "Instagram Lead", "High LTV"],
    },
    {
        id: "c2",
        name: "Alex Rivera",
        email: "alex.rivera@fintech.io",
        phone: "+1 (555) 876-5432",
        pipelineStage: "Lead",
        tags: ["WhatsApp", "Trial User"],
    },
    {
        id: "c3",
        name: "Marcus Vance",
        email: "mvance@enterprise.org",
        phone: "+1 (555) 345-6789",
        pipelineStage: "Negotiation",
        tags: ["Enterprise", "Email Inbound"],
    },
    {
        id: "c4",
        name: "Elena Rostova",
        email: "elena@designhub.co",
        phone: "+1 (555) 987-6543",
        pipelineStage: "Customer",
        tags: ["Social Referral", "Pro Plan"],
    },
    {
        id: "c5",
        name: "David Kim",
        email: "dkim@startupgrowth.com",
        phone: "+1 (555) 432-1098",
        pipelineStage: "Lead",
        tags: ["Twitter/X", "Product Qualified"],
    },
];

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDemoData, setIsDemoData] = useState(false);

    // New contact form state
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newStage, setNewStage] = useState("Lead");
    const [newTags, setNewTags] = useState("");

    useEffect(() => {
        async function fetchContacts() {
            try {
                const data = await api.get('/contacts');
                if (Array.isArray(data) && data.length > 0) {
                    setContacts(data);
                } else {
                    setContacts(DEFAULT_SAMPLE_CONTACTS);
                    setIsDemoData(true);
                }
            } catch {
                setContacts(DEFAULT_SAMPLE_CONTACTS);
                setIsDemoData(true);
            } finally {
                setLoading(false);
            }
        }
        fetchContacts();
    }, []);

    const handleAddContact = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;

        const newContact: Contact = {
            id: `c_${Date.now()}`,
            name: newName.trim(),
            email: newEmail.trim() || null,
            phone: newPhone.trim() || null,
            pipelineStage: newStage,
            tags: newTags ? newTags.split(",").map(t => t.trim()).filter(Boolean) : ["Direct Entry"],
        };

        setContacts([newContact, ...contacts]);
        setNewName("");
        setNewEmail("");
        setNewPhone("");
        setNewStage("Lead");
        setNewTags("");
        setIsAddOpen(false);
    };

    const filteredContacts = contacts.filter((c) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        return (
            c.name.toLowerCase().includes(query) ||
            (c.email && c.email.toLowerCase().includes(query)) ||
            (c.phone && c.phone.includes(query)) ||
            c.pipelineStage.toLowerCase().includes(query) ||
            c.tags.some((t) => t.toLowerCase().includes(query))
        );
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
                        {isDemoData && (
                            <Badge variant="outline" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-secondary/30">
                                Live CRM Preview
                            </Badge>
                        )}
                    </div>
                    <p className="text-muted-foreground mt-2">Manage your leads, customers, and CRM pipeline.</p>
                </div>

                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="rounded-full shadow-md shadow-primary/20">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Contact
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px] rounded-2xl">
                        <form onSubmit={handleAddContact} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Add New Contact</DialogTitle>
                                <DialogDescription>
                                    Add a new customer or lead to your unified CRM pipeline.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 py-2">
                                <div className="space-y-1.5">
                                    <Label htmlFor="c-name">Full Name *</Label>
                                    <Input
                                        id="c-name"
                                        placeholder="e.g. Jessica Adams"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        required
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="c-email">Email Address</Label>
                                    <Input
                                        id="c-email"
                                        type="email"
                                        placeholder="e.g. jessica@example.com"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="c-phone">Phone Number</Label>
                                    <Input
                                        id="c-phone"
                                        placeholder="e.g. +1 (555) 123-4567"
                                        value={newPhone}
                                        onChange={(e) => setNewPhone(e.target.value)}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="c-stage">Pipeline Stage</Label>
                                    <Select value={newStage} onValueChange={setNewStage}>
                                        <SelectTrigger className="rounded-xl">
                                            <SelectValue placeholder="Select stage" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="Lead">Lead</SelectItem>
                                            <SelectItem value="Qualified">Qualified</SelectItem>
                                            <SelectItem value="Negotiation">Negotiation</SelectItem>
                                            <SelectItem value="Customer">Customer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="c-tags">Tags (comma separated)</Label>
                                    <Input
                                        id="c-tags"
                                        placeholder="e.g. VIP, Instagram, Hot Lead"
                                        value={newTags}
                                        onChange={(e) => setNewTags(e.target.value)}
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="rounded-xl">
                                    Cancel
                                </Button>
                                <Button type="submit" className="rounded-xl shadow-md shadow-primary/20">
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Save Contact
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center space-x-2 bg-background p-1 md:p-2 rounded-2xl border border-border/50 shadow-sm mb-4">
                <Search className="w-5 h-5 text-muted-foreground ml-3 shrink-0" />
                <Input
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-10 text-base"
                    placeholder="Search contacts by name, email, phone, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        className="text-xs text-muted-foreground hover:text-foreground px-3 py-1 font-semibold"
                    >
                        Clear
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="rounded-xl border border-border/50 bg-background shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-secondary/30">
                            <TableRow>
                                <TableHead className="w-[250px] font-semibold">Name</TableHead>
                                <TableHead className="font-semibold">Contact Info</TableHead>
                                <TableHead className="font-semibold">Stage</TableHead>
                                <TableHead className="font-semibold">Tags</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredContacts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                        No contacts found matching &quot;{searchQuery}&quot;
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredContacts.map((contact) => (
                                    <TableRow key={contact.id} className="cursor-pointer hover:bg-secondary/20 transition-colors">
                                        <TableCell className="font-medium">{contact.name}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-medium">{contact.email || "No email"}</span>
                                                <span className="text-xs text-muted-foreground">{contact.phone || "No phone"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    contact.pipelineStage === 'Customer'
                                                        ? 'default'
                                                        : contact.pipelineStage === 'Churned'
                                                        ? 'destructive'
                                                        : 'secondary'
                                                }
                                                className="rounded-full font-semibold"
                                            >
                                                {contact.pipelineStage}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {contact.tags.map(tag => (
                                                    <Badge key={tag} variant="outline" className="text-xs font-normal text-muted-foreground bg-secondary/20">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}

