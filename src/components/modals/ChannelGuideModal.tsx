"use client";

import React, { useState } from "react";
import { CHANNELS } from "@/lib/playlistData";
import { useTV } from "@/context/TVContext";
import { ChannelCategory } from "@/types/tv";
import { X, Play, Tv, Sparkles, Film, Award } from "lucide-react";

interface ChannelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChannelGuideModal: React.FC<ChannelGuideModalProps> = ({ isOpen, onClose }) => {
  const { currentChannelIndex, setChannelByIndex } = useTV();
  const [selectedCategory, setSelectedCategory] = useState<ChannelCategory | "ALL">("ALL");

  if (!isOpen) return null;

  const categories: { id: ChannelCategory | "ALL"; label: string }[] = [
    { id: "ALL", label: "ALL CHANNELS" },
    { id: "Commercials", label: "📺 90s ADS" },
    { id: "Mahabharat", label: "🏹 MAHABHARAT" },
    { id: "Ramayan", label: "🕉️ RAMAYAN" },
    { id: "Cricket", label: "🏏 VINTAGE CRICKET" },
  ];

  const filteredChannels = CHANNELS.filter(
    (c) => selectedCategory === "ALL" || c.category === selectedCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm select-none font-mono">
      <div className="relative w-full max-w-2xl bg-zinc-950 border-2 border-emerald-500/60 rounded-2xl p-4 sm:p-6 text-emerald-400 shadow-[0_0_35px_rgba(51,255,51,0.25)] max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/40 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Tv className="h-5 w-5 text-emerald-400 animate-pulse" />
            <h2 className="text-sm sm:text-lg font-bold tracking-widest uppercase">
              DOORDARSHAN TV GUIDE (EPG)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-emerald-500/20 text-emerald-400 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 no-scrollbar text-xs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-emerald-500/30 border-emerald-400 text-emerald-200 shadow-[0_0_10px_rgba(51,255,51,0.3)]"
                    : "bg-zinc-900 border-zinc-800 text-emerald-500/70 hover:text-emerald-300 hover:border-emerald-700"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Channel Grid List */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-2">
          {filteredChannels.map((channel) => {
            const globalIndex = CHANNELS.findIndex((c) => c.id === channel.id);
            const isActive = globalIndex === currentChannelIndex;

            return (
              <div
                key={channel.id}
                onClick={() => {
                  setChannelByIndex(globalIndex);
                  onClose();
                }}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(51,255,51,0.3)]"
                    : "bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800 text-emerald-400/90"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/70 border border-emerald-500/40 font-bold text-sm text-amber-300">
                    {channel.channelNumber.toString().padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-emerald-300">
                        {channel.brand}
                      </span>
                      {channel.year && (
                        <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-700">
                          {channel.year}
                        </span>
                      )}
                      {channel.playlistId && (
                        <span className="text-[9px] bg-amber-950/80 text-amber-300 px-1.5 py-0.5 rounded border border-amber-700/60 uppercase">
                          FULL SERIES
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-400/70 line-clamp-1">{channel.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isActive ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/30 px-2.5 py-1 rounded-full border border-emerald-400 animate-pulse">
                      <Sparkles className="h-3 w-3" />
                      <span>ON AIR</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-zinc-400 hover:text-emerald-300 transition-colors">
                      <Play className="h-3.5 w-3.5" />
                      <span>TUNE IN</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="mt-3 border-t border-emerald-500/30 pt-3 flex items-center justify-between text-[11px] text-emerald-500/70">
          <span>SHOWING {filteredChannels.length} OF {CHANNELS.length} CHANNELS</span>
          <span>PRESS [ESC] TO CLOSE</span>
        </div>

      </div>
    </div>
  );
};

