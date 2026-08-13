"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function GeminiPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "¡Hey Joker! ¿Necesitas ayuda en el Metaverso o con tu código? ¡Pregúntame lo que quieras!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, { role: "bot", content: "¡Algo salió mal! Parece que las sombras están interfiriendo... (Error: " + data.error + ")" }]);
      } else {
        setMessages(prev => [...prev, { role: "bot", content: data.text }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", content: "¡Error de conexión! ¿Estamos fuera del alcance del Navigator?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white p-4 md:p-8 flex flex-col items-center">
      {/* Cabecera estilo P5 */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <Link href="/" className="bg-white text-black p-2 persona-slant hover:bg-p5-red hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div className="bg-p5-red px-6 py-2 persona-slant rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">AI Navigator: Gemini</h1>
        </div>
        <div className="hidden md:block">
          <Sparkles className="text-p5-red animate-pulse" />
        </div>
      </div>

      {/* Contenedor de Chat */}
      <div className="w-full max-w-4xl flex-1 bg-white/5 border-2 border-white/10 rounded-lg overflow-hidden flex flex-col shadow-[0_0_20px_rgba(230,0,18,0.2)]">
        
        {/* Mensajes */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-p5-red"
        >
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} items-end gap-2`}>
                  <div className={`p-2 rounded-full ${msg.role === "user" ? "bg-p5-red" : "bg-white text-black"}`}>
                    {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`relative p-4 ${
                    msg.role === "user" 
                      ? "bg-p5-red text-white persona-slant-reverse" 
                      : "bg-white text-black persona-slant shadow-[4px_4px_0px_0px_rgba(230,0,18,1)]"
                    }`}>
                    <p className="font-bold leading-tight">{msg.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white text-black p-4 persona-slant flex gap-2 items-center">
                <span className="w-2 h-2 bg-p5-red rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-p5-red rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-p5-red rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white/10 border-t border-white/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-black/50 border-2 border-white/20 p-3 outline-none focus:border-p5-red transition-colors font-bold"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-p5-red text-white px-6 py-3 font-black italic uppercase persona-slant hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Decoración inferior */}
      <div className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-white/30">
        System Protocol: Gemini-1.5-Flash // Phantom Assistant
      </div>
    </main>
  );
}
