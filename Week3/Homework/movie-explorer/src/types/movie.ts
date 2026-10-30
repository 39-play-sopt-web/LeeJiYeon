export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieListParams {
  page: number;
  sort_by?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  tagline: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  status: string;
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  budget: number;
  revenue: number;
}