import authorsBooksModel from '../database/models/authors-books.model';
import authorsModel from '../database/models/authors.model';
import booksModel from '../database/models/books.model';
import { TAuthor, TAuthorBook, TBook } from '../types';

const getAllBooks = async (): Promise<TBook[]> => {
  const books = await booksModel.findAll({
    include: { model: authorsModel, as: 'authors' },
  });
  return books as unknown as TBook;
};

const getBookById = async (id: number): Promise<TBook[]> => {
  const books = await booksModel.findOne({
    include: { model: authorsModel, as: 'autors' },
    where: { id },
  });
  return books as unknown as TBook[];
};

const deleteBook = async (id: number): Promise<TBook[]> => {
  const book = await booksModel.destroy({
    where: { id },
  });
  return book as unknown as TBook[];
};

const createBook = async (body: TBook): Promise<TBook[]> => {
  const { isbn, title, year, pages, readerId } = body;
  const book = await booksModel.create({
    isbn,
    title,
    year,
    pages,
    readerId,
  });
  return book as unknown as TBook[];
};

const createAuthor = async (body: TAuthor): Promise<TAuthor[]> => {
  
  const author = await authorsModel.create({
     name: body,
  });
  return author as unknown as TAuthor[];
};

const createAuthorBook = async (bookId: number, authorId: number): Promise<TAuthorBook[]> => {
  
  const authorsBooks = await authorsBooksModel.create({
    bookId, authorId,
  });
  return authorsBooks as unknown as TAuthorBook[];
};

export default { getAllBooks, deleteBook, getBookById, createBook, createAuthor, createAuthorBook };
