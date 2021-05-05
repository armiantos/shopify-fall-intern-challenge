import React from 'react';
import { Movie as MovieData } from '../data/OMDBTypes';

export interface MovieProps {
    movieData: MovieData;
}

export function Movie({ movieData }: MovieProps) {
    return (
        <div className="Movie">
            <img src={movieData.Poster} alt={movieData.Title + '-poster'} />
            <h3>{movieData.Title}</h3>
            <h4>{movieData.Year}</h4>
        </div>
    );
}
