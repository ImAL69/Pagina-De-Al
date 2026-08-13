import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "La clave de API de Gemini no está configurada." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Añadimos un contexto de sistema para que responda con estilo Persona si es posible
    const result = await model.generateContent([
      "Eres Morgana de Persona 5. Eres un gato (aunque no te guste admitirlo) y un mentor para los Phantom Thieves. Responde de forma útil pero con tu personalidad característica: valiente, un poco presumida y protectora. Usa términos como 'Joker', 'Metaverso' o 'Phantom Thieves' si encajan en el contexto, pero prioriza ayudar al usuario.",
      prompt
    ]);
    
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Error en Gemini API:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud con Gemini." },
      { status: 500 }
    );
  }
}
