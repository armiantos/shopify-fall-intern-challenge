import React, { useState } from 'react';

export interface SearchBarProps {
    onEnter: (searchValue: string) => void;
}

export function SearchBar({ onEnter }: SearchBarProps) {
    const [search, setSearch] = useState('');

    return (
        <div className="SearchBar m-4">
            <input
                type="text"
                id="search"
                name="search"
                className="rounded-lg p-4 border-gray-300 hover:shadow-md transition-all"
                value={search}
                placeholder="Search movie title"
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={async (e) => {
                    if (e.key === 'Enter') {
                        onEnter(search);
                    }
                }}
            />
        </div>
    );
}
