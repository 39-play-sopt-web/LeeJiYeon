import styled from '@emotion/styled';
import type { Movie } from '../../types/movie';
import { formatDate, formatRating, getImageUrl } from '../../utils/format';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = getImageUrl(movie.poster_path, 'poster');

  return (
    <Card>
      <PosterWrapper>
        {posterUrl ? (
          <Poster src={posterUrl} alt={movie.title} loading="lazy" />
        ) : (
          <NoPoster>No Image</NoPoster>
        )}
        <RatingBadge>★ {formatRating(movie.vote_average)}</RatingBadge>
      </PosterWrapper>

      <Info>
        <Title>{movie.title}</Title>
        <ReleaseDate>{formatDate(movie.release_date)}</ReleaseDate>
        <Overview>{movie.overview || '줄거리 정보가 없습니다.'}</Overview>
      </Info>
    </Card>
  );
};

export default MovieCard;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const PosterWrapper = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
  background-color: ${({ theme }) => theme.colors.surfaceHover};
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

const RatingBadge = styled.span`
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onPrimary};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.2rem;
`;

const Title = styled.h3`
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ReleaseDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const Overview = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;