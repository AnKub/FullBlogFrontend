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
    deleteStatus: 'idle', // Добавляем состояние для удаления
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
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = 'loaded';
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = 'error';
      })
      // Fetch tags
      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = 'loaded';
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = 'error';
      })
      // Delete posts
      .addCase(fetchRemovePost.pending, (state) => {
        state.posts.deleteStatus = 'loading'; // Устанавливаем статус загрузки
      })
      .addCase(fetchRemovePost.fulfilled, (state, action) => {
        state.posts.items = state.posts.items.filter((obj) => obj._id !== action.payload);
        state.posts.deleteStatus = 'idle'; // Устанавливаем статус как завершенный
      })
      .addCase(fetchRemovePost.rejected, (state) => {
        state.posts.deleteStatus = 'error'; // Устанавливаем статус ошибки
      });
  },
});

export const postsReducer = postsSlice.reducer;
