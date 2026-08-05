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
        <nav className="p-4 border-b">Mi navbar</nav>
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
