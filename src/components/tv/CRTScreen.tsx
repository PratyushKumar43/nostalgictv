"use client";

import React from "react";
import { useTV } from "@/context/TVContext";
import { VideoPlayer } from "./VideoPlayer";
import { CRTShaderOverlay } from "./CRTShaderOverlay";
import { ChannelStatic } from "./ChannelStatic";
import { OSDOverlay } from "./OSDOverlay";

export const CRTScreen: React.FC = () => {
  const { isPoweredOn, isChangingChannel, isCurvatureEnabled, hasUserInteracted, setUserInteracted } = useTV();

  return (
    <div
      onClick={setUserInteracted}
      className={`relative w-full h-full overflow-hidden bg-black transition-all duration-300 ${
        isCurvatureEnabled ? "rounded-[0.8rem] sm:rounded-[1.2rem]" : "rounded-none"
      } ${!isPoweredOn ? "animate-crtCollapse opacity-0 scale-0" : "opacity-100 scale-100"}`}
      style={{
        boxShadow: "inset 0 0 25px rgba(0, 0, 0, 0.95), 0 0 10px rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Video Stream Layer */}
      <VideoPlayer />

      {/* Static Noise Overlay on Channel Flip */}
      {isChangingChannel && <ChannelStatic opacity={0.95} />}

      {/* Power Off Screen Blackout */}
      {!isPoweredOn && <div className="absolute inset-0 z-50 bg-[#040404]" />}

      {/* CRT Shaders (Scanlines, Vignette, Glass Glare, Screen Flicker) */}
      <CRTShaderOverlay />

      {/* On-Screen Display */}
      <OSDOverlay />

      {/* First Interaction Prompt Overlay */}
      {!hasUserInteracted && isPoweredOn && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-[1px] p-2 text-center">
          <div className="bg-black/90 border border-emerald-500/60 p-3 sm:p-5 rounded-lg text-emerald-400 font-mono shadow-crt max-w-[85%] animate-pulse">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              📺 RETRO TV READY
            </p>
            <p className="text-[10px] sm:text-xs text-emerald-300/80 mb-2">
              Click screen or remote to unmute audio & switch channels!
            </p>
            <span className="inline-block bg-emerald-500/20 text-emerald-300 text-[9px] px-2.5 py-1 rounded border border-emerald-500/40">
              CLICK TO UNMUTE
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

