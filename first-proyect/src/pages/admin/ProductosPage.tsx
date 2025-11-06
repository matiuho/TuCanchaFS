import { useEffect, useMemo, useState, type FC, type FormEvent } from 'react';
import type { Product } from '../../interfaces/product.interface';

const KEY_PRODUCTS = 'tuCancha_products';

function readProducts(): Product[] {
    try {
        const raw = localStorage.getItem(KEY_PRODUCTS);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeProducts(products: Product[]) {
    localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
}

type ProductFormData = Omit<Product, 'id'>;

const emptyForm: ProductFormData = {
    nombre: '',
    precio: 0,
    imagenUrl: '',
    descripcion: '',
    categoria: 'General',
    stock: 0,
};

export const ProductosPage: FC = () => {
    const [products, setProducts] = useState<Product[]>(() => readProducts());
    const [editing, setEditing] = useState<Product | null>(null);
    const [form, setForm] = useState<ProductFormData>(emptyForm);
    const [query, setQuery] = useState('');

    useEffect(() => {
        writeProducts(products);
    }, [products]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter(p =>
            p.nombre.toLowerCase().includes(q) ||
            (p.categoria || '').toLowerCase().includes(q)
        );
    }, [products, query]);

    const resetForm = () => setForm(emptyForm);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (editing) {
            // update
            setProducts(prev => prev.map(p => p.id === editing.id ? { ...editing, ...form } : p));
            setEditing(null);
            resetForm();
            return;
        }
        // create
        const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
        setProducts(prev => [...prev, { id: nextId, ...form }]);
        resetForm();
    };

    const startEdit = (p: Product) => {
        setEditing(p);
        setForm({
            nombre: p.nombre,
            precio: p.precio,
            imagenUrl: p.imagenUrl,
            descripcion: p.descripcion,
            categoria: p.categoria,
            stock: p.stock,
        });
    };

    const cancelEdit = () => {
        setEditing(null);
        resetForm();
    };

    const remove = (id: number) => {
        if (!confirm('¿Eliminar producto?')) return;
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Gestión de Productos</h1>
                {editing && (
                    <button className="btn secondary" onClick={cancelEdit}>Cancelar edición</button>
                )}
            </div>

            <div className="admin-content">
                <div className="admin-form-section">
                    <h2 style={{ marginTop: 0 }}>{editing ? 'Editar producto' : 'Agregar nuevo producto'}</h2>
                    <form onSubmit={submit} className="court-form">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                className="form-input"
                                type="text"
                                value={form.nombre}
                                onChange={(e) => setForm(prev => ({ ...prev, nombre: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Precio</label>
                            <input
                                className="form-input"
                                type="number"
                                min={0}
                                value={form.precio}
                                onChange={(e) => setForm(prev => ({ ...prev, precio: Number(e.target.value) }))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Imagen (URL)</label>
                            <input
                                className="form-input"
                                type="url"
                                value={form.imagenUrl}
                                onChange={(e) => setForm(prev => ({ ...prev, imagenUrl: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Categoría</label>
                            <input
                                className="form-input"
                                type="text"
                                value={form.categoria || ''}
                                onChange={(e) => setForm(prev => ({ ...prev, categoria: e.target.value }))}
                            />
                        </div>

                        <div className="form-group">
                            <label>Stock</label>
                            <input
                                className="form-input"
                                type="number"
                                min={0}
                                value={form.stock || 0}
                                onChange={(e) => setForm(prev => ({ ...prev, stock: Number(e.target.value) }))}
                            />
                        </div>

                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea
                                className="form-input"
                                rows={3}
                                value={form.descripcion || ''}
                                onChange={(e) => setForm(prev => ({ ...prev, descripcion: e.target.value }))}
                            />
                        </div>

                        <button className="btn" type="submit">{editing ? 'Actualizar' : 'Agregar'}</button>
                    </form>
                </div>

                <div className="admin-list-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ marginTop: 0 }}>Productos</h2>
                        <input
                            className="form-input"
                            placeholder="Buscar por nombre o categoría"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{ maxWidth: 260 }}
                        />
                    </div>

                    {filtered.length === 0 ? (
                        <p style={{ color: 'var(--muted)' }}>No hay productos aún.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left' }}>
                                        <th style={{ padding: '8px' }}>Producto</th>
                                        <th style={{ padding: '8px' }}>Categoría</th>
                                        <th style={{ padding: '8px' }}>Precio</th>
                                        <th style={{ padding: '8px' }}>Stock</th>
                                        <th style={{ padding: '8px' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(p => (
                                        <tr key={p.id} style={{ borderTop: '1px solid #eee' }}>
                                            <td style={{ padding: '8px' }}>
                                                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                                    <img src={p.imagenUrl} alt={p.nombre} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                                                    <div>
                                                        <div style={{ fontWeight: 600 }}>{p.nombre}</div>
                                                        {p.descripcion ? <div style={{ color: '#666', fontSize: 12 }}>{p.descripcion}</div> : null}
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '8px' }}><span className="badge">{p.categoria || 'General'}</span></td>
                                            <td style={{ padding: '8px' }}>${p.precio.toFixed(2)}</td>
                                            <td style={{ padding: '8px' }}>{p.stock ?? 0}</td>
                                            <td style={{ padding: '8px' }}>
                                                <div style={{ display: 'flex', gap: 8 }}>
                                                    <button className="btn small" onClick={() => startEdit(p)}>Editar</button>
                                                    <button className="btn small secondary" onClick={() => remove(p.id)}>Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};