import { useState, type FC } from 'react';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { mockCanchas } from '../mock-data/canchas.mock';
import { CourtForm } from '../canchas/components/CourtForm';

export const AdminCourtsPage: FC = () => {
    const [canchas, setCanchas] = useState<CanchaProps[]>(mockCanchas);
    const [editingCourt, setEditingCourt] = useState<CanchaProps | null>(null);

    const handleAddCourt = (newCourt: Omit<CanchaProps, 'id'>) => {
        const newId = Math.max(...canchas.map(c => c.id)) + 1;
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
                                <img src={cancha.imagenUrl} alt={cancha.nombre} className="court-image" />
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