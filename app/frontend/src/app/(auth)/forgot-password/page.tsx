"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Reset Password</h1>
                <p className="text-muted-foreground">Enter your email and we&apos;ll send you a recovery link</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" type="email" placeholder="name@company.com" required className="h-12 rounded-xl" />
                    </div>
                </div>

                <Button className="w-full h-12 rounded-xl text-base font-semibold shadow-md shadow-primary/20" size="lg">Send reset link</Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
                Remember your password? <Link href="/login" className="text-primary hover:underline font-medium">Back to login</Link>
            </p>
        </motion.div>
    );
}
