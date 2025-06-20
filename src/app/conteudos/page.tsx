import { Suspense } from "react";
import FormacaoClient from "./FiltroNoticias";

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
  categoria: {
    id: string;
    nome: string;
  };
}

const categoriasPermitidas: Categoria[] = [
  { id: "b05a7baa-3ab0-464c-85ca-eab1e81d594c", nome: "Missões e Visitas" },
  { id: "593bf9d4-0c82-4b77-840c-83670901da3d", nome: "Música" },
  { id: "a696cdf4-ffce-4cad-a809-4e01492f16d1", nome: "Documentos" },
  { id: "55a10103-7412-4bbf-945c-b43f116798ca	", nome: "Juventude" },
  { id: "1a1e8f32-abfa-4b49-b664-b9a42f844286", nome: "Acampamento" },
  { id: "2a85d600-1775-4a50-a3e3-0c6d80ffdb78", nome: "Santo do Dia" },
  { id: "c9594d33-9df1-41c0-abfb-b459f7fb8d12", nome: "Notícias" },
  { id: "ac1aba58-5c90-4da7-b831-de7b20896f79	", nome: "Ágape" },
  { id: "160fd1a5-fe18-40f2-b8cd-a626f842dad9	", nome: "Eventos" },
  { id: "a2ffd890-5bb1-4aee-ba68-c8e357218e64	", nome: "Igreja Matriz" },
  { id: "7f07de71-1e7c-491c-a012-35dd9dfcd8fc", nome: "Papa" },

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
      .map((conteudo: any) => ({
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
