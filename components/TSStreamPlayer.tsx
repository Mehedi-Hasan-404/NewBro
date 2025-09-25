'use client';
import { useEffect, useRef } from 'react';
import mpegts from 'mpegts.js';
import Hls from 'hls.js';

interface TSStreamPlayerProps {
  url: string;
}

export default function TSStreamPlayer({ url }: TSStreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let player: any;

    // Case 1: HLS (.m3u8)
    if (url.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        player = new Hls();
        player.loadSource(url);
        player.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari native support
        video.src = url;
      }
    }

    // Case 2: MPEG-TS (.ts or raw stream)
    else if (mpegts.getFeatureList().mseLivePlayback) {
      player = mpegts.createPlayer({ type: 'mpegts', url }, { isLive: true });
      player.attachMediaElement(video);
      player.load();
      player.play();
    }

    // Case 3: Fallback
    else {
      video.src = url;
    }

    return () => {
      if (player) {
        if (player.destroy) player.destroy();
        else if (player.stopLoad) player.stopLoad();
      }
    };
  }, [url]);

  return (
    <div className="w-full max-w-3xl bg-gray-800 p-4 rounded-2xl shadow-lg">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        className="w-full rounded-lg bg-black shadow-md"
      />
    </div>
  );
}
