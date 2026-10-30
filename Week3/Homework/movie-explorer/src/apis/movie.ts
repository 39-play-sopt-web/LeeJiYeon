import { instance } from './instance';
import type {
  MovieDetail,
  MovieListParams,
  MovieListResponse,
} from '../types/movie';

export const getMovies = async (
  params: MovieListParams,
): Promise<MovieListResponse> => {
  const { data } = await instance.get<MovieListResponse>('/discover/movie', {
    params: {
      sort_by: 'popularity.desc',
      ...params,
    },
  });
  return data;
};

export const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const { data } = await instance.get<MovieDetail>(`/movie/${movieId}`);
  return data;
};