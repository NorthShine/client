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
        competences: [
          {
            id: '6989724c-47a5-499a-aa61-2b6ec8c24af8',
            name: 'Figma',
            level: {
              name: 'Junior'
            }
          },
          {
            id: '4148d6fd-ac15-4251-907e-d05d21f5e488',
            name: 'CSS',
            level: {
              name: 'Senior'
            }
          }
        ]
      },
      {
        name: 'Writer',
        id: '1',
        tags: ['HTML', 'CSS', 'Python'],
        competences: [
          {
            id: '3b302f93-b7e6-4e33-8abe-f638a002a5c8',
            name: 'HTML',
            level: {
              name: 'Junior'
            }
          },
          {
            id: '5b31d759-66b9-40e9-b1bf-879cc7e72910',
            name: 'JavaScript',
            level: {
              name: 'Senior'
            }
          }
        ]
      },
      ,
      {
        name: 'Developer',
        id: '2',
        tags: ['HTML', 'CSS', 'Python'],
        competences: [
          {
            id: 'cdd94a90-cf95-473d-b326-616a4e0621ee',
            name: 'Python',
            level: {
              name: 'Junior'
            }
          },
          {
            id: '4148d6fd-ac15-4251-907e-d05d21f5e488',
            name: 'Java',
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
