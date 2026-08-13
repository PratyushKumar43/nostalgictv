"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { CHANNELS } from "@/lib/playlistData";
import { soundFX } from "@/lib/soundEffects";
import { Channel, ScanlineIntensity, TVContextType, OSDState } from "@/types/tv";

const TVContext = createContext<TVContextType | undefined>(undefined);

export const TVProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPoweredOn, setIsPoweredOn] = useState<boolean>(true);
  const [currentChannelIndex, setCurrentChannelIndex] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(70);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Autoplay policy: start muted until user interacts
  const [isChangingChannel, setIsChangingChannel] = useState<boolean>(false);
  const [scanlineIntensity, setScanlineIntensityState] = useState<ScanlineIntensity>("light");
  const [isCurvatureEnabled, setIsCurvatureEnabled] = useState<boolean>(true);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);



  const [osdState, setOsdState] = useState<OSDState>({
    visible: true,
    text: `CH 01 - ${CHANNELS[0].title}`,
    subtext: "CLICK ANY REMOTE BUTTON FOR SOUND",
    type: "channel",
  });

  // OSD Auto-hide timer
  const showOSD = useCallback((text: string, subtext?: string, type: OSDState["type"] = "info") => {
    setOsdState({ visible: true, text, subtext, type });
  }, []);

  useEffect(() => {
    if (!osdState.visible) return;
    const timer = setTimeout(() => {
      setOsdState((prev) => ({ ...prev, visible: false }));
    }, 3500);
    return () => clearTimeout(timer);
  }, [osdState.visible, osdState.text, osdState.subtext]);

  const setUserInteracted = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      setIsMuted(false);
    }
  }, [hasUserInteracted]);

  const toggleZoom = useCallback(() => {
    setUserInteracted();
    soundFX.playButtonClick();
    setIsZoomedIn((prev) => {
      const nextState = !prev;
      showOSD(nextState ? "CAMERA: CLOSE-UP TV ZOOM" : "CAMERA: NORMAL ROOM VIEW", undefined, "info");
      return nextState;
    });
  }, [setUserInteracted, showOSD]);

  // Global window click listener to enable audio/video playback immediately on first click
  useEffect(() => {
    const handleGlobalInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        setIsMuted(false);
      }
    };
    window.addEventListener("click", handleGlobalInteraction, { once: true });
    return () => window.removeEventListener("click", handleGlobalInteraction);
  }, [hasUserInteracted]);


  const togglePower = useCallback(() => {
    setUserInteracted();
    soundFX.playPowerClick();
    setIsPoweredOn((prev) => {
      const nextState = !prev;
      if (!nextState) {
        showOSD("STANDBY", "POWER OFF", "power");
      } else {
        showOSD(`CH ${CHANNELS[currentChannelIndex].channelNumber.toString().padStart(2, "0")}`, CHANNELS[currentChannelIndex].title, "channel");
      }
      return nextState;
    });
  }, [currentChannelIndex, setUserInteracted, showOSD]);

  const triggerChannelChangeEffect = useCallback((newIndex: number) => {
    setIsChangingChannel(true);
    soundFX.playStaticNoise(300);

    const targetChannel = CHANNELS[newIndex];
    showOSD(
      `CH ${targetChannel.channelNumber.toString().padStart(2, "0")} - ${targetChannel.brand.toUpperCase()}`,
      targetChannel.title,
      "channel"
    );

    setTimeout(() => {
      setIsChangingChannel(false);
    }, 280);
  }, [showOSD]);

  const nextChannel = useCallback(() => {
    if (!isPoweredOn) return;
    setUserInteracted();
    soundFX.playButtonClick();
    setCurrentChannelIndex((prev) => {
      const nextIdx = (prev + 1) % CHANNELS.length;
      triggerChannelChangeEffect(nextIdx);
      return nextIdx;
    });
  }, [isPoweredOn, setUserInteracted, triggerChannelChangeEffect]);

  const previousChannel = useCallback(() => {
    if (!isPoweredOn) return;
    setUserInteracted();
    soundFX.playButtonClick();
    setCurrentChannelIndex((prev) => {
      const prevIdx = (prev - 1 + CHANNELS.length) % CHANNELS.length;
      triggerChannelChangeEffect(prevIdx);
      return prevIdx;
    });
  }, [isPoweredOn, setUserInteracted, triggerChannelChangeEffect]);

  const setChannelByIndex = useCallback(
    (index: number) => {
      if (!isPoweredOn) return;
      if (index < 0 || index >= CHANNELS.length) return;
      setUserInteracted();
      soundFX.playButtonClick();
      setCurrentChannelIndex(index);
      triggerChannelChangeEffect(index);
    },
    [isPoweredOn, setUserInteracted, triggerChannelChangeEffect]
  );

  const setChannelByNumber = useCallback(
    (channelNum: number) => {
      const index = CHANNELS.findIndex((c) => c.channelNumber === channelNum);
      if (index !== -1) {
        setChannelByIndex(index);
      } else {
        showOSD(`CH ${channelNum} UNASSIGNED`, "NO BROADCAST SIGNAL", "info");
      }
    },
    [setChannelByIndex, showOSD]
  );

  const setVolume = useCallback(
    (vol: number) => {
      if (!isPoweredOn) return;
      setUserInteracted();
      const clampedVol = Math.max(0, Math.min(100, vol));
      setVolumeState(clampedVol);
      if (clampedVol > 0 && isMuted) {
        setIsMuted(false);
      }

      const barLength = 12;
      const filledBars = Math.round((clampedVol / 100) * barLength);
      const visualBar = "█".repeat(filledBars) + "░".repeat(barLength - filledBars);

      showOSD(`VOLUME [ ${clampedVol}% ]`, visualBar, "volume");
    },
    [isPoweredOn, isMuted, setUserInteracted, showOSD]
  );

  const volumeUp = useCallback(() => {
    soundFX.playButtonClick();
    setVolume(volume + 10);
  }, [setVolume, volume]);

  const volumeDown = useCallback(() => {
    soundFX.playButtonClick();
    setVolume(volume - 10);
  }, [setVolume, volume]);

  const toggleMute = useCallback(() => {
    if (!isPoweredOn) return;
    setUserInteracted();
    soundFX.playButtonClick();
    setIsMuted((prev) => {
      const nextMuted = !prev;
      showOSD(nextMuted ? "[ AUDIO MUTED ]" : "[ AUDIO ACTIVE ]", undefined, "mute");
      return nextMuted;
    });
  }, [isPoweredOn, setUserInteracted, showOSD]);

  const cycleScanlineIntensity = useCallback(() => {
    setUserInteracted();
    soundFX.playButtonClick();
    setScanlineIntensityState((prev) => {
      const nextMap: Record<ScanlineIntensity, ScanlineIntensity> = {
        off: "light",
        light: "heavy",
        heavy: "off",
      };
      const nextMode = nextMap[prev];
      showOSD(`SCANLINES: ${nextMode.toUpperCase()}`, undefined, "info");
      return nextMode;
    });
  }, [setUserInteracted, showOSD]);

  const toggleCurvature = useCallback(() => {
    setUserInteracted();
    soundFX.playButtonClick();
    setIsCurvatureEnabled((prev) => {
      const nextState = !prev;
      showOSD(`CRT GLASS CURVE: ${nextState ? "ON" : "FLAT"}`, undefined, "info");
      return nextState;
    });
  }, [setUserInteracted, showOSD]);

  // Global Keyboard Navigation Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          nextChannel();
          break;
        case "ArrowDown":
          e.preventDefault();
          previousChannel();
          break;
        case "ArrowRight":
          e.preventDefault();
          volumeUp();
          break;
        case "ArrowLeft":
          e.preventDefault();
          volumeDown();
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
        case "p":
        case "P":
        case " ":
          e.preventDefault();
          togglePower();
          break;
        case "z":
        case "Z":
          e.preventDefault();
          toggleZoom();
          break;
        default:
          if (/^[0-9]$/.test(e.key)) {
            e.preventDefault();
            const num = parseInt(e.key, 10);
            if (num === 0) setChannelByNumber(10);
            else setChannelByNumber(num);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextChannel, previousChannel, volumeUp, volumeDown, toggleMute, togglePower, setChannelByNumber, toggleZoom]);

  // Channel video manual shuffle offsets
  const [channelVideoOffsets, setChannelVideoOffsets] = useState<Record<string, number>>({});

  // Calculate day of the year (0 to 365)
  const getDayOfYear = useCallback(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / 86400000);
  }, []);

  const getActiveVideoId = useCallback((channel: Channel): string | undefined => {
    if (!channel.youtubeIds || channel.youtubeIds.length === 0) {
      return channel.youtubeId;
    }
    const dayOfYear = getDayOfYear();
    const manualOffset = channelVideoOffsets[channel.id] || 0;
    const index = (dayOfYear + channel.channelNumber + manualOffset) % channel.youtubeIds.length;
    return channel.youtubeIds[index];
  }, [getDayOfYear, channelVideoOffsets]);

  const getDailyEpisodeIndex = useCallback((channel: Channel): number => {
    const dayOfYear = getDayOfYear();
    const manualOffset = channelVideoOffsets[channel.id] || 0;
    return (dayOfYear * 3 + channel.channelNumber + manualOffset) % 80 + 1;
  }, [getDayOfYear, channelVideoOffsets]);

  const shuffleChannelVideo = useCallback(() => {
    const channel = CHANNELS[currentChannelIndex];
    setUserInteracted();
    soundFX.playButtonClick();
    setChannelVideoOffsets((prev) => {
      const currentOffset = prev[channel.id] || 0;
      return { ...prev, [channel.id]: currentOffset + 1 };
    });
    triggerChannelChangeEffect(currentChannelIndex);
    showOSD(`EPISODE SHUFFLED`, `CH ${channel.channelNumber.toString().padStart(2, "0")} - NEW VIDEO TUNED`, "info");
  }, [currentChannelIndex, setUserInteracted, triggerChannelChangeEffect, showOSD]);

  const currentChannel = CHANNELS[currentChannelIndex];

  return (
    <TVContext.Provider
      value={{
        isPoweredOn,
        currentChannelIndex,
        volume,
        isMuted,
        isChangingChannel,
        scanlineIntensity,
        isCurvatureEnabled,
        isAutoAdvancing: false,
        osdState,
        hasUserInteracted,
        channelVideoOffsets,
        isZoomedIn,
        togglePower,
        nextChannel,
        previousChannel,
        setChannelByIndex,
        setChannelByNumber,
        shuffleChannelVideo,
        toggleZoom,
        setVolume,
        volumeUp,
        volumeDown,
        toggleMute,
        setScanlineIntensity: setScanlineIntensityState,
        cycleScanlineIntensity,
        toggleCurvature,
        showOSD,
        setUserInteracted,
        currentChannel,
        totalChannels: CHANNELS.length,
        getActiveVideoId,
        getDailyEpisodeIndex,
      }}
    >
      {children}
    </TVContext.Provider>
  );
};


export const useTV = (): TVContextType => {
  const context = useContext(TVContext);
  if (!context) {
    throw new Error("useTV must be used within a TVProvider");
  }
  return context;
};
