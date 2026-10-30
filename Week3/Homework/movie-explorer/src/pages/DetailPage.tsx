import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { movieId } = useParams();

  return <h2>영화 상세 페이지 (id: {movieId})</h2>;
};

export default DetailPage;