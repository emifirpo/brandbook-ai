"use client";

import { useEffect, useState } from "react";

interface ToastMessage {
  id: number;
  message: string;
  type?: "success" | "error";
}

let toastCount = 0;
const listeners: ((toast: ToastMessage) => void)[] = [];

export function toast(message: string, type: "success" | "error" = "success") {
  const id = ++toastCount;
  listeners.forEach((fn) => fn({ id, message, type }));
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (t: ToastMessage) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, 2500);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`
            px-4 py-3 rounded-lg shadow-lg text-sm font-medium
            animate-in fade-in slide-in-from-bottom-2 duration-200
            ${t.type === "error"
              ? "bg-destructive text-destructive-foreground"
              : "bg-foreground text-background"
            }
          `}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
