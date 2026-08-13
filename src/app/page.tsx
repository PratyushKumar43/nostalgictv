"use client";

import React, { useState } from "react";
import { TVProvider, useTV } from "@/context/TVContext";
import { TVScene } from "@/components/tv/TVScene";
import { RemoteControl } from "@/components/remote/RemoteControl";
import { ChannelGuideModal } from "@/components/modals/ChannelGuideModal";
import { Tv, ListVideo, Power, ChevronUp, ChevronDown, Volume2, VolumeX, Shuffle, ZoomIn, ZoomOut } from "lucide-react";

function TopBarControls({ onOpenGuide }: { onOpenGuide: () => void }) {
  const { isPoweredOn, togglePower, nextChannel, previousChannel, toggleMute, isMuted, currentChannel, shuffleChannelVideo, toggleZoom, isZoomedIn } = useTV();

  return (
    <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-[2px] font-mono text-amber-200">
      <div className="flex items-center gap-2">
        <Tv className="h-5 w-5 text-amber-400 animate-pulse" />
        <span className="font-bold text-xs sm:text-sm tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
          90s DOORDARSHAN CRT TV
        </span>
        <span className="hidden md:inline-block text-[10px] bg-amber-500/10 text-amber-300/80 px-2 py-0.5 rounded border border-amber-500/20 ml-2">
          CH {currentChannel.channelNumber.toString().padStart(2, "0")}: {currentChannel.brand}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={previousChannel}
          className="p-1.5 sm:px-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-amber-200 border border-amber-900/50 rounded text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
          title="Previous Channel (Down Arrow)"
        >
          <ChevronDown className="h-3.5 w-3.5" />
          <span className="hidden sm:inline text-[11px]">PREV CH</span>
        </button>

        <button
          onClick={nextChannel}
          className="p-1.5 sm:px-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-amber-200 border border-amber-900/50 rounded text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
          title="Next Channel (Up Arrow)"
        >
          <ChevronUp className="h-3.5 w-3.5" />
          <span className="hidden sm:inline text-[11px]">NEXT CH</span>
        </button>

        <button
          onClick={shuffleChannelVideo}
          className="p-1.5 sm:px-2.5 bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-600/50 rounded text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
          title="Rotate Video / Next Episode"
        >
          <Shuffle className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden sm:inline text-[11px]">SHUFFLE</span>
        </button>

        <button
          onClick={toggleZoom}
          className={`p-1.5 sm:px-2.5 rounded text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer border ${
            isZoomedIn
              ? "bg-cyan-900/80 hover:bg-cyan-800 text-cyan-100 border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              : "bg-zinc-900/90 hover:bg-zinc-800 text-cyan-300 border-zinc-700/50"
          }`}
          title={isZoomedIn ? "Zoom Out — Room View (Z)" : "Zoom In — See TV Close-Up (Z)"}
        >
          {isZoomedIn ? <ZoomOut className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline text-[11px]">{isZoomedIn ? "ROOM" : "ZOOM"}</span>
        </button>

        <button
          onClick={toggleMute}
          className="p-1.5 sm:px-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-amber-200 border border-amber-900/50 rounded text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
          title="Toggle Mute (M key)"
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5 text-red-400" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-400" />}
          <span className="hidden sm:inline text-[11px]">{isMuted ? "MUTED" : "SOUND"}</span>
        </button>

        <button
          onClick={onOpenGuide}
          className="px-2.5 sm:px-3 py-1.5 bg-amber-600/90 hover:bg-amber-500 text-black font-bold border border-amber-400 rounded text-xs flex items-center gap-1.5 shadow-lg transition-all active:scale-95 cursor-pointer"
          title="Open TV Channel Guide"
        >
          <ListVideo className="h-3.5 w-3.5" />
          <span>CHANNELS</span>
        </button>

        <button
          onClick={togglePower}
          className={`p-1.5 sm:px-2.5 rounded text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer border ${
            isPoweredOn
              ? "bg-red-900/80 hover:bg-red-800 text-red-100 border-red-600"
              : "bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border-emerald-600"
          }`}
          title="Power Toggle (Spacebar)"
        >
          <Power className="h-3.5 w-3.5" />
          <span className="hidden sm:inline text-[11px]">{isPoweredOn ? "OFF" : "ON"}</span>
        </button>
      </div>
    </header>
  );
}


export default function Home() {
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  return (
    <TVProvider>
      <main className="relative min-h-screen w-full bg-[#070504]">
        {/* Top Header Controls Bar */}
        <TopBarControls onOpenGuide={() => setIsGuideOpen(true)} />

        {/* Living Room Background Scene & Fitted CRT TV */}
        <TVScene />

        {/* Floating 2D Retro Remote Control Widget (Expanded by Default in Bottom-Right) */}
        <RemoteControl onOpenGuide={() => setIsGuideOpen(true)} />

        {/* EPG TV Channel Guide Modal */}
        <ChannelGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      </main>
    </TVProvider>
  );
}

