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
import { Plus, Search, MoreHorizontal, Loader2 } from "lucide-react";
import { api } from "@/lib/api-client";

interface Contact {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    pipelineStage: string;
    tags: string[];
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchContacts() {
            try {
                const data = await api.get('/contacts');
                setContacts(data);
            } catch (err: unknown) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchContacts();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
                    <p className="text-muted-foreground mt-2">Manage your leads, customers, and CRM pipeline.</p>
                </div>
                <Button className="rounded-full shadow-md shadow-primary/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                </Button>
            </div>

            <div className="flex items-center space-x-2 bg-background p-1 md:p-2 rounded-2xl border border-border/50 shadow-sm mb-4">
                <Search className="w-5 h-5 text-muted-foreground ml-3" />
                <Input
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-10 text-base"
                    placeholder="Search contacts by name, email, or tags..."
                />
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
                            {contacts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                        No contacts found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                contacts.map((contact) => (
                                    <TableRow key={contact.id} className="cursor-pointer hover:bg-secondary/20 transition-colors">
                                        <TableCell className="font-medium">{contact.name}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm">{contact.email || "No email"}</span>
                                                <span className="text-xs text-muted-foreground">{contact.phone || "No phone"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={contact.pipelineStage === 'Customer' ? 'default' : contact.pipelineStage === 'Churned' ? 'destructive' : 'secondary'} className="rounded-full">
                                                {contact.pipelineStage}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {contact.tags.map(tag => (
                                                    <Badge key={tag} variant="outline" className="text-xs font-normal text-muted-foreground bg-secondary/10">
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
