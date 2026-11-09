export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (keyword: string) => [...postKeys.lists(), keyword] as const,
  detail: (postId: number) => [...postKeys.all, 'detail', postId] as const,
};