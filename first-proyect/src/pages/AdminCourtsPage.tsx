import { useEffect, useState, type FC } from 'react';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { mockCanchas } from '../mock-data/canchas.mock';
import { CourtForm } from '../canchas/components/CourtForm';

const KEY_COURTS = 'tuCancha_courts';

function readCourts(): CanchaProps[] {
    try {
        const raw = localStorage.getItem(KEY_COURTS);
        if (!raw) return mockCanchas;
        const parsed = JSON.parse(raw);
        const stored: CanchaProps[] = Array.isArray(parsed) ? parsed : mockCanchas;
        // Pequeña migración: asegurar campo fotos y mezclar fotos desde mocks
        const merged = stored.map((c) => {
            const base = mockCanchas.find(m => m.id === c.id);
            const storedFotos = Array.isArray((c as any).fotos) ? (c as any).fotos as string[] : [];
            const mockFotos = Array.isArray((base as any)?.fotos) ? (base as any).fotos as string[] : [];
            const all = [...storedFotos];
            for (const f of mockFotos) {
                if (!all.includes(f)) all.push(f);
            }
            // También sincronizamos imagenUrl principal desde el mock (para reflejar cambios de portada)
            const imagenUrl = (base && base.imagenUrl) ? base.imagenUrl : c.imagenUrl;
            let result: CanchaProps = { ...c, fotos: all, imagenUrl } as CanchaProps;
            // Remociones específicas: eliminar esta URL si quedó en localStorage para canchas donde ya no debe estar
            const toRemove = 'http://www.costanerasport.cl/images/reservas/05.jpg';
            if (Array.isArray(result.fotos)) {
                if (result.id === 4 || result.id === 2) {
                    result = { ...result, fotos: result.fotos.filter(u => u !== toRemove) };
                }
            }
            return result;
        });
        return merged;
    } catch {
        return mockCanchas;
    }
}

function writeCourts(courts: CanchaProps[]) {
    localStorage.setItem(KEY_COURTS, JSON.stringify(courts));
}

export const AdminCourtsPage: FC = () => {
    const [canchas, setCanchas] = useState<CanchaProps[]>(() => readCourts());
    const [editingCourt, setEditingCourt] = useState<CanchaProps | null>(null);

    useEffect(() => {
        writeCourts(canchas);
    }, [canchas]);

    const handleAddCourt = (newCourt: Omit<CanchaProps, 'id'>) => {
        const base = canchas.length ? Math.max(...canchas.map(c => c.id)) : 0;
        const newId = base + 1;
        const courtToAdd = { ...newCourt, id: newId };
        setCanchas(prev => [...prev, courtToAdd]);
    };

    const handleDeleteCourt = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta cancha?')) {
            setCanchas(prev => prev.filter(cancha => cancha.id !== id));
        }
    };

    const handleEditCourt = (cancha: CanchaProps) => {
        setEditingCourt(cancha);
    };

    const handleUpdateCourt = (updatedCourt: Omit<CanchaProps, 'id'>) => {
        if (!editingCourt) return;
        
        setCanchas(prev => prev.map(cancha => 
            cancha.id === editingCourt.id 
                ? { ...updatedCourt, id: editingCourt.id }
                : cancha
        ));
        setEditingCourt(null);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Administración de Canchas</h1>
                {editingCourt ? (
                    <button className="btn secondary" onClick={() => setEditingCourt(null)}>
                        Cancelar Edición
                    </button>
                ) : null}
            </div>

            <div className="admin-content">
                <div className="admin-form-section">
                    <h2>{editingCourt ? 'Editar Cancha' : 'Agregar Nueva Cancha'}</h2>
                    <CourtForm 
                        onSubmit={editingCourt ? handleUpdateCourt : handleAddCourt}
                        initialData={editingCourt || undefined}
                    />
                </div>

                <div className="admin-list-section">
                    <h2>Canchas Existentes</h2>
                    <div className="courts-grid">
                        {canchas.map(cancha => (
                            <div key={cancha.id} className="court-item">
                                <div style={{ position: 'relative' }}>
                                    <img src={(cancha.fotos && cancha.fotos[0]) || cancha.imagenUrl} alt={cancha.nombre} className="court-image" />
                                    {cancha.fotos && cancha.fotos.length > 0 && (
                                        <span style={{ position:'absolute', right:8, top:8, background: 'rgba(0,0,0,0.55)', color:'white', fontSize:12, padding:'2px 6px', borderRadius:999 }}>
                                            {cancha.fotos.length + 1} fotos
                                        </span>
                                    )}
                                </div>
                                <div className="court-info">
                                    <h3>{cancha.nombre}</h3>
                                    <p>Tipo: {cancha.tipo}</p>
                                    <p>Precio: ${cancha.precioHora}/hora</p>
                                    <p>Capacidad: {cancha.capacidad} jugadores</p>
                                </div>
                                <div className="court-actions">
                                    <button 
                                        className="btn small"
                                        onClick={() => handleEditCourt(cancha)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="btn small secondary"
                                        onClick={() => handleDeleteCourt(cancha.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};