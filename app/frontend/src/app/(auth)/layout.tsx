import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background">
            <div className="flex flex-col p-8">
                <Link href="/" className="flex items-center gap-2 mb-auto">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">AutoFlow AI</span>
                </Link>
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-sm">
                        {children}
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex flex-col justify-center p-12 bg-secondary/30 border-l border-border/50">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight mb-4">Streamline your workflow with Anti-Gravity features.</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">Join thousands of leading companies automating their omnichannel communications and saving hundreds of hours every week.</p>
                </div>
            </div>
        </div>
    );
}
