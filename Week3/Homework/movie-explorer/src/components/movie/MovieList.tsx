import styled from '@emotion/styled';
import type { Movie } from '../../types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <Grid>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </Grid>
  );
};

export default MovieList;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 2rem;
`;