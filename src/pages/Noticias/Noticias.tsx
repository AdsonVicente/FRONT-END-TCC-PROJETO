import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { FaSearch } from "react-icons/fa";

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

const categoryColors: { [key: string]: string } = {
  atualidade: "text-gray-500",
  noticia: "text-yellow-400",
  diocese: "text-lime-500",
  Àgape: "text-red-600",
  papa: "text-red-500",
  eventos: "text-blue-400",
  opiniao: "text-orange-400",
  familia: "text-pink-400",
  missoes: "text-teal-400",
  "liturgia e sacramentos": "text-indigo-500",
  juventude: "text-cyan-500",
  "cultura e arte sacra": "text-brown-400",
};

const allowedCategories = [
  "Noticia", "Tecnologia e Igreja", "Atualidade", "Opinião", "Paroquia",
  "Filmes e Series", "Notícias do Vaticano", "Eventos", "Acampamento", "Papo Jovem"
];

const Noticias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [filteredData, setFilteredData] = useState<Conteudo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesResponse, conteudosResponse] = await Promise.all([
        api.get("/categorias"),
        api.get("/conteudos"),
      ]);

      if (!Array.isArray(categoriesResponse.data)) {
        throw new Error("Categorias não é um array.");
      }
      if (!Array.isArray(conteudosResponse.data)) {
        throw new Error("Conteúdos não é um array.");
      }

      const filteredCategories = categoriesResponse.data.filter((categoria) =>
        allowedCategories.includes(categoria.nome)
      );

      setCategorias([{ id: "all", nome: "Todos" }, ...filteredCategories]);

      const filteredConteudos = conteudosResponse.data.filter((noticia) =>
        allowedCategories.includes(noticia.categoria?.nome)
      );

      setConteudos(filteredConteudos);
      setFilteredData(filteredConteudos);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setError("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const searchTermLower = searchQuery.toLowerCase();
    const filtered = conteudos.filter((conteudo) => {
      const matchSearch = conteudo.titulo.toLowerCase().includes(searchTermLower);
      const matchCategory = selectedCategories.includes("all") || selectedCategories.length === 0
        ? true
        : selectedCategories.includes(conteudo.categoria.id);
      return matchSearch && matchCategory;
    });
    setFilteredData(filtered);
  }, [searchQuery, selectedCategories, conteudos]);


  return (
    <div className="flex flex-col md:flex-row mx-auto py-6 lg:px-8">
      <aside className="w-full md:w-1/4 p-4 rounded-lg">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar notícias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={() => setSearchQuery(searchTerm)}
            className="mt-2 w-full px-4 py-2 bg-zinc-900 text-white rounded-md"
          >
            <FaSearch className="inline mr-2" /> Pesquisar
          </button>
        </div>
        <h3 className="font-bold text-lg mb-2">Categorias</h3>
        <div className="md:hidden relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full text-left px-4 py-2 bg-white border rounded-md"
          >
            Selecione uma categoria
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 right-0 bg-white border mt-1 shadow-lg rounded-md z-10">
              {/* Filtro das categorias no dropdown */}
              <input
                type="text"
                placeholder="Pesquisar categoria..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {categorias
                .filter((categoria) => categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())) // Filtra categorias com base no termo de pesquisa
                .map((categoria) => (
                  <button
                    key={categoria.id}
                    onClick={() => {
                      setSelectedCategories([categoria.id]);
                      setSearchTerm(""); // Limpa o campo de pesquisa após selecionar uma categoria
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    {categoria.nome}
                  </button>
                ))}
            </div>
          )}
        </div>
        <div className="hidden md:block">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setSelectedCategories([categoria.id])}
              className={`w-full text-left px-4 py-2 mb-2 rounded-md ${selectedCategories.includes(categoria.id) ? "bg-yellow-400 text-white" : "bg-white text-gray-600"} hover:bg-yellow-500`}
            >
              {categoria.nome}
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <p className="text-center text-gray-600">Carregando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {filteredData.length === 0 && !loading && !error && <p className="text-center text-gray-600">Nenhum conteúdo encontrado.</p>}
        {filteredData.map((conteudo) => (
          <Link key={conteudo.id} to={`/conteudos/${conteudo.id}`} className="block bg-white shadow-lg">
            <img src={`${baseUrl}/${conteudo.banner}`} alt={conteudo.titulo} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className={`${categoryColors[conteudo.categoria.nome.toLowerCase()] || "text-gray-500"} text-xs uppercase font-bold`}>{conteudo.categoria.nome}</span>
              <h2
                className="text-lg font-semibold mt-2 hover:text-red-600"
                dangerouslySetInnerHTML={{ __html: conteudo.titulo }}
              ></h2>
              <p
                className="text-sm mt-2 text-gray-600"
                dangerouslySetInnerHTML={{ __html: conteudo.descricao.substring(0, 100) + "..." }}
              ></p>

              <button className="mt-4 text-red-500 py-2">Ver mais</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Noticias;
