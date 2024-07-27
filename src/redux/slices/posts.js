import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Async thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  await axios.delete(`/posts/${id}`);
  return id; // возвращаем ID для последующего удаления из состояния
});

// Initial state
const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // Fetch posts
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // Fetch tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    // Delete posts
    [fetchRemovePost.pending]: (state, action) => {
      // Удаляем пост из состояния до завершения запроса
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
    [fetchRemovePost.fulfilled]: (state, action) => {
      // Удаляем пост из состояния после успешного завершения запроса
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.payload);
    },
    [fetchRemovePost.rejected]: (state) => {
      // Обработка ошибки удаления поста
      state.posts.status = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;
