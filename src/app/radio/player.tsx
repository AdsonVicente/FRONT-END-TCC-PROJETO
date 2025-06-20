"use client";

import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaTimes } from "react-icons/fa";

const audioStreamUrl = "http://08.stmip.net:8668/;";

export default function CustomRadioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    const handleEnded = () => setIsPlaying(false);
    audioEl.addEventListener("ended", handleEnded);
    return () => audioEl.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <>
      {isVisible ? (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl border-t z-50 font-serif px-4 py-3">
          <h1 className="text-center text-red-700 font-bold text-lg mb-2">Web Rádio Ágape</h1>
          <div className="flex items-center justify-center gap-4">
            <audio ref={audioRef} src={audioStreamUrl} preload="none" />
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar áudio" : "Tocar áudio"}
              className="p-3 rounded-full bg-zinc-600 text-white hover:bg-red-700 transition"
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Desmutar áudio" : "Mutar áudio"}
              className="text-zinc-600 hover:text-red-800 transition"
            >
              {isMuted || volume === 0 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-32"
              aria-label="Controle de volume"
            />
            <button
              onClick={() => setIsVisible(false)}
              aria-label="Fechar player"
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsVisible(true)}
          aria-label="Abrir player de rádio"
          className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition z-50"
          style={{ fontFamily: "'Serif', serif" }}
        >
          🎧
        </button>
      )}
    </>
  );
}
