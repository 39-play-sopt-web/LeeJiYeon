import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import { formatDate, formatRating, getImageUrl } from '../../utils/format';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = getImageUrl(movie.poster_path, 'poster');

  return (
    <Card to={`/movie/${movie.id}`}>
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

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease;

  &:hover {
    transform: translateY(-0.6rem);
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    box-shadow: 0 1.2rem 2.4rem rgba(0, 0, 0, 0.5);
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:hover h3 {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const PosterWrapper = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 2 / 3;
  background-color: ${({ theme }) => theme.colors.surfaceHover};
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
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
  z-index: 1;
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
  transition: color 0.2s ease;
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