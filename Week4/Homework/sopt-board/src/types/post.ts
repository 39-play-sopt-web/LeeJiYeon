export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostSummary {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostListParams {
  keyword?: string;
  cursor?: number;
  size?: number;
}

export interface PostListResponse {
  posts: PostSummary[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}