"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Palette, Globe, Upload,
    Save, Shield,
    Laptop, Eye
} from "lucide-react";
import { useState } from "react";

export default function WhiteLabelDashboard() {
    const [primaryColor, setPrimaryColor] = useState("#0066FF");

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tight mb-4 text-gradient">White Label</h1>
                    <p className="text-muted-foreground text-xl font-medium">Rebrand the platform with your own identity.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl h-14 px-8 border-border/60 font-bold">
                        <Eye className="w-5 h-5 mr-3" /> Preview
                    </Button>
                    <Button className="rounded-2xl h-14 px-8 font-black shadow-xl shadow-primary/20 bg-primary text-primary-foreground">
                        <Save className="w-5 h-5 mr-3" /> Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    {/* Visual Identity Section */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black flex items-center gap-3">
                            <Palette className="w-6 h-6 text-primary" /> Visual Identity
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="border-border/60 shadow-sm rounded-[2.5rem] p-8 glass overflow-hidden relative">
                                <Label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground block mb-6">Platform Logo</Label>
                                <div className="aspect-square rounded-3xl bg-secondary/20 border-2 border-dashed border-border/60 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-secondary/30 transition-all">
                                    <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-black text-foreground">Click to upload</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">SVG, PNG (Max 2MB)</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-border/60 shadow-sm rounded-[2.5rem] p-8 glass space-y-8">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground block">Primary Brand Color</Label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl shadow-2xl border-4 border-background" style={{ backgroundColor: primaryColor }} />
                                        <Input
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            className="h-14 rounded-xl font-mono text-center flex-1 border-border/60"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground block">Typography</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" className="rounded-xl h-12 border-primary text-primary font-bold">Inter (Default)</Button>
                                        <Button variant="outline" className="rounded-xl h-12 border-border/40 font-bold">Outfit</Button>
                                        <Button variant="outline" className="rounded-xl h-12 border-border/40 font-bold">Manrope</Button>
                                        <Button variant="outline" className="rounded-xl h-12 border-border/40 font-bold">Roboto</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </section>

                    {/* Domain & Namespace */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black flex items-center gap-3">
                            <Globe className="w-6 h-6 text-primary" /> Custom Domain
                        </h2>
                        <Card className="border-border/60 shadow-sm rounded-[2.5rem] p-10 glass space-y-8">
                            <div className="space-y-4 max-w-xl">
                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Custom Dashboard URL</Label>
                                <div className="flex gap-3">
                                    <div className="h-14 rounded-2xl border border-border/60 bg-secondary/5 px-6 flex items-center font-black text-muted-foreground/30 select-none">https://</div>
                                    <Input placeholder="dashboard.yourbrand.com" className="h-14 rounded-2xl border-border/60 flex-1 font-bold px-6" />
                                </div>
                                <p className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                    <Shield className="w-3 h-3 text-emerald-500" /> SSL Certificates are automatically provisioned.
                                </p>
                            </div>

                            <div className="p-6 bg-secondary/10 rounded-2xl border border-border/20 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                                    <span className="text-xs font-black uppercase tracking-widest">DNS Propagated</span>
                                </div>
                                <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-[10px] font-black text-[9px] uppercase tracking-widest">Active</span>
                            </div>
                        </Card>
                    </section>
                </div>

                {/* Sidebar Preview */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                        <Laptop className="w-6 h-6 text-primary" /> Live Preview
                    </h2>
                    <div className="rounded-[3rem] border-8 border-background shadow-2xl overflow-hidden aspect-[9/16] bg-background relative group">
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-secondary/50 to-transparent p-6 flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: primaryColor }} />
                            <div className="h-4 w-24 bg-border/20 rounded-full" />
                        </div>
                        <div className="p-8 pt-24 space-y-6">
                            <div className="h-32 w-full bg-secondary/20 rounded-3xl" />
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-border/20 rounded-full" />
                                <div className="h-4 w-2/3 bg-border/20 rounded-full" />
                                <div className="h-4 w-1/2 bg-border/20 rounded-full" />
                            </div>
                            <div className="h-40 w-full rounded-3xl border-2 border-dashed border-border/20 flex flex-col items-center justify-center gap-3">
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: primaryColor + '20' }} />
                                <div className="h-2 w-20 bg-border/20 rounded-full" />
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Preview of the white-labeled dashboard</p>
                </div>
            </div>
        </div>
    );
}
