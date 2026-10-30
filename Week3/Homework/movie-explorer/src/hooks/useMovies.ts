import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../apis/movie';

export const useMovies = () => {
  return useQuery({
    queryKey: ['movies', 1],
    queryFn: () => getMovies({ page: 1 }),
  });
};