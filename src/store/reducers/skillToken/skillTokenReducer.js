import { createAction, createReducer } from '@reduxjs/toolkit';
import { createCompetence } from '../../../utils';

const initialState = {
  token: {
    name: 'Designer',
    id: '0',
    tags: ['HTML', 'CSS', 'Python'],
    competencies: [createCompetence()]
  }
};

export const setSkillToken = createAction('skillToken/setSkillToken');
export const addCompetence = createAction('skillToken/addCompetence');
export const removeCompetence = createAction('skillToken/removeCompetence');
export const changeCompetenceName = createAction('skillToken/changeCompetenceName');
export const setCompetenceLevel = createAction('skillToken/setCompetenceName');
export const updateSkillTokenName = createAction('skillToken/updateSkillTokenName');
export const updateSkillTokenTags = createAction('skillToken/updateSkillTokenTags');

export const skillTokenReducer = createReducer(initialState, builder => {
  builder.addCase(updateSkillTokenTags, (state, action) => {
    state.token.tags = action.payload;
  });
  builder.addCase(updateSkillTokenName, (state, action) => {
    const { value } = action.payload;
    state.token.name = value;
  });
  builder.addCase(setSkillToken, (state, action) => {
    state.token = action.payload;
  });
  builder.addCase(addCompetence, (state, action) => {
    state.token.competencies.push(createCompetence(action.payload));
  });
  builder.addCase(removeCompetence, (state, action) => {
    const { id } = action.payload;
    if (state.token.competencies.length > 1) {
      const newCompetencies = state.token.competencies.filter(item => item.id !== id);
      state.token.competencies = [...newCompetencies];
    }
  });
  builder.addCase(changeCompetenceName, (state, action) => {
    const { id, value } = action.payload;
    state.token.competencies = state.token.competencies.map(item => {
      if (item.id === id) {
        item.name = value;
      }
      return item;
    });
  });
  builder.addCase(setCompetenceLevel, (state, action) => {
    const { name, value } = action.payload;
    state.token.competencies = state.token.competencies.map(item => {
      if (item.id === name) {
        item.level.name = value;
      }
      return item;
    });
  });
});
