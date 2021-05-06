import React, { useState } from 'react';
import axios from 'axios';
import { Movie } from './components/Movie';
import { Paginator } from './components/Paginator';

import { SearchResponse, Type } from './data/OMDBTypes';

import './App.css';

const API_KEY = 'e287055f';

async function search(
    title: string,
    page: number
): Promise<SearchResponse | undefined> {
    let resp: SearchResponse = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: API_KEY,
            s: title,
            type: Type.Movie,
            page,
        },
    });

    if ('Error' in resp.data) {
        return undefined;
    }

    return resp;
}

function App() {
    const [title, setTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
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
                            setLastSearch(await search(title, currentPage));
                        }
                    }}
                />
            </div>
            {lastSearch !== undefined && (
                <>
                    <Paginator
                        onChangePage={async (page) => {
                            console.log(page);
                            setCurrentPage(page);
                            setLastSearch(await search(title, page));
                        }}
                        numPages={Math.round(
                            +lastSearch.data.totalResults / 10
                        )}
                        currentPage={currentPage} /* TODO */
                    />
                    <div className="SearchResults">
                        {lastSearch.data.Search !== undefined &&
                            lastSearch.data.Search.map((movie) => (
                                <Movie key={movie.imdbID} movieData={movie} />
                            ))}
                    </div>
                </>
            )}
            {/* TODO: Handle no results found */}
        </div>
    );
}

export default App;
