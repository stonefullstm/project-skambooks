import {
  NAMEINPUT,
  READERS,
  UPDATEBOOK,
} from '../actions/action';

const INICIAL_STATE = {
  books: [],
  reader: [],
  update: '',
};

const reducerFetch = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case NAMEINPUT: return ({ ...state, books: action.payload });
  case READERS: return ({ ...state, reader: action.payload });
  case UPDATEBOOK: return ({ ...state, update: action.payload });
  default: return state;
  }
};

export default reducerFetch;
