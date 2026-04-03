import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { BRANDBOOK_SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { BrandbookSchema } from "@/lib/types";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const prompt = formData.get("prompt") as string;
    const brandName = formData.get("brandName") as string;
    const logoFile = formData.get("logo") as File | null;
    const referenceFiles = formData.getAll("references") as File[];

    // Construir content array para Claude
    const content: Anthropic.MessageParam["content"] = [];

    // Agregar logo si existe
    if (logoFile) {
      const logoBuffer = await logoFile.arrayBuffer();
      const logoBase64 = Buffer.from(logoBuffer).toString("base64");
      const logoMediaType = logoFile.type as "image/png" | "image/jpeg" | "image/webp";

      content.push({
        type: "image",
        source: { type: "base64", media_type: logoMediaType, data: logoBase64 },
      });
      content.push({ type: "text", text: "Este es el logo de la marca." });
    }

    // Agregar referencias
    for (let i = 0; i < Math.min(referenceFiles.length, 4); i++) {
      const file = referenceFiles[i];
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const mediaType = file.type as "image/png" | "image/jpeg" | "image/webp";

      content.push({
        type: "image",
        source: { type: "base64", media_type: mediaType, data: base64 },
      });
      content.push({ type: "text", text: `Imagen de referencia ${i + 1}.` });
    }

    // Agregar prompt del usuario
    content.push({
      type: "text",
      text: `
Nombre de la marca: ${brandName}

Descripción del usuario:
${prompt}

Generá el brandbook completo en JSON siguiendo exactamente el schema indicado.
      `.trim(),
    });

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: BRANDBOOK_SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Parsear JSON — Claude puede a veces envolver en backticks
    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
    const brandbook: BrandbookSchema = JSON.parse(cleaned);

    return NextResponse.json({ success: true, brandbook });
  } catch (error) {
    console.error("Error generando brandbook:", error);
    return NextResponse.json(
      { success: false, error: "Error al generar el brandbook" },
      { status: 500 }
    );
  }
}
