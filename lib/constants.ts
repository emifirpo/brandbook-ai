/**
 * Constantes compartidas de la aplicación.
 * Este archivo es el único lugar donde deben vivir valores literales
 * que se usan en más de un módulo.
 */

// Pasos de generación mostrados al usuario durante el proceso
export const GENERATION_STEPS = [
  "Analizando assets de marca...",
  "Definiendo estrategia y esencia...",
  "Construyendo identidad visual...",
  "Elaborando sistema tipográfico...",
  "Desarrollando tono de voz...",
  "Finalizando brandbook...",
] as const;

// Duración en ms por paso de generación (para la animación de progreso)
export const GENERATION_STEP_DURATION_MS = 3500;

// Límites de inputs del usuario
export const MAX_REFERENCE_IMAGES = 4;
export const MIN_PROMPT_LENGTH = 20;
