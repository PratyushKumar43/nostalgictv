"use client";

import React from "react";

interface RemoteButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "warning" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  title?: string;
  disabled?: boolean;
}

export const RemoteButton: React.FC<RemoteButtonProps> = ({
  onClick,
  children,
  variant = "dark",
  size = "md",
  className = "",
  title,
  disabled = false,
}) => {
  const variantStyles = {
    danger: "bg-red-600 hover:bg-red-500 text-white border-red-800 shadow-[0_4px_0_#991b1b]",
    primary: "bg-blue-600 hover:bg-blue-500 text-white border-blue-800 shadow-[0_4px_0_#1e40af]",
    warning: "bg-amber-500 hover:bg-amber-400 text-black border-amber-700 shadow-[0_4px_0_#b45309]",
    secondary: "bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border-zinc-900 shadow-[0_4px_0_#27272a]",
    dark: "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-950 shadow-[0_4px_0_#09090b]",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs min-h-[32px] min-w-[36px]",
    md: "px-3 py-2 text-sm min-h-[40px] min-w-[44px]",
    lg: "px-4 py-2.5 text-base min-h-[48px] min-w-[52px]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`relative inline-flex items-center justify-center font-mono font-bold rounded-lg border transition-all active:translate-y-1 active:shadow-none select-none disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};
