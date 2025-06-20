"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { api } from "../../../services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Liturgia {
  id: string;
  titulo: string;
  dia: string;
}

const GerenciarLiturgia: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [liturgias, setLiturgias] = useState<Liturgia[]>([]);
  const [filteredLiturgias, setFilteredLiturgias] = useState<Liturgia[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const [dataFiltro, setDataFiltro] = useState("");

  const router = useRouter();
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredLiturgias.length / itemsPerPage));

  const fetchLiturgias = useCallback(async () => {
    try {
      const response = await api.get("/liturgias");
      setLiturgias(response.data);
      setFilteredLiturgias(response.data);
    } catch (error) {
      console.error("Houve um erro ao buscar as liturgias", error);
      toast.error("Erro ao carregar liturgias.");
    }
  }, []);

  useEffect(() => {
    fetchLiturgias();
  }, [fetchLiturgias]);

  const aplicarFiltros = useCallback(() => {
    let liturgiasFiltradas = liturgias;

    if (dataFiltro) {
      liturgiasFiltradas = liturgiasFiltradas.filter((liturgia) => {
        const liturgiaDataFormatada = new Date(liturgia.dia)
          .toISOString()
          .split("T")[0];
        return liturgiaDataFormatada === dataFiltro;
      });
    }

    setFilteredLiturgias(liturgiasFiltradas);
    setCurrentPage(1);
  }, [liturgias, dataFiltro]); // <- 🔥 dependências necessárias

  // useEffect correto
  useEffect(() => {
    aplicarFiltros();
  }, [aplicarFiltros]); // 🔥 Sem warnings

  useEffect(() => {
    aplicarFiltros();
  }, [dataFiltro]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLiturgias = filteredLiturgias.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddLiturgia = () => {
    router.push("/administrador/gerenciamento/liturgia/cadastrar");
  };

  const handleDeleteConfirmation = (liturgiaId: string) => {
    setDeleteId(liturgiaId);
    setIsDeleteModalOpen(true);
  };

  const deleteLiturgia = async () => {
    try {
      await api.delete(`/liturgia/${deleteId}`);
      setLiturgias((prev) => prev.filter((item) => item.id !== deleteId));
      setFilteredLiturgias((prev) => prev.filter((item) => item.id !== deleteId));
      toast.success("Liturgia excluída com sucesso");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(`Erro ao excluir a liturgia ${deleteId}:`, error);
      toast.error(`Erro ao excluir a liturgia.`);
    }
  };

  const handleEdit = (content: { id: string }) => {
    router.push(`/administrador/gerenciamento/liturgia/editar/${content.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Gerenciar Liturgias</h1>
            <p className="text-gray-500 text-base">Administre, filtre e edite as liturgias cadastradas.</p>
          </div>
          <button
            onClick={handleAddLiturgia}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 transition-all text-base font-semibold"
          >
            <FaPlus className="w-4 h-4" />
            Nova Liturgia
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col sm:flex-row items-center gap-4">
          <label className="font-medium text-gray-700 flex-shrink-0" htmlFor="dataFiltro">
            Filtrar por data:
          </label>
          <input
            id="dataFiltro"
            type="date"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 w-full sm:w-60"
          />
          <button
            onClick={() => setDataFiltro("")}
            className="sm:ml-auto text-blue-600 hover:underline text-sm"
            disabled={!dataFiltro}
          >
            Limpar filtro
          </button>
        </div>
      </div>


      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-blue-200 border-b">
                <th className="p-4 text-xs sm:text-sm font-semibold text-gray-700">ID</th>
                <th className="p-4 text-xs sm:text-sm font-semibold text-gray-700">Título</th>
                <th className="p-4 text-xs sm:text-sm font-semibold text-gray-700">Dia</th>
                <th className="p-4 text-xs sm:text-sm font-semibold text-gray-700 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentLiturgias.length ? (
                currentLiturgias.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}
                  >
                    <td className="p-4 text-xs sm:text-sm text-gray-700">{item.id}</td>
                    <td className="p-4 text-xs sm:text-sm text-gray-800 font-medium">{item.titulo}</td>
                    <td className="p-4 text-xs sm:text-sm text-gray-700">
                      {new Date(item.dia).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-xs sm:text-sm flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
                        aria-label="Editar Conteúdo"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700 transition"
                        onClick={() => handleDeleteConfirmation(item.id)}
                        aria-label="Excluir Conteúdo"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-sm text-gray-500"
                  >
                    Nenhuma liturgia encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-50 border-t gap-2">
          <button
            className={`bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-5 rounded-lg text-sm font-semibold transition ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600">
            Página <span className="font-semibold">{currentPage}</span> de <span className="font-semibold">{totalPages}</span>
          </span>
          <button
            className={`bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-5 rounded-lg text-sm font-semibold transition ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      </div>
      {/* Modal para confirmar exclusão */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h4 className="text-xl font-bold mb-4 text-gray-800">
              Confirmar exclusão
            </h4>
            <p className="mb-6 text-gray-600">
              Tem certeza que deseja excluir esta liturgia? Esta ação não poderá ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-200 text-gray-700 py-2 px-5 rounded-lg font-medium hover:bg-gray-300 transition"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 text-white py-2 px-5 rounded-lg font-medium hover:bg-red-700 transition"
                onClick={deleteLiturgia}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciarLiturgia;
