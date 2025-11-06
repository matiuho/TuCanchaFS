// ===================================
// src/pages/HomePage.tsx (Controlador Principal)
// ===================================
import { useState, useCallback } from 'react';
import type { FC } from 'react';
import { CourtCard } from '../canchas/components/CourtCard';
import { readCourts } from '../utils/courtsStorage';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { SearchBar } from '../sharedComponents/components/SearchBar';

// Lógica de búsqueda mejorada
const searchCanchas = (canchas: CanchaProps[], query: string = ''): CanchaProps[] => {
    if (!query.trim()) return canchas;
    const lowerQuery = query.toLowerCase().trim();
    return canchas.filter(cancha => 
        cancha.nombre.toLowerCase().includes(lowerQuery) || 
        cancha.tipo.toLowerCase().includes(lowerQuery) ||
        cancha.descripcion.toLowerCase().includes(lowerQuery)
    );
};

export const HomePage: FC = () => {
    const [canchas, setCanchas] = useState<CanchaProps[]>(readCourts());
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = useCallback((query: string) => {
        setIsLoading(true);
        try {
            const base = readCourts();
            const filteredCanchas = searchCanchas(base, query);
            setCanchas(filteredCanchas);
        } catch (error) {
            console.error('Error al buscar canchas:', error);
            setCanchas(readCourts());
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="container">
            <header style={{ marginBottom: 18 }}>
                <h1 style={{ textAlign: 'center', margin: 0 }}>Encuentra la cancha perfecta</h1>
                <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: 8 }}>Reserva canchas cerca de ti en segundos</p>
            </header>

            <section style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                    <div style={{ width: '100%', maxWidth: '500px' }}>
                        <SearchBar 
                            placeHolder="Buscar canchas por nombre, tipo o descripción..."
                            onQuery={handleSearch}
                        />
                    </div>
                </div>
            </section>

            {isLoading ? (
                <div className="content-center" style={{ marginTop: '50px', textAlign: 'center' }}>Cargando canchas...</div>
            ) : (
                <main style={{ marginTop: '10px' }}>
                    {/* Sección destacada eliminada por petición del usuario */}
                    <section>
                        <h3 style={{ margin: '6px 0', textAlign: 'center' }}>Todas las canchas</h3>
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