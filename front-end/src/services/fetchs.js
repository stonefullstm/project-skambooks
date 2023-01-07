const url = 'http://localhost:3000/login';
const url1 = 'http://localhost:3000/readers';
const url2 = 'http://localhost:3000/books';
const url3 = 'http://localhost:3000/exchanges';
const url4 = 'http://localhost:3000/readers/names'

export const login = async (options) => {
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const myCep = async (cep) => {
  const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const response = await request.json();
  return response;
};

export const createReader = async (options) => {
  const response = await fetch(url1, options);
  const result = await response.json();
  return result;
};

export const getAllBooks = async (options) => {
  const response = await fetch(url2, options);
  const result = await response.json();
  return result;
};

export const getReaderById = async (options) => {
  const response = await fetch(url1, options);
  const result = await response.json();
  return result;
};

export const getBookById = async (id, options) => {
  const response = await fetch(`http://localhost:3000/books/${id}`, options);
  const result = await response.json();
  return result;
}

export const getExchanges = async (options) => {
  const response = await fetch(url3, options);
  const result = await response.json();
  return result;
};

export const deleteExchanges = async (id, options) => {
  const response = await fetch(`http://localhost:3000/exchanges/${id}`, options);
  const result = await response.json();
  return result;
};

export const confirmeExchanges = async (id, options) => {
  const response = await fetch(`http://localhost:3000/exchanges/${id}`, options);
  const result = await response.json();
  return result;
};

export const deleteBook = async (id, options) => {
  const response = await fetch(`http://localhost:3000/books/${id}`, options);
  const result = await response.json();
  return result;
};

export const getReaders = async (options) => {
  const response = await fetch(url4, options);
  const result = await response.json();
  return result;
};

export const createExchanges = async (options) => {
  const response = await fetch(url3, options);
  const result = await response.json();
  return result;
};

export const updateBooks = async (id, options) => {
  const response = await fetch(`http://localhost:3000/books/${id}`, options);
  const result = await response.json();
  return result;
};

export const getBookIsbn = async (isbn) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  const result = await response.json();
  return result.items;
};

export const createBooks = async (options) => {
  const response = await fetch(url2, options);
  const result = await response.json();
  return result;
};