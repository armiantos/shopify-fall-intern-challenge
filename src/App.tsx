import React, { useState } from 'react';
import './App.css';

function App() {
    const [search, updateSearch] = useState('');

    return (
        <div className="App">
            <div className="SearchBar">
                <input
                    type="text"
                    id="search"
                    name="search"
                    value={search}
                    placeholder="Search movie title"
                    onChange={(e) => updateSearch(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            console.log(search);
                            // TODO: perform search
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default App;
