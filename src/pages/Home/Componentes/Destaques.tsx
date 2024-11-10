import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const baseUrl = import.meta.env.VITE_BASE_URL;

const DestaquesSecao = () => {
  const [destaques, setDestaques] = useState<Conteudo[]>([]);
  const [displayedDestaques, setDisplayedDestaques] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const fetchDestaques = async () => {
    setLoading(true);
    try {
      const response = await api.get("/conteudos", {
        params: {
          _limit: 100, // Obter um número maior para filtrar localmente
        },
      });

      // Filtrar localmente pela categoria "missão"
      const conteudos: Conteudo[] = response.data;
      const destaquesData = conteudos
        .filter((conteudo) => conteudo.categoria.nome === "Missões")
        .slice(0, 6); // Limitar os resultados a 6

      setDestaques(destaquesData);
      setDisplayedDestaques(destaquesData.slice(0, 3)); // Exibir 2 por vez
    } catch (error) {
      console.error("Erro ao buscar destaques:", error);
      toast.error("Erro ao buscar destaques");
      setError("Erro ao buscar destaques");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextIndex = displayedDestaques.length;
    const nextDestaques = destaques.slice(nextIndex, nextIndex + 2);
    setDisplayedDestaques((prev) => [...prev, ...nextDestaques]);
    if (nextIndex + 2 >= destaques.length) {
      setShowAll(true); // Esconder o botão "Ver Mais" quando todos os destaques foram exibidos
    }
  };

  useEffect(() => {
    fetchDestaques();
  }, []);

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Nossas Missões
        </h2>
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && destaques.length === 0 && (
          <p className="text-gray-600">Nenhum destaque encontrado.</p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedDestaques.map((destaque) => (
            <Link
              key={destaque.id}
              to={`/conteudos/${destaque.id}`}
              className="group block bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={`${baseUrl}/${destaque.banner}`}
                alt={destaque.titulo}
                className="w-full h-48 object-cover group-hover:opacity-80 transition duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition duration-300">
                  {destaque.titulo}
                </h3>
                <p
                  className="text-sm text-gray-600 mt-2"
                  dangerouslySetInnerHTML={{
                    __html: destaque.descricao.substring(0, 100) + "...",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
        {!showAll && destaques.length > 2 && (
          <div className=" mt-6">
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Ver Mais
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DestaquesSecao;
