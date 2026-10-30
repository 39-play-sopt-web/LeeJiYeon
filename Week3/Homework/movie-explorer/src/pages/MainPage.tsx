import { useMemo } from 'react';
import styled from '@emotion/styled';
import MovieList from '../components/movie/MovieList';
import { useMovies } from '../hooks/useMovies';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { Movie } from '../types/movie';

const MainPage = () => {
  const {
    data,
    isPending,
    isError,
    isFetchNextPageError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies();

  const movies = useMemo(() => {
    const movieMap = new Map<number, Movie>();
    data?.pages.forEach((page) => {
      page.results.forEach((movie) => {
        if (!movieMap.has(movie.id)) movieMap.set(movie.id, movie);
      });
    });
    return [...movieMap.values()];
  }, [data]);

  const loadMoreRef = useIntersectionObserver<HTMLDivElement>(
    () => fetchNextPage(),
    hasNextPage && !isFetchingNextPage && !isFetchNextPageError,
  );

  return (
    <section>
      <PageTitle>영화 둘러보기</PageTitle>

      {isPending && <Message>영화를 불러오는 중이에요...</Message>}
      {isError && !isFetchNextPageError && (
        <Message>영화를 불러오지 못했어요. 잠시 후 다시 시도해주세요.</Message>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}

      <LoadMoreTrigger ref={loadMoreRef} />

      {isFetchingNextPage && <Message>영화를 더 불러오는 중이에요...</Message>}
      {isFetchNextPageError && (
        <RetryButton onClick={() => fetchNextPage()}>
          불러오지 못했어요. 다시 시도하기
        </RetryButton>
      )}
      {!hasNextPage && movies.length > 0 && (
        <Message>모든 영화를 다 불러왔어요</Message>
      )}
    </section>
  );
};

export default MainPage;

const PageTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
`;

const Message = styled.p`
  padding: 4rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoadMoreTrigger = styled.div`
  height: 1px;
`;

const RetryButton = styled.button`
  display: block;
  margin: 4rem auto;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.onPrimary};
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;