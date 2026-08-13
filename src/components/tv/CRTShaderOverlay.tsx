"use client";

import React from "react";
import { useTV } from "@/context/TVContext";

export const CRTShaderOverlay: React.FC = () => {
  const { scanlineIntensity, isCurvatureEnabled } = useTV();

  if (scanlineIntensity === "off" && !isCurvatureEnabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {/* CRT Curved Glass Inner Edge Vignette & Corner Shadows */}
      {isCurvatureEnabled && (
        <>
          <div
            className="absolute inset-0 z-20"
            style={{
              background:
                "radial-gradient(circle at center, transparent 58%, rgba(0, 0, 0, 0.45) 82%, rgba(0, 0, 0, 0.9) 100%)",
              boxShadow: "inset 0 0 25px rgba(0, 0, 0, 0.95)",
            }}
          />
          {/* Glass Glare Reflection Highlight across top left corner */}
          <div
            className="absolute inset-0 z-25 opacity-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.08) 25%, transparent 50%)",
            }}
          />
        </>
      )}

      {/* CRT Scanline Grid Pattern */}
      {scanlineIntensity !== "off" && (
        <div
          className={`absolute inset-0 z-30 pointer-events-none mix-blend-overlay ${
            scanlineIntensity === "heavy" ? "opacity-55" : "opacity-30"
          }`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.7) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.03))",
            backgroundSize: "100% 4px, 6px 100%",
          }}
        />
      )}

      {/* Phosphor Glow Light Flicker */}
      <div className="absolute inset-0 z-10 animate-flicker bg-emerald-500/5 mix-blend-color-dodge pointer-events-none" />
    </div>
  );
};

