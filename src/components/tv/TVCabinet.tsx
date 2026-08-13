"use client";

import React from "react";
import { useTV } from "@/context/TVContext";
import { CRTScreen } from "./CRTScreen";
import { Power, ChevronUp, ChevronDown, Volume2, VolumeX } from "lucide-react";

export const TVCabinet: React.FC = () => {
  const { isPoweredOn, togglePower, nextChannel, previousChannel, volumeUp, volumeDown, toggleMute, currentChannel } = useTV();

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Wooden TV Box Outer Frame */}
      <div className="relative w-full p-4 sm:p-6 sm:pb-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#4a2b16] via-[#2d180b] to-[#1a0c05] border-4 border-[#5e381d] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(0,0,0,0.8)]">
        
        {/* Subtle Wood Texture Line Pattern */}
        <div className="absolute inset-0 rounded-2xl opacity-15 pointer-events-none bg-[repeating-linear-gradient(90deg,#000_0px,#000_2px,transparent_2px,transparent_8px)]" />

        {/* Top Metallic Trim / Brand Plate */}
        <div className="flex items-center justify-between px-3 sm:px-6 mb-3 sm:mb-4 border-b border-[#5e381d]/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-amber-200/80 uppercase font-semibold">
              DOORDARSHAN STEREO CRT-90
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[9px] font-mono text-amber-400/60 uppercase">MODEL DD-1994</div>
            <div className={`h-2.5 w-2.5 rounded-full transition-colors ${isPoweredOn ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-red-950"}`} />
          </div>
        </div>

        {/* Main Cabinet Inner Layout: CRT Screen + Cabinet Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* CRT Screen Area (Aspect ratio ~4:3) */}
          <div className="lg:col-span-9 relative w-full aspect-[4/3] max-h-[60vh] p-2 sm:p-3 bg-[#120a06] rounded-2xl border-2 border-[#3d210e] shadow-inner">
            <CRTScreen />
          </div>

          {/* Side Physical Control Panel (Wooden/Metal Controls) */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col items-center justify-between gap-3 p-3 sm:p-4 bg-gradient-to-b from-[#231208] to-[#120904] rounded-xl border border-[#42230e]">
            
            {/* Physical Rotary Channel Knob / Channel Display */}
            <div className="flex flex-col items-center gap-1.5 w-full">
              <span className="text-[9px] font-mono text-amber-300/70 tracking-widest uppercase">
                CHANNEL DIAL
              </span>
              <div className="flex items-center justify-between w-full bg-[#0a0503] px-3 py-1.5 rounded border border-amber-900/40 text-amber-400 font-mono text-xs">
                <span>CH</span>
                <span className="font-bold text-sm text-amber-300">
                  {currentChannel.channelNumber.toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2 w-full mt-1">
                <button
                  onClick={previousChannel}
                  className="flex-1 flex items-center justify-center py-1.5 bg-[#361d10] hover:bg-[#4a2917] active:scale-95 text-amber-200 rounded border border-[#5c331c] transition-all text-xs font-mono"
                  title="Channel Down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  onClick={nextChannel}
                  className="flex-1 flex items-center justify-center py-1.5 bg-[#361d10] hover:bg-[#4a2917] active:scale-95 text-amber-200 rounded border border-[#5c331c] transition-all text-xs font-mono"
                  title="Channel Up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Cabinet Volume & Mute Controls */}
            <div className="flex flex-col items-center gap-1.5 w-full">
              <span className="text-[9px] font-mono text-amber-300/70 tracking-widest uppercase">
                VOLUME / AUDIO
              </span>
              <div className="flex items-center gap-1.5 w-full">
                <button
                  onClick={volumeDown}
                  className="flex-1 py-1.5 bg-[#25130b] hover:bg-[#381d11] active:scale-95 text-amber-200 rounded border border-[#472714] text-xs font-mono font-bold"
                >
                  -
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1.5 bg-[#25130b] hover:bg-[#381d11] active:scale-95 text-amber-300 rounded border border-[#472714]"
                  title="Mute Toggle"
                >
                  <VolumeX className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={volumeUp}
                  className="flex-1 py-1.5 bg-[#25130b] hover:bg-[#381d11] active:scale-95 text-amber-200 rounded border border-[#472714] text-xs font-mono font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Cabinet Power Toggle Button */}
            <div className="flex flex-col items-center gap-1 w-full">
              <button
                onClick={togglePower}
                className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all shadow-md active:scale-95 border ${
                  isPoweredOn
                    ? "bg-red-700 hover:bg-red-600 text-white border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                    : "bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border-emerald-600"
                }`}
              >
                <Power className="h-3.5 w-3.5" />
                <span>{isPoweredOn ? "POWER OFF" : "POWER ON"}</span>
              </button>
            </div>

            {/* Vintage Speaker Grille Cutouts */}
            <div className="w-full hidden lg:flex flex-col gap-1 py-2 opacity-60">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-1 w-full bg-[#0a0503] rounded-full border-b border-[#361d10]/40" />
              ))}
            </div>

          </div>

        </div>

        {/* Lower Cabinet Wooden Base Support */}
        <div className="mt-3 flex items-center justify-between border-t border-[#42230e] pt-2 px-4 text-[10px] font-mono text-amber-400/50">
          <span>BHARAT ELECTRONICS LTD.</span>
          <span>PAL SYSTEM 625 LINES</span>
        </div>

      </div>
    </div>
  );
};
