import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';
import { postKeys } from '../constants/queryKeys';
import type { CreatePostRequest } from '../types/post';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreatePostRequest) => createPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};