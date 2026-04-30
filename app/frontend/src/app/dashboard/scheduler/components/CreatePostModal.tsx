"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, UploadCloud, Calendar, Loader2 } from "lucide-react";
import { api } from "@/lib/api-client";

const PLATFORMS = [
    { id: 'INSTAGRAM', label: 'Instagram' },
    { id: 'FACEBOOK', label: 'Facebook' },
    { id: 'LINKEDIN', label: 'LinkedIn' },
    { id: 'TWITTER', label: 'Twitter/X' }
];

export function CreatePostModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [caption, setCaption] = useState("");
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['INSTAGRAM']);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock files
    const [files] = useState<{ id: string, name: string }[]>([{ id: 'mock-1', name: 'post_graphic.png' }]);

    const handleGenerateAI = async () => {
        try {
            setIsGenerating(true);
            const res = await api.post('/ai/social-content', { prompt: 'Create an engaging post about our new SaaS features' });
            if (res.caption) {
                setCaption(res.caption + '\n\n' + res.hashtags);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const posts = files.map(f => ({
                caption,
                mediaAssetIds: [f.id],
                platforms: selectedPlatforms
            }));

            await api.post('/instagram/posts/bulk', {
                integrationId: 'mock-integration-id',
                posts
            });
            onClose();
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePlatform = (id: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl rounded-3xl p-8 border-border/40 shadow-2xl bg-card">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-black">Create & Schedule Post</DialogTitle>
                    <DialogDescription className="font-medium text-muted-foreground text-sm">Design your multi-platform social media campaign.</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Platforms */}
                    <div>
                        <h4 className="font-bold mb-3 text-sm tracking-widest uppercase text-muted-foreground">Select Platforms</h4>
                        <div className="flex flex-wrap gap-4">
                            {PLATFORMS.map(platform => {
                                const active = selectedPlatforms.includes(platform.id);
                                return (
                                    <div
                                        key={platform.id}
                                        onClick={() => togglePlatform(platform.id)}
                                        className={`flex items-center gap-3 p-3 px-5 rounded-2xl border cursor-pointer transition-all ${active ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/30' : 'border-border/50 hover:bg-secondary/50'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${active ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                            {active && <span className="text-[10px] font-black">✓</span>}
                                        </div>
                                        <span className="font-bold text-sm">{platform.label}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Media Upload (Mock) */}
                    <div>
                        <h4 className="font-bold mb-3 text-sm tracking-widest uppercase text-muted-foreground">Media (Bulk Support)</h4>
                        <div className="border-2 border-dashed border-border/60 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/5 transition-colors cursor-pointer group bg-background">
                            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                                <UploadCloud className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <span className="font-bold">Drag & drop multiple files</span>
                            <span className="text-sm font-medium text-muted-foreground mt-1">Images or videos up to 50MB</span>
                        </div>
                    </div>

                    {/* Caption Box */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-sm tracking-widest uppercase text-muted-foreground">Caption</h4>
                            <Button
                                onClick={handleGenerateAI}
                                disabled={isGenerating}
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs font-bold rounded-xl border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10"
                            >
                                {isGenerating ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                                AI Magic
                            </Button>
                        </div>
                        <Textarea
                            rows={5}
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write an engaging caption..."
                            className="rounded-2xl resize-none border-border/50 focus-visible:ring-primary/20 bg-background"
                        />
                    </div>

                    {/* Submit Actions */}
                    <div className="flex gap-4 pt-4 border-t border-border/40">
                        <Button
                            variant="secondary"
                            className="flex-1 h-14 rounded-2xl font-black shadow-sm hover:bg-secondary border border-border/50"
                        >
                            <Calendar className="w-5 h-5 mr-2" /> Auto Schedule
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting || selectedPlatforms.length === 0}
                            className="flex-1 h-14 rounded-2xl font-black shadow-lg shadow-primary/20 bg-primary hover:opacity-90 transition-opacity text-primary-foreground"
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Now'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
