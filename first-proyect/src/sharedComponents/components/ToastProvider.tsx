/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState, type FC, type ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

export type Toast = {
  id: number;
  title?: string;
  message: string;
  type?: ToastType;
  durationMs?: number;
};

type ToastContextValue = {
  showToast: (t: Omit<Toast, 'id'>) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider />');
  return ctx;
};

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random();
    const toast: Toast = { id, type: 'success', durationMs: 3000, ...t };
    setToasts(prev => [...prev, toast]);
    const timeout = setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== id));
    }, toast.durationMs);
    // Evitar warning en SSR/no-op
    void timeout;
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Contenedor de toasts */}
      <div style={{ position: 'fixed', right: 16, top: 16, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 9999 }}>
        {toasts.map(t => (
          <div key={t.id}
               role="status"
               aria-live="polite"
               style={{
                 minWidth: 260,
                 maxWidth: 360,
                 background: 'white',
                 border: '1px solid rgba(0,0,0,0.08)',
                 boxShadow: '0 10px 24px rgba(0,0,0,0.10)',
                 borderLeft: `4px solid ${t.type === 'error' ? '#e03131' : t.type === 'info' ? '#1971c2' : '#2f9e44'}`,
                 padding: '12px 14px',
                 borderRadius: 10
               }}>
            {t.title && <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.title}</div>}
            <div style={{ color: '#555' }}>{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
