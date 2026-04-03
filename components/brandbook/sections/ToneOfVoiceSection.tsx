import { BrandbookSchema } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SectionEditor } from "../SectionEditor";

interface ToneOfVoiceSectionProps {
  toneOfVoice: BrandbookSchema["tone_of_voice"];
  brandbook: BrandbookSchema;
  onUpdate: (content: BrandbookSchema["tone_of_voice"]) => void;
}

export function ToneOfVoiceSection({
  toneOfVoice,
  brandbook,
  onUpdate,
}: ToneOfVoiceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Tono de Voz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">

        <SectionEditor
          section="tone_of_voice.personality"
          title="Personalidad"
          content={toneOfVoice.personality}
          brandbook={brandbook}
          onUpdate={(content) =>
            onUpdate({ ...toneOfVoice, personality: content as string[] })
          }
        >
          <div className="flex flex-wrap gap-2">
            {toneOfVoice.personality.map((trait) => (
              <Badge key={trait}>{trait}</Badge>
            ))}
          </div>
        </SectionEditor>

        <SectionEditor
          section="tone_of_voice.adjectives"
          title="Adjetivos de marca"
          content={toneOfVoice.adjectives}
          brandbook={brandbook}
          onUpdate={(content) =>
            onUpdate({ ...toneOfVoice, adjectives: content as string[] })
          }
        >
          <div className="flex flex-wrap gap-2">
            {toneOfVoice.adjectives.map((adj) => (
              <Badge key={adj} variant="outline">
                {adj}
              </Badge>
            ))}
          </div>
        </SectionEditor>

        <SectionEditor
          section="tone_of_voice.writing_style"
          title="Estilo de escritura"
          content={toneOfVoice.writing_style}
          brandbook={brandbook}
          onUpdate={(content) =>
            onUpdate({ ...toneOfVoice, writing_style: content as string })
          }
        >
          <p>{toneOfVoice.writing_style}</p>
        </SectionEditor>

        <Separator className="my-4" />

        <div>
          <h3 className="font-semibold text-sm mb-4">Ejemplos de comunicación</h3>
          <div className="space-y-4">
            {toneOfVoice.examples.map((example, i) => (
              <div key={i} className="bg-secondary/50 rounded-lg p-4">
                <p className="font-semibold text-sm mb-3">{example.context}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-green-700 mb-1">✓ Correcto</p>
                    <p className="text-sm">{example.correct}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-700 mb-1">✗ Incorrecto</p>
                    <p className="text-sm">{example.incorrect}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
