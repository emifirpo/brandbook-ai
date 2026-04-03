"use client";

import { useEffect } from "react";

/**
 * Carga dinámicamente las fuentes de marca desde Google Fonts.
 * Deduplicamos las fuentes para no inyectar el mismo <link> dos veces.
 *
 * @param families - Array de nombres de familias tipográficas (ej: ["Playfair Display", "DM Sans"])
 */
export function useBrandFonts(families: string[]) {
  useEffect(() => {
    const unique = [...new Set(families.filter(Boolean))];

    unique.forEach((family) => {
      const id = `gfont-${family.replace(/\s+/g, "-").toLowerCase()}`;
      if (document.getElementById(id)) return;

      const encoded = encodeURIComponent(family);
      const url = `https://fonts.googleapis.com/css2?family=${encoded}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap`;

      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    });
  }, [families.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps
}
