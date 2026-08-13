"use client";

import { useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * MusicPlayer Component
 * Un botón toggle en la parte inferior izquierda para controlar la música.
 * Estilo inspirado en Persona 5 (colores negro y rojo, inclinaciones).
 */
export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Nota: Aquí se integraría la lógica real de audio (new Audio(...).play())
    console.log(isPlaying ? "Música pausada" : "Música reproduciéndose");
  };

  return (
    <div className="fixed bottom-10 left-10 z-[100]">
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        className="relative group flex items-center gap-3 bg-p5-black text-p5-white p-4 border-2 border-p5-white shadow-[4px_4px_0px_0px_rgba(230,0,18,1)] persona-slant overflow-hidden"
      >
        {/* Fondo animado cuando suena */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 bg-p-red opacity-30 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex items-center gap-3">
          {isPlaying ? <Volume2 size={24} className="text-p-yellow" /> : <VolumeX size={24} />}
          <span className="font-black uppercase italic text-xs tracking-tighter">
            {isPlaying ? "NOW PLAYING: LAST SURPRISE" : "MUSIC OFF"}
          </span>
          <Music size={20} className={isPlaying ? "animate-bounce" : ""} />
        </div>
      </motion.button>
      
      {/* Indicador visual de onda sonora simple */}
      {isPlaying && (
        <div className="flex gap-1 mt-2 ml-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ height: [4, 16, 4] }}
              transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
              className="w-1 bg-p5-red"
            />
          ))}
        </div>
      )}
    </div>
  );
}
