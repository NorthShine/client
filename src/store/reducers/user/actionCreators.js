import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../../../api';

export const getUserAction = createAsyncThunk(
  'user/getUserAction',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await getUser(email);
      return response.data;
    } catch (err) {
      const response = err.response;
      return rejectWithValue({
        status: response.status,
        message: response.data.message
      });
    }
  }
);
