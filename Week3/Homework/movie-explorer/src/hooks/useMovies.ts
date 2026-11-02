import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '../apis/movie';
import { MAX_PAGE } from '../constants/api';
import { MIN_VOTE_COUNT, type RatingFilterOption } from '../constants/filter';

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
  });
};