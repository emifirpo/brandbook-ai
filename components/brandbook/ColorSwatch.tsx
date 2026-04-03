import { BrandColor } from "@/lib/types";
interface ColorSwatchProps { color: BrandColor; }
export function ColorSwatch({ color }: ColorSwatchProps) {
  return (
    <div>
      <div className="w-full h-20 rounded-lg border border-border/50 mb-2 shadow-sm" style={{ backgroundColor: color.hex }} aria-label={`Color ${color.name}: ${color.hex}`} />
      <p className="font-medium text-sm">{color.name}</p>
      <p className="text-xs text-muted-foreground font-mono mt-0.5">{color.hex}</p>
      <p className="text-xs text-muted-foreground mt-1">{color.usage}</p>
    </div>
  );
}
