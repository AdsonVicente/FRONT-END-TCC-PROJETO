import Link from "next/link";
import DOMPurify from "dompurify";

interface Props {
  conteudo: {
    id: number;
    titulo: string;
    descricao: string;
    autor: string;
    banner: string;
    publicadoEm: string;
    category: {
      id: string;
      nome: string;
    };
  };
}

export default function ContentCard({ conteudo }: Props) {
  return (
    <div className="overflow-hidden shadow-md bg-white hover:shadow-xl transition">
      <Link href={`/conteudos/${conteudo.id}`}>
        <img
          src={conteudo.banner}
          alt={conteudo.titulo}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <span className="text-xs text-indigo-700 font-semibold uppercase">
          {conteudo.category?.nome ?? "Sem categoria"}
        </span>

        <Link
          href={`/conteudos/${conteudo.id}`}
          className="block mt-1 text-lg font-bold text-gray-900 hover:text-indigo-600"
          dangerouslySetInnerHTML={{ __html: conteudo.titulo }}
        />

        <p
          className="mt-2 text-sm text-gray-700 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(conteudo.descricao),
          }}
        />

        <div className="mt-3 text-xs text-gray-500 italic">
          Por{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: conteudo.autor || "Desconhecido",
            }}
          />
        </div>
      </div>
    </div>
  );
}
