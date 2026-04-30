"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.05,
            duration: 1.5,
            smoothWheel: true
        }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {children as any}
        </ReactLenis>
    );
}
