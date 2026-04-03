export interface BrandColor {
  name: string;
  hex: string;
  usage: string;
}

export interface Typography {
  family: string;
  weight: string;
  usage: string;
  fallback: string;
}

export interface BrandbookSchema {
  brand_name: string;
  tagline: string;

  brand_story: {
    mission: string;
    vision: string;
    values: string[];
  };

  visual_identity: {
    primary_colors: BrandColor[];
    secondary_colors: BrandColor[];
    typography: {
      heading: Typography;
      body: Typography;
      accent: Typography;
    };
    style_description: string;
  };

  logo_usage: {
    dos: string[];
    donts: string[];
    spacing_rule: string;
    min_size: string;
    background_usage: string;
  };

  tone_of_voice: {
    personality: string[];
    adjectives: string[];
    writing_style: string;
    examples: {
      context: string;
      correct: string;
      incorrect: string;
    }[];
  };

  target_audience: {
    description: string;
    pain_points: string[];
    aspirations: string[];
  };

  ai_prompt_pack: {
    image_generation_prompt: string;
    copywriting_prompt: string;
    ui_design_prompt: string;
    social_media_prompt: string;
  };
}
