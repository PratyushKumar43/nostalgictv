"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTV } from "@/context/TVContext";

export const VideoPlayer: React.FC = () => {
  const {
    currentChannel,
    isPoweredOn,
    volume,
    isMuted,
    nextChannel,
    getActiveVideoId,
    getDailyEpisodeIndex,
    channelVideoOffsets,
  } = useTV();

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [usePlaylistFallback, setUsePlaylistFallback] = useState<boolean>(false);

  // Reset playlist fallback on channel switch
  useEffect(() => {
    setUsePlaylistFallback(false);
  }, [currentChannel.id]);

  const postCommand = useCallback((func: string, args: (string | number | boolean)[] = []) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func,
          args,
        }),
        "*"
      );
    } catch {
      // Suppress postMessage errors
    }
  }, []);

  // Force playVideo on iframe mount/load
  const handleIframeLoad = useCallback(() => {
    postCommand("playVideo");
    if (isMuted) {
      postCommand("mute");
    } else {
      postCommand("unMute");
      postCommand("setVolume", [volume]);
    }
  }, [isMuted, volume, postCommand]);

  // Send postMessage commands to YouTube iframe for volume & mute state
  useEffect(() => {
    postCommand("playVideo");
    if (isMuted) {
      postCommand("mute");
    } else {
      postCommand("unMute");
      postCommand("setVolume", [volume]);
    }
  }, [volume, isMuted, currentChannel.id, usePlaylistFallback, postCommand]);

  // Listen to YouTube API events (such as video end)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        // YouTube state 0 = ENDED
        if (data && data.event === "onStateChange" && data.info === 0) {
          nextChannel();
        }
      } catch {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [nextChannel]);

  if (!isPoweredOn) {
    return <div className="h-full w-full bg-black" />;
  }

  const muteParam = isMuted ? "1" : "0";
  const playlistId = "PLycor1XF7S9HVMnWxndl27HgZJM5S8wRT";

  const activeVideoId = getActiveVideoId(currentChannel);
  const dailyEpisodeIndex = getDailyEpisodeIndex(currentChannel);
  const offset = channelVideoOffsets[currentChannel.id] || 0;

  let embedUrl = "";
  if (usePlaylistFallback) {
    embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}&index=${dailyEpisodeIndex}&enablejsapi=1&autoplay=1&mute=${muteParam}&controls=0&modestbranding=1&rel=0&playsinline=1`;
  } else if (currentChannel.playlistId) {
    // Direct Series Playlist Embed with daily rotating episode index offset
    embedUrl = `https://www.youtube.com/embed/videoseries?list=${currentChannel.playlistId}&index=${dailyEpisodeIndex}&enablejsapi=1&autoplay=1&mute=${muteParam}&controls=0&modestbranding=1&rel=0&playsinline=1`;
  } else if (activeVideoId) {
    // Rotated daily video from channel pool
    embedUrl = `https://www.youtube-nocookie.com/embed/${activeVideoId}?enablejsapi=1&autoplay=1&mute=${muteParam}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&loop=1&playlist=${activeVideoId}`;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black select-none pointer-events-none">
      <iframe
        ref={iframeRef}
        key={`${currentChannel.id}-${activeVideoId}-${offset}-${isMuted}-${usePlaylistFallback}`}
        src={embedUrl}
        title={currentChannel.title}
        className="absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={handleIframeLoad}
        onError={() => setUsePlaylistFallback(true)}
      />
    </div>
  );

};


