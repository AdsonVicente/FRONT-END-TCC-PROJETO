"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "../../services/api";
import ContentCard from "./card/Card";
import FilterSection from "./filtro/Filtro";

interface Conteudo {
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
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryParam);

  const [results, setResults] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const [showCategories, setShowCategories] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);

  const fetchContents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/conteudos");
      const data: Conteudo[] = response.data;

      const filtered = data.filter((item) => {
        const titulo = item.titulo?.toLowerCase() || "";
        const descricao = item.descricao?.toLowerCase() || "";
        const categoria = item.category?.nome || "Sem categoria";
        const autor = item.autor || "Desconhecido";

        const matchesQuery =
          titulo.includes(queryParam.toLowerCase()) ||
          descricao.includes(queryParam.toLowerCase());
        const matchesCategory = selectedCategory ? categoria === selectedCategory : true;
        const matchesAuthor = selectedAuthor ? autor === selectedAuthor : true;

        return matchesQuery && matchesCategory && matchesAuthor;
      });

      setResults(filtered);

      setCategories(
        Array.from(new Set(data.map((i) => i.category?.nome || "Sem categoria")))
      );
      setAuthors(
        Array.from(new Set(data.map((i) => i.autor || "Desconhecido")))
      );

      setError(filtered.length === 0 ? "Nenhum conteúdo encontrado." : null);
    } catch (err) {
      console.error("Erro ao buscar conteúdos:", err);
      setError("Erro ao buscar conteúdos.");
    } finally {
      setLoading(false);
    }
  }, [queryParam, selectedCategory, selectedAuthor]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/buscar?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row lg:mt-12">
        <aside className="w-full lg:w-1/4 pr-4 mb-6 lg:mb-0">
          <h1 className="text-2xl font-bold mb-4">Resultados da Pesquisa</h1>

          <form onSubmit={handleSearchSubmit} className="mb-4 flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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

          <FilterSection
            title="Categoria"
            items={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
            toggle={showCategories}
            setToggle={setShowCategories}
          />

          <FilterSection
            title="Autor"
            items={authors}
            selected={selectedAuthor}
            onChange={setSelectedAuthor}
            toggle={showAuthors}
            setToggle={setShowAuthors}
          />
        </aside>

        <main className="w-full lg:w-3/4">
          {error && <p className="text-red-500">{error}</p>}
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((conteudo) => (
                <ContentCard key={conteudo.id} conteudo={conteudo} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
