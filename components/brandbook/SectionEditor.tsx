"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrandbookSchema } from "@/lib/types";

export type SectionContent = string | string[] | Record<string, unknown> | Record<string, unknown>[] | unknown[];

interface SectionEditorProps {
  section: string; title: string; content: SectionContent;
  brandbook: BrandbookSchema; onUpdate: (content: SectionContent) => void;
  children: React.ReactNode;
}

export function SectionEditor({ section, title, content, brandbook, onUpdate, children }: SectionEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefine = async () => {
    if (!feedback.trim()) return;
    setIsRefining(true); setError(null);
    try {
      const res = await fetch("/api/refine", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, currentContent: content, feedback, brandbook }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      onUpdate(result.content); setFeedback(""); setIsEditing(false);
    } catch (err) { setError("No se pudo refinar."); }
    finally { setIsRefining(false); }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        <Button variant="ghost" size="sm" onClick={() => { setIsEditing(p => !p); setError(null); setFeedback(""); }} className="text-xs shrink-0">{isEditing ? "Cancelar" : "Editar"}</Button>
      </div>
      {isEditing ? (
        <div className="space-y-3 bg-secondary/50 p-4 rounded-lg">
          <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Describí qué cambios querés..." className="min-h-20" autoFocus />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button onClick={handleRefine} disabled={isRefining || !feedback.trim()} size="sm">{isRefining ? "Refinando..." : "Refinar con IA"}</Button>
        </div>
      ) : (
        <div className="text-muted-foreground text-sm">{children}</div>
      )}
    </div>
  );
}
