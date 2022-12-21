import leitores from '../database/models/leitores.model';
import { Tleitores } from '../types/Tleitores';

const getIdLeitor = async (id: number): Promise<Tleitores[]> => {
  const leitor = await leitores.findOne({
    where: { id }
  });
  return leitor as unknown as Tleitores[];
};

const insertLeitor = async (body: Tleitores): Promise<Tleitores[]> => {
  const { nome, endereco, numero, complemento, cep, bairro, cidade, estado, telefone, email, senha, creditos } = body;
  const result = await leitores.create({nome, endereco, numero, complemento, cep, bairro, cidade, estado, telefone, email, senha, creditos});
  return result as unknown as Tleitores[];
};

export default { getIdLeitor, insertLeitor };
