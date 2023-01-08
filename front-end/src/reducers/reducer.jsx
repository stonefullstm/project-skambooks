import {
  NAMEINPUT,
  READERS,
  UPDATEBOOK,
  IDREADER,
} from '../actions/action';

const INICIAL_STATE = {
  books: [],
  reader: [],
  update: '',
  idReader: '',
};

const reducerFetch = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case NAMEINPUT: return ({ ...state, books: action.payload });
  case READERS: return ({ ...state, reader: action.payload });
  case UPDATEBOOK: return ({ ...state, update: action.payload });
  case IDREADER: return ({ ...state, idReader: action.payload });
  default: return state;
  }
};

export default reducerFetch;
