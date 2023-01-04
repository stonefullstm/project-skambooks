const url = 'http://localhost:3000/login';
const url1 = 'http://localhost:3000/readers';
const url2 = 'http://localhost:3000/books';
const url3 = 'http://localhost:3000/readers';

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
  const response = await fetch(url3, options);
  const result = await response.json();
  return result;
};
