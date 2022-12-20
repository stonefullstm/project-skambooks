import Autor from './models/autores.model';
import Livro from './models/livros.model';

(async () => {
 
  const livros = await Livro.findOne({
    where: { id: 1 },
    include: { model: Autor, as: 'autores' },
  });
  console.log(livros);

  process.exit(0);
})();