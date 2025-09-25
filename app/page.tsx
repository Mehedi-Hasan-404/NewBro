'use client';
import { useState } from 'react';
import TSStreamPlayer from "@/components/TSStreamPlayer";

export default function Home() {
  const [url, setUrl] = useState("http://103.182.170.32:8888/play/a03r");
  const [currentUrl, setCurrentUrl] = useState(url);

  const handlePlay = () => {
    setCurrentUrl(url);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">🎬 VLC Stream Player</h1>

      <div className="flex space-x-2 w-full max-w-2xl">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg text-black outline-none"
          placeholder="Enter stream URL..."
        />
        <button
          onClick={handlePlay}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
        >
          Play
        </button>
      </div>

      <TSStreamPlayer url={currentUrl} />
    </main>
  );
}
