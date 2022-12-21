import Autor from './models/autores.model';
import Livro from './models/livros.model';
import Trocas from './models/trocas.model';

(async () => {
 
  const livros = await Livro.findOne({
    where: { id: 1 },
    include: { model: Autor, as: 'autores' },
  });
  console.table(livros);
  const leitores = await Trocas.findAll({
    raw: true, include: ['destinatario'],
  });
  console.table(leitores);

  process.exit(0);
})();