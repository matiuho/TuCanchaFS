import { useState, type FC, type FormEvent } from 'react';
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
        fotos: initialData?.fotos || []
    });
    const [newFoto, setNewFoto] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.tipo) return; // simple guard, select es requerido
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
                fotos: []
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
                    <option value="Fútbol">Fútbol</option>
                    <option value="Futsal">Futsal</option>
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
                <label>Galería de fotos (URLs):</label>
                <div style={{ display: 'flex', gap: 8 }}>
                    <input
                        type="url"
                        value={newFoto}
                        onChange={(e) => setNewFoto(e.target.value)}
                        placeholder="https://..."
                        className="form-input"
                    />
                    <button
                        type="button"
                        className="btn small"
                        onClick={() => {
                            const url = newFoto.trim();
                            if (!url) return;
                            setFormData(prev => ({ ...prev, fotos: [...(prev.fotos || []), url] }));
                            setNewFoto('');
                        }}
                    >Agregar</button>
                </div>
                {formData.fotos && formData.fotos.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: 8, display: 'grid', gap: 8 }}>
                        {formData.fotos.map((f, idx) => (
                            <li key={`${f}-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <img src={f} alt={`foto-${idx}`} style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 6 }} />
                                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</span>
                                <button
                                    type="button"
                                    className="btn small secondary"
                                    onClick={() => setFormData(prev => ({ ...prev, fotos: (prev.fotos || []).filter((_, i) => i !== idx) }))}
                                >Quitar</button>
                            </li>
                        ))}
                    </ul>
                )}
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