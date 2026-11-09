import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../api/posts';
import { postKeys } from '../constants/queryKeys';
import type { UpdatePostRequest } from '../types/post';

interface UpdatePostVariables {
  postId: number;
  body: UpdatePostRequest;
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, body }: UpdatePostVariables) => updatePost(postId, body),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
};