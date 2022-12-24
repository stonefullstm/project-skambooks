
export type TBook = {
  id?: number;
  isbn: string;
  title: string;
  year: string;
  pages: number;
  readerId: number;
  authors: TAuthor[];
};

export type TAuthor = {
  id?: number;
  name: string;
};

export type TUser = {
  id: number;
  email: string;
  password: string;
};

export type TAuthorBook = {
  bookId: number,
  authorId: number,
};

export type TReader = {
  id?: number;
  name: string;
  address: string;
  number: string;
  complement: string;
  zipCode: string;
  district: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
  credits: number;
};