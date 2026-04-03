import { BrandbookSchema } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SectionEditor } from "../SectionEditor";
interface ToneOfVoiceSectionProps { toneOfVoice: BrandbookSchema["tone_of_voice"]; brandbook: BrandbookSchema; onUpdate: (c: BrandbookSchema["tone_of_voice"]) => void; }
export function ToneOfVoiceSection({ toneOfVoice, brandbook, onUpdate }: ToneOfVoiceSectionProps) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-2xl font-bold">Tono de Voz</CardTitle></CardHeader>
      <CardContent className="space-y-0">
        <SectionEditor section="tone_of_voice.personality" title="Personalidad" content={toneOfVoice.personality} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...toneOfVoice, personality: c as string[] })}><div className="flex flex-wrap gap-2">{toneOfVoice.personality.map((t) => <Badge key={t}>{t}</Badge>)}</div></SectionEditor>
        <SectionEditor section="tone_of_voice.adjectives" title="Adjetivos" content={toneOfVoice.adjectives} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...toneOfVoice, adjectives: c as string[] })}><div className="flex flex-wrap gap-2">{toneOfVoice.adjectives.map((a) => <Badge key={a} variant="outline">{a}</Badge>)}</div></SectionEditor>
        <SectionEditor section="tone_of_voice.writing_style" title="Estilo de escritura" content={toneOfVoice.writing_style} brandbook={brandbook} onUpdate={(c) => onUpdate({ ...toneOfVoice, writing_style: c as string })}><p>{toneOfVoice.writing_style}</p></SectionEditor>
        <Separator className="my-4" />
        <div><h3 className="font-semibold text-sm mb-4">Ejemplos de comunicación</h3><div className="space-y-4">{toneOfVoice.examples.map((e, i) => (
          <div key={i} className="bg-secondary/50 rounded-lg p-4"><p className="font-semibold text-sm mb-3">{e.context}</p><div className="grid md:grid-cols-2 gap-4"><div><p className="text-xs font-semibold text-green-700">✓ Correcto</p><p>{e.correct}</p></div><div><p className="text-xs font-semibold text-red-700">✛ Incorrecto</p><p>{e.incorrect}</p></div></div></div>
        ))}</div></div>
      </CardContent>
    </Card>
  );
}
