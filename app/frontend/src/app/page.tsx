"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare, Mail, Bot, Users, BarChart,
  Instagram, Globe, Zap, ShieldCheck, CheckCircle2,
  ArrowRight, Star, HelpCircle
} from "lucide-react";
import Link from "next/link";
import { AnimatedDots } from "@/components/ui/animated-dots";

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
              AutoFlow AI
            </span>
          </div>
          <nav className="hidden lg:flex gap-8 text-sm font-medium text-muted-foreground/80">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold px-6">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full shadow-xl shadow-primary/20 px-6 h-11 font-bold">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
          <AnimatedDots />
          <div className="container mx-auto px-6 relative z-10 pt-20">
            <motion.div
              initial="hidden" animate="visible" variants={containerVariants}
              className="max-w-5xl mx-auto text-center flex flex-col items-center"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12 bg-secondary/30 border border-border/50 rounded-full px-5 py-2 backdrop-blur-md">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">AutoFlow AI V2.0 is Live</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter mb-8 leading-[0.95] text-balance"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Experience liftoff with <br className="hidden md:block" />
                the next-generation <span className="text-primary italic">SaaS</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-muted-foreground/70 mb-14 max-w-3xl leading-relaxed font-medium text-balance"
              >
                The unified engine for WhatsApp, Instagram, Email, and SMS. Engage your customers where they live, powered by enterprise-grade AI.
              </motion.p>

              <motion.div variants={itemVariants} className="flex gap-4 flex-col sm:flex-row w-full sm:w-auto mt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-foreground text-background hover:bg-foreground/90 transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    Get Started for Free
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold bg-background/50 backdrop-blur-md border-border/80 hover:bg-secondary/50 transition-colors">
                    Explore use cases
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* OMNICHANNEL SUITE SECTION */}
        <section id="features" className="py-32 bg-secondary/20 relative">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            className="container mx-auto px-6"
          >
            <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Omnichannel Mastery.</h2>
                <p className="text-xl text-muted-foreground font-medium">Why settle for one channel when your customers are everywhere? AutoFlow AI bridges the gap between platforms seamlessly.</p>
              </div>
              <Link href="/features">
                <Button variant="link" className="text-primary font-bold text-lg group">
                  Explore all features <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div variants={itemVariants} whileHover={{ y: -10, rotateX: 5, rotateY: -5 }} className="perspective-1000">
                <ServiceCard
                  icon={<MessageSquare className="w-6 h-6" />}
                  title="WhatsApp"
                  color="whatsapp"
                  desc="Meta-verified API for broadcast campaigns, automated replies, and interactive lists."
                  features={["Broadcast 100k+", "Green Badge Ready", "Shared Team Inbox"]}
                />
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ y: -10, rotateX: 5, rotateY: 0 }} className="perspective-1000">
                <ServiceCard
                  icon={<Instagram className="w-6 h-6" />}
                  title="Instagram"
                  color="instagram"
                  desc="Comment-to-DM automation, keyword triggers, and Story mention auto-engagement."
                  features={["DM Automations", "Keyword Triggers", "Story Replies"]}
                />
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ y: -10, rotateX: 5, rotateY: 0 }} className="perspective-1000">
                <ServiceCard
                  icon={<Mail className="w-6 h-6" />}
                  title="Email & SMS"
                  color="primary"
                  desc="High-deliverability transactional and marketing sequences with drag-and-drop ease."
                  features={["99.9% Inbox Rate", "A/B Testing", "Mobile Ready"]}
                />
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ y: -10, rotateX: 5, rotateY: 5 }} className="perspective-1000">
                <ServiceCard
                  icon={<Bot className="w-6 h-6" />}
                  title="AI & Chatbots"
                  color="chatbot"
                  desc="Agentic AI that handles customer inquiries 24/7 with human-like understanding."
                  features={["Unlimited FAQ", "Lead Qualification", "20+ Languages"]}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* PLATFORM OVERVIEW / DASHBOARD PREVIEW */}
        <section className="py-32">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            className="container mx-auto px-6"
          >
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div variants={itemVariants}>
                <Badge className="mb-6 bg-primary/10 text-primary border-none rounded-md px-3">Visual Workflow Builder</Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">Build complex flows in seconds.</h2>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 shadow-sm">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Trigger-Action Logic</h4>
                      <p className="text-muted-foreground leading-relaxed">Define triggers like &quot;New Lead&quot; or &quot;Abandoned Cart&quot; and let the engine handle the rest across any channel.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 shadow-sm">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Mini CRM Integration</h4>
                      <p className="text-muted-foreground leading-relaxed">No need for external tools. Track every lead, assign tags, and move them through your custom pipeline automatically.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Enterprise Security</h4>
                      <p className="text-muted-foreground leading-relaxed">SOC2-compliant architecture with encrypted secrets and multi-tenant isolation for ultimate peace of mind.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="relative z-0" whileHover={{ rotateY: -2, rotateX: 2, scale: 1.02 }} transition={{ duration: 0.5 }}>
                <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 rounded-full" />
                <Card className="glass relative z-10 overflow-hidden shadow-2xl rounded-2xl border-border/60">
                  <header className="h-12 bg-secondary/50 border-b border-border/40 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="ml-4 h-6 w-full max-w-[200px] bg-background/50 rounded-md border border-border/40" />
                  </header>
                  <CardContent className="p-0 flex h-[400px]">
                    <aside className="w-16 border-r border-border/40 bg-secondary/20 p-3 space-y-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20" />
                      <div className="w-10 h-10 rounded-lg bg-secondary/50" />
                      <div className="w-10 h-10 rounded-lg bg-secondary/50" />
                    </aside>
                    <div className="flex-1 p-8 space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="h-8 w-32 bg-primary/10 rounded-lg" />
                        <div className="h-10 w-10 bg-secondary rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-secondary/30 rounded-xl" />
                        <div className="h-32 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-center">
                          <BarChart className="w-8 h-8 text-primary/40" />
                        </div>
                      </div>
                      <div className="h-24 bg-secondary/20 rounded-xl border border-dashed border-border/60" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-32 bg-secondary/10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            className="container mx-auto px-6"
          >
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Designed to scale with you.</h2>
              <p className="text-xl text-muted-foreground font-medium">Choose individual modules or unlock everything with the Pro Bundle.</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Module-based pricing card Example */}
              <motion.div variants={itemVariants} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-border/60 shadow-xl rounded-3xl p-8 flex flex-col h-full bg-background/50 backdrop-blur-sm">
                  <Star className="w-10 h-10 text-primary mb-6" />
                  <h3 className="text-3xl font-black mb-2">The Starter</h3>
                  <p className="text-muted-foreground mb-8">Perfect for solopreneurs launching their first workflows.</p>
                  <div className="text-5xl font-black mb-8">$19<span className="text-xl text-muted-foreground font-medium">/mo</span></div>
                  <ul className="space-y-4 mb-10 flex-1">
                    <PriceItem text="Any 1 Channel (WhatsApp or IG)" />
                    <PriceItem text="5,000 Messages/mo" />
                    <PriceItem text="Basic CRM Integration" />
                    <PriceItem text="Standard AI Assistant" />
                  </ul>
                  <Button variant="outline" className="w-full h-14 rounded-full font-bold text-lg border-primary/20 hover:bg-primary/5 transition-colors">Get Started</Button>
                </Card>
              </motion.div>

              {/* Featured Pro Card */}
              <motion.div variants={itemVariants} whileHover={{ y: -15, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-primary bg-primary/5 shadow-[0_0_50px_rgba(var(--primary),0.1)] relative overflow-hidden rounded-3xl p-8 flex flex-col h-full border-2 shadow-2xl z-10 backdrop-blur-md">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-black px-6 py-2 uppercase tracking-widest rotate-45 translate-x-[25px] translate-y-[10px] shadow-sm">Best Value</div>
                  <Zap className="w-10 h-10 text-primary fill-primary mb-6 animate-pulse" />
                  <h3 className="text-3xl font-black mb-2">The Pro Bundle</h3>
                  <p className="text-muted-foreground mb-8">Everything unlocked. Command the entire omnichannel landscape.</p>
                  <div className="text-5xl font-black mb-8">$79<span className="text-xl text-muted-foreground font-medium">/mo</span></div>
                  <ul className="space-y-4 mb-10 flex-1">
                    <PriceItem text="All Channels Included" highlight />
                    <PriceItem text="100,000 Messages/mo" highlight />
                    <PriceItem text="Priority AI Processing" highlight />
                    <PriceItem text="Full CRM & Pipeline Tools" highlight />
                    <PriceItem text="API & Webhook Access" highlight />
                    <PriceItem text="White-labeled Reports" highlight />
                  </ul>
                  <Button className="w-full h-14 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow">Go Pro Today</Button>
                </Card>
              </motion.div>

              {/* Enterprise/Custom */}
              <motion.div variants={itemVariants} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-border/60 shadow-xl rounded-3xl p-8 flex flex-col h-full bg-background/50 backdrop-blur-sm">
                  <Globe className="w-10 h-10 text-primary mb-6" />
                  <h3 className="text-3xl font-black mb-2">Enterprise</h3>
                  <p className="text-muted-foreground mb-8">For high-volume operations requiring custom infrastructure.</p>
                  <div className="text-5xl font-black mb-8">Custom</div>
                  <ul className="space-y-4 mb-10 flex-1">
                    <PriceItem text="Unlimited Everything" />
                    <PriceItem text="Dedicated Account Manager" />
                    <PriceItem text="Custom AI Fine-tuning" />
                    <PriceItem text="On-premise Deployment Opt." />
                  </ul>
                  <Button variant="outline" className="w-full h-14 rounded-full font-bold text-lg border-primary/20 hover:bg-primary/5 transition-colors">Contact Sales</Button>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-32">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            className="container mx-auto px-6 max-w-4xl"
          >
            <motion.div variants={itemVariants} className="text-center mb-20">
              <HelpCircle className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-black tracking-tight mb-4">Got Questions?</h2>
              <p className="text-xl text-muted-foreground font-medium">Everything you need to know about the platform.</p>
            </motion.div>
            <div className="grid gap-6">
              <motion.div variants={itemVariants}>
                <FaqItem
                  q="Is Meta verification required for WhatsApp?"
                  a="For the best results and the official 'Green Badge', yes. However, we guide you through the entire process in our integration center. You can start sending messages within minutes using our sandboxed API."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FaqItem
                  q="How does Instagram automation work without getting me banned?"
                  a="We use official Instagram API hooks, not browser automation. This means all actions are compliant with Meta's terms of service, keeping your account 100% safe."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FaqItem
                  q="Can I cancel my individual channel subscriptions anytime?"
                  a="Absolutely. AutoFlow AI is designed for flexibility. You can add or remove channels from your billing dashboard and you'll only be charged for the active services."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FaqItem
                  q="What AI model powers the AutoFlow Intelligence?"
                  a="Our engine leverages a mix of Claude 3.5 Sonnet and GPT-4o, optimized specifically for marketing psychology and customer engagement patterns."
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CTA BOTTOM SECTION */}
        <section className="py-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="container mx-auto max-w-6xl bg-primary rounded-[3rem] p-12 md:p-24 relative overflow-hidden shadow-2xl shadow-primary/40"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.05] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 text-center flex flex-col items-center">
              <h2 className="text-5xl md:text-7xl font-black text-primary-foreground mb-8 tracking-tighter leading-tight">
                Ready to defy <br /> the status quo?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl font-medium">
                Join the 500+ businesses automating their future with AutoFlow AI. No credit card required to start.
              </p>
              <Link href="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-20 px-12 rounded-full text-2xl font-black shadow-xl">
                    Get Started Free
                  </Button>
                </motion.div>
              </Link>
              <p className="mt-8 text-primary-foreground/60 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> 14-day Pro Trial Included
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="pt-24 pb-12 bg-secondary/20 border-t border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold tracking-tight">AutoFlow AI</span>
              </div>
              <p className="text-muted-foreground font-medium mb-6">Automating the commerce world with Anti-Gravity precision. Omnichannel marketing redefined.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors"><Instagram className="w-5 h-5 text-muted-foreground" /></div>
                <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors"><MessageSquare className="w-5 h-5 text-muted-foreground" /></div>
                <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors"><Globe className="w-5 h-5 text-muted-foreground" /></div>
              </div>
            </div>
            <div>
              <h5 className="font-black text-sm uppercase tracking-widest mb-6">Product</h5>
              <ul className="space-y-4 text-muted-foreground font-medium text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">WhatsApp Automation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram DM Bot</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Email Campaigns</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">SMS Marketing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">AI Assistant</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black text-sm uppercase tracking-widest mb-6">Company</h5>
              <ul className="space-y-4 text-muted-foreground font-medium text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black text-sm uppercase tracking-widest mb-6">Support</h5>
              <ul className="space-y-4 text-muted-foreground font-medium text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Keys</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Video Tutorials</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">© 2026 AutoFlow AI Inc. All rights reserved.</p>
            <div className="flex gap-4 items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">System Status: Functional</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, desc, color, features }: { icon: React.ReactNode, title: string, desc: string, color: string, features: string[] }) {
  const colorMap: Record<string, string> = {
    whatsapp: "text-whatsapp bg-whatsapp/10",
    instagram: "text-instagram bg-instagram/10",
    primary: "text-primary bg-primary/10",
    chatbot: "text-chatbot bg-chatbot/10",
    community: "text-community bg-community/10",
  };

  return (
    <Card className="border-border/60 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-3xl p-8 flex flex-col bg-background/50 backdrop-blur-sm group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${colorMap[color] || colorMap.primary} group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black tracking-tight mb-4">{title}</h3>
      <p className="text-muted-foreground font-medium leading-relaxed mb-8 flex-1">{desc}</p>
      <ul className="space-y-3 pt-6 border-t border-border/40">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs font-bold text-muted-foreground/70 uppercase tracking-wide">
            <CheckCircle2 className="w-3 h-3 text-primary" /> {f}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function PriceItem({ text, highlight }: { text: string, highlight?: boolean }) {
  return (
    <li className={`flex items-center gap-3 text-sm font-bold ${highlight ? 'text-primary' : 'text-muted-foreground'}`}>
      <CheckCircle2 className={`w-4 h-4 shrink-0 ${highlight ? 'text-primary' : 'text-primary'}`} />
      {text}
    </li>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  return (
    <Card className="border-border/60 shadow-sm rounded-2xl p-6 hover:border-primary/40 transition-colors cursor-default">
      <h4 className="font-bold text-lg mb-4 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary" /> {q}
      </h4>
      <p className="text-muted-foreground font-medium leading-relaxed pl-5">{a}</p>
    </Card>
  );
}
