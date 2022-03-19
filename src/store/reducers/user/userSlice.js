import { createSlice } from '@reduxjs/toolkit';
import { getUserAction } from './actionCreators';
import DefaultAvatar from '../../../assets/images/avatar.png';

const initialState = {
  user: {
    name: 'John Doe',
    avatar: DefaultAvatar,
    skillTokens: [
      {
        name: 'Designer',
        id: 0,
        competences: [
          {
            name: 'HTML',
            level: {
              name: 'Junior'
            }
          },
          {
            name: 'CSS',
            level: {
              name: 'Senior'
            }
          }
        ]
      },
      {
        name: 'Writer',
        id: 1,
        competences: [
          {
            name: 'HTML',
            level: {
              name: 'Junior'
            }
          },
          {
            name: 'CSS',
            level: {
              name: 'Senior'
            }
          }
        ]
      },
      ,
      {
        name: 'Developer',
        id: 2,
        competences: [
          {
            name: 'HTML',
            level: {
              name: 'Junior'
            }
          },
          {
            name: 'CSS',
            level: {
              name: 'Senior'
            }
          }
        ]
      }
    ]
  },
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(getUserAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
});

export const userReducer = userSlice.reducer;
