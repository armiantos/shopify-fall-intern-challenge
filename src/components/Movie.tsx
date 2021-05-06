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
            <div className="Placeholder bg-gray-300 w-full h-full"></div>
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
