import Link from "next/link";

interface Categoria {
  id?: string;
  nome?: string;
}

interface Conteudo {
  id: string;
  titulo: string;
  descricao: string;
  autor: string;
  banner: string;
  publicadoEm: string;
  categoria?: Categoria | null;
}

const Card: React.FC<{ conteudo: Conteudo }> = ({ conteudo }) => {
  function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).slice(-2);
    }
    return color;
  }

  const truncatedContent =
    conteudo.descricao.length > 200
      ? `${conteudo.descricao.substring(0, 150)}...`
      : conteudo.descricao || "Descrição não disponível";

  const categoriaNome = conteudo.categoria?.nome?.trim() || "Categoria Indisponível";

  return (
    <div className="bg-transparent max-w-4xl mx-auto overflow-hidden border-gray-300 pb-6">
      <div className="flex flex-col md:flex-row md:items-start bg-white overflow-hidden">
        {/* Imagem */}
        <Link href={`/conteudos/${conteudo.id}`} passHref>

          <img
            src={conteudo.banner}
            alt={conteudo.titulo}
            className="shadow-lg w-full max-w-full h-[200px] object-cover object-center md:min-h-[180px] md:max-h-[150px] md:min-w-[300px] md:max-w-[300px]"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

        </Link>

        {/* Conteúdo textual */}
        <div className="flex-1 p-4">
          {/* Categoria e Data */}
          <div className="flex flex-wrap items-center mb-2">
            <span
              style={{
                backgroundColor: stringToColor(categoriaNome),
                color: "white",
              }}
              className="text-xs uppercase font-bold px-2 py-1 rounded"
            >
              {categoriaNome.charAt(0).toUpperCase() + categoriaNome.slice(1)}
            </span>
            <span className="text-gray-500 text-xs ml-4 mt-1 md:mt-0">
              {new Date(conteudo.publicadoEm).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Título */}
          <Link href={`/conteudos/${conteudo.id}`} passHref>

            <h3
              className="text-lg font-semibold text-gray-900 hover:text-red-700 transition-all duration-200"
              dangerouslySetInnerHTML={{ __html: conteudo.titulo }}
            />

          </Link>

          {/* Autor */}
          <h4
            className="text-gray-800 font-normal text-sm mt-1"
            dangerouslySetInnerHTML={{ __html: conteudo.autor }}
          />

          {/* Descrição resumida */}
          <div
            className="mt-2 text-sm text-gray-700 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: truncatedContent }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
