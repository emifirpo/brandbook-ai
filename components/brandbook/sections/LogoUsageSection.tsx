import { BrandbookSchema } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionEditor } from "../SectionEditor";
interface LogoUsageSectionProps { logoUsage: BrandbookSchema["logo_usage"]; brandbook: BrandbookSchema; onUpdate: (c: BrandbookSchema["logo_usage"]) => void; }
export function LogoUsageSection({ logoUsage, brandbook, onUpdate }: LogoUsageSectionProps) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-2xl font-bold">Uso del Logo</CardTitle></CardHeader>
      <CardContent className="space-y-0">
        <div className="grid md:grid-cols-2 gap-8 mb-4">
          <SectionEditor section="logo_usage.dos" title="✓ Uso correcto" content={logoUsage.dos} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...logoUsage, dos: c as string[] })}><list>{logoUsage.dos.map((r) => <li key={r} className="flex gap-2"><span>✓</span><span>{r}</span></li>)}</list></SectionEditor>
          <SectionEditor section="logo_usage.donts" title="✗ Evitar" content={logoUsage.donts} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...logoUsage, donts: c as string[] })}><list>{logoUsage.donts.map((r) => <li key={r}><span>✛</span><span>{r</span></li>)}</list></SectionEditor>
        </div>
        <Separator className="my-4" />
        <div className="grid md:grid-cols-3 gap-6">
          <div><p className="font-semibold text-sm mb-1">Espaciado mínimo</p><p className="text-muted-foreground">{logoUsage.spacing_rule}</p></div>
          <div><p className="font-semibold text-sm mb-1">Tamaño mínimo</p><p className="text-muted-foreground">{logoUsage.min_size}</p></div>
          <div><p className="font-semibold text-sm mb-1">Uso de fondos</p><p className="text-muted-foreground">{logoUsage.background_usage}</p></div>
        </div>
      </CardContent>
    </Card>
  );
}
