"use client";

import { useState } from "react";
import { InputForm } from "@/components/InputForm";
import { BrandbookPreview } from "@/components/BrandbookPreview";
import { BrandbookSchema } from "@/lib/types";

export default function Home() {
  const [brandbook, setBrandbook] = useState<BrandbookSchema | null>(null);

  if (brandbook) {
    return <BrandbookPreview brandbook={brandbook} onReset={() => setBrandbook(null)} />;
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-8">
      <InputForm onGenerate={setBrandbook} />
    </main>
  );
}
