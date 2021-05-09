import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie as MovieComponent } from './components/Movie';
import { Paginator } from './components/Paginator';
import { SearchBar } from './components/SearchBar';

import { SearchResponse, Type, Movie } from './data/OMDBTypes';

import './App.css';
import { Banner } from './components/Banner';

// OMDB constants
const API_KEY = 'e287055f';
const RESULTS_PER_PAGE = 10;

const MAX_NOMINEES = 5;

/**
 * Requests OMDB for movie details given its title. Undefined is returned if no movies with given title was found.
 *
 * @param title of movie
 * @param page with current title to look for. 1-indexed.
 * @returns a SearchResponse (contains a list of titles, posters, and total number of results)
 */
async function search(title: string, page: number): Promise<SearchResponse | undefined> {
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
    const [lastSearch, setLastSearch] = useState<SearchResponse | undefined>(undefined);
    const [isBannerVisible, setBannerVisibility] = useState(false);

    useEffect(() => {
        if (nominees.length === MAX_NOMINEES) {
            setBannerVisibility(true);
        }
    }, [setBannerVisibility, nominees]);

    return (
        <div className="App">
            <Banner display={isBannerVisible}>
                <h2 className="text-5xl mt-4 mb-8 font-bold text-green-800">Here are your nominees!</h2>
                <p>
                    You have nominated the following 5 movies! Please double check your nominees below and choose <i>Cancel</i> or{' '}
                    <i>Submit</i>
                </p>
                <div className="FinalNominees grid grid-cols-2 lg:grid-cols-5 gap-4 m-4">
                    {nominees.map((movie) => (
                        <MovieComponent key={movie.imdbID} movieData={movie} />
                    ))}
                </div>
                <div className="flex flex-row justify-center">
                    <button
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 m-2 rounded shadow-sm hover:shadow-md transition-all"
                        onClick={(_) => {
                            setBannerVisibility(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 m-2 rounded shadow-sm hover:shadow-md transition-all"
                        onClick={(_) => {
                            setBannerVisibility(false); // Dummy implementation, this should post the results to an endpoint
                        }}
                    >
                        Submit
                    </button>
                </div>
            </Banner>

            <div className="container lg:md mx-auto mb-16">
                <h1 className="text-5xl pt-16 pb-8 font-bold text-green-800">The Shoppies 🏆</h1>
                <h4 className="text-lg mt-2 mb-4 text-gray-600">Nominate your favourite movies for the Shoppies!</h4>
                <p className="text-gray-600">
                    You can nominate {MAX_NOMINEES} movies using our search engine below. You can also modify your nominees in the{' '}
                    <i>My nominees</i> section
                </p>

                <h2 className="text-4xl text-green-600 mt-8 mb-6 font-medium">Search</h2>
                <SearchBar
                    onEnter={async (title) => {
                        // If the user enters a new search always default to page 1 (because a page 2 for the new title may not exist)
                        setCurrentPage(1);
                        setLastSearch(await search(title, 1));
                    }}
                />
                {lastSearch !== undefined && (
                    <>
                        <div className="SearchResults grid grid-cols-2 lg:grid-cols-5 gap-4">
                            {lastSearch.data.Search !== undefined &&
                                lastSearch.data.Search.map((movie) => (
                                    <MovieComponent key={movie.imdbID} movieData={movie}>
                                        <button
                                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 m-2 rounded shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:bg-green-600 disabled:cursor-not-allowed"
                                            disabled={nominees.findIndex((nominee) => nominee.imdbID === movie.imdbID) >= 0}
                                            onClick={(_) => nominees.length < MAX_NOMINEES && setNominees([...nominees, movie])}
                                        >
                                            Nominate
                                        </button>
                                    </MovieComponent>
                                ))}
                        </div>

                        <Paginator
                            onChangePage={async (page) => {
                                setCurrentPage(page);
                                setLastSearch(await search(lastSearch.config.params.s, page));
                            }}
                            numPages={Math.round(+lastSearch.data.totalResults / RESULTS_PER_PAGE)}
                            currentPage={currentPage}
                        />
                    </>
                )}
                {lastSearch === undefined && <p>Sorry we could not find any movies with the given title</p>}

                <h2 className="text-4xl text-green-600 mt-8 mb-6 font-medium">My nominees</h2>
                {nominees.length === 0 && <p>You have not nominated any movies</p>}
                <div className="Nominees grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {nominees.map((movie) => (
                        <MovieComponent key={movie.imdbID} movieData={movie}>
                            <button
                                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 m-2 rounded shadow-sm hover:shadow-md transition-all"
                                onClick={(_) => {
                                    setNominees(nominees.filter((nominee) => nominee.imdbID !== movie.imdbID));
                                }}
                            >
                                Remove
                            </button>
                        </MovieComponent>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
