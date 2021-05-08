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
            <div className="container lg:md mx-auto">
                <div className="SearchBar">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        className="rounded-lg p-4 m-4 border-gray-300 hover:shadow-md transition-all"
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
                        <div className="SearchResults grid grid-cols-2 lg:grid-cols-5 gap-4 m-4">
                            {lastSearch.data.Search !== undefined &&
                                lastSearch.data.Search.map((movie) => (
                                    <Movie
                                        key={movie.imdbID}
                                        movieData={movie}
                                    />
                                ))}
                        </div>

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
                    </>
                )}
                {/* TODO: Handle no results found */}
            </div>
        </div>
    );
}

export default App;
