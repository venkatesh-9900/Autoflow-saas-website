"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar as CalendarIcon, List, Clock, Instagram, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { CreatePostModal } from "./components/CreatePostModal";

// Mock Data
const MOCK_POSTS = [
    { id: 1, type: 'Reel', title: 'Summer Collection Teaser', date: '2023-11-01', time: '10:00 AM', status: 'Scheduled', platform: 'Instagram' },
    { id: 2, type: 'Carousel', title: 'Top 5 Marketing Tips', date: '2023-11-03', time: '02:30 PM', status: 'Draft', platform: 'Instagram' },
    { id: 3, type: 'Image', title: 'Customer Spotlight', date: '2023-11-05', time: '09:00 AM', status: 'Scheduled', platform: 'Instagram' },
    { id: 4, type: 'Video', title: 'Behind the Scenes: Office Tour', date: '2023-11-10', time: '04:00 PM', status: 'Published', platform: 'Instagram' },
];

export default function SchedulerPage() {
    const [view, setView] = useState<'calendar' | 'list'>('calendar');
    const [currentMonth] = useState('November 2023');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState(MOCK_POSTS);

    // Simple mockup for a 7-day week row calendar view
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = Array.from({ length: 35 }, (_, i) => i - 2); // mockup days

    const handleDragStart = (e: React.DragEvent, postId: number) => {
        e.dataTransfer.setData('postId', postId.toString());
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // necessary to allow dropping
    };

    const handleDrop = (e: React.DragEvent, targetDate: number) => {
        e.preventDefault();
        const postId = parseInt(e.dataTransfer.getData('postId'));

        // Update the date string for the mock UI
        // Assuming November 2023 for the mockup
        const dayStr = targetDate.toString().padStart(2, '0');
        const newDate = `2023-11-${dayStr}`;

        setPosts(prev => prev.map(p =>
            p.id === postId ? { ...p, date: newDate } : p
        ));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 h-full flex flex-col">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Content Scheduler</h1>
                    <p className="text-muted-foreground font-medium">Plan, schedule, and automate your multi-channel social posts.</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => setIsModalOpen(true)} className="h-11 px-6 font-bold shadow-lg shadow-primary/20 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0">
                        <Plus className="w-4 h-4 mr-2" /> Create Post
                    </Button>
                </div>
            </div>

            <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Toolbar */}
            <div className="flex items-center justify-between bg-card border rounded-2xl p-2 shadow-sm">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="rounded-lg w-8 h-8"><ChevronLeft className="w-4 h-4" /></Button>
                    <span className="font-bold text-sm w-32 text-center">{currentMonth}</span>
                    <Button variant="ghost" size="icon" className="rounded-lg w-8 h-8"><ChevronRight className="w-4 h-4" /></Button>
                </div>

                <div className="flex items-center gap-2 pr-2">
                    <Button variant="ghost" size="sm" className={`rounded-xl font-bold gap-2 ${view === 'calendar' ? 'bg-secondary' : ''}`} onClick={() => setView('calendar')}>
                        <CalendarIcon className="w-4 h-4" /> Calendar
                    </Button>
                    <Button variant="ghost" size="sm" className={`rounded-xl font-bold gap-2 ${view === 'list' ? 'bg-secondary' : ''}`} onClick={() => setView('list')}>
                        <List className="w-4 h-4" /> List
                    </Button>
                </div>
            </div>

            {/* View Content */}
            {view === 'calendar' ? (
                <Card className="rounded-[2rem] border-border/50 shadow-sm overflow-hidden flex-1">
                    <div className="grid grid-cols-7 border-b bg-secondary/10">
                        {days.map(day => (
                            <div key={day} className="py-4 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground border-r last:border-0">{day}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 grid-rows-5 h-[700px]">
                        {dates.map((date, i) => {
                            const isCurrentMonth = date > 0 && date <= 30;
                            // Format date string to match mock data format
                            const dayStr = date.toString().padStart(2, '0');
                            const dateString = `2023-11-${dayStr}`;

                            const dayPosts = isCurrentMonth ? posts.filter(p => p.date === dateString) : [];

                            return (
                                <div
                                    key={i}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => isCurrentMonth && handleDrop(e, date)}
                                    className={`border-r border-b last:border-r-0 p-2 transition-colors flex flex-col gap-2 ${!isCurrentMonth ? 'bg-secondary/10 text-muted-foreground/30' : 'hover:bg-secondary/5'}`}
                                >
                                    <div className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${date === 3 ? 'bg-primary text-primary-foreground' : ''}`}>
                                        {date > 0 && date <= 30 ? date : (date <= 0 ? 31 + date : date - 30)}
                                    </div>

                                    <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1">
                                        {dayPosts.map(postDetails => (
                                            <div
                                                key={postDetails.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, postDetails.id)}
                                                className={`p-2 rounded-xl text-xs font-medium cursor-grab active:cursor-grabbing transition-transform hover:scale-[1.02] border shadow-sm ${postDetails.status === 'Published' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400' :
                                                    postDetails.status === 'Scheduled' ? 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400' :
                                                        'bg-secondary border-border/50 text-foreground'
                                                    }`}>
                                                <div className="flex items-center gap-1 mb-1">
                                                    <Instagram className="w-3 h-3" />
                                                    <span className="font-bold">{postDetails.time}</span>
                                                </div>
                                                <p className="truncate font-bold">{postDetails.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            ) : (
                <div className="space-y-4">
                    {posts.map(post => (
                        <Card key={post.id} className="rounded-2xl border-border/50 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[1px]">
                                    <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                                        <Instagram className="w-6 h-6 text-foreground" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-black text-lg">{post.title}</h3>
                                    <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {post.date}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.time}</span>
                                        <span>• {post.type}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge variant="outline" className={`font-black uppercase tracking-wider text-[10px] border-0 px-3 py-1 ${post.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' :
                                    post.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-500' :
                                        'bg-secondary text-muted-foreground'
                                    }`}>
                                    {post.status}
                                </Badge>
                                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
