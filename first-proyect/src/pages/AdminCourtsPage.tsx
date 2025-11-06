import { useEffect, useState, type FC } from 'react';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { CourtForm } from '../canchas/components/CourtForm';
import { readCourts as readCourtsFromStorage, writeCourts as writeCourtsToStorage } from '../utils/courtsStorage';

// Centralizamos lectura/escritura desde util para coherencia en toda la app
const readCourts = (): CanchaProps[] => readCourtsFromStorage();
const writeCourts = (courts: CanchaProps[]) => writeCourtsToStorage(courts);

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
                <div style={{ display: 'flex', gap: 8 }}>
                    {editingCourt ? (
                        <button className="btn secondary" onClick={() => setEditingCourt(null)}>
                            Cancelar Edición
                        </button>
                    ) : (
                        <button
                            className="btn"
                            onClick={() => {
                                setEditingCourt(null);
                                const el = document.getElementById('form-cancha');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                        >
                            Nueva Cancha
                        </button>
                    )}
                </div>
            </div>

            <div className="admin-content">
                <div className="admin-form-section" id="form-cancha">
                    <h2>{editingCourt ? 'Editar Cancha' : 'Agregar Nueva Cancha'}</h2>
                    <CourtForm 
                        key={editingCourt ? `edit-${editingCourt.id}` : 'new'}
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
                                    <img src={cancha.imagenUrl} alt={cancha.nombre} className="court-image" />
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