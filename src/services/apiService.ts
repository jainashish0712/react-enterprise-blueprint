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

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  age: number;
  role: string;
}

export interface UsersResponse {
  users: User[];
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
    getUsers: builder.query<UsersResponse, void>({
      query: () => 'users',
    }),
  }),
});

export const { useGetThePostsDummyResQuery, useGetUsersQuery } = thisIsThePostsApi;

export const thisWillBeUsedInstoreForApi = thisIsThePostsApi.reducer;
