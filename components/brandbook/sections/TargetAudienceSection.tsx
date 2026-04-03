import { BrandbookSchema } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionEditor } from "../SectionEditor";
interface TargetAudienceSectionProps { targetAudience: BrandbookSchema["target_audience"]; brandbook: BrandbookSchema; onUpdate: (c: BrandbookSchema["target_audience"]) => void; }
export function TargetAudienceSection({ targetAudience, brandbook, onUpdate }: TargetAudienceSectionProps) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-2xl font-bold">Público Objetivo</CardTitle></CardHeader>
      <CardContent className="space-y-0">
        <SectionEditor section="target_audience.description" title="Descripción" content={targetAudience.description} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...targetAudience, description: c as string })}><p>{targetAudience.description}</p></SectionEditor>
        <Separator className="my-4" />
        <div className="grid md:grid-cols-2 gap-8">
          <SectionEditor section="target_audience.pain_points" title="Puntos de dolor" content={targetAudience.pain_points} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...targetAudience, pain_points: c as string[] })}><ul className="space-y-2">{targetAudience.pain_points.map((p) => <li key={p}><span>•</span><span>{p}</span></li>)}</ul></SectionEditor>
          <SectionEditor section="target_audience.aspirations" title="Aspiraciones" content={targetAudience.aspirations} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...targetAudience, aspirations: c as string[] })}><ul className="space-y-2">{targetAudience.aspirations.map((a) => <li key={a}><span>★</span><span>{a}</span></li>)}</ul></SectionEditor>
        </div>
      </CardContent>
    </Card>
  );
}
