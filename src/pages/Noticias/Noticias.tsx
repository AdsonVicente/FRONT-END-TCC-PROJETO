import React, { useState, useEffect, useRef } from "react";
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

const Noticias: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [filteredData, setFilteredData] = useState<Conteudo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 12;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesResponse, conteudosResponse] = await Promise.all([
        api.get<Categoria[]>("/categorias"),
        api.get<Conteudo[]>("/conteudos"),
      ]);
      setCategorias(categoriesResponse.data);
      const filteredConteudos = conteudosResponse.data.filter((conteudo) =>
        [
          "atualidade",
          "noticia",
          "Diocese",
          "Àgape",
          "Papa",
          "Eventos",
          "Opiniao",
          "Familia e vida",
          "Missões",
          "Liturgia e Sacramentos",
          "Juventude",
          "Cultura e Arte Sacra",
        ].includes(conteudo.categoria.nome.toLowerCase())
      );
      setConteudos(filteredConteudos);
      setFilteredData(filteredConteudos);
    } catch (error) {
      setError("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const searchTermLower = searchQuery.toLowerCase();
      const filtered = conteudos.filter((conteudo) => {
        const matchSearch = conteudo.titulo
          .toLowerCase()
          .includes(searchTermLower);
        const matchCategory = selectedCategories.length
          ? selectedCategories.includes(conteudo.categoria.id)
          : true;
        return matchSearch && matchCategory;
      });
      setFilteredData(filtered);
    };
    filterData();
  }, [searchQuery, selectedCategories, conteudos]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  };

  const truncatedContent = (corpo: string) =>
    corpo.length > 100 ? corpo.substring(0, 100) + "..." : corpo;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mx-auto py-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto">
        <header className="bg-white rounded-lg mb-6 p-4 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center lg:text-lg px-4 py-2 rounded-md font-medium  text-black  focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Categorias
                  <svg
                    className={`ml-2 transform transition-transform ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20"
                    style={{ top: "100%", left: 0 }}
                  >
                    <button
                      onClick={() => handleCategorySelect("")}
                      className={`w-full text-left px-4 py-2 text-sm font-medium ${
                        selectedCategories.length === 0
                          ? "bg-gray-800 text-white"
                          : "bg-transparent text-gray-600"
                      } hover:bg-gray-100`}
                    >
                      Todos
                    </button>

                    {categorias
                      .filter((categoria) =>
                        [
                          "atualidade",
                          "noticia",
                          "Diocese",
                          "Àgape",
                          "Papa",
                          "Eventos",
                          "Opiniao",
                          "familia e vida",
                          "Missões",
                          "Liturgia e Sacramentos",
                          "Juventude",
                          "Cultura e Arte Sacra",
                        ].includes(categoria.nome.toLowerCase())
                      )
                      .map((categoria) => (
                        <button
                          key={categoria.id}
                          onClick={() => handleCategorySelect(categoria.id)}
                          className={`w-full text-left px-4 py-2 text-sm font-medium ${
                            selectedCategories.includes(categoria.id)
                              ? categoryColors[categoria.nome.toLowerCase()] ||
                                " text-black"
                              : "bg-transparent text-gray-600"
                          } `}
                        >
                          {categoria.nome.charAt(0).toUpperCase() +
                            categoria.nome.slice(1)}
                        </button>
                      ))}
                  </div>
                )}
              </div>
              <div className="flex flex-row lg:flex-row lg:items-center lg:space-x-4 mt-4 lg:mt-0">
                <input
                  type="text"
                  placeholder="Pesquisar notícias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 w-40 lg:w-72"
                />
                <div className="flex mt-2 lg:mt-0 lg:space-x-2">
                  <button
                    onClick={handleSearch}
                    className="p-2 text-gray-400 rounded-md  "
                  >
                    <FaSearch className="h-6 w-6" />
                  </button>

                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Limpar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        {loading && <p className="text-center text-gray-600">Carregando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && filteredData.length === 0 && (
          <p className="text-center text-gray-600">
            Nenhum conteúdo encontrado.
          </p>
        )}

        {/* Layout para dispositivos móveis */}
        <div className="sm:hidden">
          {currentItems.map((conteudo) => {
            const categoryColor =
              categoryColors[conteudo.categoria.nome.toLowerCase()] ||
              "text-gray-500";
            return (
              <div key={conteudo.id} className="mb-6">
                <a href="#">
                  <img
                    className="w-full h-auto object-cover"
                    src={`${baseUrl}/${conteudo.banner}`}
                    alt={conteudo.titulo}
                    style={{ minHeight: "250px", maxHeight: "200px" }}
                  />
                </a>
                <div className="relative rounded-md grid grid-cols-1 -mt-14 px-10 pt-5 bg-white m-3 my-1">
                  <span
                    className={`bg-white ${categoryColor} text-xs uppercase font-bold`}
                  >
                    {conteudo.categoria.nome}
                  </span>
                  <Link
                    to={`/conteudos/${conteudo.id}`}
                    className="font-semibold text-lg inline-block hover:text-red-600 transition duration-500 ease-in-out mb-2"
                    style={{ fontFamily: "aktiv-grotesk, sans-serif" }}
                  >
                    {conteudo.titulo.charAt(0).toUpperCase() +
                      conteudo.titulo.slice(1)}
                  </Link>
                  <div
                    className="line-clamp-3 overflow-hidden text-ellipsis"
                    dangerouslySetInnerHTML={{
                      __html: truncatedContent(conteudo.descricao),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Layout para telas maiores */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <Link
              key={item.id}
              to={`/conteudos/${item.id}`}
              className="flex flex-col bg-white overflow-hidden"
            >
              <img
                src={`${baseUrl}/${item.banner}`}
                alt={item.titulo}
                className="w-full h-48 object-cover"
              />
              <div className="mt-2 flex flex-col flex-grow py-2">
                <span
                  className={`bg-white ${
                    categoryColors[item.categoria.nome.toLowerCase()] ||
                    "text-gray-500"
                  } text-xs uppercase font-bold mb-2`}
                >
                  {item.categoria.nome.charAt(0).toUpperCase() +
                    item.categoria.nome.slice(1)}
                </span>
                <h2
                  className="text-lg font-semibold mb-2 hover:text-red-600 transition duration-500 ease-in-out"
                  style={{ fontFamily: "aktiv-grotesk, sans-serif" }}
                >
                  {item.titulo.charAt(0).toUpperCase() + item.titulo.slice(1)}
                </h2>
                <div
                  className="line-clamp-3 overflow-hidden text-ellipsis"
                  dangerouslySetInnerHTML={{
                    __html: truncatedContent(item.descricao),
                  }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Paginação */}
        <div className="flex justify-center mt-6">
          <nav>
            <ul className="inline-flex">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-md hover:bg-gray-100"
                >
                  Anterior
                </button>
              </li>
              {[
                ...Array(Math.ceil(filteredData.length / itemsPerPage)).keys(),
              ].map((pageNumber) => (
                <li key={pageNumber}>
                  <button
                    onClick={() => paginate(pageNumber + 1)}
                    className={`px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-md ${
                      currentPage === pageNumber + 1 ? "bg-gray-200" : ""
                    }`}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredData.length / itemsPerPage)
                  }
                  className="px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-md hover:bg-gray-100"
                >
                  Próximo
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Noticias;
