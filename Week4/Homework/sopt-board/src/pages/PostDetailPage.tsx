import { useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const { postId } = useParams();

  return <h1>게시글 상세 {postId}</h1>;
};

export default PostDetailPage;