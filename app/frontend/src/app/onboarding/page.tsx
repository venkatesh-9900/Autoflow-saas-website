"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, ChevronLeft, Rocket, Instagram, Mail, MessageSquare, UploadCloud, ShieldCheck, Sparkles } from "lucide-react";

export default function OnboardingWizard() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const totalSteps = 4;

    const handleNext = async () => {
        if (step < totalSteps) {
            setStep(step + 1);
            // Optional: You can save state to the backend here via PATCH /users/organization/onboarding
        } else {
            setLoading(true);
            try {
                // Finalize onboarding in backend
                // await fetch('/api/bridge/users/organization/onboarding', { method: 'PATCH', body: JSON.stringify({ step: 5 }) });
                router.push("/dashboard");
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="min-h-screen bg-secondary/5 flex items-center justify-center p-4 lg:p-12 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-instagram/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-4xl z-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Fixed Sidebar Steps */}
                <div className="col-span-1 space-y-8">
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                                <Rocket className="w-4 h-4" />
                            </div>
                            <span className="font-black text-xl tracking-tight">AutoFlow AI</span>
                        </div>
                        <h2 className="text-2xl font-black mb-2">Getting Started</h2>
                        <p className="text-muted-foreground font-medium text-sm">Follow these steps to configure your workspace.</p>
                    </div>

                    <div className="space-y-6">
                        <StepIndicator current={step} target={1} title="Workspace Setup" desc="Name and industry" />
                        <StepIndicator current={step} target={2} title="Connect Channels" desc="Link your platforms" />
                        <StepIndicator current={step} target={3} title="Import Contacts" desc="Bring your audience" />
                        <StepIndicator current={step} target={4} title="Ready to Launch" desc="Final configurations" />
                    </div>
                </div>

                {/* Dynamic Content Area */}
                <Card className="col-span-1 md:col-span-2 shadow-2xl border-border/50 rounded-3xl overflow-hidden glass">
                    <CardHeader className="bg-secondary/20 border-b border-border/40 pb-8 pt-10 px-10">
                        <CardTitle className="text-3xl font-black">{
                            step === 1 ? "Welcome aboard" :
                                step === 2 ? "Supercharge your reach" :
                                    step === 3 ? "Bring your audience" :
                                        "You are all set!"
                        }</CardTitle>
                        <CardDescription className="text-base mt-2">{
                            step === 1 ? "Let's personalize your AutoFlow AI experience." :
                                step === 2 ? "Connect the channels you want to automate." :
                                    step === 3 ? "Upload your existing contacts to get started." :
                                        "Your automated marketing engine is ready."
                        }</CardDescription>
                    </CardHeader>

                    <CardContent className="p-10 min-h-[400px]">
                        <div className="animate-in slide-in-from-right-4 fade-in duration-500">
                            {step === 1 && <StepOne />}
                            {step === 2 && <StepTwo />}
                            {step === 3 && <StepThree />}
                            {step === 4 && <StepFour />}
                        </div>
                    </CardContent>

                    <CardFooter className="px-10 py-6 border-t border-border/40 bg-secondary/10 flex justify-between">
                        <Button
                            variant="ghost"
                            className="rounded-xl font-bold"
                            disabled={step === 1 || loading}
                            onClick={handleBack}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                        <Button
                            className="rounded-xl font-bold shadow-lg shadow-primary/20 px-8"
                            onClick={handleNext}
                            disabled={loading}
                        >
                            {step === totalSteps ? (loading ? "Launching..." : "Go to Dashboard") : "Continue"}
                            {!loading && step !== totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
                            {step === totalSteps && !loading && <Rocket className="w-4 h-4 ml-2" />}
                        </Button>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
}

function StepIndicator({ current, target, title, desc }: { current: number, target: number, title: string, desc: string }) {
    const isActive = current === target;
    const isPast = current > target;
    return (
        <div className={`flex gap-4 items-start ${isActive ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
            <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0
                ${isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' : isPast ? 'bg-emerald-500 text-white' : 'bg-secondary text-muted-foreground'}
            `}>
                {isPast ? <CheckCircle2 className="w-4 h-4" /> : target}
            </div>
            <div>
                <h4 className={`font-bold ${isActive ? 'text-foreground' : 'text-foreground'}`}>{title}</h4>
                <p className="text-xs font-medium text-muted-foreground">{desc}</p>
            </div>
        </div>
    )
}

function StepOne() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="font-bold">Workspace Name</Label>
                <Input placeholder="Acme Corp" className="h-12 rounded-xl text-base bg-secondary/20" />
            </div>
            <div className="space-y-2">
                <Label className="font-bold">What&apos;s your primary goal?</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="border-2 border-primary bg-primary/5 rounded-xl p-4 cursor-pointer hover:bg-primary/10 transition-colors">
                        <Sparkles className="w-6 h-6 text-primary mb-2" />
                        <h5 className="font-bold text-sm">Lead Generation</h5>
                    </div>
                    <div className="border-2 border-border/50 bg-secondary/10 rounded-xl p-4 cursor-pointer hover:border-border transition-colors">
                        <MessageSquare className="w-6 h-6 text-muted-foreground mb-2" />
                        <h5 className="font-bold text-sm">Customer Support</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StepTwo() {
    return (
        <div className="space-y-4">
            <ChannelConnectCard icon={<MessageSquare className="w-6 h-6 text-emerald-500" />} name="WhatsApp Business" desc="Official API" connected={false} />
            <ChannelConnectCard icon={<Instagram className="w-6 h-6 text-instagram" />} name="Instagram Pages" desc="Automate DMs" connected={true} />
            <ChannelConnectCard icon={<Mail className="w-6 h-6 text-blue-500" />} name="Email SMTP" desc="Send newsletters" connected={false} />
        </div>
    )
}

function ChannelConnectCard({ icon, name, desc, connected }: { icon: React.ReactNode, name: string, desc: string, connected: boolean }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-secondary/10">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-background shadow-sm flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <h5 className="font-bold">{name}</h5>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
            </div>
            <Button variant={connected ? "outline" : "default"} className={`rounded-lg font-bold ${connected ? 'text-emerald-500 border-emerald-500/30' : ''}`}>
                {connected ? 'Connected' : 'Connect'}
            </Button>
        </div>
    )
}

function StepThree() {
    return (
        <div className="border-2 border-dashed border-border/60 rounded-2xl flex flex-col items-center justify-center py-16 text-center bg-secondary/5 h-full">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">Upload CSV</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">Drop your contacts file here or browse to upload.</p>
            <Button variant="outline" className="rounded-xl font-bold bg-background">Browse Files</Button>
        </div>
    )
}

function StepFour() {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full space-y-6 pt-4">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 relative">
                <ShieldCheck className="w-12 h-12 relative z-10" />
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
            </div>
            <div>
                <h3 className="text-2xl font-black mb-2">Workspace Ready</h3>
                <p className="text-muted-foreground font-medium max-w-[300px] mx-auto">We&apos;ve pre-configured your default message templates and connected Instagram.</p>
            </div>
        </div>
    )
}
