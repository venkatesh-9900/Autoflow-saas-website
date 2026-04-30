"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Rocket, Clock, CreditCard, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api-client";

interface BillingStatus {
    isPro?: boolean;
    subscriptions?: { planId: string }[];
    trials?: { serviceName: string, expiresAt: string }[];
}

export default function BillingDashboard() {
    const [status, setStatus] = useState<BillingStatus | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchBillingStatus = async () => {
        try {
            setLoading(true);
            const data = await api.get('/billing');
            setStatus(data);
        } catch (error) {
            console.error("Failed to fetch billing status", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBillingStatus();
    }, []);

    const handleSubscribe = async (planId: string) => {
        try {
            await api.post('/billing/subscribe', { planId });
            fetchBillingStatus();
        } catch (error) {
            console.error("Subscription failed", error);
        }
    };

    const handleStartTrial = async (serviceName: string) => {
        try {
            await api.post('/billing/trial', { serviceName });
            fetchBillingStatus();
        } catch (error) {
            console.error("Trial failed", error);
        }
    };

    const isPro = status?.isPro;
    const activeSubIds = status?.subscriptions?.map((s: { planId: string }) => s.planId) || [];

    const calculateDaysLeft = (expiresAt: string) => {
        const diff = new Date(expiresAt).getTime() - new Date().getTime();
        return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-12">
            <div>
                <h1 className="text-4xl font-black tracking-tight mb-2">Billing & Subscriptions</h1>
                <p className="text-muted-foreground font-medium">Manage your active plans, free trials, and payment methods.</p>
            </div>

            {loading && <div className="text-sm font-medium text-muted-foreground mb-4">Loading billing details...</div>}

            {/* Pro Upgrade Banner */}
            {!isPro && (
                <div className="bg-gradient-to-r from-primary to-chatbot rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute top-0 right-[-10%] w-[300px] h-[300px] bg-white opacity-10 blur-3xl rounded-full pointer-events-none" />
                    <div className="relative z-10 max-w-xl">
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-none mb-4 tracking-widest uppercase font-black text-[10px]">Recommended</Badge>
                        <h2 className="text-3xl font-black mb-2">Upgrade to Pro Bundle</h2>
                        <p className="text-white/80 font-medium leading-relaxed mb-6">Unlock all channels, advanced CRM tools, bulk scheduling, and unlimited AI generation in one unified package.</p>
                        <ul className="grid grid-cols-2 gap-3 text-sm font-bold">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> All Automation Channels</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Multi-platform Posting</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Priority Support</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Unlimited AI Tools</li>
                        </ul>
                    </div>
                    <div className="relative z-10 flex flex-col items-center shrink-0">
                        <div className="text-5xl font-black tracking-tighter mb-4">$79<span className="text-lg font-medium text-white/70">/mo</span></div>
                        <Button
                            onClick={() => handleSubscribe('pro_bundle')}
                            className="w-full h-14 rounded-full bg-white text-primary font-black shadow-xl hover:bg-white/90 active:scale-95 transition-transform"
                        >
                            <Zap className="w-5 h-5 mr-2" /> Upgrade to Pro
                        </Button>
                    </div>
                </div>
            )}

            {isPro && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-[2.5rem] p-10 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Pro Bundle Active</h2>
                            <p className="text-muted-foreground font-medium">You have unlimited access to all platform features.</p>
                        </div>
                    </div>
                    <Badge variant="outline" className="border-emerald-500 text-emerald-500 uppercase tracking-widest font-black text-xs px-4 py-2">
                        Active
                    </Badge>
                </div>
            )}

            {/* Individual Subscriptions */}
            <h3 className="text-2xl font-black mt-12 mb-6">Custom Service Add-ons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { id: 'whatsapp', name: 'WhatsApp Automation', price: '$29', icon: <MessageSquare className="w-6 h-6" /> },
                    { id: 'instagram', name: 'Instagram & Social', price: '$19', icon: <Instagram className="w-6 h-6" /> },
                    { id: 'email', name: 'Email Sequences', price: '$15', icon: <Mail className="w-6 h-6" /> },
                    { id: 'sms', name: 'SMS Gateway', price: '$25', icon: <Smartphone className="w-6 h-6" /> },
                ].map(service => {
                    const isSubscribed = activeSubIds.includes(service.id);
                    const trial = status?.trials?.find((t: { serviceName: string, expiresAt: string }) => t.serviceName === service.id);
                    const isTriaging = !!trial;
                    const daysLeft = isTriaging ? calculateDaysLeft(trial.expiresAt) : 0;

                    return (
                        <Card key={service.id} className={`border-border/60 hover:shadow-xl transition-shadow rounded-3xl overflow-hidden glass flex flex-col ${isSubscribed || isTriaging ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}>
                            <CardHeader className="p-6 pb-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 text-muted-foreground">
                                    {/* Icon placeholder since we cant import directly in map elegantly without massive bloat */}
                                    <Rocket className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-lg">{service.name}</CardTitle>
                                <CardDescription className="text-xl font-black text-foreground mt-2">{service.price}<span className="text-xs text-muted-foreground font-medium">/mo</span></CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-end gap-3">
                                {isPro ? (
                                    <Button variant="secondary" disabled className="w-full rounded-xl font-bold">Included in Pro</Button>
                                ) : isSubscribed ? (
                                    <Button variant="outline" className="w-full rounded-xl font-bold border-primary text-primary hover:bg-primary/5">Active Subscription</Button>
                                ) : isTriaging ? (
                                    <div className="space-y-3">
                                        <Badge variant="outline" className="w-full justify-center bg-amber-500/10 text-amber-500 border-amber-500/20 py-1.5 font-black uppercase tracking-widest text-[10px]">
                                            <Clock className="w-3 h-3 mr-1" /> {daysLeft} Days Left
                                        </Badge>
                                        <Button onClick={() => handleSubscribe(service.id)} className="w-full rounded-xl font-bold">Upgrade Now</Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Button onClick={() => handleSubscribe(service.id)} variant="outline" className="w-full rounded-xl font-bold bg-background shadow-sm hover:border-primary/40">Subscribe</Button>
                                        <Button onClick={() => handleStartTrial(service.id)} variant="ghost" className="w-full rounded-xl font-bold text-primary hover:bg-primary/5">Start 7-Day Trial</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Payment Methods Placeholder */}
            <div className="mt-12">
                <h3 className="text-xl font-black mb-6">Payment Methods</h3>
                <Card className="border-border/60 shadow-sm rounded-2xl p-6 glass flex items-center justify-between max-w-2xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                            <h4 className="font-bold">Visa ending in 4242</h4>
                            <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                        </div>
                    </div>
                    <Button variant="outline" className="rounded-xl font-bold">Update</Button>
                </Card>
            </div>
        </div>
    );
}

// Temporary icon map inside file
const MessageSquare = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const Instagram = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const Mail = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const Smartphone = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
