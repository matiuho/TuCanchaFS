import React, { useEffect, useState } from 'react';

function loadReservas() {
    try {
        const raw = localStorage.getItem('reservas');
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveReservas(list) {
    localStorage.setItem('reservas', JSON.stringify(list));
}

export default function AdminBoletas() {
    const [reservas, setReservas] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        fecha: '',
        hora: '',
        cancha: ''
    });

    useEffect(() => {
        setReservas(loadReservas());
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const nueva = {
            id: Date.now(),
            ...form
        };
        const next = [nueva, ...reservas];
        setReservas(next);
        saveReservas(next);
        setForm({ nombre: '', fecha: '', hora: '', cancha: '' });
    }

    function handleDelete(id) {
        const next = reservas.filter(r => r.id !== id);
        setReservas(next);
        saveReservas(next);
    }

    return (
        <div style={{ maxWidth: 1000, margin: '24px auto', padding: 16 }}>
            <h2>Reservas (Admin)</h2>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr auto', alignItems: 'center', marginBottom: 16 }}>
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required style={{ padding: 8 }} />
                <input name="fecha" type="date" value={form.fecha} onChange={handleChange} required style={{ padding: 8 }} />
                <input name="hora" type="time" value={form.hora} onChange={handleChange} required style={{ padding: 8 }} />
                <input name="cancha" value={form.cancha} onChange={handleChange} placeholder="Cancha" required style={{ padding: 8 }} />
                <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                    <button type="submit" style={{ padding: '8px 12px' }}>Guardar reserva</button>
                </div>
            </form>

            <section>
                {reservas.length === 0 ? (
                    <p>No hay reservas guardadas.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                                <th>Nombre</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Cancha</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map(r => (
                                <tr key={r.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td>{r.nombre}</td>
                                    <td>{r.fecha}</td>
                                    <td>{r.hora}</td>
                                    <td>{r.cancha}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button onClick={() => handleDelete(r.id)} style={{ padding: '4px 8px' }}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}