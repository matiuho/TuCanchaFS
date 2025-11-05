// ===================================
// src/pages/HomePage.tsx (Controlador Principal)
// ===================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { FC } from 'react';
import { CourtCard } from '../canchas/components/CourtCard';
import { mockCanchas } from '../mock-data/canchas.mock';
import type { CanchaProps } from '../interfaces/cancha.interface';
// Lógica de simulación de datos (reemplazaría tus actions)
const getCanchasSimulated = (query: string = ''): CanchaProps[] => {
    if (!query) return mockCanchas;
    const lowerQuery = query.toLowerCase();
    return mockCanchas.filter(c => 
        c.nombre.toLowerCase().includes(lowerQuery) || 
        c.tipo.toLowerCase().includes(lowerQuery)
    );
}


export const HomePage: FC = () => {
    const [canchas, setCanchas] = useState(mockCanchas);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Search term is controlled locally by HomePage (could be wired to a SearchBar)

    // Requisito: GESTIÓN DE ESTADO y Lógica de Filtrado
    useEffect(() => {
        // Simulamos la carga inicial y el filtrado
        setIsLoading(true);
        const filtered = getCanchasSimulated(searchTerm);
        setCanchas(filtered);
        setIsLoading(false);
    }, [searchTerm]); // Se dispara cuando el searchTerm (debounced) cambia

    return (
        <div className="container">
            <header style={{ marginBottom: 18 }}>
                <h1 style={{ textAlign: 'center', margin: 0 }}>Encuentra la cancha perfecta</h1>
                <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: 8 }}>Reserva canchas cerca de ti en segundos — filtra por tipo, precio y capacidad.</p>
            </header>

            <section style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '16px 0' }}>
                    <Link to="/category/futsal" className="btn">
                        🥅 Futsal
                    </Link>
                </div>
            </section>

            {isLoading ? (
                <div className="content-center" style={{ marginTop: '50px', textAlign: 'center' }}>Cargando canchas...</div>
            ) : (
                <main style={{ marginTop: '10px' }}>
                    {/* Sección destacada eliminada por petición del usuario */}
                    <section>
                        <h3 style={{ margin: '6px 0' }}>Todas las canchas</h3>
                        <div className="gifs-container">
                            {canchas.length === 0 ? (
                                <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No se encontraron canchas.</p>
                            ) : (
                                canchas.map(cancha => (
                                    <CourtCard key={cancha.id} cancha={cancha} />
                                ))
                            )}
                        </div>
                    </section>
                </main>
            )}

            <footer style={{ marginTop: 28, padding: 18, borderTop: '1px solid rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <strong>TuCancha</strong>
                    <div style={{ color: 'var(--muted)' }}>Conecta jugadores y canchas locales</div>
                </div>
                <div style={{ color: 'var(--muted)' }}>© {new Date().getFullYear()} TuCancha</div>
            </footer>
        </div>
    );
};