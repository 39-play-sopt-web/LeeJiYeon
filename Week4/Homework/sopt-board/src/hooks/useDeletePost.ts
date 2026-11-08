import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../api/posts';
import { postKeys } from '../constants/queryKeys';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};