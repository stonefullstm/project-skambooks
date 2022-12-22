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

const insertLeitor = async (body: Tleitores): Promise<Tleitores[]> => {
  const { nome, endereco, numero, complemento, cep, bairro, cidade, estado, telefone, email, senha, creditos } = body;
  const result = await leitores.create({nome, endereco, numero, complemento, cep, bairro, cidade, estado, telefone, email, senha, creditos});
  return result as unknown as Tleitores[];
};

const updateLeitor = async (body: Tleitores, id: number): Promise<Tleitores[]> => {
  const { nome, endereco, numero, complemento, cep, bairro, cidade, estado, telefone, email, senha, creditos } = body;
  const result = await leitores.update({nome, endereco, numero, 
    complemento, cep, bairro, cidade, estado, telefone, email, senha, creditos},
    {
      where: { id },
    });
  return result as unknown as Tleitores[];
};
const deleteLeitor = async (id: number): Promise<Tleitores[]> => {
  const leitor = await leitores.destroy({
    where: { id }
  });
  return leitor as unknown as Tleitores[];
};

export default { getIdLeitor, insertLeitor, getLeitorByEmail, updateLeitor, deleteLeitor };
