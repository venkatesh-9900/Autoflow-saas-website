"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Instagram, Facebook, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api-client";

interface IntegrationWizardProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    integrationKey: string;
}

export function IntegrationWizard({ open, onOpenChange, integrationKey, onConnected }: IntegrationWizardProps & { onConnected?: () => void }) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Specifically mocking the Meta flow for Instagram since it's the highlight of the update
    const isInstagram = integrationKey === 'instagram';

    const handleNext = () => setStep(s => s + 1);

    const handleConnect = async () => {
        setIsLoading(true);
        try {
            await api.post('/connected-accounts', {
                platform: integrationKey.toUpperCase().replace('-', '_'),
                accountId: `account_${integrationKey}_${Date.now()}`,
                accountName: `Main ${integrationKey} Account`,
                metadata: {
                    environment: "sandbox",
                    simulated: true
                }
            });
            setStep(4);
            if (onConnected) onConnected();
        } catch (error) {
            console.error("Connection error:", error);
            alert("Failed to connect account.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = (isOpen: boolean) => {
        onOpenChange(isOpen);
        if (!isOpen) {
            setTimeout(() => setStep(1), 300); // reset state after closing
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleReset}>
            <DialogContent className="sm:max-w-[550px] rounded-[2rem] p-0 overflow-hidden border-border/50">
                <div className="flex flex-col h-[500px]">
                    {/* Header Setup */}
                    <div className="bg-secondary/40 p-8 border-b pb-12 relative">
                        {isInstagram ? (
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px] flex items-center justify-center mb-6 absolute -bottom-8 shadow-lg">
                                <div className="bg-background w-full h-full rounded-2xl flex items-center justify-center">
                                    <Instagram className="w-8 h-8 text-foreground" />
                                </div>
                            </div>
                        ) : (
                            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 absolute -bottom-8 shadow-lg">
                                <ShieldCheck className="w-8 h-8 text-primary-foreground" />
                            </div>
                        )}
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black mt-2">
                                {isInstagram ? "Connect Instagram Professional" : `Connect ${integrationKey}`}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground font-medium">
                                Step {step} of 4: {step === 1 ? "Overview" : step === 2 ? "Authentication" : step === 3 ? "Account Selection" : "Complete"}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="flex-1 p-8 pt-12 overflow-y-auto">
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Automate your social presence</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        By connecting your Instagram account, AutoFlow AI will be able to automatically publish images, videos, carousels, and Reels based on your scheduled workflow.
                                    </p>
                                </div>
                                <ul className="space-y-3">
                                    {['Auto-publish scheduled content', 'Auto-reply to DM keywords', 'Track post performance analytics'].map((item, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
                                <div className="text-center space-y-4 py-4">
                                    <Facebook className="w-12 h-12 text-blue-600 mx-auto" />
                                    <h3 className="text-lg font-bold">Log in with Facebook</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Instagram Professional accounts must be linked to a Facebook Page. Please authenticate using your Meta credentials.
                                    </p>
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl" onClick={handleNext}>
                                    <Facebook className="w-5 h-5 mr-2" /> Continue with Facebook
                                </Button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
                                <div>
                                    <h3 className="text-lg font-bold">Select Instagram Account</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Choose the account you want AutoFlow AI to manage.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="border border-primary bg-primary/5 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
                                                    <div className="w-full h-full bg-background rounded-full border border-background"></div>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">@acme_corp</p>
                                                    <p className="text-xs text-muted-foreground">Acme Corporation</p>
                                                </div>
                                            </div>
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6 h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h3 className="text-2xl font-black">Connection Successful!</h3>
                                <p className="text-muted-foreground font-medium">
                                    Your {isInstagram ? 'Instagram' : 'Integration'} account is now fully linked and ready for automation.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t bg-secondary/20 flex justify-between items-center">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'w-6 bg-primary' : 'w-2 bg-muted'}`} />
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <Button variant="ghost" className="font-bold rounded-xl" onClick={() => handleReset(false)}>
                                {step === 4 ? 'Close' : 'Cancel'}
                            </Button>
                            {step < 4 && (
                                <Button
                                    className="rounded-xl px-6 font-bold"
                                    onClick={step === 3 ? handleConnect : handleNext}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Connecting...' : step === 3 ? 'Confirm & Connect' : 'Next Step'}
                                    {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
