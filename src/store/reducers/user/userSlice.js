import { createSlice, createAction } from '@reduxjs/toolkit';
import { getUserAction } from './actionCreators';
import DefaultAvatar from '../../../assets/images/avatar.png';
import { createCompetence, createUserLink } from '../../../utils';

const initialState = {
  user: {
    name: 'John Doe',
    avatar: DefaultAvatar,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae nibh accumsan, convallis turpis a, sodales odio. Ut vel arcu a ante finibus ultrices. Cras ut ligula semper, commodo erat quis, posuere mi. Aenean ut suscipit mi, nec imperdiet erat. Integer vulputate dignissim lacinia.',
    links: [
      {
        id: '3baabd55-a7ca-4fd6-a9d5-312d1db665de',
        value: 'https://github.com'
      },
      {
        id: '7b388464-ef11-4424-bef1-a703b27ebdcc',
        value: 'https://gitlab.com'
      }
    ],
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
export const updateUserLink = createAction('user/updateUserLink');
export const addUserLink = createAction('user/addUserLink');
export const removeUserLink = createAction('user/removeUserLink');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(removeUserLink, (state, action) => {
      const { id } = action.payload;
      state.user.links = state.user.links.filter(item => item.id !== id);
    });
    builder.addCase(addUserLink, (state, action) => {
      state.user.links.push(createUserLink());
    });
    builder.addCase(updateUserLink, (state, action) => {
      const { id, value } = action.payload;
      state.user.links = state.user.links.map(item => {
        if (item.id === id) {
          item.value = value;
        }
        return item;
      });
    });
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
