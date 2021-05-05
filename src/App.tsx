import React, { useState } from 'react';
import axios from 'axios';

import { SearchResponse, Movie } from './data/OMDBTypes';

import './App.css';

const API_KEY = 'e287055f';

async function search(title: string): Promise<Movie[]> {
    let res: SearchResponse = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: API_KEY,
            s: title,
        },
    });
    return res.data.Search;
}

function App() {
    const [title, setTitle] = useState('');

    return (
        <div className="App">
            <div className="SearchBar">
                <input
                    type="text"
                    id="search"
                    name="search"
                    value={title}
                    placeholder="Search movie title"
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            search(title);
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default App;
