"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandbookSchema } from "@/lib/types";
import { PDFTemplate } from "@/lib/pdfTemplate";
import { pdf } from "@react-pdf/renderer";

interface DownloadButtonProps {
  brandbook: BrandbookSchema;
}

export function DownloadButton({ brandbook }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const doc = <PDFTemplate brandbook={brandbook} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${brandbook.brand_name.replace(/\s+/g, "-").toLowerCase()}-brandbook.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error al descargar el PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isGenerating} size="lg">
      {isGenerating ? "Generando PDF..." : "📄 Descargar Brandbook"}
    </Button>
  );
}
