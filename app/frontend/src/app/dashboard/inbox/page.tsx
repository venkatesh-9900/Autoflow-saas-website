"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Search, Filter, Send, MoreHorizontal,
    MessageSquare, Instagram, Mail, Smartphone,
    Facebook, Twitter, MessageCircle,
    CheckCheck, Tag,
    StickyNote, Paperclip, Smile, Bot,
    UserPlus, Archive, Trash2, Shield, Plus
} from "lucide-react";

export default function UnifiedInbox() {
    const [selectedThread, setSelectedThread] = useState<string | null>("1");

    return (
        <div className="h-[calc(100vh-160px)] flex gap-0 rounded-[2rem] overflow-hidden border border-border/60 shadow-2xl glass animate-in fade-in duration-700">
            {/* Thread List Sidebar */}
            <div className="w-80 md:w-96 border-r border-border/40 flex flex-col bg-secondary/5">
                <div className="p-6 border-b border-border/40">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-black tracking-tight">Unified Inbox</h1>
                        <Button size="icon" variant="ghost" className="rounded-xl">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                        <Input
                            className="bg-background/50 border-border/60 pl-9 rounded-xl h-11 text-sm focus:ring-primary/20 transition-all font-medium"
                            placeholder="Search conversations..."
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 p-2">
                    <InboxItem
                        id="1"
                        active={selectedThread === "1"}
                        onClick={() => setSelectedThread("1")}
                        name="Alex Rivera"
                        channel="whatsapp"
                        msg="Hey, can you help me with my order status? I haven't received it yet."
                        time="2m ago"
                        unread={true}
                    />
                    <InboxItem
                        id="2"
                        active={selectedThread === "2"}
                        onClick={() => setSelectedThread("2")}
                        name="Sarah Johnson"
                        channel="instagram"
                        msg="Loved your recent post! Do you have this in blue?"
                        time="15m ago"
                        unread={false}
                    />
                    <InboxItem
                        id="3"
                        active={selectedThread === "3"}
                        onClick={() => setSelectedThread("3")}
                        name="Tech Corp Inc."
                        channel="email"
                        msg="Proposal for the Q4 marketing campaign automation."
                        time="1h ago"
                        unread={false}
                    />
                    <InboxItem
                        id="4"
                        active={selectedThread === "4"}
                        onClick={() => setSelectedThread("4")}
                        name="David Chen"
                        channel="facebook"
                        msg="Do you offer bulk discounts for the Enterprise plan?"
                        time="2h ago"
                        unread={false}
                    />
                    <InboxItem
                        id="5"
                        active={selectedThread === "5"}
                        onClick={() => setSelectedThread("5")}
                        name="@marketing_ninja"
                        channel="twitter"
                        msg="Just scheduled my first cross-platform campaign! 🚀"
                        time="5h ago"
                        unread={true}
                    />
                    <InboxItem
                        id="6"
                        active={selectedThread === "6"}
                        onClick={() => setSelectedThread("6")}
                        name="+1 (555) 019-2831"
                        channel="sms"
                        msg="Yes, please confirm my appointment for tomorrow at 2 PM."
                        time="1d ago"
                        unread={false}
                    />
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-background/30 relative">
                {selectedThread ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-20 border-b border-border/40 flex items-center justify-between px-8 backdrop-blur-md bg-background/50 sticky top-0 z-10">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-10 h-10 rounded-xl border border-border/60">
                                    <AvatarImage src="https://i.pravatar.cc/150?u=alex" />
                                    <AvatarFallback>AR</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-black text-sm">Alex Rivera</h3>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest text-whatsapp bg-whatsapp/5 border-whatsapp/20 h-4">WhatsApp</Badge>
                                        <span className="text-[10px] text-muted-foreground font-bold">• Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 text-muted-foreground"><UserPlus className="w-4 h-4" /></Button>
                                <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 text-muted-foreground"><Archive className="w-4 h-4" /></Button>
                                <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 text-muted-foreground"><Trash2 className="w-4 h-4" /></Button>
                                <div className="w-px h-6 bg-border/40 mx-2" />
                                <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10"><MoreHorizontal className="w-4 h-4" /></Button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            <div className="flex justify-center">
                                <Badge className="bg-secondary/40 text-muted-foreground border-none font-bold text-[10px] uppercase tracking-widest">Yesterday</Badge>
                            </div>

                            <MessageBubble
                                side="left"
                                msg="Hi there! I was wondering if you could check on my order #7742. It should have been here by Tuesday."
                                time="14:20"
                                status="delivered"
                            />

                            <MessageBubble
                                side="right"
                                msg="Hello Alex! I'll check that for you right away. One moment please while I access our system."
                                time="14:22"
                                status="seen"
                            />

                            <div className="flex justify-center">
                                <Badge className="bg-chatbot/10 text-chatbot border-none font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1">AI Assistant Responding...</Badge>
                            </div>

                            <MessageBubble
                                side="left"
                                msg="Hey, can you help me with my order status? I haven't received it yet."
                                time="Just now"
                                status="delivered"
                            />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-border/40 bg-background/50">
                            <div className="flex items-center gap-3 bg-secondary/20 rounded-2xl p-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-chatbot/10 text-chatbot flex items-center justify-center">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <p className="text-xs text-muted-foreground font-medium">AI suggests: <span className="text-foreground font-bold italic">&quot;Sure, I can help you with your order status. Could you please provide your email address?&quot;</span></p>
                                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase text-chatbot hover:bg-chatbot/10 ml-auto">Apply</Button>
                            </div>
                            <div className="flex items-end gap-3">
                                <div className="flex-1 min-h-[56px] bg-secondary/30 rounded-2xl border border-border/40 p-4 relative group focus-within:border-primary/40 transition-all">
                                    <textarea
                                        className="w-full bg-transparent border-none focus:outline-none text-sm font-medium resize-none placeholder:text-muted-foreground/30 h-8"
                                        placeholder="Type your message..."
                                    />
                                    <div className="flex items-center gap-4 mt-2 border-t border-border/10 pt-3">
                                        <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-primary"><Paperclip className="w-4 h-4" /></Button>
                                        <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-primary"><Smile className="w-4 h-4" /></Button>
                                        <div className="flex-1" />
                                        <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Type <span className="text-primary">/</span> for shortcuts</p>
                                    </div>
                                </div>
                                <Button className="h-14 w-14 rounded-2xl bg-primary shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                    <Send className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-30 select-none">
                        <div className="w-24 h-24 rounded-[2rem] bg-secondary flex items-center justify-center mb-8">
                            <MessageSquare className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-black">Select a conversation</h2>
                        <p className="font-bold">Choose a thread to start chatting across channels.</p>
                    </div>
                )}
            </div>

            {/* Context Sidebar */}
            <div className="w-80 border-l border-border/40 flex flex-col bg-secondary/5 hidden xl:flex">
                <div className="p-8 text-center border-b border-border/40 bg-gradient-to-b from-secondary/10 to-transparent">
                    <Avatar className="w-24 h-24 rounded-3xl mx-auto mb-6 border-4 border-background shadow-2xl">
                        <AvatarImage src="https://i.pravatar.cc/150?u=alex" />
                        <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-black">Alex Rivera</h2>
                    <p className="text-xs font-bold text-muted-foreground mb-4">alex.rivera@gmail.com</p>
                    <div className="flex justify-center gap-2">
                        <Badge className="bg-blue-500/10 text-blue-500 border-none font-black text-[9px] uppercase tracking-widest">VIP Customer</Badge>
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[9px] uppercase tracking-widest">Active</Badge>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <section>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4 flex items-center gap-2"><Tag className="w-3 h-3" /> Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {["E-commerce", "High-Value", "Reviewer"].map(tag => (
                                <Badge key={tag} variant="outline" className="rounded-lg bg-background border-border/60 text-[10px] font-bold py-1">{tag}</Badge>
                            ))}
                            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg border border-dashed border-border/60">
                                <Plus className="w-3 h-3 text-muted-foreground" />
                            </Button>
                        </div>
                    </section>

                    <section>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4 flex items-center gap-2"><StickyNote className="w-3 h-3" /> Internal Notes</h4>
                        <div className="space-y-3">
                            <div className="p-3 bg-background rounded-xl text-xs font-medium border border-border/40 relative group">
                                Mentioned they had issues with the previous shipping provider.
                                <span className="block mt-2 text-[9px] font-black text-muted-foreground opacity-50 uppercase tracking-widest">Sarah J. • 2d ago</span>
                            </div>
                            <Button variant="outline" className="w-full rounded-xl h-10 border-dashed text-xs font-bold text-muted-foreground">Add Note</Button>
                        </div>
                    </section>

                    <section>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4 flex items-center gap-2"><Shield className="w-3 h-3" /> Security & Privacy</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold">Encrypted Channel</span>
                                <div className="w-8 h-4 bg-primary/20 rounded-full flex items-center px-1">
                                    <div className="w-2 h-2 bg-primary rounded-full ml-auto" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold">Data Sovereignty</span>
                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">EU Region</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function InboxItem({ name, channel, msg, time, unread, active, onClick }: { id?: string, name: string, channel: string, msg: string, time: string, unread: boolean, active: boolean, onClick: () => void }) {
    const ChannelIcon = channel === 'whatsapp' ? MessageSquare :
        channel === 'instagram' ? Instagram :
            channel === 'email' ? Mail :
                channel === 'facebook' ? Facebook :
                    channel === 'twitter' ? Twitter :
                        channel === 'sms' ? MessageCircle : Smartphone;
    const channelColor = channel === 'whatsapp' ? 'text-whatsapp' :
        channel === 'instagram' ? 'text-instagram' :
            channel === 'email' ? 'text-blue-500' :
                channel === 'facebook' ? 'text-blue-600' :
                    channel === 'twitter' ? 'text-foreground' :
                        channel === 'sms' ? 'text-purple-500' : 'text-gray-500';

    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-2xl cursor-pointer transition-all flex items-start gap-4 mx-2 ${active ? 'bg-primary/10 shadow-sm border border-primary/20' : 'hover:bg-secondary/5 border border-transparent'}`}
        >
            <div className="relative">
                <Avatar className="w-12 h-12 rounded-2xl border border-border/40 shadow-sm">
                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className={`absolute -right-1 -bottom-1 w-5 h-5 rounded-lg bg-white shadow-sm flex items-center justify-center border border-border/40 ${channelColor}`}>
                    <ChannelIcon className="w-3 h-3" />
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-black truncate ${active ? 'text-primary' : ''}`}>{name}</span>
                    <span className="text-[10px] font-bold text-muted-foreground">{time}</span>
                </div>
                <p className={`text-xs truncate ${unread && !active ? 'font-black text-foreground' : 'text-muted-foreground/70 font-medium'}`}>
                    {msg}
                </p>
            </div>
            {unread && !active && (
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
            )}
        </div>
    );
}

function MessageBubble({ side, msg, time, status }: { side: 'left' | 'right', msg: string, time: string, status: 'delivered' | 'seen' | 'failed' }) {
    return (
        <div className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] group`}>
                <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${side === 'right' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-background border border-border/40 rounded-tl-none'}`}>
                    {msg}
                </div>
                <div className={`flex items-center gap-2 mt-2 px-1 ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">{time}</span>
                    {side === 'right' && (
                        <CheckCheck className={`w-3 h-3 ${status === 'seen' ? 'text-blue-500' : 'text-muted-foreground/30'}`} />
                    )}
                </div>
            </div>
        </div>
    )
}
