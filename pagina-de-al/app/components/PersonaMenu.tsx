"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Home, 
  User, 
  Briefcase, 
  Settings, 
  Menu, 
  X,
  FileText,
  Sparkles
} from "lucide-react";

/**
 * Definición de los elementos del menú.
 * Cada objeto contiene la ruta, el icono, la etiqueta y el color de fondo (clases de Tailwind).
 */
const menuItems = [
  { href: "/", icon: <Home size={24} />, label: "Inicio", color: "bg-p-red" },
  { href: "/sobre-mi", icon: <User size={24} />, label: "Sobre mí", color: "bg-p-blue" },
  { href: "/proyectos", icon: <Briefcase size={24} />, label: "Proyectos", color: "bg-p-yellow" },
  { href: "/ia", icon: <Sparkles size={24} />, label: "Gemini", color: "bg-p5-red" },
  { href: "/prueba", icon: <Settings size={24} />, label: "Prueba", color: "bg-zinc-800" },
  { href: "/blog/hola-mundo", icon: <FileText size={24} />, label: "Blog", color: "bg-p-black" },
];

export default function PersonaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 
        BOTÓN DE ACTIVACIÓN
        Se mantiene fijo en la esquina inferior derecha.
        Z-index alto para estar por encima de todo.
      */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <motion.button
          onClick={toggleMenu}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="relative z-50 flex h-20 w-20 items-center justify-center border-4 border-p5-black bg-p5-white text-p5-black shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] transition-transform active:scale-95"
          animate={{ rotate: isOpen ? 135 : 0 }}
          whileHover={{ scale: 1.1, rotate: isOpen ? 145 : 10 }}
        >
          {isOpen ? <X size={40} /> : <Menu size={40} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 
              1. FONDO DIFUMINADO (BLUR)
              Crea ese efecto de "pausa" en el juego donde el fondo se vuelve borroso.
            */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-md"
            />

            {/* 
              2. CONTENEDOR DEL MENÚ CENTRADO
              Usa flexbox para centrar el círculo de opciones en la pantalla.
            */}
            <div className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                className="relative h-[500px] w-[500px] flex items-center justify-center"
              >
                {/* 
                  3. ROTACIÓN CONSTANTE
                  Este div gira 360 grados infinitamente, arrastrando a los hijos.
                */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                  className="relative w-full h-full flex items-center justify-center pointer-events-auto"
                >
                  {menuItems.map((item, index) => {
                    // Cálculo de posición circular
                    const angle = (index * (360 / menuItems.length)) - 90;
                    const radius = 180; // Distancia desde el centro
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);

                    return (
                      <motion.div
                        key={item.href}
                        className="absolute"
                        initial={{ x: 0, y: 0 }}
                        animate={{ x, y }}
                        whileHover={{ scale: 1.2 }}
                      >
                        {/* 
                          4. ANIMACIÓN DE CLICK (WHILETAP)
                          Efecto visual cuando el usuario selecciona una opción.
                        */}
                        <motion.div
                          whileTap={{ scale: 0.8, rotate: -20 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`group relative flex h-24 w-24 items-center justify-center rounded-none border-4 border-p5-black text-p5-white shadow-[6px_6px_0px_0px_rgba(10,10,10,1)] ${item.color} transition-transform hover:-translate-x-1 hover:-translate-y-1`}
                            style={{ transform: "rotate(-5deg)" }}
                          >
                            {/* 
                              CONTRA-ROTACIÓN
                              Giramos el icono en sentido opuesto a la rotación del padre 
                              para que siempre se mantenga vertical y sea legible.
                            */}
                            <motion.span 
                              animate={{ rotate: -360 }}
                              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                              className="flex items-center justify-center"
                              style={{ transform: "rotate(5deg)" }}
                            >
                              {item.icon}
                            </motion.span>
                            
                            {/* Etiqueta flotante con estilo Persona */}
                            <span className="absolute -bottom-12 whitespace-nowrap bg-p5-black px-3 py-1 text-sm font-bold uppercase italic text-p5-white opacity-0 transition-opacity group-hover:opacity-100 shadow-[4px_4px_0px_0px_rgba(230,0,18,1)]">
                              {item.label}
                            </span>
                          </Link>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
