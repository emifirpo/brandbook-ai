import { BrandbookSchema } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionEditor } from "../SectionEditor";

interface BrandStorySectionProps {
  brandStory: BrandbookSchema["brand_story"];
  brandbook: BrandbookSchema;
  onUpdate: (content: BrandbookSchema["brand_story"]) => void;
}

export function BrandStorySection({
  brandStory,
  brandbook,
  onUpdate,
}: BrandStorySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Historia de la marca</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        <div className="grid md:grid-cols-2 gap-6 mb-2">
          <SectionEditor
            section="brand_story.mission"
            title="Misión"
            content={brandStory.mission}
            brandbook={brandbook}
            onUpdate={(content) => onUpdate({ ...brandStory, mission: content as string })}
          >
            <p>{brandStory.mission}</p>
          </SectionEditor>
          <SectionEditor
            section="brand_story.vision"
            title="Visión"
            content={brandStory.vision}
            brandbook={brandbook}
            onUpdate={(content) => onUpdate({ ...brandStory, vision: content as string })}
          >
            <p>{brandStory.vision}</p>
          </SectionEditor>
        </div>

        <SectionEditor
          section="brand_story.values"
          title="Valores"
          content={brandStory.values}
          brandbook={brandbook}
          onUpdate={(content) => onUpdate({ ...brandStory, values: content as string[] })}
        >
          <div className="flex flex-wrap gap-2">
            {brandStory.values.map((value) => (
              <Badge key={value} variant="secondary">
                {value}
              </Badge>
            ))}
          </div>
        </SectionEditor>
      </CardContent>
    </Card>
  );
}
