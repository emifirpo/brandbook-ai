"use client";

import { useState } from "react";
import { BrandbookSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "./DownloadButton";
import { useBrandFonts } from "@/hooks/useBrandFonts";
import { BrandStorySection } from "./brandbook/sections/BrandStorySection";
import { VisualIdentitySection } from "./brandbook/sections/VisualIdentitySection";
import { LogoUsageSection } from "./brandbook/sections/LogoUsageSection";
import { ToneOfVoiceSection } from "./brandbook/sections/ToneOfVoiceSection";
import { TargetAudienceSection } from "./brandbook/sections/TargetAudienceSection";
import { AiPromptPackSection } from "./brandbook/sections/AiPromptPackSection";

interface BrandbookPreviewProps {
  brandbook: BrandbookSchema;
  onReset: () => void;
}

/**
 * Orquestador del brandbook generado.
 * Maneja el estado global del brandbook y delega el rendering
 * a secciones independientes.
 *
 * Responsabilidades:
 * - Estado del brandbook (inmutable por sección, actualizable)
 * - Carga de fuentes tipográficas de marca
 * - Composición de secciones en orden
 *
 * No contiene lógica de display — esa vive en cada sección.
 */
export function BrandbookPreview({ brandbook: initialBrandbook, onReset }: BrandbookPreviewProps) {
  const [brandbook, setBrandbook] = useState(initialBrandbook);

  // Carga dinámica de las fuentes de marca desde Google Fonts
  useBrandFonts([
    brandbook.visual_identity.typography.heading.family,
    brandbook.visual_identity.typography.body.family,
    brandbook.visual_identity.typography.accent.family,
  ]);

  // Actualizador tipado para cualquier sección de primer nivel
  function updateSection<K extends keyof BrandbookSchema>(
    section: K,
    content: BrandbookSchema[K]
  ) {
    setBrandbook((prev) => ({ ...prev, [section]: content }));
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-[var(--layout-page-max-width)] mx-auto">

        {/* Header del brandbook */}
        <header className="mb-12">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
            Brandbook
          </p>
          <h1 className="text-5xl font-bold tracking-tight mb-2">
            {brandbook.brand_name}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">{brandbook.tagline}</p>
          <div className="flex gap-3">
            <DownloadButton brandbook={brandbook} />
            <Button variant="outline" onClick={onReset}>
              ← Volver
            </Button>
          </div>
        </header>

        {/* Secciones del brandbook */}
        <div className="space-y-[var(--layout-section-gap)]">
          <BrandStorySection
            brandStory={brandbook.brand_story}
            brandbook={brandbook}
            onUpdate={(content) => updateSection("brand_story", content)}
          />

          <VisualIdentitySection
            visualIdentity={brandbook.visual_identity}
            brandbook={brandbook}
            onUpdate={(content) => updateSection("visual_identity", content)}
          />

          <LogoUsageSection
            logoUsage={brandbook.logo_usage}
            brandbook={brandbook}
            onUpdate={(content) => updateSection("logo_usage", content)}
          />

          <ToneOfVoiceSection
            toneOfVoice={brandbook.tone_of_voice}
            brandbook={brandbook}
            onUpdate={(content) => updateSection("tone_of_voice", content)}
          />

          <TargetAudienceSection
            targetAudience={brandbook.target_audience}
            brandbook={brandbook}
            onUpdate={(content) => updateSection("target_audience", content)}
          />

          <AiPromptPackSection
            aiPromptPack={brandbook.ai_prompt_pack}
          />
        </div>

      </div>
    </div>
  );
}
