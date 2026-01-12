"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { usePathname } from 'next/navigation';

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay print:hidden"
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
  </div>
);

const ShimmerCursor = () => {
  const { x, y } = useMousePosition();
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    springX.set(x);
    springY.set(y);
  }, [x, y, springX, springY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-10 print:hidden"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 60%)',
      }}
    />
  );
};

const AmbientScene = ({ intensity = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const particleCount = 50;
    const connectionDistance = 150; 
    const baseSpeed = 0.2;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: {x: number, y: number, vx: number, vy: number}[] = [];
    let animationId: number;
    let lastTime = performance.now();
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * baseSpeed,
          vy: (Math.random() - 0.5) * baseSpeed
        });
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      const currentTime = performance.now();
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const dt = currentTime - lastTime;
      
      if (dt > 0 && deltaY > 0) {
        const instantVelocity = (deltaY / dt) * 2; 
        scrollVelocity = scrollVelocity * 0.9 + instantVelocity * 0.1;
      } else {
        scrollVelocity *= 0.95; 
      }
      
      if (scrollVelocity > 8) scrollVelocity = 8;

      lastScrollY = currentScrollY;
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);
      
      if (intensity <= 0.01) {
          animationId = requestAnimationFrame(animate);
          return;
      }

      ctx.fillStyle = "#555";
      ctx.lineWidth = 1;
      
      const currentIntensity = intensity; 
      const speedMultiplier = (1 + scrollVelocity) * currentIntensity;

      for (let i = 0; i < particleCount; i++) {
        let p = particles[i];
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = 0.4 * currentIntensity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx*dx + dy*dy);

          if (dist < connectionDistance) {
            ctx.globalAlpha = 0.15 * (1 - dist / connectionDistance) * currentIntensity;
            ctx.beginPath();
            ctx.strokeStyle = "#555";
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen transition-opacity duration-1000 print:hidden"
    />
  );
};


export default function BackgroundEffects() {
    const pathname = usePathname();

    const ambientIntensity = React.useMemo(() => {
        if (pathname === '/about') return 0.3;
        if (pathname === '/writing') return 0.2;
        if (pathname.startsWith('/writing/') || pathname === '/contact' || pathname.startsWith('/tools')) return 0;
        return 1;
      }, [pathname]);

    return (
        <>
            <NoiseOverlay />
            <AmbientScene intensity={ambientIntensity} />
            <ShimmerCursor />
        </>
    )
}
