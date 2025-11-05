// ===================================
// src/pages/HomePage.tsx
// ===================================
import React, { useState, useEffect, useMemo } from 'react';
import { SearchBar } from '../sharedComponents/components/SearchBar'; // Asume que creaste la SearchBar
import { CourtCard } from '../canchas/components/CourtCard';
import { mockCanchas } from '../mock-data/canchas.mock';
import { useCart } from '../contexts/CartContexts';

// NOTA: En un proyecto real, usarías la lógica de getCanchasSimulated de las actions
// Aquí, para simplificar el mock, usamos mockCanchas directamente.

export const HomePage = () => {
    const { totalItems } = useCart();
    const [canchas, setCanchas] = useState(mockCanchas);
    
    // Aquí iría tu lógica de búsqueda con debounce (del HomePageController)
    // Pero por ahora, solo mostramos la lista completa.
    
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>🏟️ Lista de Canchas</h1>
                <p>🛒 Ítems: **{totalItems}**</p> 
                {/* En un componente real, usarías el ShoppingCartIcon */}
            </div>

            {/* Simulación de la lista que usa tu grid responsivo */}
            <div className="gifs-container" style={{ marginTop: '20px' }}>
                {canchas.map(cancha => (
                    <CourtCard key={cancha.id} cancha={cancha} />
                ))}
            </div>
        </div>
    );
};