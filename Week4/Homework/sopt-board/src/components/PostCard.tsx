import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import type { PostSummary } from '../types/post';

interface PostCardProps {
  post: PostSummary;
}

const PostCard = ({ post }: PostCardProps) => {
  const { id, title, content, author, createdAt } = post;

  return (
    <Card to={`/posts/${id}`}>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Meta>
        <Author>{author}</Author>
        <span>{formatDate(createdAt)}</span>
      </Meta>
    </Card>
  );
};

export default PostCard;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.white};
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 700;
`;

const Content = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray500};
  white-space: pre-wrap;
  word-break: break-all;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const Author = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;