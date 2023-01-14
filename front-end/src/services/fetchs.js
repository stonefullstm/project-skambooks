
const HOST = process.env.REACT_APP_API_HOST || "localhost:3000";
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || "http";

export const myFetch = async (options, endpoint) => {
  const url = `${PROTOCOL}://${HOST}/${endpoint}`;
  const response = await fetch(url, options);
  // const result = await response.json();
  return response;
}

export const myCep = async (cep) => {
  const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const response = await request.json();
  return response;
};

export const getBookIsbn = async (isbn) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  const result = await response.json();
  return result.items;
};

