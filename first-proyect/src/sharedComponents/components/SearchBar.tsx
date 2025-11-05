// ===================================
// src/sharedComponents/components/SearchBar.tsx
// ===================================

import React, { FC, useState, ChangeEvent } from 'react';

interface Props {
    placeHolder: string;
    // La propiedad onQuery es la que el padre (HomePageController) usará
    onQuery: (query: string) => void;
}

// Requisito: Componente funcional que recibe PROPIEDADES (placeHolder, onQuery)
export const SearchBar: FC<Props> = ({ placeHolder, onQuery }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setInputValue(newQuery);
        
        // No llamamos a onQuery aquí, delegamos esa lógica de debounce al padre.
        // Solo necesitamos notificar al padre sobre el cambio de texto.
        onQuery(newQuery);
    };

    return (
        <div className="search-container" style={{ margin: '20px auto', maxWidth: '600px' }}>
            <input
                type="text"
                className="search-input" // Clase CSS de tu proyecto
                placeholder={placeHolder}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};