import { useQuery } from '@tanstack/react-query';
import { getPost } from '../api/posts';
import { postKeys } from '../constants/queryKeys';

export const usePostDetail = (postId: number) => {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPost(postId),
    enabled: Number.isInteger(postId) && postId > 0,
  });
};