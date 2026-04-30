"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Zap, Play, Save, Plus, MousePointer2,
    Hand, ZoomIn, ZoomOut, Layers,
    Bot, Clock, GitBranch,
    MoreVertical, Share2
} from "lucide-react";

export default function WorkflowCanvas() {
    const [scale, setScale] = useState(1);
    const [nodes, setNodes] = useState([
        { id: '1', type: 'trigger', title: 'New Product Added', icon: <Zap className="w-4 h-4" />, x: 400, y: 100 },
        { id: '2', type: 'action', title: 'Generate AI Caption', icon: <Bot className="w-4 h-4" />, x: 400, y: 250 },
        { id: '3', type: 'action', title: 'Publish Instagram Post', icon: <Share2 className="w-4 h-4" />, x: 400, y: 400 },
    ]);
    const constraintsRef = useRef(null);

    const updateNodePosition = (id: string, x: number, y: number) => {
        setNodes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n));
    };

    return (
        <div className="h-[calc(100vh-12rem)] flex flex-col -m-8 overflow-hidden bg-secondary/5 relative border border-border/40 rounded-[3rem] animate-in fade-in zoom-in-95 duration-700">
            {/* Toolbar */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-2 bg-background/80 backdrop-blur-xl border border-border/40 rounded-[2rem] shadow-2xl">
                <ToolbarButton active icon={<MousePointer2 className="w-4 h-4" />} label="Select" />
                <ToolbarButton icon={<Plus className="w-4 h-4" />} label="Add Node" />
                <ToolbarButton icon={<Hand className="w-4 h-4" />} label="Pan" />
                <div className="w-px h-8 bg-border/40 mx-2" />
                <ToolbarButton onClick={() => setScale(s => Math.min(s + 0.1, 2))} icon={<ZoomIn className="w-4 h-4" />} label="Zoom In" />
                <ToolbarButton onClick={() => setScale(s => Math.max(s - 0.1, 0.5))} icon={<ZoomOut className="w-4 h-4" />} label="Zoom Out" />
            </div>

            {/* Sidebar Tools */}
            <div className="absolute top-24 left-8 z-10 w-64 space-y-6">
                <Card className="border-border/40 shadow-2xl rounded-[2rem] glass p-6 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Components</h3>
                    <div className="space-y-2">
                        <DraggableItem icon={<Zap className="w-3.5 h-3.5 text-amber-500" />} label="New Product Added" />
                        <DraggableItem icon={<Zap className="w-3.5 h-3.5 text-amber-500" />} label="Campaign Launched" />
                        <DraggableItem icon={<Clock className="w-3.5 h-3.5 text-purple-500" />} label="Scheduled Event" />
                        <DraggableItem icon={<GitBranch className="w-3.5 h-3.5 text-blue-500" />} label="Condition" />
                        <DraggableItem icon={<Layers className="w-3.5 h-3.5 text-emerald-500" />} label="Action" />
                    </div>
                </Card>

                <Card className="border-border/40 shadow-2xl rounded-[2rem] glass p-6 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Stats</h3>
                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="p-3 bg-secondary/20 rounded-2xl">
                            <p className="text-[10px] font-bold text-muted-foreground">Executions</p>
                            <p className="text-xl font-black">1.2k</p>
                        </div>
                        <div className="p-3 bg-secondary/20 rounded-2xl">
                            <p className="text-[10px] font-bold text-muted-foreground">Success</p>
                            <p className="text-xl font-black text-emerald-500">98%</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Canvas */}
            <div
                ref={constraintsRef}
                className="flex-1 relative overflow-hidden"
                style={{
                    backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
                    backgroundSize: `${32 * scale}px ${32 * scale}px`
                }}>
                <div className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
                    style={{ transform: `scale(${scale})` }}>

                    {/* Connection Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <path d="M0,0 L0,10 L10,5 Z" fill="var(--border)" />
                            </marker>
                        </defs>
                        {/* Dynamic Path Generating based on state positions */}
                        {nodes.length >= 2 && (
                            <path d={`M ${nodes[0].x} ${nodes[0].y + 20} L ${nodes[1].x} ${nodes[1].y - 20}`} stroke="currentColor" strokeWidth="2" className="text-border/60" fill="none" markerEnd="url(#arrow)" />
                        )}
                        {nodes.length >= 3 && (
                            <path d={`M ${nodes[1].x} ${nodes[1].y + 20} L ${nodes[2].x} ${nodes[2].y - 20}`} stroke="currentColor" strokeWidth="2" className="text-border/60" fill="none" markerEnd="url(#arrow)" />
                        )}
                    </svg>

                    {nodes.map(node => (
                        <motion.div
                            key={node.id}
                            drag
                            dragConstraints={constraintsRef}
                            dragMomentum={false}
                            onDrag={(event, info) => {
                                updateNodePosition(node.id, node.x + info.delta.x, node.y + info.delta.y);
                            }}
                            style={{ x: node.x - 100, y: node.y }}
                            className="absolute cursor-grab active:cursor-grabbing group z-10"
                        >
                            <div className="w-[200px] p-4 bg-background border border-border/60 rounded-2xl shadow-xl hover:shadow-primary/10 hover:border-primary transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${node.type === 'trigger' ? 'bg-amber-500/10 text-amber-500' :
                                        node.type === 'action' ? 'bg-blue-500/10 text-blue-500' :
                                            'bg-purple-500/10 text-purple-500'
                                        }`}>
                                        {node.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{node.type}</h4>
                                        <p className="text-xs font-bold truncate">{node.title}</p>
                                    </div>
                                    <MoreVertical className="w-3.5 h-3.5 text-muted-foreground/40" />
                                </div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-border absolute -bottom-1 left-1/2 -translate-x-1/2 group-hover:bg-primary transition-colors" />
                            <div className="w-2 h-2 rounded-full bg-border absolute -top-1 left-1/2 -translate-x-1/2 group-hover:bg-primary transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-8 right-8 flex gap-4 z-10">
                <Button variant="outline" className="rounded-2xl h-14 px-8 border-border/60 font-bold glass">
                    <Save className="w-5 h-5 mr-3" /> Save Draft
                </Button>
                <Button className="rounded-2xl h-14 px-8 font-black shadow-xl shadow-primary/20 bg-primary text-primary-foreground">
                    <Play className="w-5 h-5 mr-3" /> Deploy Flow
                </Button>
            </div>
        </div>
    );
}

function ToolbarButton({ active, icon, label, onClick }: { active?: boolean, icon: React.ReactNode, label: string, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`p-3 rounded-2xl flex items-center gap-2 transition-all ${active ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105' : 'hover:bg-secondary/50 text-muted-foreground'}`}
        >
            {icon}
            {active && <span className="text-xs font-black pr-1">{label}</span>}
        </button>
    );
}

function DraggableItem({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="p-3 bg-secondary/10 border border-border/20 rounded-xl flex items-center gap-3 cursor-grab hover:bg-secondary/20 transition-all active:cursor-grabbing">
            <div className="bg-background w-7 h-7 rounded-lg flex items-center justify-center shadow-sm">
                {icon}
            </div>
            <span className="text-xs font-bold">{label}</span>
        </div>
    );
}
