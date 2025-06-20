"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import Card from "@/app/componentes/Cards/Card";

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
  { id: "2e387869-219a-4eee-9926-2a9660349c4f", nome: "Categoria 1" },
  { id: "25ac774b-6601-4b57-b281-59e1a02f973f", nome: "Categoria 2" },
  { id: "b75f392a-0b02-49e7-bf8b-c6e1d311bcd5", nome: "Categoria 3" },
  { id: "49522c3a-d37b-46d4-8b3d-531a452c96a7", nome: "Categoria 4" },
  { id: "bcd51bd3-e589-407a-adce-cd86fff17b49", nome: "Categoria 5" },
  { id: "593bf9d4-0c82-4b77-840c-83670901da3d", nome: "Categoria 6" },
  { id: "a696cdf4-ffce-4cad-a809-4e01492f16d1", nome: "Categoria 7" },
  { id: "2a85d600-1775-4a50-a3e3-0c6d80ffdb78", nome: "Categoria 8" },
  { id: "37aced55-a478-4ebe-b492-7b7d970a1390", nome: "Categoria 9" },
  { id: "eefb0c65-d5e8-460a-931e-90f974842732", nome: "Categoria 10" },
];

export default function FormacaoClient({ conteudos }: { conteudos: Conteudo[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const categoriasComTodos = [{ id: "all", nome: "Todos" }, ...categoriasPermitidas];

  const filteredData = conteudos.filter((conteudo) => {
    const tituloLower = conteudo.titulo.toLowerCase();
    const matchSearch = tituloLower.includes(debouncedSearchTerm.toLowerCase());
    const matchCategory =
      selectedCategories.includes("all") || selectedCategories.length === 0
        ? true
        : selectedCategories.includes(conteudo.categoria.id);
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Formações</h1>

      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-end md:justify-between">
        {/* Campo de pesquisa */}
        <div className="w-full md:max-w-sm">
          <label className="block text-sm font-medium text-gray-700 mb-1">Pesquisar</label>
          <input
            type="text"
            placeholder="Buscar título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dropdown de categorias */}
        <div className="w-full md:max-w-sm relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Categorias</label>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full text-left px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl shadow-sm"
          >
            {selectedCategories.length === 0
              ? "Selecione uma categoria"
              : `Selecionado: ${selectedCategories.length}`}
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-20 max-h-64 overflow-auto">
              {categoriasComTodos.map((categoria) => (
                <button
                  key={categoria.id}
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.includes(categoria.id)
                        ? prev.filter((id) => id !== categoria.id)
                        : categoria.id === "all"
                        ? ["all"]
                        : prev.filter((id) => id !== "all").concat(categoria.id)
                    )
                  }
                  className={`w-full text-left px-4 py-2 hover:bg-blue-50 capitalize transition ${
                    selectedCategories.includes(categoria.id)
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : ""
                  }`}
                >
                  {categoria.nome}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div>
        {filteredData.length === 0 && (
          <p className="text-center text-gray-600">Nenhum conteúdo encontrado.</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredData.map((conteudo) => (
            <Card key={conteudo.id} conteudo={conteudo} />
          ))}
        </div>
      </div>
    </div>
  );
}
