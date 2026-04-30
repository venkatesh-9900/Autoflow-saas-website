"use client";

import { useEffect, useRef } from 'react';

class Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    density: number;
    color: string;
    angle: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        // Vary size for depth effect
        this.size = Math.random() * 2.5 + 0.5;
        this.density = (Math.random() * 30) + 1;
        this.angle = Math.random() * 360;

        // Red, Green, Blue, Yellow (Google colors)
        const colors = ['#EA4335', '#34A853', '#4285F4', '#FBBC05'];
        // Use these vibrant colors more often, mixed with subtle greys for depth
        if (Math.random() > 0.3) {
            this.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
            this.color = 'currentColor';
        }
    }

    draw(ctx: CanvasRenderingContext2D, mouseDistance: number, maxDistance: number) {
        // Calculate dynamic opacity based on proximity to mouse
        let opacity = 0.3; // base opacity
        if (mouseDistance < maxDistance) {
            // Glow effect: increase opacity as mouse gets closer
            const glowFactor = 1 - (mouseDistance / maxDistance);
            opacity = 0.3 + (glowFactor * 0.7);
        }

        ctx.globalAlpha = opacity;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(mouse: { x: number; y: number }) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;

        // Max radius of magnetic effect
        const maxDistance = 300;
        let force = (maxDistance - distance) / maxDistance;

        if (force < 0) force = 0;

        // Swirling Repel effect: push away and rotate slightly
        // Instead of pulling toward mouse, we push away (negative dx/dy)
        const pushFactor = -0.5;
        const swirlX = forceDirectionY * force * 2; // Perpendicular force for swirl
        const swirlY = -forceDirectionX * force * 2;

        const directionX = (forceDirectionX * force * this.density * pushFactor) + swirlX;
        const directionY = (forceDirectionY * force * this.density * pushFactor) + swirlY;

        if (distance < maxDistance) {
            this.x += directionX;
            this.y += directionY;
        } else {
            // Smoothly return to original scatter
            if (this.x !== this.baseX) {
                const rdx = this.x - this.baseX;
                this.x -= rdx / 30;
            }
            if (this.y !== this.baseY) {
                const rdy = this.y - this.baseY;
                this.y -= rdy / 30;
            }
        }

        // Subtly orbit origin for liveliness
        this.angle += 0.005;
        this.x += Math.cos(this.angle) * 0.2;
        this.y += Math.sin(this.angle) * 0.2;
    }
}

export function AnimatedDots() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: -1000, y: -1000 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Calculate dots based on screen area to keep density consistent
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 7000);

            // Scatter dots predominantly in the center, tapering off
            for (let i = 0; i < numberOfParticles; i++) {
                // simple gaussian-like distribution
                const u = Math.random();
                const v = Math.random();
                const theta = u * 2.0 * Math.PI;
                const r = Math.sqrt(-2.0 * Math.log(v)) * (canvas.width / 4);

                let x = (canvas.width / 2) + r * Math.cos(theta);
                let y = (canvas.height / 2) + r * Math.sin(theta);

                // constrain slightly to viewport
                if (x < 0) x = Math.random() * canvas.width;
                if (x > canvas.width) x = Math.random() * canvas.width;
                if (y < 0) y = Math.random() * canvas.height;
                if (y > canvas.height) y = Math.random() * canvas.height;

                particles.push(new Particle(x, y));
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                // Calculate distance for the draw function to determine glow
                const dx = mouse.x - particles[i].x;
                const dy = mouse.y - particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                particles[i].update(mouse);
                particles[i].draw(ctx, distance, 300); // Pass distance and maxDistance
            }
            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);

        // Use document body tracking to capture mouse globally over the absolute canvas
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
            style={{
                opacity: 0.8,
                filter: 'saturate(1.5) contrast(1.2)'
            }}
            aria-hidden="true"
        />
    );
}
