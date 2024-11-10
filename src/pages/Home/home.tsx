import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import BemVindoSecao from "./Componentes/SlideHome";
import Sidebar from "./Componentes/sidebar";
import MusicasSecao from "./Componentes/musicas";
import DestaquesSecao from "./Componentes/Destaques";

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

// Definindo cores para as novas categorias
const categoryColors: { [key: string]: string } = {
  "noticias gerais": "text-yellow-400",
  papa: "text-red-500",
  eventos: "text-blue-400",
  espiritualidade: "text-green-500",
  "santos e santas": "text-purple-500",
  opiniao: "text-orange-400",
  "familia e vida": "text-pink-400",
  "missoes e caridade": "text-teal-400",
  "liturgia e sacramentos": "text-indigo-500",
  juventude: "text-cyan-500",
  "cultura e arte sacra": "text-brown-400",
};

const Home = () => {
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [newsLimit, setNewsLimit] = useState(12);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchConteudo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/conteudos");
      const conteudos = response.data.map((conteudo: any) => ({
        id: conteudo.id,
        titulo: conteudo.titulo,
        descricao: conteudo.descricao,
        autor: conteudo.autor,
        banner: conteudo.banner,
        publicadoEm: conteudo.publicadoEm,
        categoriaId: conteudo.categoria.id,
        categoria: {
          nome: conteudo.categoria.nome,
        },
      }));

      const uniqueConteudos = Array.from(
        new Set(conteudos.map((conteudo: any) => conteudo.id))
      ).map((id) => conteudos.find((conteudo: any) => conteudo.id === id)!);

      setConteudos(uniqueConteudos);
    } catch (error) {
      setError(
        "Houve um erro ao buscar os conteúdos. Tente novamente mais tarde."
      );
      console.error("Erro ao buscar os conteúdos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConteudo();
  }, [fetchConteudo]);

  // Função para exibir mais conteúdos
  const handleShowMore = () => {
    setShowMore(true);
    setNewsLimit((prevLimit) => prevLimit + 4);
  };

  // Filtrar conteúdos
  const filteredConteudos = conteudos.filter(
    (conteudo) => conteudo.categoria.nome
  );
  const destaqueConteudos = filteredConteudos.slice(0, 5);
  const remainingConteudos = filteredConteudos.slice(5);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="mx-auto">
      <BemVindoSecao />

      <div className="container mx-auto lg:px-4 lg:mt-12 max-w-7xl">
        {/* Seção de Destaque */}
        <div className="bg-white py-6">
          <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
            <div className="flex flex-wrap -mx-2">
              {/* Card de destaque à esquerda */}
              <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                {destaqueConteudos.length > 0 && (
                  <div className="relative hover-img h-full w-full overflow-hidden">
                    <Link to={`/conteudos/${destaqueConteudos[0].id}`}>
                      <img
                        className="w-full h-96 object-cover"
                        src={`${baseUrl}/${destaqueConteudos[0].banner}`}
                        alt={destaqueConteudos[0].titulo}
                      />
                    </Link>
                    <div className="absolute inset-0 px-5 pt-8 pb-5 bg-gradient-to-t from-black to-transparent flex flex-col justify-end">
                      <Link to={`/conteudos/${destaqueConteudos[0].id}`}>
                        <h2 className="text-3xl font-bold line-clamp-2 capitalize text-white mb-3 hover:text-red-500">
                          {destaqueConteudos[0].titulo}
                        </h2>
                      </Link>

                      <div className="pt-2">
                        <div className="text-gray-100 capitalize">
                          <div className="inline-block h-3 border-l-2 border-red-600 mr-2 "></div>
                          {destaqueConteudos[0].categoria.nome}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cards menores alinhados à direita */}
              <div className="w-full lg:w-1/2 px-2">
                <div className="grid grid-cols-2 gap-4">
                  {destaqueConteudos.slice(1).map((item) => (
                    <article
                      key={item.id}
                      className="relative hover-img h-48 overflow-hidden"
                    >
                      <Link to={`/conteudos/${item.id}`}>
                        <img
                          className="w-full h-full object-cover capitalize"
                          src={`${baseUrl}/${item.banner}`}
                          alt={item.titulo}
                        />
                      </Link>
                      <div className="absolute inset-0 px-4 pt-7 pb-4 bg-gradient-to-t from-black to-transparent flex flex-col justify-end">
                        <Link to={`/conteudos/${item.id}`}>
                          <h2 className="text-lg font-bold capitalize leading-tight text-white mb-1 hover:text-red-500">
                            {item.titulo}
                          </h2>
                        </Link>
                        <div className="pt-1">
                          <div className="text-white text-sm capitalize">
                            {item.categoria.nome}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 ">
          {/* Conteúdo Principal */}
          <div className="flex-1">
            {/* Seção de Oração */}
            <section className="mt-6 lg:mt-24">
              {remainingConteudos.slice(0, 1).map((conteudo) => (
                <div key={conteudo.id} className="block mb-6">
                  <img
                    alt={conteudo.titulo}
                    src={`${baseUrl}/${conteudo.banner}`}
                    className="h-64 w-full object-cover sm:h-80 lg:h-96"
                  />
                  <Link to={`/conteudos/${conteudo.id}`}>
                    <h3 className="mt-4 text-lg font-bold text-gray-900 hover:text-red-700 sm:text-xl">
                      {conteudo.titulo}
                    </h3>
                    <div
                      className="line-clamp-3 overflow-hidden text-ellipsis"
                      dangerouslySetInnerHTML={{ __html: conteudo.descricao }}
                    />
                  </Link>
                </div>
              ))}

              {/* Seção de Notícias */}
              <section className="py-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Artigos e Notícias
                </h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 capitalize">
                  {remainingConteudos
                    .slice(0, showMore ? remainingConteudos.length : newsLimit)
                    .map((conteudo) => (
                      <div
                        key={conteudo.id}
                        className="bg-white overflow-hidden"
                      >
                        <Link to={`/conteudos/${conteudo.id}`}>
                          <img
                            src={`${baseUrl}/${conteudo.banner}`}
                            alt={conteudo.titulo}
                            className="w-full h-48 object-cover"
                          />
                          <div className="mt-2">
                            <div className="flex items-center mb-1">
                              <span
                                className={`bg-white ${
                                  categoryColors[
                                    conteudo.categoria.nome.toLowerCase()
                                  ] || "text-gray-500"
                                } text-xs uppercase font-bold mb-2`}
                              >
                                {conteudo.categoria.nome
                                  .charAt(0)
                                  .toUpperCase() +
                                  conteudo.categoria.nome.slice(1)}
                              </span>
                            </div>
                            <h2 className="text-lg font-semibold leading-tight text-gray-800">
                              {conteudo.titulo}
                            </h2>
                            <div
                              className="line-clamp-2 text-sm text-gray-500 mt-2"
                              dangerouslySetInnerHTML={{
                                __html: conteudo.descricao,
                              }}
                            />
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>

                {remainingConteudos.length > newsLimit && !showMore && (
                  <button
                    onClick={handleShowMore}
                    className="px-4 py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Ver Mais
                  </button>
                )}
              </section>
            </section>
            {/* Seção de Vídeo da Comunidade */}
            <section className="py-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Explore os nossos contéudos
              </h2>
              <div className="relative w-full h-80">
                <iframe
                  src="https://www.youtube.com/embed/OXQ9TuCu2ig?si=47yudAW8X_HloKRJ"
                  title="Vídeo da Comunidade"
                  className="absolute inset-0 w-full h-full object-cover"
                  allowFullScreen
                ></iframe>
              </div>
            </section>

            <MusicasSecao />

            <DestaquesSecao />
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
