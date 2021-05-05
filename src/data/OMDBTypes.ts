export interface SearchResponse {
    data: Data;
    status: number;
    statusText: string;
    headers: Headers;
    config: Config;
    request: Request;
}

export interface Config {
    url: string;
    method: string;
    headers: ConfigHeaders;
    params: Params;
    transformRequest: null[];
    transformResponse: null[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
}

export interface ConfigHeaders {
    Accept: string;
}

export interface Params {
    apikey: string;
    s: string;
}

export interface Data {
    Search: Movie[];
    totalResults: string;
    Response: string;
}

export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: Type;
    Poster: string;
}

export enum Type {
    Movie = 'movie',
    Series = 'series',
}

export interface Headers {
    'cache-control': string;
    'content-type': string;
    expires: string;
    'last-modified': string;
}

export interface Request {}
