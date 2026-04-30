"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, Image as ImageIcon, Video, Search, MoreVertical, Plus, Grid2X2, List } from "lucide-react";

// Mock Data
const MOCK_MEDIA = [
    { id: 1, type: 'image', name: 'summer_campaign_hero.png', size: '2.4 MB', date: 'Oct 24, 2023', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80' },
    { id: 2, type: 'image', name: 'product_showcase_01.jpg', size: '1.1 MB', date: 'Oct 22, 2023', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
    { id: 3, type: 'video', name: 'reel_concept_v2.mp4', size: '14.5 MB', date: 'Oct 20, 2023', url: '' },
    { id: 4, type: 'image', name: 'instagram_story_bg.jpg', size: '3.2 MB', date: 'Oct 15, 2023', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80' },
    { id: 5, type: 'image', name: 'black_friday_sale.png', size: '4.8 MB', date: 'Oct 12, 2023', url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80' },
    { id: 6, type: 'video', name: 'testimonial_compilation.mp4', size: '22.1 MB', date: 'Oct 10, 2023', url: '' },
];

export default function MediaLibraryPage() {
    const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredMedia = MOCK_MEDIA.filter(m => filter === 'all' || m.type === filter);

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => setIsDragging(false);

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        // Handle file drop here
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            console.log("Files dropped", e.dataTransfer.files);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 h-full flex flex-col">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Media Library</h1>
                    <p className="text-muted-foreground font-medium">Manage and organize your assets for campaigns and social posts.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-dashed h-11 px-6 font-bold" onClick={() => fileInputRef.current?.click()}>
                        <UploadCloud className="w-4 h-4 mr-2" /> Upload Files
                    </Button>
                    <input type="file" className="hidden" ref={fileInputRef} multiple accept="image/*,video/*" />
                    <Button className="h-11 px-6 font-bold shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4 mr-2" /> New Folder
                    </Button>
                </div>
            </div>

            {/* Drag & Drop Zone */}
            <div
                className={`border-2 border-dashed rounded-[2rem] p-12 transition-all duration-300 flex flex-col items-center justify-center text-center ${isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border/60 bg-secondary/20 hover:bg-secondary/40'}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="w-16 h-16 bg-background shadow-sm rounded-full flex items-center justify-center mb-4">
                    <UploadCloud className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Drag & Drop files here</h3>
                <p className="text-muted-foreground text-sm font-medium mb-6">Support for images (JPG, PNG, WEBP) and video (MP4, MOV) up to 50MB.</p>
                <Button variant="secondary" className="font-bold rounded-xl" onClick={() => fileInputRef.current?.click()}>
                    Browse Files
                </Button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between bg-card border rounded-2xl p-2 shadow-sm">
                <div className="flex items-center gap-1">
                    <Button variant={filter === 'all' ? 'secondary' : 'ghost'} size="sm" onClick={() => setFilter('all')} className="rounded-xl font-bold">All Media</Button>
                    <Button variant={filter === 'image' ? 'secondary' : 'ghost'} size="sm" onClick={() => setFilter('image')} className="rounded-xl font-bold gap-2"><ImageIcon className="w-4 h-4" /> Images</Button>
                    <Button variant={filter === 'video' ? 'secondary' : 'ghost'} size="sm" onClick={() => setFilter('video')} className="rounded-xl font-bold gap-2"><Video className="w-4 h-4" /> Videos</Button>
                </div>

                <div className="flex items-center gap-3 pr-2">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search media..." className="pl-9 w-[250px] bg-background border-none rounded-xl h-9" />
                    </div>
                    <div className="w-px h-6 bg-border mx-1"></div>
                    <Button variant="ghost" size="icon" className={`rounded-lg w-8 h-8 ${view === 'grid' ? 'bg-secondary' : ''}`} onClick={() => setView('grid')}>
                        <Grid2X2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className={`rounded-lg w-8 h-8 ${view === 'list' ? 'bg-secondary' : ''}`} onClick={() => setView('list')}>
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
                {filteredMedia.map(media => (
                    <Card key={media.id} className="group overflow-hidden rounded-[1.5rem] border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <div className="aspect-square relative bg-secondary/50">
                            {media.type === 'image' ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={media.url} alt={media.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
                                    <Video className="w-12 h-12 text-zinc-500" />
                                </div>
                            )}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="secondary" size="icon" className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="absolute bottom-3 left-3">
                                <span className="bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                                    {media.type}
                                </span>
                            </div>
                        </div>
                        <div className="p-4 bg-card">
                            <h4 className="font-bold text-sm truncate mb-1" title={media.name}>{media.name}</h4>
                            <div className="flex justify-between items-center text-xs text-muted-foreground font-medium">
                                <span>{media.size}</span>
                                <span>{media.date}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
