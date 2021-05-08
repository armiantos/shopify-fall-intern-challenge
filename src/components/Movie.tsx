import React from 'react';
import { Movie as MovieData } from '../data/OMDBTypes';

export interface MovieProps {
    movieData: MovieData;
}

interface PosterProps {
    posterLink: string;
    alt: string;
}

function Poster({ posterLink: link, alt }: PosterProps) {
    let posterImage = <img src={link} alt={alt} />;

    if (link === 'N/A') {
        // TODO: Replace with svg
        posterImage = (
            <svg
                width="100%"
                viewBox="0 0 648 960"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="648" height="960" fill="#C9C9C9" />
                <rect x="195" y="420" width="257" height="128" fill="#9B9B9B" />
                <rect x="195" y="389" width="257" height="20" fill="#9B9B9B" />
                <rect x="209" y="364" width="44" height="21" fill="#9B9B9B" />
                <circle
                    cx="351.5"
                    cy="484.5"
                    r="43.5"
                    fill="#9B9B9B"
                    stroke="#C9C9C9"
                    stroke-width="14"
                />
            </svg>
        );
    }

    return (
        <div className="Poster flex-grow grid place-items-center m-4 w-full h-full">
            {posterImage}
        </div>
    );
}

export function Movie({ movieData }: MovieProps) {
    return (
        <div className="Movie rounded-lg shadow-sm bg-white flex flex-col justify-center items-center p-4">
            <Poster
                posterLink={movieData.Poster}
                alt={movieData.Title + '-poster'}
            />
            <h3>{movieData.Title}</h3>
            <h4>{movieData.Year}</h4>
        </div>
    );
}
