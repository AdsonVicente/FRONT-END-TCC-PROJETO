import React, { useState, useEffect, useCallback } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define os tipos para os conteúdos
interface Liturgia {
  id: string;
  titulo: string;
  dia: string;
}
const GerenciarLiturgia: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [liturgias, setLiturgias] = useState<Liturgia[]>([]);
  const [filteredLiturgias, setFilteredLiturgias] = useState<Liturgia[]>([]);
  const [_isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [_data, setData] = useState<Liturgia[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [_selectedConteudoId, _setSelectedConteudoId] = useState<string | null>(
    null
  );
  const [deleteId, setDeleteId] = useState<string>("");

  // Filtros

  const [dataFiltro, setDataFiltro] = useState("");

  const navigate = useNavigate();
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredLiturgias.length / itemsPerPage);

  const fetchLiturgias = useCallback(async () => {
    try {
      const response = await api.get("/liturgias");
      setLiturgias(response.data);
      setFilteredLiturgias(response.data);
    } catch (error) {
      console.error("Houve um erro ao buscar as liturgias", error);
    }
  }, []);

  useEffect(() => {
    fetchLiturgias();
  }, [fetchLiturgias]);

  // Função para aplicar os filtros
  const aplicarFiltros = () => {
    let liturgiasFiltradas = liturgias;

    if (dataFiltro) {
      liturgiasFiltradas = liturgiasFiltradas.filter((liturgia) =>
        new Date(liturgia.dia).toLocaleDateString().includes(dataFiltro)
      );
    }

    setFilteredLiturgias(liturgiasFiltradas);
    setCurrentPage(1); // Resetar para a primeira página após aplicar filtros
  };

  useEffect(() => {
    aplicarFiltros();
  }, [dataFiltro]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLiturgias = filteredLiturgias.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddLiturgia = () => {
    navigate("/publicarliturgia");
    setIsAddModalOpen(true);
  };

  const handleDeleteConfirmation = (liturgiaId: string) => {
    setDeleteId(liturgiaId);
    setIsDeleteModalOpen(true);
  };

  const deleteLiturgia = async () => {
    try {
      await api.delete(`/liturgias/${deleteId}`);

      setData((prevData) => prevData.filter((item) => item.id !== deleteId));
      toast.success("Liturgia excluída com sucesso");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(`Erro ao excluir a liturgia ${deleteId}:`, error);
      toast.error(`Erro ao excluir a liturgia ${deleteId}`);
    }
  };

  const handleEdit = (content: { id: string }) => {
    navigate(`/liturgias/editar/${content.id}`);
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Filtros */}
      <div className="max-w-full sm:max-w-5xl mx-auto bg-white p-4 sm:p-6 mb-6">
        <h1 className="text-lg font-semibold mb-4">Filtre as liturgias</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            placeholder="Filtrar por data"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div>
      </div>

      {/* Conteúdos Section */}
      <div className="max-w-full sm:max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Gerenciar Liturgias
            </h3>
            <button
              onClick={handleAddLiturgia}
              className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition-colors text-sm"
            >
              <FaPlus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">
                    ID
                  </th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">
                    Título
                  </th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">
                    Dia
                  </th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentLiturgias.length ? (
                  currentLiturgias.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {item.id}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {item.titulo}
                      </td>

                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {new Date(item.dia).toLocaleDateString()}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                          aria-label="Editar Conteúdo"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
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
                      colSpan={5}
                      className="p-4 text-center text-xs sm:text-sm text-gray-500"
                    >
                      Nenhuma liturgia encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <button
              className={`bg-yellow-600 text-white py-2 px-4 rounded-lg text-xs sm:text-sm ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="text-xs sm:text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <button
              className={`bg-yellow-600 text-white py-2 px-4 rounded-lg text-xs sm:text-sm ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>

      {/* Modal para confirmar exclusão */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold mb-4">
              Deseja realmente excluir esta liturgia?
            </h4>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
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
