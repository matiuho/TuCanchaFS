// ===================================
// src/sharedComponents/components/SearchBar.tsx
// ===================================

import { useState, useEffect, useCallback } from 'react';
import type { FC, ChangeEvent } from 'react';
import '../../styles/components/SearchBar.css';

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
                className="search-input search-bar-input"
                placeholder={placeHolder}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};