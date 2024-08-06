import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Асинхронные thunk-ы с обработкой ошибок
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/login', params);
    return data;
  } catch (error) {
    console.error('Axios error:', error);
    return rejectWithValue(error.response.data);
  }
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params, { rejectWithValue }) => {
  try {
    console.log('Register params:', params);  // Логирование параметров
    const { data } = await axios.post('/auth/register', params); // Передача параметров в запрос
    return data;
  } catch (error) {
    console.error('Axios error:', error);
    return rejectWithValue(error.response.data);
  }
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    console.error('Axios error:', error);
    return rejectWithValue(error.response.data);
  }
});

// Начальное состояние
const initialState = {
  data: null,
  status: 'loading',
  error: null,
};

// Слайс с использованием builder callback notation для extraReducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.data = null;
        state.error = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
        state.error = action.payload;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.data = null;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
        state.error = action.payload;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading';
        state.data = null;
        state.error = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAuthMe.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
        state.error = action.payload;
      });
  },
});

// Добавляем селектор для проверки авторизации
export const selectIsAuth = (state) => Boolean(state.auth.data);

// Экспорт редюсера и действий
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
