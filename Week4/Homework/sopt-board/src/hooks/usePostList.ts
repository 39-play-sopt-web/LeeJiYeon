import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';
import { postKeys } from '../constants/queryKeys';

const PAGE_SIZE = 10;

export const usePostList = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: postKeys.list(keyword),
    queryFn: ({ pageParam }) => getPosts({ keyword, cursor: pageParam, size: PAGE_SIZE }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.nextCursor !== null ? lastPage.nextCursor : undefined,
  });
};