import authorsBooksModel from '../database/models/authors-books.model';
import authorsModel from '../database/models/authors.model';
import booksModel from '../database/models/books.model';
import readersModel from '../database/models/readers.model';
import { TAuthor, TAuthorBook, TBook, TNewAuthor, TNewBook } from '../types';

const getAllBooks = async (): Promise<TBook[]> => {
  const books = await booksModel.findAll({
    include: [{ model: readersModel, as: 'readers', attributes: {exclude: ['password']} },
     { model: authorsModel, as: 'authors', through: {attributes: []} },],
    attributes: {exclude: ['readerId', 'reader_id']}
  });
  return books as unknown as TBook[];
};

const getBookById = async (id: number): Promise<TBook> => {
  const book = await booksModel.findByPk(id, {
    include: { model: authorsModel, as: 'autors', through: {attributes: []} }
  });
  return book as unknown as TBook;
};

const deleteBook = async (id: number): Promise<number> => {
  const deletedQty = await booksModel.destroy({
    where: { id },
  });
  return deletedQty;
};

const createBook = async (book: TBook): Promise<TNewBook> => {
  const { isbn, title, year, pages, readerId } = book;
  const newBook = await booksModel.create({
    isbn,
    title,
    year,
    pages,
    readerId,
  });
  const createdBook = { id: newBook.dataValues.id, ...book };
  return createdBook;
};

const createAuthor = async (author: TAuthor): Promise<TNewAuthor> => {
  const newAuthor = await authorsModel.create({
     name: author.name,
  });
  return { id: newAuthor.dataValues.id, name: newAuthor.dataValues.name };
};

const createAuthorBook = async (bookId: number, authorId: number): Promise<TAuthorBook> => {
  
  const authorsBooks = await authorsBooksModel.create({
    bookId, authorId,
  });
  return authorsBooks as TAuthorBook;
};

export default { getAllBooks, deleteBook, getBookById, createBook, createAuthor, createAuthorBook };
