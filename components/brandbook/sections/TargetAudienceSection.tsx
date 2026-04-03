import { BrandbookSchema } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionEditor } from "../SectionEditor";

interface TargetAudienceSectionProps {
  targetAudience: BrandbookSchema["target_audience"];
  brandbook: BrandbookSchema;
  onUpdate: (content: BrandbookSchema["target_audience"]) => void;
}

export function TargetAudienceSection({
  targetAudience,
  brandbook,
  onUpdate,
}: TargetAudienceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Público Objetivo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">

        <SectionEditor
          section="target_audience.description"
          title="Descripción"
          content={targetAudience.description}
          brandbook={brandbook}
          onUpdate={(content) =>
            onUpdate({ ...targetAudience, description: content as string })
          }
        >
          <p>{targetAudience.description}</p>
        </SectionEditor>

        <Separator className="my-4" />

        <div className="grid md:grid-cols-2 gap-8">
          <SectionEditor
            section="target_audience.pain_points"
            title="Puntos de dolor"
            content={targetAudience.pain_points}
            brandbook={brandbook}
            onUpdate={(content) =>
              onUpdate({ ...targetAudience, pain_points: content as string[] })
            }
          >
            <ul className="space-y-2">
              {targetAudience.pain_points.map((point) => (
                <li key={point} className="flex gap-2 items-start">
                  <span className="text-orange-500 shrink-0 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </SectionEditor>

          <SectionEditor
            section="target_audience.aspirations"
            title="Aspiraciones"
            content={targetAudience.aspirations}
            brandbook={brandbook}
            onUpdate={(content) =>
              onUpdate({ ...targetAudience, aspirations: content as string[] })
            }
          >
            <ul className="space-y-2">
              {targetAudience.aspirations.map((aspiration) => (
                <li key={aspiration} className="flex gap-2 items-start">
                  <span className="text-blue-500 shrink-0 mt-0.5">★</span>
                  <span>{aspiration}</span>
                </li>
              ))}
            </ul>
          </SectionEditor>
        </div>

      </CardContent>
    </Card>
  );
}
