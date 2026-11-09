import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/movie/MovieList';
import RatingFilter from '../components/movie/RatingFilter';
import { DEFAULT_RATING_FILTER, RATING_FILTERS } from '../constants/filter';
import { useMovies } from '../hooks/useMovies';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ratingParam = searchParams.get('rating');
  const selectedFilter =
    RATING_FILTERS.find((filter) => filter.id === ratingParam) ??
    DEFAULT_RATING_FILTER;

  const {
    data: movies = [],
    isPending,
    isError,
    isFetching,
    isFetchNextPageError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useMovies(selectedFilter);

  const loadMoreRef = useIntersectionObserver<HTMLDivElement>(
    () => fetchNextPage(),
    hasNextPage && !isFetching && !isFetchNextPageError,
  );

  const handleSelectFilter = (id: string) => {
    if (id === DEFAULT_RATING_FILTER.id) {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ rating: id }, { replace: true });
    }
    window.scrollTo({ top: 0 });
  };

  const isEmpty = !isPending && !isError && movies.length === 0;

  return (
    <section>
      <PageTitle>영화 둘러보기</PageTitle>
      <RatingFilter
        selectedId={selectedFilter.id}
        onSelect={handleSelectFilter}
      />

      {isPending && <Message>영화를 불러오는 중이에요...</Message>}
      {isError && !isFetchNextPageError && (
        <>
          <Message>영화를 불러오지 못했어요.</Message>
          <RetryButton onClick={() => refetch()}>다시 시도하기</RetryButton>
        </>
      )}
      {isEmpty && <Message>해당 별점의 영화가 없어요.</Message>}
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
  margin-bottom: 1.6rem;
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