"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrandbookSchema } from "@/lib/types";

/**
 * Cualquier valor JSON válido que pueda venir del schema del brandbook.
 * Exportado para que las secciones puedan tipear sus callbacks onUpdate.
 */
export type SectionContent =
  | string
  | string[]
  | Record<string, unknown>
  | Record<string, unknown>[]
  | unknown[];

interface SectionEditorProps {
  /** Identificador de la sección (ej: "brand_story.mission") — usado en el prompt de refinado */
  section: string;
  /** Título visible de la sección */
  title: string;
  /** Contenido actual de la sección */
  content: SectionContent;
  /** Brandbook completo — provee contexto sistémico al modelo de refinado */
  brandbook: BrandbookSchema;
  /** Callback con el contenido refinado — preserva el tipo original */
  onUpdate: (content: SectionContent) => void;
  /** Contenido display actual (en modo lectura) */
  children: React.ReactNode;
}

/**
 * Wrapper de edición asistida por IA para cualquier sección del brandbook.
 * En modo lectura muestra `children`. En modo edición muestra un textarea
 * de feedback que se envía al endpoint /api/refine junto con el contexto completo.
 */
export function SectionEditor({
  section,
  title,
  content,
  brandbook,
  onUpdate,
  children,
}: SectionEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefine = async () => {
    if (!feedback.trim()) return;

    setIsRefining(true);
    setError(null);

    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          currentContent: content,
          feedback,
          brandbook,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Error desconocido");
      }

      onUpdate(result.content);
      setFeedback("");
      setIsEditing(false);
    } catch (err) {
      console.error("Error refinando sección:", err);
      setError("No se pudo refinar. Intentá de nuevo.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleToggle = () => {
    setIsEditing((prev) => !prev);
    setError(null);
    setFeedback("");
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="text-xs shrink-0"
        >
          {isEditing ? "Cancelar" : "Editar"}
        </Button>
      </div>

      {isEditing ? (
        <div className="space-y-3 bg-secondary/50 p-4 rounded-lg">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Describí qué cambios querés en esta sección..."
            className="min-h-20"
            autoFocus
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            onClick={handleRefine}
            disabled={isRefining || !feedback.trim()}
            size="sm"
          >
            {isRefining ? "Refinando..." : "Refinar con IA"}
          </Button>
        </div>
      ) : (
        <div className="text-muted-foreground text-sm">{children}</div>
      )}
    </div>
  );
}
