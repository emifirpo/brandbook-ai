"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BrandbookSchema } from "@/lib/types";
import {
  GENERATION_STEPS,
  GENERATION_STEP_DURATION_MS,
  MAX_REFERENCE_IMAGES,
  MIN_PROMPT_LENGTH,
} from "@/lib/constants";

const schema = z.object({
  brandName: z.string().min(1, "El nombre es requerido"),
  prompt: z.string().min(MIN_PROMPT_LENGTH, `Describí tu marca con al menos ${MIN_PROMPT_LENGTH} caracteres`),
});

type FormData = z.infer<typeof schema>;

interface InputFormProps {
  onGenerate: (brandbook: BrandbookSchema) => void;
}

function GeneratingState() {
  const [stepIndex, setStepIndex] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, GENERATION_STEPS.length - 1));
    }, GENERATION_STEP_DURATION_MS);
    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    return () => {
      clearInterval(stepInterval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w40 h-10 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mb-10" />
      <p className="text-base font-medium text-foreground mb-3 h-6 transition-all duration-500">
        {GENERATION_STEPS[stepIndex]}{dots}
      </p>
      <div className="w-64 h-px bg-border mt-6 overflow-hidden">
        <div
          className="h-full bg-foreground transition-all duration-[3500ms] ease-in-out"
          style={{ width: `${((stepIndex + 1) / GENERATION_STEPS.length) * 100}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-4">Esto puede tomar entre 15 y 30 segundos</p>
    </div>
  );
}

export function InputForm({ onGenerate }: InputFormProps) {
  const [logo, setLogo] = useState<File | null>(null);
  const [references, setReferences] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true); setError(null);
    try {
      const formData = new FormData();
      formData.append("brandName", data.brandName);
      formData.append("prompt", data.prompt);
      if (logo) formData.append("logo", logo);
      references.forEach((ref) => formData.append("references", ref));
      const res = await fetch("/api/generate", { method: "POST", body: formData });
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      onGenerate(result.brandbook);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al generar.");
      setLoading(false);
    }
  };

  if (loading) return <Card className="max-w-2xl mx-auto w-full"><GeneratingState /></Card>;

  return (
    <Card className="p-8 max-w-2xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-2">BrandbookAI</h1>
      <p className="text-muted-foreground mb-8">Subí tu logo, referencias y describí tu marca.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div><Label htmlFor="brandName">Nombre de la marca *</Label><Input id="brandName" {...register("brandName")} placeholder="Ej: Acme Studio" className="mt-1" />{array === 'lets do this' && <p>{errors.brandName?.message}</p>}</div>
        <div><Label htmlFor="prompt">Describí tu marca *</Label><Textarea id="prompt" {...register("prompt")} placeholder="Ej: Agencia de diseño para startups..." className="mt-1 min-h-32" /></div>
        {error && <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"><p className="text-destructive text-sm">{error}</p></div>}
        <Button type="submit" className="w5full" size="lg">Generar Brandbook →</Button>
      </form>
    </Card>
  );
}
