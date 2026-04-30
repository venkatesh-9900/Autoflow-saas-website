"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowRight, Zap, ShoppingBag, Calendar, Users } from "lucide-react";
import { useState } from "react";

interface TemplateItem {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    color: string;
    steps: number;
}

const TEMPLATES = [
    {
        id: "1",
        name: "Abandoned Cart Recovery",
        description: "Automatically send a sequence of emails and SMS to recover lost sales.",
        category: "E-Commerce",
        icon: <ShoppingBag className="w-5 h-5 text-emerald-500" />,
        color: "from-emerald-500/20 to-teal-500/20",
        steps: 3
    },
    {
        id: "2",
        name: "New User Onboarding",
        description: "A 5-day WhatsApp drip campaign to educate new users about your platform.",
        category: "Product",
        icon: <Users className="w-5 h-5 text-blue-500" />,
        color: "from-blue-500/20 to-indigo-500/20",
        steps: 5
    },
    {
        id: "3",
        name: "Webinar Event Reminder",
        description: "Send 24h, 1h, and 15m reminders before a live event via SMS and Email.",
        category: "Marketing",
        icon: <Calendar className="w-5 h-5 text-purple-500" />,
        color: "from-purple-500/20 to-fuchsia-500/20",
        steps: 4
    },
    {
        id: "4",
        name: "Lead Qualification Gen",
        description: "An interactive Instagram DM funnel to qualify inbound leads automatically.",
        category: "Sales",
        icon: <Zap className="w-5 h-5 text-orange-500" />,
        color: "from-orange-500/20 to-amber-500/20",
        steps: 2
    }
];

export default function AutomationTemplateLibrary() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Template Library</h1>
                    <p className="text-muted-foreground font-medium">Deploy enterprise-grade automation funnels in one click.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {TEMPLATES.map((tpl) => (
                    <TemplateCard key={tpl.id} template={tpl} />
                ))}
            </div>
        </div>
    );
}

function TemplateCard({ template }: { template: TemplateItem }) {
    const [isImporting, setIsImporting] = useState(false);
    const [imported, setImported] = useState(false);

    const handleImport = () => {
        setIsImporting(true);
        setTimeout(() => {
            setIsImporting(false);
            setImported(true);
        }, 1500);
    };

    return (
        <Card className="border-border/60 shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-all group flex flex-col">
            <div className={`h-24 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center shadow-sm">
                    {template.icon}
                </div>
            </div>

            <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="rounded-md bg-secondary/30 border-border/60 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        {template.category}
                    </Badge>
                    <span className="text-xs font-bold text-muted-foreground">{template.steps} Steps</span>
                </div>

                <h3 className="font-black text-xl mb-2">{template.name}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-6 flex-1">
                    {template.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <Button variant="ghost" className="font-bold -ml-4 rounded-xl text-muted-foreground hover:text-foreground">
                        Preview <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <Button
                        disabled={isImporting || imported}
                        onClick={handleImport}
                        className="rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    >
                        {isImporting ? (
                            "Importing..."
                        ) : imported ? (
                            "Imported"
                        ) : (
                            <><Download className="w-4 h-4 mr-2" /> Import</>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
