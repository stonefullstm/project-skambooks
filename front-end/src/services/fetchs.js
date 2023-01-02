const url = 'http://localhost:3000/login';

export const login = async (options) => {
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

/* export default login; */