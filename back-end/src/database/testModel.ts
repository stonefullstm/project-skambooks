import Autor from '../database/models/autores.model';
import Leitor from './models/leitores.model';
import Livro from './models/livros.model';

(async () => {
  const books = await Autor.findAll({ raw: true });
  console.table(books);
  const livros = await Livro.findAll({ raw: true });
  console.table(livros);

  const booksWithComments = await Leitor.findAll({ raw: true, include: ['livros'] });
  console.table(booksWithComments);
  process.exit(0);
})();