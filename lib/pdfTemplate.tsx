import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { BrandbookSchema } from "./types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  container: {
    marginBottom: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 5,
  },
  colorInfo: {
    fontSize: 9,
  },
  badge: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 9,
  },
  textBlock: {
    marginBottom: 10,
    lineHeight: 1.5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 4,
  },
});

interface PDFTemplateProps {
  brandbook: BrandbookSchema;
}

export function PDFTemplate({ brandbook }: PDFTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.title}>{brandbook.brand_name}</Text>
        <Text style={styles.subtitle}>{brandbook.tagline}</Text>

        {/* Brand Story */}
        <Text style={styles.sectionTitle}>Historia de la marca</Text>
        <View style={styles.container}>
          <Text style={styles.label}>Misión</Text>
          <Text style={styles.textBlock}>{brandbook.brand_story.mission}</Text>

          <Text style={styles.label}>Visión</Text>
          <Text style={styles.textBlock}>{brandbook.brand_story.vision}</Text>

          <Text style={styles.label}>Valores</Text>
          <View style={styles.row}>
            {brandbook.brand_story.values.map((value) => (
              <Text key={value} style={styles.badge}>
                {value}
              </Text>
            ))}
          </View>
        </View>
      </Page>

      {/* Visual Identity */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Identidad Visual</Text>

        <Text style={styles.label}>Colores Primarios</Text>
        <View style={styles.row}>
          {brandbook.visual_identity.primary_colors.map((color) => (
            <View key={color.hex} style={styles.column}>
              <View
                style={[styles.colorSwatch, { backgroundColor: color.hex }]}
              />
              <Text style={styles.colorInfo}>{color.name}</Text>
              <Text style={styles.colorInfo}>{color.hex}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 15 }]}>Colores Secundarios</Text>
        <View style={styles.row}>
          {brandbook.visual_identity.secondary_colors.map((color) => (
            <View key={color.hex} style={styles.column}>
              <View
                style={[styles.colorSwatch, { backgroundColor: color.hex }]}
              />
              <Text style={styles.colorInfo}>{color.name}</Text>
              <Text style={styles.colorInfo}>{color.hex}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 15 }]}>Tipografía</Text>
        <Text style={styles.textBlock}>
          <Text style={styles.label}>Heading: </Text>
          {brandbook.visual_identity.typography.heading.family} -{" "}
          {brandbook.visual_identity.typography.heading.weight}
        </Text>
        <Text style={styles.textBlock}>
          <Text style={styles.label}>Body: </Text>
          {brandbook.visual_identity.typography.body.family} -{" "}
          {brandbook.visual_identity.typography.body.weight}
        </Text>
        <Text style={styles.textBlock}>
          <Text style={styles.label}>Accent: </Text>
          {brandbook.visual_identity.typography.accent.family} -{" "}
          {brandbook.visual_identity.typography.accent.weight}
        </Text>

        <Text style={[styles.label, { marginTop: 15 }]}>Descripción del Estilo</Text>
        <Text style={styles.textBlock}>
          {brandbook.visual_identity.style_description}
        </Text>
      </Page>

      {/* Logo Usage */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Uso del Logo</Text>

        <View style={styles.container}>
          <Text style={styles.label}>✓ Uso Correcto</Text>
          {brandbook.logo_usage.dos.map((rule) => (
            <Text key={rule} style={styles.textBlock}>
              • {rule}
            </Text>
          ))}

          <Text style={[styles.label, { marginTop: 15 }]}>✗ Evitar</Text>
          {brandbook.logo_usage.donts.map((rule) => (
            <Text key={rule} style={styles.textBlock}>
              • {rule}
            </Text>
          ))}

          <Text style={[styles.label, { marginTop: 15 }]}>Espaciado mínimo</Text>
          <Text style={styles.textBlock}>{brandbook.logo_usage.spacing_rule}</Text>

          <Text style={[styles.label, { marginTop: 10 }]}>Tamaño mínimo</Text>
          <Text style={styles.textBlock}>{brandbook.logo_usage.min_size}</Text>

          <Text style={[styles.label, { marginTop: 10 }]}>Uso de fondos</Text>
          <Text style={styles.textBlock}>{brandbook.logo_usage.background_usage}</Text>
        </View>
      </Page>

      {/* Tone of Voice */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Tono de Voz</Text>

        <Text style={styles.label}>Personalidad</Text>
        <View style={styles.row}>
          {brandbook.tone_of_voice.personality.map((trait) => (
            <Text key={trait} style={styles.badge}>
              {trait}
            </Text>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 15 }]}>Adjetivos</Text>
        <View style={styles.row}>
          {brandbook.tone_of_voice.adjectives.map((adj) => (
            <Text key={adj} style={styles.badge}>
              {adj}
            </Text>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 15 }]}>Estilo de Escritura</Text>
        <Text style={styles.textBlock}>{brandbook.tone_of_voice.writing_style}</Text>

        <Text style={[styles.label, { marginTop: 15 }]}>Ejemplos</Text>
        {brandbook.tone_of_voice.examples.map((example, i) => (
          <View key={i} style={[styles.container, { backgroundColor: "#f9f9f9", padding: 8 }]}>
            <Text style={styles.label}>{example.context}</Text>
            <Text style={styles.textBlock}>✓ {example.correct}</Text>
            <Text style={styles.textBlock}>✗ {example.incorrect}</Text>
          </View>
        ))}
      </Page>

      {/* Target Audience */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Público Objetivo</Text>

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.textBlock}>{brandbook.target_audience.description}</Text>

        <Text style={[styles.label, { marginTop: 15 }]}>Puntos de Dolor</Text>
        {brandbook.target_audience.pain_points.map((point) => (
          <Text key={point} style={styles.textBlock}>
            • {point}
          </Text>
        ))}

        <Text style={[styles.label, { marginTop: 15 }]}>Aspiraciones</Text>
        {brandbook.target_audience.aspirations.map((aspiration) => (
          <Text key={aspiration} style={styles.textBlock}>
            ★ {aspiration}
          </Text>
        ))}
      </Page>

      {/* AI Prompt Pack */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Pack de Prompts para IA</Text>

        <Text style={[styles.label, { marginTop: 15 }]}>
          Generación de Imágenes (Midjourney/Flux)
        </Text>
        <Text style={styles.textBlock}>
          {brandbook.ai_prompt_pack.image_generation_prompt}
        </Text>

        <Text style={[styles.label, { marginTop: 15 }]}>Copywriting</Text>
        <Text style={styles.textBlock}>{brandbook.ai_prompt_pack.copywriting_prompt}</Text>

        <Text style={[styles.label, { marginTop: 15 }]}>Diseño de UI</Text>
        <Text style={styles.textBlock}>{brandbook.ai_prompt_pack.ui_design_prompt}</Text>

        <Text style={[styles.label, { marginTop: 15 }]}>Redes Sociales</Text>
        <Text style={styles.textBlock}>{brandbook.ai_prompt_pack.social_media_prompt}</Text>
      </Page>
    </Document>
  );
}
