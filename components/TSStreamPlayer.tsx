'use client';
import { useEffect, useRef } from 'react';
import mpegts from 'mpegts.js';

interface TSStreamPlayerProps {
  url: string;
}

export default function TSStreamPlayer({ url }: TSStreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mpegts.getFeatureList().mseLivePlayback && videoRef.current) {
      const player = mpegts.createPlayer({ type: 'mpegts', url }, { isLive: true });
      player.attachMediaElement(videoRef.current);
      player.load();
      player.play();
      return () => player.destroy();
    } else if (videoRef.current) {
      videoRef.current.src = url; // fallback
    }
  }, [url]);

  return (
    <div className="w-full max-w-3xl bg-gray-800 p-4 rounded-2xl shadow-lg">
      <h1 className="text-xl font-bold mb-3 text-center">🎬 VLC Stream Player</h1>
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
