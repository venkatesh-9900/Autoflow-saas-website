import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoFlow AI | Omnichannel Automation",
  description: "Automate your WhatsApp, Email and SMS communications effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-foreground bg-background selection:bg-primary/20`}>
        <SmoothScrollProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
