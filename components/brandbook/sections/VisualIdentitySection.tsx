import { BrandbookSchema } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionEditor } from "../SectionEditor";
import { ColorSwatch } from "../ColorSwatch";
import { TypographySample } from "../TypographySample";
interface VisualIdentitySectionProps { visualIdentity: BrandbookSchema["visual_identity"]; brandbook: BrandbookSchema; onUpdate: (c: BrandbookSchema["visual_identity"]) => void; }
export function VisualIdentitySection({ visualIdentity, brandbook, onUpdate }: VisualIdentitySectionProps) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-2xl font-bold">Identidad Visual</CardTitle></CardHeader>
      <CardContent className="space-y-0">
        <SectionEditor section="visual_identity.primary_colors" title="Colores Primarios" content={visualIdentity.primary_colors} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...visualIdentity, primary_colors: c as any })}><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{visualIdentity.primary_colors.map((c) => <ColorSwatch key={c.hex} color={c} />)}</div></SectionEditor>
        <SectionEditor section="visual_identity.secondary_colors" title="Colores Secundarios" content={visualIdentity.secondary_colors} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...visualIdentity, secondary_colors: c as any })}><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{visualIdentity.secondary_colors.map((c) => <ColorSwatch key={c.hex} color={c} />)}</div></SectionEditor>
        <Separator className="my-6" />
        <div className="mb-6"><h3 className="font-semibold text-sm mb-4">Tipografía</h3><div className="space-y-8"><TypographySample role="Heading" typography={visualIdentity.typography.heading} sampleText="Tipografía de titulares" sampleClassName="text-3xl" /><TypographySample role="Body" typography={visualIdentity.typography.body} sampleText="Texto de cuerpo. Se usa para contenido largo." sampleClassName="text-base" /><TypographySample role="Accent" typography={visualIdentity.typography.accent} sampleText="ETIQUETAS · LABELS" sampleClassName="text-sm tracking-widest uppercase" /></div></div>
        <SectionEditor section="visual_identity.style_description" title="Descripción visual" content={visualIdentity.style_description} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...visualIdentity, style_description: c as string })}><p>{visualIdentity.style_description}</p></SectionEditor>
      </CardContent>
    </Card>
  );
}
