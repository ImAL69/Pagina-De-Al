# Documentación del proyecto "pagina-de-al"

## 1. ¿Qué es este proyecto?

Es una aplicación web construida con **Next.js 16.3** + **React 19** + **TypeScript** + **Tailwind CSS v4**.
Usa el **App Router** (la carpeta `app/`), que es la forma moderna de organizar rutas en Next.js.

### Stack
- **Next.js 16.3.0** — framework de React (rutas, SSR, optimización de imágenes, etc.)
- **React 19.2.8** — librería para construir la UI con componentes
- **TypeScript 5** — JavaScript con tipos
- **Tailwind CSS v4** — estilos usando clases utilitarias (`flex`, `px-4`, `text-black`, etc.)
- **ESLint 9** — chequea errores/estilo de código

### Scripts (en `package.json`)
```bash
npm run dev     # arranca el servidor de desarrollo (http://localhost:3000)
npm run build   # compila la app para producción
npm run start   # arranca el build de producción
npm run lint    # revisa el código
```

---

## 2. Estructura de archivos

```
pagina-de-al/
├── app/                    ← TODO el contenido y rutas van acá
│   ├── layout.tsx          ← plantilla global (envuelve todas las páginas)
│   ├── page.tsx            ← la home (ruta "/")
│   ├── globals.css         ← estilos globales + configuración de Tailwind
│   └── favicon.ico
├── public/                 ← archivos estáticos (imágenes, svg, etc.)
│   ├── next.svg
│   └── vercel.svg
├── package.json            ← dependencias y scripts
├── tsconfig.json           ← config de TypeScript
├── next.config.ts          ← config de Next
├── postcss.config.mjs      ← config de Tailwind/PostCSS
├── eslint.config.mjs       ← config de ESLint
└── AGENTS.md / CLAUDE.md   ← instrucciones para IA (no borrar el bloque autogenerado)
```

---

## 3. ¿Dónde y cómo modifico la página?

### La página principal está en `app/page.tsx`
Ese archivo es la ruta `/` (la home). Todo lo que devuelva el `export default function Home()` es lo que se muestra al entrar a `http://localhost:3000`.

**Ejemplo mínimo** — reemplazá el contenido de `app/page.tsx` por esto:
```tsx
export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">Hola, soy Al</h1>
      <p className="mt-4 text-lg text-zinc-600">
        Esta es mi página personal.
      </p>
    </main>
  );
}
```

Guardá el archivo — con `npm run dev` corriendo, la página se recarga sola (Fast Refresh).

### Crear más páginas (rutas)
En el App Router, **cada carpeta dentro de `app/` es una ruta**, y el archivo `page.tsx` que hay dentro es lo que se renderiza.

| Carpeta                | URL                  |
|------------------------|----------------------|
| `app/page.tsx`         | `/`                  |
| `app/sobre-mi/page.tsx`| `/sobre-mi`          |
| `app/proyectos/page.tsx`| `/proyectos`        |
| `app/blog/[slug]/page.tsx` | `/blog/cualquier-cosa` (ruta dinámica) |

**Ejemplo** — crear `app/sobre-mi/page.tsx`:
```tsx
export default function SobreMi() {
  return <h1 className="p-10 text-3xl">Sobre mí</h1>;
}
```
Y ya podés visitar `http://localhost:3000/sobre-mi`.

### Layout global (`app/layout.tsx`)
Envuelve **todas** las páginas. Ahí van cosas que quieras que aparezcan siempre: navbar, footer, fuentes, `<html>` y `<body>`.

Si querés una navbar en toda la página, agregala así:
```tsx
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>
        <PersonaMenu />
        <MusicPlayer />
        {children}   {/* acá se inyecta cada página */}
        <footer className="p-4 border-t">© 2026 Al</footer>
      </body>
    </html>
  );
}
```

### Componentes reutilizables
No es obligatorio, pero se recomienda partir cosas grandes en componentes. Podés crear una carpeta `app/components/` (o `components/` en la raíz) y adentro archivos como `Boton.tsx`:

```tsx
// app/components/Boton.tsx
export function Boton({ texto }: { texto: string }) {
  return (
    <button className="px-4 py-2 bg-black text-white rounded">
      {texto}
    </button>
  );
}
```

Y usarlo en cualquier página:
```tsx
import { Boton } from "./components/Boton";

export default function Home() {
  return <Boton texto="Click acá" />;
}
```

### Imágenes
Ponelas en `public/` y referencialas desde `/nombre.png`:
```tsx
import Image from "next/image";

<Image src="/mi-foto.jpg" alt="foto" width={200} height={200} />
```

### Estilos con Tailwind
Todo se hace con clases en el atributo `className`. Ejemplos:
- `flex`, `flex-col`, `grid` — layout
- `p-4`, `px-6`, `mt-2` — padding/margin
- `text-xl`, `font-bold`, `text-red-500` — tipografía y color
- `bg-white`, `bg-zinc-900`, `dark:bg-black` — fondos (y variantes dark mode)
- `rounded`, `border`, `shadow-lg` — bordes/sombras
- `hover:bg-gray-100`, `sm:text-2xl` — estados y responsive

Referencia oficial: https://tailwindcss.com/docs

---

## 4. Mini-doc de JavaScript

JS es el lenguaje base. Cosas que vas a usar mucho:

```js
// Variables
const nombre = "Al";       // no cambia
let edad = 22;             // puede cambiar

// Funciones
function saludar(nombre) { return `Hola ${nombre}`; }
const saludar2 = (nombre) => `Hola ${nombre}`;   // arrow function

// Objetos y arrays
const persona = { nombre: "Al", edad: 22 };
const numeros = [1, 2, 3];

// Destructuring
const { nombre, edad } = persona;
const [primero, segundo] = numeros;

// Spread / rest
const copia = { ...persona, edad: 23 };
const masNumeros = [...numeros, 4, 5];

// Template strings
const msg = `Hola, soy ${nombre} y tengo ${edad}`;

// Array métodos (súper usados en React)
numeros.map(n => n * 2);          // [2, 4, 6]
numeros.filter(n => n > 1);       // [2, 3]
numeros.find(n => n === 2);       // 2

// async/await (para peticiones)
async function traerDatos() {
  const res = await fetch("/api/algo");
  const data = await res.json();
  return data;
}
```

---

## 5. Mini-doc de TypeScript

TypeScript = JavaScript con **tipos**. Te avisa errores antes de correr el código.

```ts
// Tipos básicos
let nombre: string = "Al";
let edad: number = 22;
let activo: boolean = true;
let lista: string[] = ["a", "b"];

// Objetos con tipo
type Persona = {
  nombre: string;
  edad: number;
  email?: string;   // opcional
};

const yo: Persona = { nombre: "Al", edad: 22 };

// Funciones tipadas
function sumar(a: number, b: number): number {
  return a + b;
}

// Uniones
let id: string | number = "abc";
id = 123;

// Interfaces (parecido a type)
interface Producto {
  id: number;
  nombre: string;
}

// Genéricos
function primero<T>(arr: T[]): T { return arr[0]; }
```

En React con TS, los **props** de un componente se tipan así:
```tsx
type BotonProps = {
  texto: string;
  onClick?: () => void;
};

export function Boton({ texto, onClick }: BotonProps) {
  return <button onClick={onClick}>{texto}</button>;
}
```

---

## 6. Mini-doc de React

React construye la UI con **componentes** (funciones que devuelven JSX).

### JSX
Es HTML dentro de JS. Diferencias con HTML:
- `class` → `className`
- `for` → `htmlFor`
- eventos en camelCase: `onClick`, `onChange`
- expresiones JS entre llaves: `{variable}`

```tsx
const nombre = "Al";
<h1 className="text-xl">Hola {nombre}</h1>
```

### Componentes
```tsx
function Saludo({ nombre }: { nombre: string }) {
  return <p>Hola {nombre}</p>;
}

// Usarlo
<Saludo nombre="Al" />
```

### Estado (`useState`)
Para que un componente "recuerde" valores y se re-renderice al cambiar. Requiere `"use client"` arriba del archivo (en Next App Router los componentes son de servidor por defecto).

```tsx
"use client";
import { useState } from "react";

export default function Contador() {
  const [n, setN] = useState(0);
  return (
    <button onClick={() => setN(n + 1)}>
      Clicks: {n}
    </button>
  );
}
```

### Efectos (`useEffect`)
Ejecutar código al montar o cuando cambia algo:
```tsx
"use client";
import { useEffect, useState } from "react";

export default function Reloj() {
  const [hora, setHora] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(id);   // cleanup
  }, []);
  return <p>{hora.toLocaleTimeString()}</p>;
}
```

### Listas (con `.map`)
```tsx
const items = ["uno", "dos", "tres"];
<ul>
  {items.map((item) => (
    <li key={item}>{item}</li>
  ))}
</ul>
```
**Ojo:** cada elemento de lista necesita un `key` único.

### Componentes de Servidor vs Cliente (Next App Router)
- Por defecto todo es **Server Component** (se renderiza en el servidor, no puede usar `useState`/`useEffect`).
- Agregá `"use client"` en la **primera línea** del archivo si necesitás interactividad, hooks o eventos del navegador.

---

## 7. Flujo típico para agregar contenido

1. Arrancá el server: `npm run dev`.
2. Abrí `app/page.tsx` (o creá una nueva carpeta dentro de `app/` con su `page.tsx`).
3. Escribí el JSX que quieras. Estilá con clases de Tailwind.
4. Si necesitás interactividad (click, formularios, estado), poné `"use client"` arriba y usá `useState`.
5. Si repetís bloques, extraelos a un componente en `app/components/`.
6. Imágenes → `public/`, referenciadas con `/nombre.ext`.
7. Guardá — se recarga solo.

---

## 8. Enlaces útiles

- Next.js (App Router): https://nextjs.org/docs/app
- React 19: https://react.dev/
- TypeScript handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- Tailwind v4: https://tailwindcss.com/docs

## 9. Nota importante del proyecto

Este proyecto usa **Next.js 16**, que tiene cambios respecto a versiones anteriores. Si buscás tutoriales viejos (Next 13/14/15), puede que algunas cosas no coincidan. La documentación oficial local está en `node_modules/next/dist/docs/` — es la fuente de verdad para APIs específicas de esta versión.

---

# 10. Guía práctica: construir tu página personal

La meta es una página personal rápida, clara, accesible y con una identidad visual intensa. Puedes inspirarte en el contraste, el ritmo, las transiciones y las capas de las interfaces de Persona 3 Reload o Persona 5 Royal, pero crea tu propio nombre, iconos, ilustraciones y composiciones: no copies recursos ni pantallas del juego.

## 10.1 React + TypeScript + Next.js: el mapa mental

- **React** construye la interfaz con componentes: funciones que devuelven JSX.
- **JSX** parece HTML, pero vive dentro de TypeScript. Usa `className`, llaves para valores (`{nombre}`) y componentes con mayúscula (`<Boton />`).
- **TypeScript** revisa las formas de datos y props antes de ejecutar; evita muchos errores de interfaz.
- **Next.js** usa React y convierte carpetas de `app/` en URLs. También optimiza el build, imágenes y metadatos para publicar.
- **Tailwind CSS** aplica estilos mediante clases como `p-6`, `bg-slate-950`, `hover:scale-105` o `md:grid-cols-2`.

```text
Visita a /proyectos
       ↓
app/proyectos/page.tsx  ← contenido de esa URL
       ↓
app/layout.tsx          ← marco global: html, body, fuentes, navbar
       ↓
app/_components/*       ← botones, tarjetas y menús reutilizables
       ↓
app/globals.css         ← estilos y variables globales
```

## 10.2 Cómo se relacionan los archivos y las rutas

En App Router, una carpeta define un segmento de URL, pero una ruta solo es pública si contiene `page.tsx` (o `route.ts` para una API).

```text
app/
├── layout.tsx                 → marco para todo el sitio; obligatorio
├── page.tsx                   → /
├── sobre-mi/page.tsx          → /sobre-mi
├── proyectos/page.tsx         → /proyectos
├── blog/[slug]/page.tsx       → /blog/mi-post
├── prueba/page.tsx            → /prueba
├── components/PersonaMenu.tsx → Menú circular rotatorio
├── components/MusicPlayer.tsx → Reproductor de música global
├── loading.tsx                → interfaz de carga
├── not-found.tsx              → página 404
└── error.tsx                  → interfaz ante errores
```

Por ejemplo, `app/prueba.tsx` no crea `/prueba`. Para tener esa URL usa `app/prueba/page.tsx`. Guarda piezas no navegables en `_components/` o fuera de `app/`.

### Archivos especiales

- `page.tsx`: contenido de una URL; debe tener un `export default`.
- `layout.tsx`: envuelve páginas hijas. El de la raíz debe contener `<html>` y `<body>`.
- `loading.tsx`: skeleton o feedback mientras una ruta obtiene datos.
- `error.tsx`: captura errores de una sección; comienza con `"use client"`.
- `not-found.tsx`: página no encontrada.
- `route.ts`: endpoint HTTP; `app/api/contacto/route.ts` crea `/api/contacto`.
- `opengraph-image.png` o `.tsx`: imagen para compartir el sitio en redes.

Un layout dentro de una carpeta envuelve esa ruta y sus descendientes:

```tsx
// app/proyectos/layout.tsx
export default function ProyectosLayout({ children }: LayoutProps<"/proyectos">) {
  return <section className="min-h-screen">{children}</section>;
}
```

## 10.3 Crear páginas y navegar entre ellas

```tsx
// app/proyectos/page.tsx
import Link from "next/link";

export default function ProyectosPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-p5-red">Archivo 01</p>
      <h1 className="mt-2 text-5xl font-black italic uppercase persona-text-shadow">Proyectos</h1>
      <p className="mt-4 max-w-2xl text-zinc-400">Experimentos y aplicaciones que estoy aprendiendo a construir.</p>
      <Link href="/" className="mt-8 inline-flex bg-p5-red px-5 py-3 font-bold text-p5-white transition hover:-translate-y-1 hover:bg-p5-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-p5-red persona-slant">
        Volver al inicio
      </Link>
    </main>
  );
}
```

Para ir a una página interna usa `Link` de `next/link`; Next puede precargar la ruta y navegar sin una recarga completa. Un `href` pertenece a `<Link>` o `<a>`, nunca a `<p>`, `<div>` o `<button>`.

```tsx
// Enlace interno
<Link href="/proyectos">Ver proyectos</Link>

// Enlace externo
<a href="https://github.com/tu-usuario" target="_blank" rel="noreferrer">GitHub</a>
```

## 10.4 Componentes y props tipados

Los **props** son datos que un componente recibe. Decláralos con `type` cuando la pieza sea reutilizable.

```tsx
type TarjetaProyectoProps = {
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  href: string;
  destacado?: boolean;
};

export function TarjetaProyecto({ titulo, descripcion, tecnologias, href, destacado = false }: TarjetaProyectoProps) {
  return (
    <article className={`border-4 p-5 ${destacado ? "border-p5-red shadow-[8px_8px_0px_0px_rgba(230,0,18,1)]" : "border-p5-black shadow-[8px_8px_0px_0px_rgba(10,10,10,1)]"} bg-p5-white`}>
      <h2 className="text-2xl font-black italic uppercase">{titulo}</h2>
      <p className="mt-2 text-zinc-800">{descripcion}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {tecnologias.map((tecnologia) => <li key={tecnologia} className="bg-p5-black px-2 py-1 text-xs font-bold text-p5-white persona-slant">{tecnologia}</li>)}
      </ul>
      <a href={href} className="mt-5 inline-block font-black uppercase italic text-p5-red underline">Abrir proyecto</a>
    </article>
  );
}
```

```tsx
<TarjetaProyecto
  titulo="Mi portafolio"
  descripcion="Una web personal creada con Next.js."
  tecnologias={["React", "TypeScript", "Tailwind"]}
  href="https://github.com/tu-usuario/tu-repo"
  destacado
/>
```

Reglas de TypeScript:

- Evita `any`; si aún no conoces un dato, usa `unknown` y compruébalo.
- Marca valores opcionales con `?` y asigna valores por defecto cuando puedas.
- Las listas necesitan una `key` estable y única. No uses el índice si pueden reordenarse.
- No repitas tipos enormes: crea un `type Proyecto`, `type Enlace` o `type Estado`.

## 10.5 Botones, estado e interactividad

Un enlace cambia de URL; un botón realiza una acción. Elegir el elemento correcto mejora la accesibilidad.

```tsx
<Link href="/proyectos">Navegar</Link>
<button type="button" onClick={abrirMenu}>Abrir menú</button>
<button type="submit">Enviar formulario</button>
```

Los componentes de `app/` son de **servidor por defecto**. Solo agrega `"use client"` si necesitas eventos, `useState`, `useEffect`, `localStorage` o `window`. Ponlo en el componente más pequeño posible, no en todo el layout.

```tsx
// app/_components/ContadorApoyos.tsx
"use client";

import { useState } from "react";

export function ContadorApoyos() {
  const [apoyos, setApoyos] = useState(0);

  return (
    <section>
      <p>{apoyos} personas apoyaron este proyecto.</p>
      <button type="button" onClick={() => setApoyos((anterior) => anterior + 1)} className="rounded bg-fuchsia-500 px-4 py-2 font-bold text-white">
        Me gusta
      </button>
    </section>
  );
}
```

Nunca modifiques estado directamente (`apoyos++`); usa el setter. La forma `setApoyos(anterior => anterior + 1)` es segura si React agrupa varias actualizaciones.

## 10.6 El Menú Circular (PersonaMenu)

Para la navegación principal, hemos implementado un menú circular rotatorio inspirado en *Persona 5 Royal*.

```tsx
// app/components/PersonaMenu.tsx
const menuItems = [
  { href: "/", icon: <Home />, label: "Inicio", color: "bg-p-red" },
  { href: "/sobre-mi", icon: <User />, label: "Sobre mí", color: "bg-p-blue" },
  { href: "/proyectos", icon: <Briefcase />, label: "Proyectos", color: "bg-p-yellow" },
];

export function PersonaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // Lógica de animaciones con framer-motion y rotación orbital
  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <button onClick={() => setIsOpen(!isOpen)}>MENÚ</button>
      {/* Overlay de blur y opciones rotatorias */}
    </div>
  );
}
```

Este menú se encuentra en `app/layout.tsx` para que esté disponible en todo el sitio. Gestiona el desenfoque del fondo (`backdrop-blur`) y una animación de rotación infinita para las opciones.

## 10.7 Formularios tipados y seguros

```tsx
"use client";
import { FormEvent, useState } from "react";

export function FormularioContacto() {
  const [estado, setEstado] = useState<"idle" | "enviando" | "enviado" | "error">("idle");

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEstado("enviando");
    // Después: fetch("/api/contacto", { method: "POST", body: ... })
    setEstado("enviado");
  }

  return (
    <form onSubmit={manejarEnvio} className="grid max-w-xl gap-4">
      <label>Nombre<input name="nombre" required className="mt-1 block w-full border-2 p-3" /></label>
      <label>Mensaje<textarea name="mensaje" required rows={5} className="mt-1 block w-full border-2 p-3" /></label>
      <button type="submit" disabled={estado === "enviando"}>Enviar mensaje</button>
      <p aria-live="polite">{estado === "enviado" ? "Mensaje preparado." : ""}</p>
    </form>
  );
}
```

Para enviar correos de verdad necesitas un endpoint (`route.ts`), Server Action o proveedor de correo. Nunca pongas una clave secreta en un archivo con `"use client"`.

## 10.8 Datos y rutas dinámicas

Guarda los proyectos como datos y genera tarjetas con `.map()`.

```tsx
type Proyecto = { slug: string; titulo: string; resumen: string; tecnologias: string[] };

export const proyectos: Proyecto[] = [
  { slug: "portafolio", titulo: "Portafolio personal", resumen: "Mi sitio con Next.js.", tecnologias: ["Next.js", "TypeScript"] },
];
```

Una ruta dinámica permite una plantilla para muchas URLs. En Next 16 los `params` son asíncronos:

```tsx
// app/proyectos/[slug]/page.tsx
import { notFound } from "next/navigation";
import { proyectos } from "@/app/_data/proyectos";

export default async function ProyectoPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const proyecto = proyectos.find((item) => item.slug === slug);
  if (!proyecto) notFound();
  return <h1>{proyecto.titulo}</h1>;
}
```

`PageProps` y `LayoutProps` son tipos globales que Next genera al ejecutar `next dev` o `next build`.

## 10.9 Imágenes, estilos y la sensación visual

- Guarda recursos públicos en `public/` y úsalos como `src="/mi-foto.jpg"`.
- Para imágenes de contenido usa `next/image`, siempre con `alt` descriptivo; si es decorativa, usa `alt=""`.
- No importes una imagen que no se renderiza: ESLint la marcará como sin usar.
- Usa animaciones breves, con feedback y respeta `prefers-reduced-motion`.

```tsx
import Image from "next/image";
<Image src="/proyectos/portafolio.jpg" alt="Captura de mi portafolio" width={1200} height={675} className="h-auto w-full" />
```

Sistema visual oficial Persona en `app/globals.css`:

```css
:root {
  --p5-red: #E60012;
  --p5-black: #0A0A0A;
  --p3-cobalt: #0052CC;
  --p1-purple: #2B1055;
}
body { background: var(--p5-white); color: var(--p5-black); }
```
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; }
}
```

Ideas que dan energía sin perder usabilidad: títulos enormes, etiquetas cortas en mayúscula, bordes gruesos, bloques diagonales como decoración, contraste alto, transiciones de 150–250 ms y mensajes de estado claros. No uses color como única señal y mantén el foco visible para teclado.

## 10.10 Arquitectura actual del proyecto

```text
app/
├── components/    # PersonaMenu, MusicPlayer, ProjectsNavbar
├── sobre-mi/      # Página biográfica
├── proyectos/     # Dashboard temático de proyectos
├── blog/[slug]/   # Rutas dinámicas de artículos
├── prueba/        # Página de tests
├── globals.css    # Paletas Persona 5, 3 y 1
├── layout.tsx     # RootLayout con Menú y Música
└── page.tsx       # Landing page (P5 Style)
public/            # Activos estáticos
```

Empieza simple y extrae componentes cuando una parte se repita, crezca o tenga una responsabilidad clara.

## 10.11 SEO, metadatos y secretos

Personaliza el idioma y los metadatos antes de publicar:

```tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { default: "Al — Portafolio", template: "%s | Al" },
  description: "Portafolio personal de Al: proyectos, aprendizaje y contacto.",
};
```

En `app/layout.tsx`, usa `<html lang="es">`. Después añade una imagen Open Graph propia.

Guarda claves en `.env.local`, que no debe subirse a Git:

```bash
EMAIL_API_KEY=secreto
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Solo las variables que empiezan con `NEXT_PUBLIC_` llegan al navegador. Contraseñas, tokens de correo y claves privadas nunca llevan ese prefijo.

## 10.12 Flujo diario y publicación en Vercel

```bash
npm run dev        # desarrollo
npm run lint       # calidad
npx tsc --noEmit   # tipos
npm run build      # build de producción
npm run start      # probar el build
npm audit          # dependencias
```

Para Vercel:

1. Haz que lint, TypeScript y build pasen localmente.
2. Sube el proyecto a GitHub sin `.env.local`.
3. Importa el repositorio en Vercel; detectará Next.js.
4. Copia las variables de entorno necesarias en la configuración de Vercel.
5. Despliega y prueba la URL en móvil, escritorio y con teclado.
6. Conecta un dominio cuando estés listo; los push a la rama principal publicarán producción y las ramas pueden tener previews.

Lista antes de publicar:

- [ ] Título, descripción, idioma y favicon son tuyos.
- [ ] Enlaces internos y externos funcionan.
- [ ] Diseño usable a 320 px y en escritorio.
- [ ] Teclado, foco visible, contraste y textos alternativos revisados.
- [ ] No hay secretos en Git ni en componentes cliente.
- [ ] `npm run lint`, `npx tsc --noEmit` y `npm run build` pasan.

## 10.13 Orden para construir sin perderte

1. Corrige rutas reales, `Link`, idioma y metadatos.
2. Define la paleta, tipografía y layout global.
3. Crea Inicio, Sobre mí, Proyectos y Contacto.
4. Construye tarjetas con datos tipados y una página dinámica por proyecto.
5. Añade menú responsive, estados hover/focus y animaciones pequeñas.
6. Conecta un formulario seguro, SEO e imagen para compartir.
7. Publica una primera versión y mejora con lo que observes.

La mejor primera versión no es la que tiene más efectos: es la que explica quién eres, muestra tu trabajo, permite contactarte y se siente intencional en cualquier pantalla.

---

## 11. Guía de Cambios Recientes y Conceptos Clave

En esta sección documentamos los cambios realizados para convertir la página de una sola página a una aplicación multi-ruta y explicamos los conceptos técnicos fundamentales que se aplicaron.

### 11.1 Corrección del error "link is a void element tag"

**El problema:**
Aparecía un error de ejecución indicando que `link` no puede tener hijos (`children`). Esto ocurría porque se estaba usando la etiqueta HTML estándar `<link>` para la navegación.

**La solución:**
En Next.js, para navegar entre rutas internas sin recargar la página, debemos usar el componente `Link` (con L mayúscula) de la librería `next/link`.
- **Mal:** `<link href="/prueba">Ir a prueba</link>`
- **Bien:** `import Link from "next/link";` y luego `<Link href="/prueba">Ir a prueba</Link>`

### 11.2 Entendiendo la prop `children`

**¿Qué es?**
`children` es una palabra reservada en React. Imagina que un componente es una caja; `children` es todo lo que metes dentro de esa caja.

**En el archivo `app/layout.tsx`:**
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main> {/* Aquí se "inyecta" el contenido de cada página */}
        <Footer />
      </body>
    </html>
  );
}
```
Gracias a esto, no tienes que repetir el `Navbar` o el `Footer` en cada archivo. El Layout define el "marco" y Next.js rellena el centro con el `children` correspondiente a la ruta donde estés.

### 11.3 Organización de Rutas (App Router)

Next.js usa las carpetas para definir las URLs. Para que una ruta exista, debe tener un archivo llamado exactamente `page.tsx`.

**Cambios realizados:**
1. **Ruta `/prueba`**: Movimos el archivo de `app/prueba.tsx` a `app/prueba/page.tsx`.
2. **Nuevas rutas**: Creamos las carpetas y archivos para `/sobre-mi`, `/proyectos` y la ruta dinámica `/blog/[slug]`.

**Estructura actual:**
- `app/page.tsx` -> `https://tu-sitio.com/`
- `app/sobre-mi/page.tsx` -> `https://tu-sitio.com/sobre-mi`
- `app/proyectos/page.tsx` -> `https://tu-sitio.com/proyectos`
- `app/blog/[slug]/page.tsx` -> `https://tu-sitio.com/blog/cualquier-cosa`

### 11.4 Cómo replicar esto (Crear una nueva página)

Si quieres añadir una página de "Contacto", sigue estos pasos:

1. **Crear la carpeta**: Crea `app/contacto/`.
2. **Crear el archivo**: Crea `app/contacto/page.tsx`.
3. **Añadir el código**:
   ```tsx
   export default function ContactoPage() {
     return (
       <main className="p-10">
         <h1 className="text-4xl font-bold">Contacto</h1>
         <p>Escríbeme a: correo@ejemplo.com</p>
       </main>
     );
   }
   ```
4. **Añadir al menú**: Abre `app/components/Navbar.tsx` y añade el nuevo enlace:
   ```tsx
   <Link href="/contacto" className="...">Contacto</Link>
   ```

### 11.5 Componentes Reutilizables

Hemos creado una carpeta `app/components/`. Aquí es donde debes poner elementos que se repiten en varias páginas, como el `Navbar.tsx`. Esto mantiene tu código limpio y fácil de mantener.

---

## 12. Estilo Visual: Inspiración en Persona (P5R / P3R)

Para darle a tu página una identidad única, hemos implementado un estilo basado en los videojuegos *Persona 3 Reload* y *Persona 5 Royal*.

### 12.1 Conceptos de Diseño Persona

1.  **Paleta de Colores de Alto Contraste**:
    - **Rojo (#d31a1a)**: Energía, rebeldía (P5).
    - **Azul (#0095ff)**: Calma, introspección (P3R).
    - **Negro y Blanco**: Base sólida para que los colores resalten.
    - **Amarillo (#fff200)**: Acentos y llamadas a la acción.

2.  **Formas Angulares (Slants)**:
    - Evita las líneas rectas horizontales perfectas. Usa `skew` y `clip-path` para crear bloques inclinados.
    - En CSS: `transform: skewX(-5deg);` o `clip-path: polygon(...)`.

3.  **Tipografía Audaz**:
    - Usa fuentes gruesas, itálicas y en mayúsculas para los títulos.
    - Añade sombras de texto sólidas (sin difuminar) para un look "cómic".

4.  **Animaciones Dinámicas**:
    - Las transiciones no deben ser aburridas. Usa efectos de "spring" (muelle) y rotaciones.

### 12.2 Librerías Recomendadas

Para lograr este estilo, hemos instalado:
- **`framer-motion`**: La mejor librería para animaciones en React. Permite crear movimientos complejos con muy poco código.
- **`lucide-react`**: Una colección de iconos minimalistas que encajan bien con el diseño.

### 12.3 El Menú Circular Rotatorio

Hemos implementado un componente `PersonaMenu.tsx` que utiliza:
- **`useState`**: Para controlar si el menú está abierto o cerrado.
- **`AnimatePresence`**: De Framer Motion, para animar la entrada y salida de los botones del menú.
- **Cálculos Trigonométricos**: Para posicionar los botones en un arco circular basándose en el índice de cada elemento.

**Cómo añadir más opciones al menú:**
Edita la constante `menuItems` en `app/components/PersonaMenu.tsx`:
```tsx
const menuItems = [
  { href: "/", icon: <Home />, label: "Inicio", color: "bg-p-red" },
  // Añade aquí tu nueva opción
  { href: "/contacto", icon: <Mail />, label: "Contacto", color: "bg-p-blue" },
];
```

### 12.4 Recomendaciones de Diseño Adicionales

- **Menos es más**: Aunque el estilo Persona es "ruidoso", mantén el contenido legible. Usa los efectos visuales como marcos o acentos, no como el centro de atención.
- **Micro-interacciones**: Haz que cada botón reaccione al pasar el ratón (`whileHover` en Framer Motion). Un pequeño giro o cambio de escala marca la diferencia.
- **Capas**: Juega con el `z-index`. Pon elementos decorativos detrás del texto con opacidad baja para dar profundidad.

### 12.5 Efectos de Menú Avanzados (Blur, Rotación y Centrado)

Hemos llevado el menú al siguiente nivel para que se sienta como una verdadera interfaz de *Persona 5 Royal*.

#### 12.5.1 Pantalla Difuminada (Background Blur)
Cuando el menú se abre, el resto de la página se oscurece y se difumina.
- **Cómo se hizo**: Añadimos un `motion.div` con las clases `bg-black/40` y `backdrop-blur-md`. Esto crea una capa que desenfoca lo que hay detrás, centrando la atención del usuario en el menú.

#### 12.5.2 Rotación Constante (Orbit)
Las opciones no se quedan quietas; están orbitando el centro de la pantalla constantemente.
- **Cómo se hizo**: El contenedor de los botones tiene una animación infinita:
  ```tsx
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
  ```
- **Truco de legibilidad**: Para que los iconos no giren y se queden de cabeza, aplicamos una **contra-rotación** al icono mismo (`animate={{ rotate: -360 }}`). Así, mientras el círculo gira a la derecha, el icono gira a la izquierda a la misma velocidad, manteniéndose siempre derecho.

#### 12.5.3 Posicionamiento Centrado
El menú ahora aparece en el centro exacto de la pantalla (Viewport), no en una esquina.
- **Cómo se hizo**: Utilizamos `fixed inset-0 flex items-center justify-center`. Esto garantiza que, sin importar el tamaño de la pantalla, el centro del menú sea el centro de la visión del usuario.

#### 12.5.4 Animación de Click (Tap)
Al presionar una opción, esta reacciona físicamente antes de navegar.
- **Cómo se hizo**: Usamos la propiedad `whileTap` de Framer Motion:
  ```tsx
  whileTap={{ scale: 0.8, rotate: -20 }}
  ```
  Esto hace que el botón se encoja y gire un poco al ser tocado, dando un feedback táctil satisfactorio.

### 12.6 Cómo replicar estos efectos en otros componentes

Si quieres aplicar estos efectos (como el blur o la rotación) a otros elementos de tu página, busca los comentarios en el archivo `app/components/PersonaMenu.tsx`. He dejado explicaciones paso a paso dentro del código para que sepas qué línea hace cada cosa.

---

## 13. Nuevas Funcionalidades: Proyectos Temáticos y Música

Hemos expandido la página con sistemas visuales específicos para cada tipo de contenido y una experiencia sonora global.

### 13.1 Paletas de Colores Específicas (Persona Official Hex)

Hemos actualizado el proyecto con los códigos hexadecimales exactos de las interfaces de Persona para una fidelidad total:

1.  **Persona 5 (Estética General y Base)**:
    - **Rojo Carmesí (P5 Red)**: `#E60012` — El rojo saturado que domina los menús.
    - **Negro Azabache**: `#0A0A0A` — Fondo mate profundo (estilo fanzine/cómic).
    - **Blanco de Contraste**: `#FFFFFF` — Tipografía recortada y viñetas.

2.  **Persona 3 / Persona 3 Reload (Sección Arte)**:
    - **Azul Cobalto**: `#0052CC` — Azul vibrante del menú de estado.
    - **Azul Dark Hour**: `#0B132B` — Tono marino oscuro de la hora escondida.
    - **Cian Neón / Cristal**: `#00C3FF` — Destellos dinámicos de P3 Reload.

3.  **Persona 1 (Sección Juegos)**:
    - **Púrpura Místico**: `#2B1055` — Violeta profundo de la era PS1.
    - **Verde Azulado (Teal PS1)**: `#1E5A61` — Tono apagado de marcos noventeros.
    - **Gris Hueso**: `#D3D3D3` — Fuentes y ventanas estilo pantalla CRT.

4.  **Otros Estilos Implementados**:
    - **Software (Persona 6 Concept)**: Verde Hacker (`#00ff41`) con estética de terminal.
    - **Animaciones (Anime/DBZ)**: Naranja Energía (`#ff6b00`) y Azul Saiyan (`#0055ff`).

### 13.2 Barra de Navegación de Proyectos (`ProjectsNavbar`)

En la ruta `/proyectos`, ahora dispones de una barra de navegación independiente que permite alternar entre las secciones mencionadas.

- **Diseño**: Basado en el estilo "Comic" de Persona 5, con cajas inclinadas que se desplazan desde el lateral.
- **Toggle**: Un botón en el lateral permite ocultar o mostrar el menú de secciones.
- **Animaciones**: Utiliza `skew` y `x-translation` en Framer Motion para entrar con un ángulo agresivo, replicando las transiciones de los menús de P5R.

### 13.3 Reproductor de Música Global (`MusicPlayer`)

Ubicado en la esquina inferior izquierda, este componente permite añadir una atmósfera sonora a toda la web.

- **Estado de Reproducción**: Controla visualmente si la música está activa con animaciones de ondas sonoras y cambios de iconos (`Volume2` / `VolumeX`).
- **Estética Persona**: El botón tiene un fondo rojo que se desplaza infinitamente cuando la música está activa, inspirado en la barra de "Now Playing" de los juegos.
- **Implementación**: Se integró en `app/layout.tsx` para que la música no se corte al navegar entre diferentes páginas.

### 13.4 Cómo agregar tu propia música

Para que el reproductor funcione con sonido real:
1. Pon tu archivo de audio (ej: `musica.mp3`) en la carpeta `public/`.
2. En `app/components/MusicPlayer.tsx`, añade la lógica de audio de HTML5:
   ```tsx
   const [audio] = useState(new Audio("/musica.mp3"));
   // ... dentro de toggleMusic:
   isPlaying ? audio.pause() : audio.play();
   ```
