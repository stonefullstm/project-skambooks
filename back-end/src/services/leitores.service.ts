import leitores from '../database/models/leitores.model';
import { Tleitores } from '../types/Tleitores';

const getIdLeitor = async (id: number): Promise<Tleitores[]> => {
  const leitor = await leitores.findOne({
    where: { id }
  });
  return leitor as unknown as Tleitores[];
};

export default { getIdLeitor };