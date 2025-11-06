import type { FC, FormEvent } from 'react';
import { useToast } from '../../sharedComponents/components/ToastProvider';

export const ReportesPage: FC = () => {
    const { showToast } = useToast();
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        showToast({
            type: 'info',
            title: 'Reporte enviado',
            message: 'Gracias por tu reporte. Nuestro equipo lo revisará en breve.',
            durationMs: 3500
        });
    };
    return (
        <div className="admin-page">
            <h1>Reportes</h1>
            <div className="admin-content">
                <div className="profile-card" style={{ maxWidth: 640 }}>
                    <h2>Enviar reporte</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Título</label>
                            <input className="form-input" placeholder="Asunto del reporte" required />
                        </div>
                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea className="form-input" placeholder="Describe el problema o sugerencia" rows={4} required />
                        </div>
                        <button className="btn" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};