import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import BemVindoSecao from "./Componentes/SlideHome";
import Sidebar from "./Componentes/sidebar";
import MusicasSecao from "./Componentes/musicas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild, faGlobe, faHeart } from "@fortawesome/free-solid-svg-icons";

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
  "noticia": "text-yellow-400",
  papa: "text-red-500",
  eventos: "text-blue-400",
  espiritualidade: "text-green-500",
  "santos": "text-purple-500",
  Agape: "text-orange-400",
  "familia e vida": "text-pink-400",
  "formação": "text-teal-400",
  "liturgia": "text-indigo-500",
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
  const [conteudosUnicos, setConteudosUnicos] = useState<any[]>([]);


  const fetchConteudo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://backend-comagapeorg-production.up.railway.app/api/v1/conteudos", {
        method: "GET",
        headers: {
          "Origin": "https://comagape.org", // Adiciona o cabeçalho Origin
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar os conteúdos.");
      }

      const data = await response.json();

      // Criar um Map para garantir que os conteúdos sejam únicos
      const conteudosMap = new Map();

      data.forEach((conteudo: any) => {
        if (!conteudosMap.has(conteudo.id)) {
          conteudosMap.set(conteudo.id, conteudo);
        }
      });

      // Transformar o Map de volta em um array e ordenar os conteúdos por data de publicação
      const conteudosUnicos = Array.from(conteudosMap.values())
        .map((conteudo: any) => ({
          id: conteudo.id,
          titulo: conteudo.titulo,
          descricao: conteudo.descricao,
          autor: conteudo.autor,
          banner: conteudo.banner,
          publicadoEm: conteudo.publicadoEm,
          categoriaId: conteudo.categoria.id,
          categoria: {
            id: conteudo.categoria.id,
            nome: conteudo.categoria.nome,
          },
        }))
        .sort((a, b) => new Date(b.publicadoEm).getTime() - new Date(a.publicadoEm).getTime());

      setConteudosUnicos(conteudosUnicos);
      setConteudos(conteudosUnicos); // Usar a versão única e ordenada
    } catch (error) {
      setError("Houve um erro ao buscar os conteúdos. Tente novamente mais tarde.");
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
    (conteudo) => conteudo.categoria
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
        <div className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap -mx-4">
              {/* Card de destaque maior à esquerda */}
              <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
                <div className="relative h-full w-full overflow-hidden shadow-lg group">
                  <Link to={`/conteudos/${destaqueConteudos[0].id}`}>
                    <img
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                      src={`${baseUrl}/${destaqueConteudos[0].banner}`}
                      alt={destaqueConteudos[0].titulo}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent px-6 py-6 flex flex-col justify-end">
                      <h2
                        className="text-3xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300"
                        dangerouslySetInnerHTML={{ __html: destaqueConteudos[0].titulo }}
                      ></h2>

                      <span className="text-red-500 font-medium">
                        {destaqueConteudos[0].categoria.nome}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Grid de cards menores à direita */}
              <div className="w-full lg:w-1/2 px-4">
                <div className="grid grid-cols-2 gap-6">
                  {destaqueConteudos.slice(1).map((item) => (
                    <div
                      key={item.id}
                      className="relative h-48  shadow-lg overflow-hidden group"
                    >
                      <Link to={`/conteudos/${item.id}`}>
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={`${baseUrl}/${item.banner}`}
                          alt={item.titulo}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent px-4 py-4 flex flex-col justify-end line-clamp-2">
                          <h3
                            className="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors duration-300 truncate w-full"
                            dangerouslySetInnerHTML={{
                              __html: item.titulo.length > 30 ? `${item.titulo.substring(0, 30)}...` : item.titulo,
                            }}
                          ></h3>


                          <span className="text-white text-sm">
                            {item.categoria.nome}
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="py-12 justify-center text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center  text-red-600 mb-8">
              Ágape para Todos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Ágape para Casais */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-red-300 transition-transform transform hover:scale-105">
                <FontAwesomeIcon icon={faHeart} className="text-red-500 text-5xl mb-4 justify-center" />
                <h3 className="text-xl font-semibold mb-2">Ágape para Casais</h3>
                <p className="text-gray-600 mb-4">
                  Fortalecendo o amor conjugal com espiritualidade e união.
                </p>
                <Link
                  to="/AgapeParaCasais"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                >
                  Saiba Mais
                </Link>
              </div>

              {/* Ágape para Crianças */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-yellow-300 transition-transform transform hover:scale-105">
                <FontAwesomeIcon icon={faChild} className="text-yellow-500 text-5xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ágape para Crianças</h3>
                <p className="text-gray-600 mb-4">
                  Ensinar os pequenos sobre o amor de Deus de forma lúdica e educativa.
                </p>
                <Link
                  to="/AgapeKids"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                >
                  Saiba Mais
                </Link>
              </div>

              {/* Missões Ágape */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-blue-300 transition-transform transform hover:scale-105">
                <FontAwesomeIcon icon={faGlobe} className="text-blue-500 text-5xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Missões Ágape</h3>
                <p className="text-gray-600 mb-4">
                  Levando a mensagem de amor e esperança a todos os lugares.
                </p>
                <Link
                  to="/missoes"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>

        </section>
        <div className="flex flex-col lg:flex-row gap-8 ">
          {/* Conteúdo Principal */}
          <div className="flex-1">
            {/* Seção de Oração */}
            <section className="mt-6 lg:mt-24">
              {conteudosUnicos.slice(0, 1).map((conteudo) => (
                <div key={conteudo.id} className="block mb-8">
                  <img
                    alt={conteudo.titulo}
                    src={`${baseUrl}/${conteudo.banner}`}
                    className="h-64 w-full object-cover sm:h-80 lg:h-96"
                  />
                  <Link to={`/conteudos/${conteudo.id}`}>
                    <h3
                      className="mt-4 text-lg font-serif font-bold text-gray-900 hover:text-red-700 sm:text-xl"
                      dangerouslySetInnerHTML={{ __html: conteudo.titulo }}
                    ></h3>

                    <div className="mt-2 text-sm text-gray-500 font-serif">
                      <span>{conteudo.autor}</span> | <span>{new Date(conteudo.publicadoEm).toLocaleDateString()}</span>
                    </div>
                    <div
                      className="line-clamp-3 overflow-hidden text-ellipsis mt-3 text-base font-serif"
                      dangerouslySetInnerHTML={{ __html: conteudo.descricao }}
                    />
                  </Link>
                </div>
              ))}


              {/* Seção de Notícias */}
              <section className="py-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
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
                                className={`bg-white ${categoryColors[
                                  conteudo?.categoria?.nome?.toLowerCase() || "default"
                                ] || "text-gray-500"
                                  } text-xs font-bold mb-2`}
                              >
                                {conteudo?.categoria?.nome
                                  ? conteudo.categoria.nome.charAt(0).toUpperCase() +
                                  conteudo.categoria.nome.slice(1)
                                  : "Categoria Indisponível"}
                              </span>
                            </div>
                            <h2 className="text-lg font-semibold leading-tight text-gray-800">
                              {conteudo?.titulo || "Título Indisponível"}
                            </h2>
                            <div
                              className="line-clamp-2 text-sm text-gray-500 mt-2"
                              dangerouslySetInnerHTML={{
                                __html: conteudo?.descricao || "<p>Descrição Indisponível</p>",
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
            <section className="py-8 md:px-0 px-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Explore os nossos contéudos
              </h2>
              <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <iframe
                  src="https://www.youtube.com/embed/CBAW7OtdREI?si=dUjKz8OlqqgCvv0-"
                  title="Vídeo da Comunidade"
                  className="absolute inset-0 w-full h-full object-cover"
                  allowFullScreen
                ></iframe>
              </div>

            </section>



            <div>
              <MusicasSecao />

            </div>



          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
