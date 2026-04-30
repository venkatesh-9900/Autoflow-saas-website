"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ShoppingBag, CreditCard,
    Table, ExternalLink,
    Zap, Instagram, MessageSquare, Facebook, Twitter, Mail, MessageCircle,
    CheckCheck, Tag,
    StickyNote, Paperclip, Smile, Bot,
    UserPlus, Archive, Trash2, Shield, Plus,
    Activity, Settings2, Sparkles, MessageSquareDot, CheckCircle2
} from "lucide-react";
import { IntegrationWizard } from "./components/IntegrationWizard";
import { api } from "@/lib/api-client";
import { Switch } from "@/components/ui/switch";

export default function ConnectorsPage() {
    const [wizardOpen, setWizardOpen] = useState(false);
    const [activeIntegration, setActiveIntegration] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [connectedAccounts, setConnectedAccounts] = useState<any[]>([]);

    const fetchAccounts = async () => {
        try {
            const data = await api.get('/connected-accounts');
            setConnectedAccounts(data);
        } catch (err) {
            console.error("Failed to load connected accounts", err);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line 
        fetchAccounts();
    }, []);

    const getStatus = (platformKey: string) => {
        const platformStr = platformKey.toUpperCase().replace('-', '_');
        const found = connectedAccounts.find(acc => acc.platform === platformStr);
        return found ? 'connected' : 'disconnected';
    };

    const handleConnectClick = async (id: string, status: string) => {
        if (status === 'connected') {
            const platformStr = id.toUpperCase().replace('-', '_');
            const found = connectedAccounts.find(acc => acc.platform === platformStr);
            if (found && confirm(`Are you sure you want to disconnect ${found.accountName}?`)) {
                try {
                    await api.delete(`/connected-accounts/${found.id}`);
                    fetchAccounts();
                } catch (e) {
                    console.error(e);
                }
            }
        } else {
            setActiveIntegration(id);
            setWizardOpen(true);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div>
                <h1 className="text-5xl font-black tracking-tight mb-4">Integrations</h1>
                <p className="text-muted-foreground text-xl font-medium">Connect and manage your third-party e-commerce, social, and payment tools.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* CORE PLATFORMS */}
                <IntegrationCard
                    id="whatsapp"
                    name="WhatsApp Business"
                    desc="Connect official WhatsApp Cloud API for automated messaging and support."
                    icon={<MessageSquare className="w-8 h-8 text-whatsapp" />}
                    status={getStatus('whatsapp')}
                    onConnect={() => handleConnectClick('whatsapp', getStatus('whatsapp'))}
                />
                <IntegrationCard
                    id="instagram"
                    name="Instagram Professional"
                    desc="Auto-publish posts, carousels, Reels and manage DM automation."
                    icon={<Instagram className="w-8 h-8 text-instagram" />}
                    status={getStatus('instagram')}
                    onConnect={() => handleConnectClick('instagram', getStatus('instagram'))}
                />
                <IntegrationCard
                    id="facebook"
                    name="Facebook Page"
                    desc="Automate Messenger, moderate comments, and capture leads."
                    icon={<Facebook className="w-8 h-8 text-blue-600" />}
                    status={getStatus('facebook')}
                    onConnect={() => handleConnectClick('facebook', getStatus('facebook'))}
                />
                <IntegrationCard
                    id="twitter"
                    name="Twitter / X"
                    desc="Schedule tweets, track engagement, and setup auto-replies."
                    icon={<Twitter className="w-8 h-8 text-foreground" />}
                    status={getStatus('twitter')}
                    onConnect={() => handleConnectClick('twitter', getStatus('twitter'))}
                />
                <IntegrationCard
                    id="email"
                    name="Email SMTP"
                    desc="Connect your custom domain for automated cold and transactional emails."
                    icon={<Mail className="w-8 h-8 text-primary" />}
                    status={getStatus('email')}
                    onConnect={() => handleConnectClick('email', getStatus('email'))}
                />
                <IntegrationCard
                    id="sms"
                    name="SMS Gateway"
                    desc="Deliver instant SMS notifications via Twilio or integrated providers."
                    icon={<MessageCircle className="w-8 h-8 text-purple-500" />}
                    status={getStatus('sms')}
                    onConnect={() => handleConnectClick('sms', getStatus('sms'))}
                />

                {/* E-COMMERCE & UTILS */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-12 mb-4">
                    <h3 className="text-2xl font-black mb-2 tracking-tight">E-Commerce & Tools</h3>
                    <p className="text-muted-foreground font-medium text-sm">Automate your store orders and sync your CRM data.</p>
                </div>

                <IntegrationCard
                    id="shopify"
                    name="Shopify"
                    desc="Sync orders, customers and products for deep automation."
                    icon={<ShoppingBag className="w-8 h-8 text-emerald-500" />}
                    status={getStatus('shopify')}
                    onConnect={() => handleConnectClick('shopify', getStatus('shopify'))}
                />
                <IntegrationCard
                    id="stripe"
                    name="Stripe"
                    desc="Trigger workflows based on payments and subscriptions."
                    icon={<CreditCard className="w-8 h-8 text-blue-500" />}
                    status={getStatus('stripe')}
                    onConnect={() => handleConnectClick('stripe', getStatus('stripe'))}
                />
                <IntegrationCard
                    id="zapier"
                    name="Zapier"
                    desc="Connect to 5,000+ apps with our Zapier integration."
                    icon={<Zap className="w-8 h-8 text-orange-500" />}
                    status={getStatus('zapier')}
                    onConnect={() => handleConnectClick('zapier', getStatus('zapier'))}
                />
            </div>

            <IntegrationWizard
                open={wizardOpen}
                onOpenChange={setWizardOpen}
                integrationKey={activeIntegration}
                onConnected={fetchAccounts}
            />
        </div>
    );
}

function IntegrationCard({ id, name, desc, icon, status, onConnect }: { id: string, name: string, desc: string, icon: React.ReactNode, status: string, onConnect: () => void }) {
    // Simulated dummy state for the toggles per card
    const [toggles, setToggles] = useState<Record<string, boolean>>({
        autoReply: true,
        aiBooking: false,
        commentMod: true,
        autoPost: false
    });

    const handleToggle = (key: string, checked: boolean) => {
        setToggles(prev => ({ ...prev, [key]: checked }));
    };

    return (
        <Card className="flex flex-col p-6 rounded-[2rem] border-2 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 flex gap-2">
                {status === 'connected' && (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none font-black uppercase text-[10px] tracking-widest"><CheckCircle2 className="w-3 h-3 mr-1" /> Active</Badge>
                )}
            </div>

            <div className="flex-1 flex flex-col gap-4 mt-2 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-black">{name}</h3>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed mt-1 dark:text-muted-foreground/80">{desc}</p>
                </div>

                {status === 'connected' && (
                    <div className="mt-4 pt-4 border-t space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        {id === 'whatsapp' || id === 'facebook' ? (
                            <>
                                <AutomationToggle label="AI Auto-Replies" checked={toggles.autoReply} onChange={(v) => handleToggle('autoReply', v)} icon={<Bot />} />
                                <AutomationToggle label="Appointment Booking" checked={toggles.aiBooking} onChange={(v) => handleToggle('aiBooking', v)} icon={<Sparkles />} />
                            </>
                        ) : id === 'instagram' || id === 'twitter' ? (
                            <>
                                <AutomationToggle label="Comment Moderation" checked={toggles.commentMod} onChange={(v) => handleToggle('commentMod', v)} icon={<MessageSquareDot />} />
                                <AutomationToggle label="Smart Campaign Scheduling" checked={toggles.autoPost} onChange={(v) => handleToggle('autoPost', v)} icon={<Activity />} />
                            </>
                        ) : (
                            <>
                                <AutomationToggle label="System Syncing" checked={toggles.autoReply} onChange={(v) => handleToggle('autoReply', v)} icon={<Settings2 />} />
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 mt-8 relative z-10">
                <Button variant="secondary" className="flex-[1] rounded-xl h-12 font-bold bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors group-hover:shadow-lg">
                    <ExternalLink className="w-4 h-4" />
                </Button>
                <Button
                    onClick={onConnect}
                    variant={status === 'connected' ? "destructive" : "default"}
                    className={`flex-[2] rounded-xl h-12 text-xs font-black shadow-lg ${status === 'connected' ? 'shadow-destructive/20' : 'bg-primary text-primary-foreground shadow-primary/20'}`}>
                    {status === 'connected' ? 'Disconnect' : 'Connect'}
                </Button>
            </div>
        </Card>
    );
}

function AutomationToggle({ label, checked, onChange, icon }: { label: string, checked: boolean, onChange: (v: boolean) => void, icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors border border-border/40">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-background text-primary flex items-center justify-center shadow-sm [&>svg]:w-4 [&>svg]:h-4">
                    {icon}
                </div>
                <span className="text-sm font-bold text-foreground">{label}</span>
            </div>
            <Switch checked={checked} onCheckedChange={onChange} />
        </div>
    );
}
