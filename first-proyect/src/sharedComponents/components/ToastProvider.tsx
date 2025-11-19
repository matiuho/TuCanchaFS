/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState, type FC, type ReactNode } from 'react';
import '../../styles/components/ToastProvider.css';

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
      <div className="toast-container">
        {toasts.map(t => {
          const toastTypeClass = t.type === 'error' ? 'toast-error' : t.type === 'info' ? 'toast-info' : 'toast-success';
          return (
            <div key={t.id}
                 role="status"
                 aria-live="polite"
                 className={`toast ${toastTypeClass}`}>
              {t.title && <div className="toast-title">{t.title}</div>}
              <div className="toast-message">{t.message}</div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
