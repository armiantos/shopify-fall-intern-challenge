import React, { useState } from 'react';
import axios from 'axios';
import { Movie as MovieComponent } from './components/Movie';
import { Paginator } from './components/Paginator';
import { SearchBar } from './components/SearchBar';

import { SearchResponse, Type, Movie } from './data/OMDBTypes';

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
    const [nominees, setNominees] = useState<Movie[]>([]);
    const [lastSearch, setLastSearch] = useState<SearchResponse | undefined>(
        undefined
    );

    return (
        <div className="App">
            <div className="container lg:md mx-auto">
                <h1 className="text-5xl ">The Shoppies</h1>

                <h1 className="text-4xl text-green-600">My nominees</h1>
                <div className="SearchResults grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {nominees.map((movie) => (
                        <MovieComponent key={movie.imdbID} movieData={movie}>
                            <button
                                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 m-2 rounded shadow-sm hover:shadow-md transition-all"
                                onClick={(_) => {
                                    setNominees(
                                        nominees.filter(
                                            (nominee) => nominee !== movie
                                        )
                                    );
                                }}
                            >
                                Remove
                            </button>
                        </MovieComponent>
                    ))}
                </div>

                <h1 className="text-4xl text-green-600">Search</h1>
                <SearchBar
                    onEnter={async (title) => {
                        setLastSearch(await search(title, currentPage));
                    }}
                />
                {lastSearch !== undefined && (
                    <>
                        <div className="SearchResults grid grid-cols-2 lg:grid-cols-5 gap-4">
                            {lastSearch.data.Search !== undefined &&
                                lastSearch.data.Search.map((movie) => (
                                    <MovieComponent
                                        key={movie.imdbID}
                                        movieData={movie}
                                    >
                                        <button
                                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 m-2 rounded shadow-sm hover:shadow-md transition-all"
                                            onClick={(_) =>
                                                setNominees([
                                                    ...nominees,
                                                    movie,
                                                ])
                                            }
                                        >
                                            Nominate
                                        </button>
                                    </MovieComponent>
                                ))}
                        </div>

                        <Paginator
                            onChangePage={async (page) => {
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
            </div>
        </div>
    );
}

export default App;
