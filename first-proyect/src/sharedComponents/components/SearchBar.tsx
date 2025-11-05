// ===================================
// src/sharedComponents/components/SearchBar.tsx
// ===================================

import { useState, useEffect, useCallback } from 'react';
import type { FC, ChangeEvent } from 'react';

interface Props {
    placeHolder?: string;
    onQuery: (query: string) => void;
}

export const SearchBar: FC<Props> = ({ placeHolder = "Buscar...", onQuery }) => {
    const [inputValue, setInputValue] = useState('');

    const debouncedSearch = useCallback((value: string) => {
        onQuery(value);
    }, [onQuery]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            debouncedSearch(inputValue);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [inputValue, debouncedSearch]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder={placeHolder}
                value={inputValue}
                onChange={handleInputChange}
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
            />
        </div>
    );

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