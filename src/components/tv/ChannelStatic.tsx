"use client";

import React, { useEffect, useRef } from "react";

interface ChannelStaticProps {
  opacity?: number;
}

export const ChannelStatic: React.FC<ChannelStaticProps> = ({ opacity = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = 320;
      canvas.height = 240;
    };
    resize();

    const render = () => {
      const imgData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imgData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        const noise = (Math.random() * 255) | 0;
        // ABGR order for fast canvas manipulation
        buffer[i] = (255 << 24) | (noise << 16) | (noise << 8) | noise;
      }

      ctx.putImageData(imgData, 0, 0);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-40 overflow-hidden bg-black pointer-events-none transition-opacity duration-150"
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="h-full w-full object-cover mix-blend-screen opacity-90 scale-105" />
      {/* Horizontal CRT Sync Glitch Line */}
      <div
        className="absolute left-0 right-0 h-3 bg-white/40 blur-[1px] animate-pulse"
        style={{ top: `${Math.random() * 80 + 10}%` }}
      />
    </div>
  );
};
