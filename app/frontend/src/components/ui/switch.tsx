"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
}

export function Switch({ checked, onCheckedChange, disabled = false }: SwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onCheckedChange(!checked)}
            className={`
                relative h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background
                ${checked ? 'bg-primary' : 'bg-input'}
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
            `}
        >
            <motion.span
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className={`
                    pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow-lg ring-0
                    ${checked ? 'translate-x-5' : 'translate-x-0'}
                `}
            />
        </button>
    );
}
