'use client';

import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const audioStreamUrl = "http://08.stmip.net:8668/;";

export default function FullRadioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
      setVolume(audioRef.current.volume);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const vol = Number(e.target.value);
    audioRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    const onEnded = () => setIsPlaying(false);
    audioEl.addEventListener("ended", onEnded);
    return () => audioEl.removeEventListener("ended", onEnded);
  }, []);

  return (
    <section
      aria-label="Player completo da Rádio Ágape"
      className="max-w-xl mx-auto bg-white border rounded-xl shadow-lg p-6 font-serif"
    >
      <h3 className="text-2xl font-bold mb-4 text-red-700 text-center">🎧 Web Radío Ágape</h3>
      <audio ref={audioRef} src={audioStreamUrl} preload="none" />

      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar rádio" : "Tocar rádio"}
          className="text-zinc-600 hover:text-zinc-800 transition focus:outline-none"
        >
          {isPlaying ? <FaPause size={36} /> : <FaPlay size={36} />}
        </button>

        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Desmutar áudio" : "Mutar áudio"}
          className="text-zinc-600 hover:text-red-800 transition focus:outline-none"
        >
          {isMuted || volume === 0 ? <FaVolumeMute size={28} /> : <FaVolumeUp size={28} />}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          aria-label="Controle de volume"
          className="w-48 h-1 rounded-lg cursor-pointer"
          style={{ accentColor: "#b91c1c" }}
        />
      </div>
    </section>
  );
}
