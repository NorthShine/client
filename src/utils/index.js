import { v4 as uuid } from 'uuid';

export const createCompetence = () => ({
  id: uuid(),
  name: '',
  level: {
    name: 'Junior'
  }
});