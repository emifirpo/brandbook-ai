import { Typography } from "@/lib/types";
interface TypographySampleProps { role: string; typography: Typography; sampleText: string; sampleClassName?: string; }
export function TypographySample({ role, typography, sampleText, sampleClassName = "text-base" }: TypographySampleProps) {
  return (
    <div className="border-l-2 border-border pl-4">
      <div className="flex items-baseline gap-2 mb-1 flex-wrap">
        <p className="font-semibold text-sm">{role}</p>
        <p className="text-xs text-muted-foreground">{typography.family} · {typography.weight}</p>
      </div>
      <p className={`${sampleClassName} text-foreground mt-2 leading-snug`} style={{ fontFamily: `'${typography.family}', ${typography.fallback}` }}>{sampleText}</p>
      <p className="text-xs text-muted-foreground mt-1">{typography.usage}</p>
    </div>
  );
}
