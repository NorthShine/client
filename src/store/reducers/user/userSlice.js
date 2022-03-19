import { createSlice, createAction } from '@reduxjs/toolkit';
import { getUserAction } from './actionCreators';
import DefaultAvatar from '../../../assets/images/avatar.png';
import { createCompetence } from '../../../utils';

const initialState = {
  user: {
    name: 'John Doe',
    avatar: DefaultAvatar,
    skillTokens: [
      {
        name: 'Designer',
        id: '0',
        tags: ['HTML', 'CSS', 'Python'],
        competences: [createCompetence(), createCompetence()]
      },
      {
        name: 'Writer',
        id: '1',
        tags: ['HTML', 'CSS', 'Python'],
        competences: [createCompetence(), createCompetence()]
      },
      ,
      {
        name: 'Developer',
        id: '2',
        tags: ['HTML', 'CSS', 'Python'],
        competences: [createCompetence(), createCompetence()]
      }
    ]
  },
  isLoading: false,
  error: null
};

export const updateUserSkillToken = createAction('user/updateUserSkillToken');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(updateUserSkillToken, (state, action) => {
      const { id, token } = action.payload;
      state.user.skillTokens = state.user.skillTokens.map(item => {
        return item.id === id ? token : item;
      });
    });
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
