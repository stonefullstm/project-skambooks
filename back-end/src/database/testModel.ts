import Autor from './models/autores.model';
import Livro from './models/livros.model';

(async () => {
 
  const livros = await Autor.findOne({
    where: { id: 1 },
    include: [{ model: Livro, as: 'livros', through: { attributes: [] } }],
  });
  console.log(livros);

  process.exit(0);
})();