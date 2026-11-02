import styled from '@emotion/styled';
import type { MovieDetail } from '../../types/movie';
import {
  formatDate,
  formatRating,
  formatRuntime,
  formatStatus,
  formatVoteCount,
  getImageUrl,
} from '../../utils/format';

interface MovieDetailHeroProps {
  movie: MovieDetail;
}

const MovieDetailHero = ({ movie }: MovieDetailHeroProps) => {
  const posterUrl = getImageUrl(movie.poster_path, 'poster');
  const backdropUrl = getImageUrl(movie.backdrop_path, 'backdrop');

  return (
    <Hero>
      {backdropUrl && <Backdrop src={backdropUrl} alt="" />}
      <Overlay />

      <Content>
        <PosterWrapper>
          {posterUrl ? (
            <Poster src={posterUrl} alt={movie.title} />
          ) : (
            <NoPoster>No Image</NoPoster>
          )}
        </PosterWrapper>

        <Info>
          <StatusBadge>{formatStatus(movie.status)}</StatusBadge>
          <Title>{movie.title}</Title>
          {movie.tagline && <Tagline>{movie.tagline}</Tagline>}

          <Rating>
            <Star>★</Star>
            <Score>{formatRating(movie.vote_average)}</Score>
            <VoteCount>({formatVoteCount(movie.vote_count)}명 투표)</VoteCount>
          </Rating>

          <MetaList>
            <MetaItem>
              <MetaLabel>개봉일</MetaLabel>
              <span>{formatDate(movie.release_date)}</span>
            </MetaItem>
            <MetaItem>
              <MetaLabel>상영 시간</MetaLabel>
              <span>{formatRuntime(movie.runtime)}</span>
            </MetaItem>
          </MetaList>

          {movie.genres.length > 0 && (
            <GenreList>
              {movie.genres.map((genre) => (
                <GenreChip key={genre.id}>{genre.name}</GenreChip>
              ))}
            </GenreList>
          )}
        </Info>
      </Content>
    </Hero>
  );
};

export default MovieDetailHero;

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Backdrop = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(20, 20, 20, 0.95) 0%,
    rgba(20, 20, 20, 0.8) 50%,
    rgba(20, 20, 20, 0.5) 100%
  );
`;

const Content = styled.div`
  position: relative;
  display: flex;
  gap: 3.2rem;
  padding: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    padding: 2.4rem;
  }
`;

const PosterWrapper = styled.div`
  flex-shrink: 0;
  width: 26rem;
  overflow: hidden;
  aspect-ratio: 2 / 3;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  box-shadow: 0 1.2rem 3rem rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    width: 20rem;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoPoster = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
  min-width: 0;
`;

const StatusBadge = styled.span`
  align-self: flex-start;
  padding: 0.4rem 1rem;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onPrimary};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h1`
  font-size: 3.6rem;
  font-weight: 800;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Tagline = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Rating = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
`;

const Star = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

const Score = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 800;
`;

const VoteCount = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MetaList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 2.4rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const MetaItem = styled.li`
  display: flex;
  gap: 0.8rem;
`;

const MetaLabel = styled.span`
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const GenreList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const GenreChip = styled.li`
  padding: 0.4rem 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: rgba(255, 255, 255, 0.05);
`;