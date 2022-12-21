import leitores from '../database/models/leitores.model';
import { TUsuario } from '../types';
import { Tleitores } from '../types/Tleitores';

const getIdLeitor = async (id: number): Promise<Tleitores[]> => {
  const leitor = await leitores.findOne({
    where: { id }
  });
  return leitor as unknown as Tleitores[];
};

const getLeitorByEmail = async ( email: string ): Promise<TUsuario> => {
  const user = await leitores.findOne({ where: { email } });
  return { id: user?.dataValues.id, email: user?.dataValues.email, senha: user?.dataValues.senha };
};

export default { getIdLeitor, getLeitorByEmail };