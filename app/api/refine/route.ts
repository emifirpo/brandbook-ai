import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { REFINE_SECTION_PROMPT } from "@/lib/systemPrompt";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { section, currentContent, feedback, brandbook } = await req.json();

    if (!section || !feedback) {
      return NextResponse.json(
        { success: false, error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: REFINE_SECTION_PROMPT(section, currentContent, feedback, brandbook),
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();

    let refined: unknown;
    try {
      refined = JSON.parse(cleaned);
    } catch {
      // Si no es JSON válido (ej: Claude devolvió un string sin quotes), intentar como string limpio
      refined = cleaned;
    }

    return NextResponse.json({ success: true, section, content: refined });
  } catch (error) {
    console.error("Error refinando sección:", error);
    return NextResponse.json(
      { success: false, error: "Error al refinar sección" },
      { status: 500 }
    );
  }
}
