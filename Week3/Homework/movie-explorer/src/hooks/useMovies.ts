import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '../apis/movie';
import { MAX_PAGE } from '../constants/api';

export const useMovies = () => {
  return useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: ({ pageParam }) => getMovies({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const lastAvailablePage = Math.min(lastPage.total_pages, MAX_PAGE);
      return lastPage.page < lastAvailablePage ? lastPage.page + 1 : undefined;
    },
  });
};