import { LOAD } from './Categories.action';

const initState = {
  categories: {
    albums: [],
    movies: [],
    books: [],
    ebooks: []
  }
};
export const CategorieReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD: {
      const { values } = action;
      return {
        ...state,
        categories: {
          albums: values[0].data,
          movies: values[1].data,
          books: values[2].data,
          ebooks: values[3].data
        }
      };
    }
    default:
      return state;
  }
};
