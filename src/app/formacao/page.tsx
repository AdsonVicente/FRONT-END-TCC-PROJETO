import { Suspense } from "react";
import FormacaoClient from "./FormacaoClient";

interface Categoria {
  id: string;
  nome: string;
}
interface Category {
  id?: string;      // pode ser undefined
  nome?: string;    // pode ser undefined
}

interface ConteudoRaw {
  id: string;
  titulo: string;
  descricao: string;
  autor: string;
  banner: string;
  publicadoEm: string;
  category?: Category;  // pode ser ausente
}

interface Categoria {
  id: string;
  nome: string;
}

interface Conteudo {
  id: string;
  titulo: string;
  descricao: string;
  autor: string;
  banner: string;
  publicadoEm: string;
  categoria: Categoria;
}


const categoriasPermitidas: Categoria[] = [
  { id: "2e387869-219a-4eee-9926-2a9660349c4f", nome: "Categoria 1" },
  { id: "25ac774b-6601-4b57-b281-59e1a02f973f", nome: "Categoria 2" },
  { id: "b75f392a-0b02-49e7-bf8b-c6e1d311bcd5", nome: "Categoria 3" },
  { id: "49522c3a-d37b-46d4-8b3d-531a452c96a7", nome: "Categoria 4" },
  { id: "bcd51bd3-e589-407a-adce-cd86fff17b49", nome: "Categoria 5" },
  { id: "593bf9d4-0c82-4b77-840c-83670901da3d", nome: "Categoria 6" },
  { id: "a696cdf4-ffce-4cad-a809-4e01492f16d1", nome: "Categoria 7" },
  { id: "2a85d600-1775-4a50-a3e3-0c6d80ffdb78", nome: "Categoria 8" },
  { id: "37aced55-a478-4ebe-b492-7b7d970a1390", nome: "Categoria 9" },
  { id: "eefb0c65-d5e8-460a-931e-90f974842732", nome: "Categoria 10" },
];

// 🔸 Função Server: busca os dados da API
async function getConteudos(): Promise<Conteudo[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/conteudos`,
      {
        next: { revalidate: 60 },
        cache: "force-cache",
      }
    );
    const data = await res.json();

    return (Array.isArray(data) ? data : [])
      .map((conteudo: ConteudoRaw): Conteudo => ({
        id: conteudo.id,
        titulo: conteudo.titulo,
        descricao: conteudo.descricao,
        autor: conteudo.autor,
        banner: conteudo.banner,
        publicadoEm: conteudo.publicadoEm,
        categoria: {
          id: conteudo.category?.id ?? "sem-id",
          nome: conteudo.category?.nome ?? "Sem categoria",
        },
      }))
      .filter((conteudo) =>
        categoriasPermitidas.some((cat) => cat.id === conteudo.categoria.id)
      );
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function FormacaoPage() {
  const conteudos = await getConteudos();

  return (
    <Suspense fallback={<div className="text-center">Carregando...</div>}>
      <FormacaoClient conteudos={conteudos} />
    </Suspense>
  );
}
