
export type TBook = {
  id?: number;
  isbn: string;
  title: string;
  year: string;
  pages: number;
  readerId: number;
  authors: TAuthor[];
};

export type TNewBook = {
  id: number;
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

export type TNewAuthor = {
  id: number;
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
  newReader: boolean;
};

export type TExchange = {
  id?: number;
  senderId: number;
  receiverId: number;
  bookId: number;
  sendDate: string;
  receiveDate: string;
}

export type TNewExchange = {
  id: number;
  senderId: number;
  receiverId: number;
  bookId: number;
  sendDate: string;
  receiveDate: string;
}