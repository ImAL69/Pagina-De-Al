import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import PersonaMenu from "./components/PersonaMenu";
import MusicPlayer from "./components/MusicPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Página de Al | Persona Style",
  description: "Mi página personal inspirada en Persona 5 Royal y Persona 3 Reload",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-p5-white text-p5-black selection:bg-p5-red selection:text-p5-white">
        {/* Patrón de fondo sutil estilo Persona */}
        <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <PersonaMenu />
        <MusicPlayer />
        
        <main className="flex-grow relative">
          {children}
        </main>
        
        <footer className="p-8 border-t-4 border-p5-black text-center font-bold uppercase italic tracking-tighter">
          <span className="bg-p5-black text-p5-white px-4 py-2 persona-slant inline-block">
            © 2026 AL - Derechos reservados.
          </span>
        </footer>
      </body>
    </html>
  );
}
