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
    if (link === 'N/A') {
        // TODO: Replace with svg
        return <div className="Placeholder bg-gray-300 w-full h-full"></div>;
    }

    return <img src={link} alt={alt} />;
}

export function Movie({ movieData }: MovieProps) {
    return (
        <div className="Movie rounded-lg shadow-sm bg-white flex flex-col justify-center items-center p-4">
            <div className="Poster flex-grow grid place-items-center m-4 w-full h-full">
                <Poster
                    posterLink={movieData.Poster}
                    alt={movieData.Title + '-poster'}
                />
            </div>
            <h3>{movieData.Title}</h3>
            <h4>{movieData.Year}</h4>
        </div>
    );
}
