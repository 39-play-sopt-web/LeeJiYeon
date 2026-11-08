import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import PostEditForm from '../components/PostEditForm';
import { usePostDetail } from '../hooks/usePostDetail';
import { useUpdatePost } from '../hooks/useUpdatePost';
import { useDeletePost } from '../hooks/useDeletePost';
import { storage } from '../utils/storage';
import { formatDate } from '../utils/formatDate';
import { getErrorMessage } from '../utils/getErrorMessage';
import type { UpdatePostRequest } from '../types/post';

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { postId: postIdParam } = useParams();
  const postId = Number(postIdParam);

  const [isEditing, setIsEditing] = useState(false);

  const { data: post, isPending, isError } = usePostDetail(postId);
  const { mutate: updateMutate, isPending: isUpdating } = useUpdatePost();
  const { mutate: deleteMutate, isPending: isDeleting } = useDeletePost();

  const goToList = () => navigate('/posts');

  const checkAuth = () => {
    if (storage.getAuthCode()) return true;

    alert('회원 코드를 먼저 발급받아 주세요.');
    navigate('/auth');
    return false;
  };

  const handleEditClick = () => {
    if (!checkAuth()) return;
    setIsEditing(true);
  };

  const handleSave = (body: UpdatePostRequest) => {
    updateMutate(
      { postId, body },
      {
        onSuccess: () => {
          alert('게시글이 수정되었어요.');
          setIsEditing(false);
        },
        onError: (error) => {
          alert(getErrorMessage(error, '게시글 수정에 실패했어요.'));
        },
      },
    );
  };

  const handleDelete = () => {
    if (!checkAuth()) return;
    if (!confirm('정말 삭제할까요?')) return;

    deleteMutate(postId, {
      onSuccess: () => {
        alert('게시글이 삭제되었어요.');
        navigate('/posts', { replace: true });
      },
      onError: (error) => {
        alert(getErrorMessage(error, '게시글 삭제에 실패했어요.'));
      },
    });
  };

  const renderContent = () => {
    if (!Number.isInteger(postId) || postId <= 0) {
      return <Status>잘못된 주소예요.</Status>;
    }
    if (isPending) return <Status>불러오는 중...</Status>;
    if (isError || !post) return <Status>게시글을 불러오지 못했어요.</Status>;

    if (isEditing) {
      return (
        <Card>
          <PostEditForm
            initialValue={{ title: post.title, content: post.content }}
            isPending={isUpdating}
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
          />
        </Card>
      );
    }

    const isEdited = post.updatedAt !== post.createdAt;

    return (
      <Card>
        <Title>{post.title}</Title>
        <Meta>
          <Author>{post.author}</Author>
          <span>
            {formatDate(post.createdAt)}
            {isEdited && ' (수정됨)'}
          </span>
        </Meta>
        <Content>{post.content}</Content>

        <Divider />

        <ButtonRow>
          <SubButton type="button" onClick={handleEditClick}>
            수정
          </SubButton>
          <DangerButton type="button" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </DangerButton>
        </ButtonRow>
      </Card>
    );
  };

  return (
    <>
      <BackButton type="button" onClick={goToList}>
        ← 목록으로
      </BackButton>
      {renderContent()}
    </>
  );
};

export default PostDetailPage;

const BackButton = styled.button`
  margin-bottom: 16px;
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray500};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const Status = styled.p`
  margin-top: 40px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray500};
  text-align: center;
`;

const Card = styled.article`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  word-break: break-all;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const Author = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.p`
  margin-top: 20px;
  font-size: 15px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-all;
`;

const Divider = styled.hr`
  margin: 24px 0 16px;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const SubButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.gray500};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const DangerButton = styled.button`
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;