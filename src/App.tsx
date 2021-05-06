import React, { useState } from 'react';
import axios from 'axios';
import { Movie as MovieComponent } from './components/Movie';
import { Paginator } from './components/Paginator';

import { SearchResponse, Type } from './data/OMDBTypes';

import './App.css';

const API_KEY = 'e287055f';

async function search(title: string): Promise<SearchResponse> {
    return await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: API_KEY,
            s: title,
            type: Type.Movie,
        },
    });
}

function App() {
    const [title, setTitle] = useState('');
    const [lastSearch, setLastSearch] = useState<SearchResponse | undefined>(
        undefined
    );

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
                            let results = await search(title);
                            console.log(results);
                            setLastSearch(results);
                        }
                    }}
                />
            </div>
            {lastSearch !== undefined && (
                <>
                    <Paginator
                        onChangePage={(page) => {
                            console.log(page);
                        }}
                        numPages={Math.round(
                            +lastSearch.data.totalResults / 10
                        )}
                        currentPage={0} /* TODO */
                    />
                    <div className="SearchResults">
                        {lastSearch.data.Search !== undefined &&
                            lastSearch.data.Search.map((movie) => (
                                <MovieComponent movieData={movie} />
                            ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
