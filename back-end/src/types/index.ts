
export type TLivro = {
  id: number;
  isbn: string;
  titulo: string;
  ano: string;
  paginas: number;
  idLeitor: number;
  autores: TAutor[];
};

export type TAutor = {
  id: number;
  nome: string;
} 