import { use } from "react";

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">Post: {slug}</h1>
      <p className="mt-4 text-lg text-zinc-600">
        Estás leyendo el post con el identificador: {slug}
      </p>
    </main>
  );
}
