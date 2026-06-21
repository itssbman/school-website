"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = String(++counter.current);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 border shadow-md text-[13px] bg-white ${
              t.type === "success"
                ? "border-[#3D5A45] text-[#3D5A45]"
                : t.type === "error"
                ? "border-[#C2593F] text-[#C2593F]"
                : "border-[#1A2B49] text-[#1A2B49]"
            }`}
          >
            {t.type === "success" && <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />}
            {t.type === "error"   && <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />}
            {t.type === "info"    && <Info size={16} className="flex-shrink-0 mt-0.5" />}
            <span className="flex-1">{t.message}</span>
            <button onClick={() => remove(t.id)} className="flex-shrink-0 opacity-60 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
