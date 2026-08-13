"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectsNavbar from "../components/ProjectsNavbar";

export default function Proyectos() {
  const [activeSection, setActiveSection] = useState("software");

  const renderSection = () => {
    switch (activeSection) {
      case "software":
        return (
          <motion.div
            key="software"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-h-screen bg-p5-black text-h-green p-10 font-mono"
          >
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-8 border-b-4 border-h-green inline-block">
              {">"} Software_Dev
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="border-2 border-h-green p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-h-green opacity-0 group-hover:opacity-10 transition-opacity" />
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-widest">[ Sistema_0{i} ]</h3>
                  <p className="opacity-80">Desarrollo de herramientas futuristas con esencia Persona 6. Protocolos de seguridad y arquitecturas modulares.</p>
                  <div className="mt-4 flex gap-2">
                    <span className="bg-h-green text-black px-2 py-1 text-xs font-bold">NEXT.JS</span>
                    <span className="bg-h-green text-black px-2 py-1 text-xs font-bold">TYPESCRIPT</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case "juegos":
        return (
          <motion.div
            key="juegos"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen bg-p1-purple text-p1-bone p-10"
          >
            <h2 className="text-7xl font-black italic uppercase persona-text-shadow mb-12 text-p1-bone">
              Game World
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-p1-bone text-p5-black p-4 border-4 border-p1-teal shadow-[8px_8px_0px_0px_rgba(30,90,97,1)] -rotate-2 hover:rotate-0 transition-transform">
                  <div className="h-40 bg-p1-teal/20 mb-4 border-2 border-p1-teal" />
                  <h3 className="text-xl font-black italic">PROYECTO P1_{i}</h3>
                  <p className="text-sm mt-2 font-bold uppercase opacity-80">Estética retro-futurista inspirada en el primer Persona.</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case "animaciones":
        return (
          <motion.div
            key="animaciones"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-dbz-orange p-10 relative overflow-hidden"
          >
            {/* Rayos de energía decorativos */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <h2 className="text-8xl font-black text-white italic uppercase drop-shadow-[0_5px_0_rgba(0,85,255,1)] mb-10 relative">
              ANIME_LOG
            </h2>
            <div className="flex flex-col gap-6 relative">
              <div className="bg-dbz-blue text-white p-8 border-t-8 border-white persona-slant">
                <h3 className="text-4xl font-black italic">SAIYAN MOTION</h3>
                <p className="mt-2 text-xl font-bold">Animaciones fluidas y efectos visuales de alto impacto energético.</p>
              </div>
              <div className="bg-white text-dbz-orange p-8 border-b-8 border-dbz-blue self-end w-2/3 persona-slant">
                <h3 className="text-4xl font-black italic">DRAGON FX</h3>
                <p className="mt-2 text-xl font-bold">Composición de escenas y efectos de partículas dinámicas.</p>
              </div>
            </div>
          </motion.div>
        );
      case "arte":
        return (
          <motion.div
            key="arte"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-p3-dark text-p3-neon p-10 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-6xl font-thin italic uppercase tracking-[0.2em] mb-4 opacity-70 text-p3-neon">
              Melancolía
            </h2>
            <p className="text-xl max-w-xl italic border-l-4 border-p3-cobalt pl-6 py-4">
              "El tiempo fluye, pero los fragmentos de los recuerdos permanecen en el azul profundo de la consciencia."
            </p>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-p3-neon/10 border border-p3-neon/20 backdrop-blur-sm hover:bg-p3-neon/20 transition-colors" />
              ))}
            </div>
            <div className="mt-8 text-sm uppercase tracking-widest opacity-50 text-p3-cobalt">Inspirado en Persona 3 Reload</div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="relative overflow-hidden">
      <ProjectsNavbar onSelect={setActiveSection} />
      
      <AnimatePresence mode="wait">
        {renderSection()}
      </AnimatePresence>
    </main>
  );
}
