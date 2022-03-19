import { createAction, createReducer } from '@reduxjs/toolkit';
import { createCompetence } from '../../../utils';

const initialState = {
  token: {
    name: 'Designer',
    id: '0',
    tags: ['HTML', 'CSS', 'Python'],
    competences: [createCompetence()]
  }
};

export const setSkillToken = createAction('skillToken/setSkillToken');
export const addCompetence = createAction('skillToken/addCompetence');
export const removeCompetence = createAction('skillToken/removeCompetence');
export const changeCompetenceName = createAction('skillToken/changeCompetenceName');
export const setCompetenceLevel = createAction('skillToken/setCompetenceName');

export const skillTokenReducer = createReducer(initialState, builder => {
  builder.addCase(setSkillToken, (state, action) => {
    state.token = action.payload;
  });
  builder.addCase(addCompetence, state => {
    state.token.competences.push(createCompetence());
  });
  builder.addCase(removeCompetence, (state, action) => {
    const { id } = action.payload;
    if (state.token.competences.length > 1) {
      const newCompetences = state.token.competences.filter(item => item.id !== id);
      state.token.competences = [...newCompetences];
    }
  });
  builder.addCase(changeCompetenceName, (state, action) => {
    const { id, value } = action.payload;
    state.token.competences = state.token.competences.map(item => {
      if (item.id === id) {
        item.name = value;
      }
      return item;
    });
  });
  builder.addCase(setCompetenceLevel, (state, action) => {
    const { name, value } = action.payload;
    state.token.competences = state.token.competences.map(item => {
      if (item.id === name) {
        item.level.name = value;
      }
      return item;
    });
  });
});
