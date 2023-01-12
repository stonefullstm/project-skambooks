// const url = 'http://localhost:3000/login';
// const url = 'https://project-skambooks-production.up.railway.app/login';
// const url1 = 'http://localhost:3000/readers';
// const url2 = 'http://localhost:3000/books';
// const url2 = 'https://project-skambooks-production.up.railway.app/books';
// const url3 = 'http://localhost:3000/exchanges';
// const url4 = 'http://localhost:3000/readers/names';

const HOST = process.env.REACT_APP_API_HOST || "localhost:3000";
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || "http";

export const myFetch = async (options, endpoint) => {
  const url = `${PROTOCOL}://${HOST}/${endpoint}`;
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
}

// export const login = async (options) => {
//   const url = `${PROTOCOL}://${HOST}/login`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

export const myCep = async (cep) => {
  const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const response = await request.json();
  return response;
};

// export const createReader = async (options) => {
//   const url = `${PROTOCOL}://${HOST}/readers`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

// export const getAllBooks = async (options) => {
//   const url = `${PROTOCOL}://${HOST}/books`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

// export const getReaderById = async (options) => {
//   const url = `${PROTOCOL}://${HOST}/readers`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

// export const getBookById = async (id, options) => {
//   const url = `${PROTOCOL}://${HOST}/books/${id}`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// }

// export const getExchanges = async (options) => {
//   const url = `${PROTOCOL}://${HOST}/exchanges`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

// export const deleteExchanges = async (id, options) => {
//   const url = `${PROTOCOL}://${HOST}/exchanges/${id}`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

// export const confirmeExchanges = async (id, options) => {
//   const url = `${PROTOCOL}://${HOST}/exchanges/${id}`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

// export const deleteBook = async (id, options) => {
//   const url = `${PROTOCOL}://${HOST}/books/${id}`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

// export const getReaders = async (options) => {
//   const url = `${PROTOCOL}://${HOST}/readers/names`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

// export const createExchanges = async (options) => {
//   const url = `${PROTOCOL}://${HOST}/exchanges`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

// export const updateBooks = async (id, options) => {
//   const url = `${PROTOCOL}://${HOST}/books/${id}`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };

export const getBookIsbn = async (isbn) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  const result = await response.json();
  return result.items;
};

// export const createBooks = async (options) => {
//   const url = `${PROTOCOL}://${HOST}/books`;
//   const response = await fetch(url, options);
//   const result = await response.json();
//   return result;
// };