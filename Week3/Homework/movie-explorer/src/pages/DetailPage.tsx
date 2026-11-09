import styled from '@emotion/styled';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MovieBasicInfo from '../components/detail/MovieBasicInfo';
import MovieDetailHero from '../components/detail/MovieDetailHero';
import { useMovieDetail } from '../hooks/useMovieDetail';

const DetailPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const id = Number(movieId);
  const isValidId = Number.isInteger(id) && id > 0;

  const { data: movie, isPending, isError } = useMovieDetail(id, isValidId);

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const renderContent = () => {
    if (!isValidId) return <Message>잘못된 영화 주소예요.</Message>;
    if (isPending) return <Message>영화 정보를 불러오는 중이에요...</Message>;
    if (isError) return <Message>영화 정보를 불러오지 못했어요.</Message>;

    return (
      <>
        <MovieDetailHero movie={movie} />

        <Section>
          <SectionTitle>줄거리</SectionTitle>
          <Overview>{movie.overview || '줄거리 정보가 없습니다.'}</Overview>
        </Section>

        <MovieBasicInfo movie={movie} />
      </>
    );
  };

  return (
    <Wrapper>
      <BackButton type="button" onClick={handleBack}>
        ← 목록으로 돌아가기
      </BackButton>
      {renderContent()}
    </Wrapper>
  );
};

export default DetailPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const BackButton = styled.button`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
`;

const Overview = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  word-break: keep-all;
`;

const Message = styled.p`
  padding: 6rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;