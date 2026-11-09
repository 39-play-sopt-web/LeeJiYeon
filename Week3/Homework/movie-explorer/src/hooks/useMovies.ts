import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '../apis/movie';
import { MAX_PAGE } from '../constants/api';
import { MIN_VOTE_COUNT, type RatingFilterOption } from '../constants/filter';
import type { Movie } from '../types/movie';

const MOVIE_LIST_CACHE_TIME = 1000 * 60 * 30;

export const useMovies = (filter: RatingFilterOption) => {
  const isFiltered = filter.min !== undefined || filter.max !== undefined;

  return useInfiniteQuery({
    queryKey: ['movies', filter.id],
    queryFn: ({ pageParam }) =>
      getMovies({
        page: pageParam,
        'vote_average.gte': filter.min,
        'vote_average.lte': filter.max,
        'vote_count.gte': isFiltered ? MIN_VOTE_COUNT : undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const lastAvailablePage = Math.min(lastPage.total_pages, MAX_PAGE);
      return lastPage.page < lastAvailablePage ? lastPage.page + 1 : undefined;
    },
    select: (data) => {
      const movieMap = new Map<number, Movie>();
      data.pages.forEach((page) => {
        page.results.forEach((movie) => {
          if (!movieMap.has(movie.id)) movieMap.set(movie.id, movie);
        });
      });
      return [...movieMap.values()];
    },
    staleTime: MOVIE_LIST_CACHE_TIME,
    gcTime: MOVIE_LIST_CACHE_TIME,
  });
};