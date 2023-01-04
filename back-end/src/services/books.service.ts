import { Transaction } from 'sequelize';
import sequelize from '../database/models';
import Author, { default as authorsModel } from '../database/models/authors.model';
import booksModel from '../database/models/books.model';
import readersModel from '../database/models/readers.model';
import { TBook, TNewBook, TReader } from '../types';

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
    include: { model: authorsModel, as: 'authors', through: {attributes: []} }
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
  const { isbn, title, year, pages, readerId, authors } = book;
  return sequelize.transaction(async (t: Transaction) => {
    const newBook = await booksModel.create({
      isbn, title, year, pages, readerId, authors,
    }, { include: [{model: Author, as: 'authors'}]},
    );
    const reader = await readersModel.findByPk(readerId, {
      attributes: { exclude: ['password'] },
    });
    const newReader = reader as unknown as TReader;
    if (newReader && newReader.newReader) {
      await readersModel.update({ credits: 1, newReader: 0},
        {
          where: { id: readerId },
        },        
      )
    }
    return newBook as unknown as TNewBook;
  });
};

export default { getAllBooks, deleteBook, getBookById, createBook };
