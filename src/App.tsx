import React, { useState } from 'react';
import axios from 'axios';
import { Movie } from './components/Movie';
import { Paginator } from './components/Paginator';
import { SearchBar } from './components/SearchBar';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [lastSearch, setLastSearch] = useState<SearchResponse | undefined>(
        undefined
    );

    return (
        <div className="App">
            <div className="container lg:md mx-auto">
                <SearchBar
                    onEnter={async (title) => {
                        setLastSearch(await search(title, currentPage));
                    }}
                />
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
                                setLastSearch(
                                    await search(
                                        lastSearch.config.params.s,
                                        page
                                    )
                                );
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
