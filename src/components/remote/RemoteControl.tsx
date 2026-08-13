"use client";

import React, { useState } from "react";
import { useTV } from "@/context/TVContext";
import { RemoteButton } from "./RemoteButton";
import {
  Power,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  Sparkles,
  ListVideo,
  Eye,
  Tv,
  Maximize2,
  Minimize2,
  Shuffle,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface RemoteControlProps {
  onOpenGuide: () => void;
}

export const RemoteControl: React.FC<RemoteControlProps> = ({ onOpenGuide }) => {
  const {
    isPoweredOn,
    togglePower,
    nextChannel,
    previousChannel,
    volumeUp,
    volumeDown,
    toggleMute,
    isMuted,
    setChannelByNumber,
    cycleScanlineIntensity,
    scanlineIntensity,
    toggleCurvature,
    isCurvatureEnabled,
    shuffleChannelVideo,
    toggleZoom,
    isZoomedIn,
  } = useTV();

  // Expanded by default so remote control is immediately visible
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none font-mono">
      {/* Remote Control Dock Tab Header */}
      <button
        onClick={() => setIsMinimized((prev) => !prev)}
        className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-amber-300 border-2 border-amber-500/40 px-3.5 py-2 rounded-t-xl text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all cursor-pointer animate-pulse"
      >
        <Tv className="h-4 w-4 text-amber-400" />
        <span className="tracking-wider">🎮 RETRO REMOTE CONTROL</span>
        {isMinimized ? (
          <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
        ) : (
          <Minimize2 className="h-3.5 w-3.5 text-amber-400" />
        )}
      </button>

      {/* Main Vintage Remote Body */}
      {!isMinimized && (
        <div className="w-60 sm:w-64 p-4 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-2 border-amber-600/50 rounded-b-2xl rounded-tl-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(217,119,6,0.2)] flex flex-col gap-3.5 text-zinc-200">
          
          {/* Top Brand & Power Switch */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${isPoweredOn ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-red-950"}`} />
              <span className="text-[10px] tracking-widest text-amber-200/80 font-bold uppercase">
                BEL STEREO DD-94
              </span>
            </div>
            <RemoteButton
              onClick={togglePower}
              variant={isPoweredOn ? "danger" : "primary"}
              size="sm"
              title="Power Toggle"
              className="rounded-full !px-3 shadow-md"
            >
              <Power className="h-4 w-4" />
            </RemoteButton>
          </div>

          {/* Quick Actions: Guide | Shuffle | Zoom */}
          <div className="grid grid-cols-3 gap-2">
            <RemoteButton onClick={onOpenGuide} variant="warning" size="sm" title="Open TV Channel Guide">
              <div className="flex items-center gap-1 text-xs">
                <ListVideo className="h-3.5 w-3.5" />
                <span>GUIDE</span>
              </div>
            </RemoteButton>
            <RemoteButton
              onClick={shuffleChannelVideo}
              variant="primary"
              size="sm"
              title="Rotate / Shuffle Video"
            >
              <div className="flex items-center gap-1 text-[11px]">
                <Shuffle className="h-3.5 w-3.5 text-amber-300" />
                <span>NEXT</span>
              </div>
            </RemoteButton>
            <RemoteButton
              onClick={toggleZoom}
              variant={isZoomedIn ? "danger" : "secondary"}
              size="sm"
              title={isZoomedIn ? "Zoom Out (Z)" : "Zoom In — See TV Close-Up (Z)"}
            >
              <div className="flex items-center gap-1 text-[11px]">
                {isZoomedIn ? (
                  <ZoomOut className="h-3.5 w-3.5 text-red-300" />
                ) : (
                  <ZoomIn className="h-3.5 w-3.5 text-cyan-300" />
                )}
                <span>{isZoomedIn ? "OUT" : "ZOOM"}</span>
              </div>
            </RemoteButton>
          </div>


          {/* D-PAD / Channel & Volume Rockers */}
          <div className="grid grid-cols-2 gap-2.5 bg-zinc-950/90 p-2.5 rounded-xl border border-zinc-800 shadow-inner">
            {/* Channel Rockers */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-amber-400/80 tracking-widest font-bold">CHANNEL</span>
              <RemoteButton onClick={nextChannel} variant="dark" size="sm" className="w-full">
                <ChevronUp className="h-4 w-4 text-amber-200" />
              </RemoteButton>
              <RemoteButton onClick={previousChannel} variant="dark" size="sm" className="w-full">
                <ChevronDown className="h-4 w-4 text-amber-200" />
              </RemoteButton>
            </div>

            {/* Volume Rockers */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-amber-400/80 tracking-widest font-bold">VOLUME</span>
              <RemoteButton onClick={volumeUp} variant="dark" size="sm" className="w-full">
                <span className="text-xs font-bold text-emerald-300">+</span>
              </RemoteButton>
              <RemoteButton onClick={volumeDown} variant="dark" size="sm" className="w-full">
                <span className="text-xs font-bold text-amber-300">-</span>
              </RemoteButton>
            </div>
          </div>

          {/* Mute & Curvature Toggle Row */}
          <div className="grid grid-cols-2 gap-2">
            <RemoteButton onClick={toggleMute} variant={isMuted ? "danger" : "dark"} size="sm">
              <div className="flex items-center gap-1 text-xs">
                {isMuted ? <VolumeX className="h-3.5 w-3.5 text-red-400" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-400" />}
                <span>{isMuted ? "MUTED" : "MUTE"}</span>
              </div>
            </RemoteButton>
            <RemoteButton onClick={toggleCurvature} variant="dark" size="sm">
              <div className="flex items-center gap-1 text-[11px]">
                <Eye className="h-3.5 w-3.5 text-cyan-400" />
                <span>GLASS:{isCurvatureEnabled ? "CURVE" : "FLAT"}</span>
              </div>
            </RemoteButton>
          </div>

          {/* Numpad 0-9 Direct Channel Switcher */}
          <div className="flex flex-col gap-1.5 border-t border-zinc-800/80 pt-2.5">
            <span className="text-[9px] text-center text-zinc-400 tracking-widest uppercase font-bold">
              DIRECT NUMPAD (0-9)
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <RemoteButton
                  key={num}
                  onClick={() => setChannelByNumber(num)}
                  variant="dark"
                  size="sm"
                  className="!py-1.5 font-bold hover:text-amber-300"
                >
                  {num}
                </RemoteButton>
              ))}
            </div>
            <div className="flex justify-center">
              <RemoteButton
                onClick={() => setChannelByNumber(10)}
                variant="dark"
                size="sm"
                className="w-1/3 !py-1.5 font-bold hover:text-amber-300"
              >
                10
              </RemoteButton>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

