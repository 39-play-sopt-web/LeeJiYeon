import { useQuery } from '@tanstack/react-query';
import { getMovieDetail } from '../apis/movie';

export const useMovieDetail = (movieId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled,
  });
};