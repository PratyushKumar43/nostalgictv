"use client";

import React from "react";
import Image from "next/image";
import { useTV } from "@/context/TVContext";
import { CRTScreen } from "./CRTScreen";

export const TVScene: React.FC = () => {
  const { isPoweredOn, togglePower, nextChannel, isZoomedIn } = useTV();

  // Zoom transform: scale up centred on the TV position in the image (~50% x, 37% y)
  const zoomStyle: React.CSSProperties = isZoomedIn
    ? {
        transform: "scale(2.2)",
        transformOrigin: "50% 37%",
        transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
      }
    : {
        transform: "scale(1)",
        transformOrigin: "50% 37%",
        transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
      };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#070504] flex items-center justify-center select-none p-2 sm:p-4">
      {/* Background & TV Container preserving 1679:937 aspect ratio of original image */}
      <div
        className="relative w-full max-w-[1679px] aspect-[1679/937] flex items-center justify-center shadow-2xl rounded-xl overflow-hidden border border-amber-950/40 bg-black"
        style={zoomStyle}
      >
        
        {/* Background Image: Authentic Vintage TV Room with Kids Seated on Floor */}
        <Image
          src="/tv_room_blank.png"
          alt="90s Vintage TV Room with Kids watching TV"
          fill
          priority
          className="object-cover object-center pointer-events-none"
        />

        {/* Dynamic Phosphor Ambient Screen Light Cast onto Living Room & Kids */}
        {isPoweredOn && (
          <div
            className="absolute z-10 pointer-events-none rounded-full bg-cyan-400/20 blur-[50px] sm:blur-[85px] animate-flicker transition-opacity duration-500"
            style={{
              left: "37.88%",
              top: "21.99%",
              width: "23.59%",
              height: "31.38%",
            }}
          />
        )}

        {/* Embedded YouTube CRT Screen fitted into TV Frame */}
        <div
          className="absolute z-20 overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.95)]"
          style={{
            left: "37.88%",
            top: "21.99%",
            width: "23.59%",
            height: "31.38%",
            borderRadius: "4.5% / 6%",
          }}
        >
          <CRTScreen />
        </div>

        {/* Physical TV Button Hotspots on the TV set in the background image */}
        {/* Power Switch Hotspot */}
        <button
          onClick={togglePower}
          className="absolute z-30 cursor-pointer rounded opacity-0 hover:opacity-100 hover:bg-red-500/20 border border-red-400/60 transition-all flex items-center justify-center group"
          style={{
            left: "62.2%",
            top: "29.8%",
            width: "3.2%",
            height: "5.2%",
          }}
          title="TV Power Switch (Click to Turn On / Off)"
        >
          <span className="text-[9px] font-mono text-red-200 bg-black/90 px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            POWER
          </span>
        </button>

        {/* Channel Dial Hotspot */}
        <button
          onClick={nextChannel}
          className="absolute z-30 cursor-pointer rounded opacity-0 hover:opacity-100 hover:bg-amber-400/20 border border-amber-400/60 transition-all flex items-center justify-center group"
          style={{
            left: "62.2%",
            top: "35.8%",
            width: "3.2%",
            height: "5.2%",
          }}
          title="TV Channel Knob (Click to Switch Channel)"
        >
          <span className="text-[9px] font-mono text-amber-200 bg-black/90 px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            CH+
          </span>
        </button>

      </div>
    </div>
  );
};

