"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Gamepad2, Film, Palette, ChevronRight, ChevronLeft } from "lucide-react";

const projectTypes = [
  { id: "software", label: "Software", icon: <Code />, color: "bg-h-green", textColor: "text-p5-black" },
  { id: "juegos", label: "Videojuegos", icon: <Gamepad2 />, color: "bg-p1-purple", textColor: "text-p1-bone" },
  { id: "animaciones", label: "Animaciones", icon: <Film />, color: "bg-dbz-orange", textColor: "text-p5-black" },
  { id: "arte", label: "Arte", icon: <Palette />, color: "bg-p3-dark", textColor: "text-p3-neon" },
];

export default function ProjectsNavbar({ onSelect }: { onSelect: (id: string) => void }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed top-24 right-0 z-[60] flex items-start pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 300, skewX: 20 }}
            animate={{ x: 0, skewX: -10 }}
            exit={{ x: 300, skewX: 20 }}
            className="flex flex-col gap-2 p-4 pointer-events-auto"
          >
            {projectTypes.map((type, idx) => (
              <motion.button
                key={type.id}
                whileHover={{ x: -20, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(type.id)}
                className={`flex items-center justify-between w-64 p-3 border-4 border-p5-black shadow-[6px_6px_0px_0px_rgba(10,10,10,1)] ${type.color} ${type.textColor} transition-transform`}
              >
                <div className="flex items-center gap-3 font-black uppercase italic">
                  {type.icon}
                  <span>{type.label}</span>
                </div>
                <div className="bg-p5-black text-p5-white p-1">
                  <ChevronRight size={16} />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto mt-4 mr-2 bg-p5-black text-p5-white p-2 border-2 border-p5-white shadow-[4px_4px_0px_0px_rgba(230,0,18,1)] persona-slant active:scale-90 transition-transform"
      >
        {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>
    </div>
  );
}
