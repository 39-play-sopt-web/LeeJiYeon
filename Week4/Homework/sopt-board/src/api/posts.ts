import { instance } from './instance';
import type { ApiResponse } from '../types/common';
import type { CreatePostRequest, Post, UpdatePostRequest } from '../types/post';

export const getPost = async (postId: number) => {
  const { data } = await instance.get<ApiResponse<Post>>(`/api/v1/posts/${postId}`);
  return data.data;
};

export const createPost = async (body: CreatePostRequest) => {
  await instance.post('/api/v1/posts', body);
};

export const updatePost = async (postId: number, body: UpdatePostRequest) => {
  await instance.put(`/api/v1/posts/${postId}`, body);
};

export const deletePost = async (postId: number) => {
  await instance.delete(`/api/v1/posts/${postId}`);
};