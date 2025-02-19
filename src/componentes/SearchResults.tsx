import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import DOMPurify from "dompurify";

interface Conteudo {
  id: number;
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

const SearchResults = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("query") || "";
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [showCategories, setShowCategories] = useState<boolean>(false); // Toggle for categories
  const [showAuthors, setShowAuthors] = useState<boolean>(false); // Toggle for authors

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

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

  const fetchContents = async () => {
    setLoading(true);
    try {
      const response = await api.get("/conteudos");
      const data: Conteudo[] = response.data;

      // Filter by title, description, category, and author
      const filteredResults = data.filter(
        (item) =>
          (item.titulo.toLowerCase().includes(query.toLowerCase()) ||
            item.descricao.toLowerCase().includes(query.toLowerCase())) &&
          (selectedCategory
            ? item.categoria.nome === selectedCategory
            : true) &&
          (selectedAuthor ? item.autor === selectedAuthor : true)
      );

      setResults(filteredResults);

      // Extract unique categories and authors for filters
      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.categoria.nome))
      );
      const uniqueAuthors = Array.from(new Set(data.map((item) => item.autor)));

      setCategories(uniqueCategories);
      setAuthors(uniqueAuthors);

      if (filteredResults.length === 0) {
        setError("Nenhum conteúdo encontrado.");
      } else {
        setError(null);
      }
    } catch (err) {
      console.error("Erro ao buscar conteúdos:", err);
      setError("Erro ao buscar conteúdos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`?query=${query}`);
    fetchContents();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthor(author);
    setShowAuthors(false);
  };

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  const toggleAuthors = () => {
    setShowAuthors((prev) => !prev);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row lg:mt-12">
        <aside className="w-full lg:w-1/4 pr-4 mb-4 lg:mb-0">
          <h1 className="text-2xl font-bold mb-4">Resultados da Pesquisa</h1>

          <form onSubmit={handleSearchSubmit} className="mb-4 flex">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-lg py-2 px-4 flex-grow"
              placeholder="Pesquise conteúdos..."
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-zinc-800 text-white rounded-lg"
            >
              Buscar
            </button>
          </form>

          <h2
            className="text-lg font-semibold mb-2 cursor-pointer lg:hidden"
            onClick={toggleCategories}
          >
            Filtrar por Categoria {showCategories ? "▲" : "▼"}
          </h2>
          <ul className={`mb-6 ${showCategories ? "" : "hidden"} lg:block`}>
            <li
              className={`cursor-pointer ${
                selectedCategory === "" ? "font-bold" : ""
              }`}
              onClick={() => handleCategoryChange("")}
            >
              Todas
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer ${
                  selectedCategory === category ? "font-bold" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>

          <h2
            className="text-lg font-semibold mb-2 cursor-pointer lg:hidden"
            onClick={toggleAuthors}
          >
            Filtrar por Autor {showAuthors ? "▲" : "▼"}
          </h2>
          <ul className={`mb-6 ${showAuthors ? "" : "hidden"} lg:block`}>
            <li
              className={`cursor-pointer ${
                selectedAuthor === "" ? "font-bold" : ""
              }`}
              onClick={() => handleAuthorChange("")}
            >
              Todos
            </li>
            {authors.map((author) => (
              <li
                key={author}
                className={`cursor-pointer ${
                  selectedAuthor === author ? "font-bold" : ""
                }`}
                onClick={() => handleAuthorChange(author)}
              >
                {author}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="w-full lg:w-3/4">
          {/* Error or success message */}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((conteudo) => {
              const categoryColor =
                categoryColors[conteudo.categoria.nome.toLowerCase()] ||
                "text-gray-500";
              return (
                <div key={conteudo.id} className="mb-6">
                  <Link to={`/conteudos/${conteudo.id}`}>
                    <img
                      className="w-full h-48 object-cover"
                      src={`${baseUrl}/${conteudo.banner}`}
                      alt={conteudo.titulo}
                    />
                  </Link>
                  <div className="mt-2 flex flex-col flex-grow py-2  bg-white ">
                    <span
                      className={`bg-white ${categoryColor} text-xs uppercase font-bold mb-2`}
                    >
                      {conteudo.categoria.nome}
                    </span>
                    <Link
                      to={`/conteudos/${conteudo.id}`}
                      className="font-semibold text-lg hover:text-indigo-600 transition duration-500 ease-in-out"
                    >
                      {conteudo.titulo.charAt(0).toUpperCase() +
                        conteudo.titulo.slice(1)}
                    </Link>
                    <p
                      className="line-clamp-3 text-sm text-gray-700 overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(conteudo.descricao),
                      }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      Por {conteudo.autor}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
