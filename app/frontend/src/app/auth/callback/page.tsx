"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      // Save token and navigate to dashboard
      localStorage.setItem("access_token", token);
      router.push("/dashboard");
    } else {
      // Redirect to login with error details
      const errorParam = error ? `?error=${error}` : "?error=oauth_failed";
      router.push(`/login${errorParam}`);
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-radial from-slate-900 via-slate-950 to-black text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 text-center"
      >
        {/* Animated premium loader spinner */}
        <div className="relative w-16 h-16 mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="w-full h-full rounded-full border-4 border-slate-700 border-t-primary"
          />
          <div className="absolute inset-2 rounded-full bg-slate-950 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
          Securing session
        </h2>
        <p className="text-sm text-slate-400">
          Please wait while we finalize your secure connection...
        </p>
      </motion.div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-slate-400">Loading...</div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
