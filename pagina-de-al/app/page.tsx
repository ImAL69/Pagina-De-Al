import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 -left-20 w-64 h-64 bg-p-red persona-slant -z-10 opacity-80 rotate-12"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-p-blue persona-slant -z-10 opacity-60 -rotate-6"></div>

      <div className="relative">
        <h1 className="text-8xl md:text-9xl font-black uppercase italic tracking-tighter leading-none text-white persona-text-shadow">
          AL
        </h1>
        <div className="bg-black text-white px-4 py-2 mt-2 persona-slant inline-block font-bold text-xl md:text-3xl uppercase">
          Full Stack Developer
        </div>
      </div>

      <div className="mt-16 max-w-2xl text-center">
        <p className="text-2xl md:text-3xl font-bold uppercase italic tracking-tight bg-white border-4 text-black border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] persona-slant">
          BIENVENIDO A MI <span className="text-p-red underline decoration-4">REALIDAD</span>. 
          EXPLORA MIS PROYECTOS Y DESCUBRE MI MUNDO.
        </p>
      </div>

      <div className="mt-12 flex gap-6">
        <div className="group relative">
          <div className="absolute inset-0 bg-p-yellow border-2 border-black persona-slant translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
          <button className="relative bg-white border-2 text-black px-8 py-3 font-black uppercase italic persona-slant hover:-translate-x-1 hover:-translate-y-1 transition-transform">
           <Link href="/proyectos">Ver Proyectos</Link>
          </button>
        </div>
      </div>
    </div>
  );
}