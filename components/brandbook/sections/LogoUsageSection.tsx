import { BrandbookSchema } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionEditor } from "../SectionEditor";

interface LogoUsageSectionProps {
  logoUsage: BrandbookSchema["logo_usage"];
  brandbook: BrandbookSchema;
  onUpdate: (content: BrandbookSchema["logo_usage"]) => void;
}

export function LogoUsageSection({
  logoUsage,
  brandbook,
  onUpdate,
}: LogoUsageSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Uso del Logo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        <div className="grid md:grid-cols-2 gap-8 mb-4">
          <SectionEditor
            section="logo_usage.dos"
            title="✓ Uso correcto"
            content={logoUsage.dos}
            brandbook={brandbook}
            onUpdate={(content) => onUpdate({ ...logoUsage, dos: content as string[] })}
          >
            <ul className="space-y-2">
              {logoUsage.dos.map((rule) => (
                <li key={rule} className="flex gap-2 items-start">
                  <span className="text-green-600 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </SectionEditor>

          <SectionEditor
            section="logo_usage.donts"
            title="✗ Evitar"
            content={logoUsage.donts}
            brandbook={brandbook}
            onUpdate={(content) => onUpdate({ ...logoUsage, donts: content as string[] })}
          >
            <ul className="space-y-2">
              {logoUsage.donts.map((rule) => (
                <li key={rule} className="flex gap-2 items-start">
                  <span className="text-red-600 font-bold shrink-0 mt-0.5">✗</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </SectionEditor>
        </div>

        <Separator className="my-4" />

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold text-sm mb-1">Espaciado mínimo</p>
            <p className="text-muted-foreground">{logoUsage.spacing_rule}</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-1">Tamaño mínimo</p>
            <p className="text-muted-foreground">{logoUsage.min_size}</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-1">Uso de fondos</p>
            <p className="text-muted-foreground">{logoUsage.background_usage}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
