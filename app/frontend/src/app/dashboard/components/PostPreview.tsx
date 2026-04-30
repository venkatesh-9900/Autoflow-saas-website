"use client";

import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

interface PostPreviewProps {
    accountName: string;
    profileImage?: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video' | 'carousel';
    caption: string;
    likes?: number;
}

export function PostPreview({
    accountName = "acme_corp",
    profileImage,
    mediaUrl = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    mediaType = "image",
    caption = "A beautiful day to launch new features! 🚀 #autoflow #launch #saas",
    likes = 124
}: PostPreviewProps) {
    return (
        <Card className="max-w-[360px] w-full bg-white dark:bg-zinc-950 border-border/40 shadow-xl overflow-hidden rounded-[2rem]">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-border/20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[1.5px]">
                        <div className="w-full h-full bg-background rounded-full flex items-center justify-center overflow-hidden">
                            {profileImage ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={profileImage} alt={accountName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-[10px] font-bold uppercase">{accountName.substring(0, 2)}</span>
                            )}
                        </div>
                    </div>
                    <span className="font-bold text-[13px]">{accountName}</span>
                </div>
                <MoreHorizontal className="w-5 h-5 text-zinc-500" />
            </div>

            {/* Media */}
            <div className="aspect-square bg-zinc-100 dark:bg-zinc-900 relative">
                {mediaUrl ? (
                    mediaType === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-zinc-500">▶️ Video Player</span>
                        </div>
                    ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={mediaUrl} alt="Post preview" className="w-full h-full object-cover" />
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm font-medium">
                        No Media Uploaded
                    </div>
                )}
                {mediaType === 'carousel' && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        1/3
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <Heart className="w-6 h-6 hover:text-pink-500 transition-colors cursor-pointer" />
                        <MessageCircle className="w-6 h-6 hover:text-zinc-500 transition-colors cursor-pointer" />
                        <Send className="w-6 h-6 hover:text-zinc-500 transition-colors cursor-pointer" />
                    </div>
                    <Bookmark className="w-6 h-6 hover:text-zinc-500 transition-colors cursor-pointer" />
                </div>

                <p className="font-bold text-[13px] mb-1">{likes.toLocaleString()} likes</p>

                <div className="text-[13px] leading-relaxed">
                    <span className="font-bold mr-2">{accountName}</span>
                    <span>{caption}</span>
                </div>

                <p className="text-[11px] text-zinc-500 mt-2 font-medium uppercase tracking-wide">
                    2 hours ago
                </p>
            </div>
        </Card>
    );
}
