import React, { useState } from 'react';
import axios from 'axios';
import { Movie as MovieComponent } from './components/Movie';

import { SearchResponse, Movie, Type } from './data/OMDBTypes';

import './App.css';

const API_KEY = 'e287055f';

async function search(title: string): Promise<Movie[]> {
    let res: SearchResponse = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: API_KEY,
            s: title,
            type: Type.Movie,
        },
    });

    if (res.data.Search === undefined) {
        return [];
    }

    // TODO: Handle pagination

    return res.data.Search;
}

function App() {
    const [title, setTitle] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);

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
                    onKeyUp={async (e) => {
                        if (e.key === 'Enter') {
                            setMovies(await search(title));
                        }
                    }}
                />
            </div>
            <div className="SearchResults">
                {movies.map((movie) => (
                    <MovieComponent movieData={movie} />
                ))}
            </div>
        </div>
    );
}

export default App;
