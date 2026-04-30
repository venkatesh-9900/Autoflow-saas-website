"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Bot, MessageSquare, Zap, Target,
    Settings, Sparkles, Sliders, ChevronRight,
    Play, BrainCircuit, Activity
} from "lucide-react";

export default function ChatbotDashboard() {
    return (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">AI Chatbot Agent</h1>
                    <p className="text-muted-foreground font-medium">Your 24/7 intelligent assistant for customer success.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl font-bold bg-background/50 border-border/60">
                        Training Data
                    </Button>
                    <Button className="rounded-xl font-bold shadow-lg shadow-primary/20 bg-chatbot hover:opacity-90 transition-opacity">
                        <Sparkles className="w-4 h-4 mr-2" /> Live Preview
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-border/60 shadow-sm rounded-2xl p-8 bg-gradient-to-br from-chatbot/5 via-transparent to-transparent">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-chatbot/10 text-chatbot flex items-center justify-center">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-black text-lg">Auto Intelligence</h3>
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Model: Claude 3.5 Sonnet</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
                                <span>Context Accuracy</span>
                                <span>98%</span>
                            </div>
                            <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                                <div className="h-full bg-chatbot w-[98%]" />
                            </div>
                        </div>
                        <Button className="w-full rounded-xl h-12 font-bold variant-outline border-border/60">Upgrade Model</Button>
                    </div>
                </Card>

                <Card className="border-border/60 shadow-sm rounded-2xl p-8 bg-background/50">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-black text-lg">Active Queries</h3>
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Real-time status</p>
                        </div>
                    </div>
                    <div className="text-5xl font-black mb-2 animate-pulse">12</div>
                    <p className="text-sm font-bold text-muted-foreground">Customers currently chatting</p>
                </Card>

                <Card className="border-border/60 shadow-sm rounded-2xl p-8 bg-background/50">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-black text-lg">Resolution Rate</h3>
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Efficiency</p>
                        </div>
                    </div>
                    <div className="text-5xl font-black mb-2">84%</div>
                    <p className="text-sm font-bold text-muted-foreground">Resolved without human agent</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Card className="lg:col-span-3 border-border/60 shadow-xl rounded-[2.5rem] p-10 bg-background/30 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                        <Bot className="w-64 h-64" />
                    </div>
                    <div className="relative z-10">
                        <Badge className="bg-chatbot text-white border-none py-1.5 px-4 rounded-full mb-6 font-black uppercase tracking-widest text-[10px]">Primary Agent Config</Badge>
                        <h2 className="text-4xl font-black mb-8 leading-tight max-w-2xl">Shape how your AI speaks <br /> and interacts with customers.</h2>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-8">
                                <ConfigOption
                                    icon={<MessageSquare className="w-5 h-5" />}
                                    title="Welcome Message"
                                    desc="The first thing your users see."
                                />
                                <ConfigOption
                                    icon={<Sliders className="w-5 h-5" />}
                                    title="Personality Voice"
                                    desc="Professional, Friendly, or Playful."
                                />
                            </div>
                            <div className="space-y-8">
                                <ConfigOption
                                    icon={<Zap className="w-5 h-5" />}
                                    title="Instant Escalation"
                                    desc="Handover to a human when AI fails."
                                />
                                <ConfigOption
                                    icon={<Settings className="w-5 h-5" />}
                                    title="Custom Instructions"
                                    desc="Add site-specific knowledge bases."
                                />
                            </div>
                        </div>

                        <div className="mt-12 flex items-center gap-6">
                            <Button size="lg" className="rounded-full h-16 px-10 text-lg font-black bg-chatbot shadow-2xl shadow-chatbot/30">Save Configuration</Button>
                            <Button variant="ghost" className="font-bold text-muted-foreground">Reset to Defaults</Button>
                        </div>
                    </div>
                </Card>

                <div className="space-y-8">
                    <Card className="border-border/60 shadow-lg rounded-[2.5rem] p-8 text-center bg-secondary/10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-3xl bg-background border border-border/40 flex items-center justify-center mb-6 shadow-2xl">
                            <Play className="w-8 h-8 text-chatbot fill-chatbot" />
                        </div>
                        <h4 className="font-black text-xl mb-4">Chat Playground</h4>
                        <p className="text-sm text-muted-foreground font-medium mb-8 leading-relaxed">Instantly test your AI configurations in a sandboxed environment.</p>
                        <Button className="w-full rounded-2xl h-14 bg-background border border-border/60 text-foreground hover:bg-secondary/50 font-bold">Open Playground</Button>
                    </Card>

                    <div className="p-8 bg-chatbot rounded-[2.5rem] text-white shadow-2xl shadow-chatbot/40">
                        <h5 className="font-black text-sm uppercase tracking-[0.2em] mb-4 opacity-70">Pro Feature</h5>
                        <h4 className="text-2xl font-black mb-10 leading-tight">Advanced RAG Knowledge Training</h4>
                        <Button className="w-full rounded-2xl h-14 bg-white text-chatbot hover:bg-secondary/10 font-black">Learn More</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ConfigOption({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex items-start gap-5 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-muted-foreground/50 group-hover:bg-chatbot/10 group-hover:text-chatbot transition-all">
                {icon}
            </div>
            <div className="flex-1 border-b border-border/40 pb-6">
                <div className="flex items-center justify-between mb-1">
                    <h5 className="font-black text-base">{title}</h5>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">{desc}</p>
            </div>
        </div>
    );
}
