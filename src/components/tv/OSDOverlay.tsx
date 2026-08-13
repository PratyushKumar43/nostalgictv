"use client";

import React from "react";
import { useTV } from "@/context/TVContext";
import { Volume2, VolumeX, Radio, Tv } from "lucide-react";

export const OSDOverlay: React.FC = () => {
  const { osdState, isPoweredOn, isMuted, volume } = useTV();

  if (!isPoweredOn || !osdState.visible) return null;

  return (
    <div className="pointer-events-none absolute top-4 right-4 z-50 flex flex-col items-end gap-1 font-mono text-emerald-400 drop-shadow-[0_0_8px_rgba(51,255,51,0.8)] select-none">
      <div className="flex items-center gap-2 bg-black/75 px-3 py-1.5 rounded border border-emerald-500/40 text-sm sm:text-base font-bold tracking-widest uppercase">
        {isMuted ? <VolumeX className="h-4 w-4 text-emerald-400 animate-pulse" /> : <Radio className="h-4 w-4 text-emerald-400" />}
        <span>{osdState.text}</span>
      </div>

      {osdState.subtext && (
        <div className="bg-black/80 px-2.5 py-1 rounded text-xs text-emerald-300/90 tracking-wide">
          {osdState.subtext}
        </div>
      )}

      {osdState.type === "volume" && (
        <div className="flex items-center gap-2 bg-black/80 px-2.5 py-1 rounded text-xs text-emerald-400">
          <Volume2 className="h-3.5 w-3.5" />
          <span>{volume}%</span>
        </div>
      )}

      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-500/70 tracking-widest">
        <Tv className="h-3 w-3" />
        <span>DOORDARSHAN AV-1</span>
      </div>
    </div>
  );
};
