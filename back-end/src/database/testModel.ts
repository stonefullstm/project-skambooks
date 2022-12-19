import Autor from '../database/models/autores.model';

(async () => {
  const books = await Autor.findAll({ raw: true });
  console.table(books);
  process.exit(0);
})();