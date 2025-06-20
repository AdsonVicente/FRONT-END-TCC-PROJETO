"use client"; // Importante para componentes que usam estado e efeitos no Next.js 13+

import React, { useState, useEffect } from "react";
import { api } from "../../../services/api"; // Ajuste o path conforme sua estrutura
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useCallback } from "react";
import { AxiosError } from "axios";

interface Categoria {
  id: number;
  nome: string;
}

const ITEMS_PER_PAGE = 5;

const CreateCategoryForm: React.FC = () => {
  const [nome, setNome] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(categorias.length / ITEMS_PER_PAGE);


  const fetchCategorias = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const response = await api.get<Categoria[]>("/categorias");
      setCategorias(response.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Erro ao buscar categorias:", error.message);
        toast.error("Erro ao buscar categorias.");
      } else {
        console.error("Erro desconhecido:", error);
        toast.error("Erro inesperado.");
      }
    } finally {
      setIsFetching(false);
    }
  }, [isFetching]);


  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      toast.error("O nome da categoria não pode ser vazio.");
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post("/categoria", { nome: nome.trim() });
      toast.success("Categoria criada com sucesso!");
      setNome("");
      fetchCategorias();
      setCurrentPage(1); // Voltar para a primeira página após inclusão
    } catch (error: unknown) {
      console.error("Erro ao criar categoria:", error);
      toast.error(
        "Erro ao criar categoria"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedCategoryId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCategoryId === null) return;
    try {
      await api.delete(`/categoria/${selectedCategoryId}`);
      toast.success("Categoria excluída com sucesso!");
      fetchCategorias();
      // Ajusta página caso último item da página seja excluído
      const newTotal = categorias.length - 1;
      const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      toast.error("Erro ao excluir categoria.");
    } finally {
      setShowModal(false);
      setSelectedCategoryId(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategoryId(null);
  };

  // Categorias para paginação
  const currentCategories = categorias.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Navegação de páginas
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Modal simples para confirmação
  const ConfirmationModal: React.FC<{ onClose: () => void; onConfirm: () => void }> = ({
    onClose,
    onConfirm,
  }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Confirmação de Exclusão</h3>
        <p>Tem certeza que deseja excluir esta categoria?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-medium mb-4">Cadastrar Nova Categoria</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <label htmlFor="categoria_nome" className="block text-gray-700 font-bold mb-2">
          Nome da Categoria
        </label>
        <input
          id="categoria_nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da Categoria"
          required
          className="w-full border border-gray-400 rounded-lg py-2 px-3 mb-4 focus:outline-none focus:border-[#98c01d]"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-700 text-white font-bold py-3 rounded hover:bg-green-600 disabled:opacity-50 transition"
        >
          {isSubmitting ? "Salvando..." : "Adicionar Categoria"}
        </button>
      </form>

      <section>
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Categoria</th>
              <th className="border border-gray-300 p-2 text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map(({ id, nome }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{id}</td>
                  <td className="border border-gray-300 p-2">{nome}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleDeleteClick(id)}
                      className="text-red-600 hover:text-red-800 flex items-center justify-center space-x-1"
                      aria-label={`Excluir categoria ${nome}`}
                    >
                      <FaTrash />
                      <span>Excluir</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  Nenhuma categoria encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-4 py-2 rounded ${currentPage === page
                ? "bg-zinc-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages || totalPages === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            Próxima
          </button>
        </div>
      </section>

      {showModal && (
        <ConfirmationModal onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
      )}
    </div>
  );
};

export default CreateCategoryForm;
