import { useEffect, useState, type FC, type FormEvent } from 'react';
import type { CanchaProps } from '../../interfaces/cancha.interface';

interface CourtFormProps {
    onSubmit: (cancha: Omit<CanchaProps, 'id'>) => void;
    initialData?: CanchaProps;
}

type FormState = Omit<CanchaProps, 'id' | 'tipo'> & { tipo: '' | CanchaProps['tipo'] };

export const CourtForm: FC<CourtFormProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState<FormState>({
        nombre: initialData?.nombre || '',
        tipo: initialData?.tipo || '',
        precioHora: initialData?.precioHora || 0,
        capacidad: initialData?.capacidad || 0,
        imagenUrl: initialData?.imagenUrl || '',
        descripcion: initialData?.descripcion || '',
    });

    // Sincronizar cuando cambie la cancha a editar
    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre || '',
                tipo: initialData.tipo || '',
                precioHora: initialData.precioHora || 0,
                capacidad: initialData.capacidad || 0,
                imagenUrl: initialData.imagenUrl || '',
                descripcion: initialData.descripcion || '',
            });
        }
    }, [initialData]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.tipo) return;
        onSubmit({ ...formData, tipo: formData.tipo as CanchaProps['tipo'] });
        // Limpiar el formulario si no es edición
        if (!initialData) {
            setFormData({
                nombre: '',
                tipo: '',
                precioHora: 0,
                capacidad: 0,
                imagenUrl: '',
                descripcion: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="court-form">
            <div className="form-group">
                <label>Nombre de la cancha:</label>
                <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Tipo:</label>
                <select
                    value={formData.tipo}
                    onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as FormState['tipo'] }))}
                    required
                    className="form-input"
                >
                    <option value="">Seleccionar tipo</option>
                    <option value="FUTBOL">Fútbol</option>
                    <option value="FUTSAL">Futsal</option>
                </select>
            </div>
            <div className="form-group">
                <label>Precio por hora:</label>
                <input
                    type="number"
                    value={formData.precioHora}
                    onChange={(e) => setFormData(prev => ({ ...prev, precioHora: Number(e.target.value) }))}
                    required
                    min="0"
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Capacidad (jugadores):</label>
                <input
                    type="number"
                    value={formData.capacidad}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacidad: Number(e.target.value) }))}
                    required
                    min="0"
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>URL de la imagen:</label>
                <input
                    type="url"
                    value={formData.imagenUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imagenUrl: e.target.value }))}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Descripción:</label>
                <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                    required
                    className="form-input"
                    rows={3}
                />
            </div>
            <button type="submit" className="btn">
                {initialData ? 'Actualizar Cancha' : 'Agregar Cancha'}
            </button>
        </form>
    );
};