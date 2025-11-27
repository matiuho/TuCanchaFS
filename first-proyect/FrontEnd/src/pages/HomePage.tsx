// ===================================
// src/pages/HomePage.tsx (Controlador Principal)
// ===================================
import { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { CourtCard } from '../canchas/components/CourtCard';
import { getAllCanchas } from '../services/canchasService';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { SearchBar } from '../sharedComponents/components/SearchBar';
import '../styles/pages/HomePage.css';

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
    const [allCanchas, setAllCanchas] = useState<CanchaProps[]>([]);
    const [canchas, setCanchas] = useState<CanchaProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadCanchas();
    }, []);

    const loadCanchas = async () => {
        try {
            setIsLoading(true);
            const data = await getAllCanchas();
            setAllCanchas(data);
            setCanchas(data);
        } catch (error) {
            console.error('Error al cargar canchas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = useCallback((query: string) => {
        const filteredCanchas = searchCanchas(allCanchas, query);
        setCanchas(filteredCanchas);
    }, [allCanchas]);

    return (
        <div className="container">
            <header className="home-header">
                <h1 className="home-title">Encuentra la cancha perfecta</h1>
                <p className="home-subtitle">Reserva canchas cerca de ti en segundos</p>
            </header>

            <section className="home-search-section">
                <div className="home-search-wrapper">
                    <div className="home-search-container">
                        <SearchBar 
                            placeHolder="Buscar canchas por nombre, tipo o descripción..."
                            onQuery={handleSearch}
                        />
                    </div>
                </div>
            </section>

            {isLoading ? (
                <div className="content-center home-loading">Cargando canchas...</div>
            ) : (
                <main className="home-main">
                    {/* Sección destacada eliminada por petición del usuario */}
                    <section>
                        <h3 className="home-section-title">Todas las canchas</h3>
                        <div className="gifs-container">
                            {canchas.length === 0 ? (
                                <p className="home-empty-message">No se encontraron canchas.</p>
                            ) : (
                                canchas.map(cancha => (
                                    <CourtCard key={cancha.id} cancha={cancha} />
                                ))
                            )}
                        </div>
                    </section>
                </main>
            )}

            <footer className="home-footer">
                <div>
                    <strong>TuCancha</strong>
                    <div className="home-footer-info">Conecta jugadores y canchas locales</div>
                </div>
                <div className="home-footer-copyright">© {new Date().getFullYear()} TuCancha</div>
            </footer>
        </div>
    );
};