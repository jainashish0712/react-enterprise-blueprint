import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: { likes: number; dislikes: number };
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export const thisIsThePostsApi = createApi({
  reducerPath: 'postsApiReducerPath',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getThePostsDummyRes: builder.query<PostsResponse, void>({
      query: () => 'posts',
    }),
  }),
});

export const { useGetThePostsDummyResQuery } = thisIsThePostsApi;

export const thisWillBeUsedInstoreForApi = thisIsThePostsApi.reducer;
