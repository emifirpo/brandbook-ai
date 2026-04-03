"use client";

import { BrandbookSchema } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

interface AiPromptPackSectionProps {
  aiPromptPack: BrandbookSchema["ai_prompt_pack"];
}

const PROMPTS = [
  {
    key: "image_generation_prompt" as const,
    title: "Generación de imágenes",
    subtitle: "Midjourney · Flux · DALL·E",
  },
  {
    key: "copywriting_prompt" as const,
    title: "Copywriting",
    subtitle: "Copy fiel al tono de marca",
  },
  {
    key: "ui_design_prompt" as const,
    title: "Diseño de interfaces",
    subtitle: "UI coherente con la identidad visual",
  },
  {
    key: "social_media_prompt" as const,
    title: "Redes sociales",
    subtitle: "Posts y contenido para RRSS",
  },
] as const;

export function AiPromptPackSection({ aiPromptPack }: AiPromptPackSectionProps) {
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${label} copiado`);
    } catch {
      toast("No se pudo copiar", "error");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Pack de Prompts para IA</CardTitle>
        <p className="text-sm text-muted-foreground">
          Prompts optimizados para generar contenido coherente con tu marca. Hacé clic para copiar.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {PROMPTS.map(({ key, title, subtitle }) => (
            <button
              key={key}
              className="w-full text-left border border-border rounded-lg p-4 bg-secondary/30 hover:bg-secondary/60 transition-colors group"
              onClick={() => copyToClipboard(aiPromptPack[key], title)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">{title}</span>
                    <span className="text-xs text-muted-foreground">{subtitle}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {aiPromptPack[key]}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground shrink-0 transition-colors pt-0.5">
                  Copiar
                </span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
