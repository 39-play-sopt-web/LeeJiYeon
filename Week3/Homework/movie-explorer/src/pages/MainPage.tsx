import styled from '@emotion/styled';
import MovieList from '../components/movie/MovieList';
import { useMovies } from '../hooks/useMovies';

const MainPage = () => {
  const { data, isPending, isError } = useMovies();

  return (
    <section>
      <PageTitle>영화 둘러보기</PageTitle>

      {isPending && <Message>영화를 불러오는 중이에요...</Message>}
      {isError && <Message>영화를 불러오지 못했어요. 잠시 후 다시 시도해주세요.</Message>}
      {data && <MovieList movies={data.results} />}
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
  padding: 6rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;