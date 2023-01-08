export const NAMEINPUT = 'NAMEINPUT';
export const READERS = 'READERS';
export const UPDATEBOOK = 'UPDATEBOOK';
export const IDREADER = 'IDREADER';

export const requiretBooks = (payload) => ({ type: NAMEINPUT, payload });
export const requiretReaders = (payload) => ({ type: READERS, payload });
export const updateBook = (payload) => ({ type: UPDATEBOOK, payload });
export const idReader = (payload) => ({ type: IDREADER, payload });


