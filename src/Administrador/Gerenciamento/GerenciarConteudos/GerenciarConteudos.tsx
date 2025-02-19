import React, { useState, useEffect, useCallback } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { api } from "../../../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// Define os tipos para os conteúdos
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
const GerenciarConteudos: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [filteredConteudos, setFilteredConteudos] = useState<Conteudo[]>([]);
  const [_isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [_data, setData] = useState<Conteudo[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [_selectedConteudoId, _setSelectedConteudoId] = useState<string | null>(
    null
  );
  const [deleteId, setDeleteId] = useState<string>("");

  // Filtros
  const [autorFiltro, setAutorFiltro] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");

  const navigate = useNavigate();
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredConteudos.length / itemsPerPage);

  // Função para ordenar os conteúdos por data
  const sortByDate = (conteudos: Conteudo[]) => {
    return conteudos.sort((a, b) => new Date(b.publicadoEm).getTime() - new Date(a.publicadoEm).getTime());
  };

  // Função para buscar os conteúdos
  const fetchConteudos = useCallback(async () => {
    try {
      const response = await api.get("/conteudos");
      const sortedConteudos = sortByDate(response.data); // Ordena os conteúdos pela data de publicação
      setConteudos(sortedConteudos);
      setFilteredConteudos(sortedConteudos); // Inicializa os conteúdos filtrados
    } catch (error) {
      console.error("Houve um erro ao buscar os conteúdos", error);
      toast.error("Erro ao buscar os conteúdos.");
    }
  }, []);

  useEffect(() => {
    fetchConteudos();
  }, [fetchConteudos]);

  // Função para aplicar os filtros
  const aplicarFiltros = () => {
    let conteudosFiltrados = conteudos;

    if (autorFiltro) {
      conteudosFiltrados = conteudosFiltrados.filter((conteudo) =>
        conteudo.autor.toLowerCase().includes(autorFiltro.toLowerCase())
      );
    }

    if (dataFiltro) {
      conteudosFiltrados = conteudosFiltrados.filter((conteudo) =>
        new Date(conteudo.publicadoEm).toLocaleDateString().includes(dataFiltro)
      );
    }

    setFilteredConteudos(conteudosFiltrados);
    setCurrentPage(1); // Resetar para a primeira página após aplicar filtros
  };

  useEffect(() => {
    aplicarFiltros();
  }, [autorFiltro, dataFiltro]);

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
  const currentConteudos = filteredConteudos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddConteudo = () => {
    navigate("/conteudo/publicar");
    setIsAddModalOpen(true);
  };

  const handleDeleteConfirmation = (conteudoId: string) => {
    setDeleteId(conteudoId);
    setIsDeleteModalOpen(true);
  };

  const deleteConteudo = async () => {
    try {
      await api.delete(`/conteudos/${deleteId}`);

      setData((prevData) => prevData.filter((item) => item.id !== deleteId));
      toast.success("Conteúdo excluído com sucesso");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(`Erro ao excluir o conteúdo ${deleteId}:`, error);
      toast.error(`Erro ao excluir o conteúdo ${deleteId}`);
    }
  };

  const handleEdit = (content: { id: string }) => {
    navigate(`/conteudos/editar/${content.id}`);
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Filtros */}
      <div className="max-w-full sm:max-w-5xl mx-auto bg-white p-4 sm:p-6 mb-6">
        <h1 className="text-lg font-semibold mb-4">Filtre os conteúdos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Filtrar por autor"
            value={autorFiltro}
            onChange={(e) => setAutorFiltro(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
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
              Gerenciar Conteúdos
            </h3>
            <button
              onClick={handleAddConteudo}
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
                    Autor
                  </th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">
                    Publicado em
                  </th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentConteudos.length ? (
                  currentConteudos.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {item.id}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        <Link
                          to={`/conteudos/${item.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.titulo}
                        </Link>
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {item.autor}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {new Date(item.publicadoEm).toLocaleDateString()}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm flex space-x-2">
                        <Link
                          to={`/conteudos/${item.id}`}
                          className="text-blue-600 hover:text-blue-800 transition duration-150"
                        >
                          <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                          aria-label="Editar Conteúdo"
                        >
                          <Link
                            to={`/editar-conteudo/${item.id}`}
                            aria-label="Editar Conteúdo"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </Link>
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
                      Nenhum conteúdo encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <button
              className={`bg-blue-600 text-white py-2 px-4 rounded-lg text-xs sm:text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
              className={`bg-blue-600 text-white py-2 px-4 rounded-lg text-xs sm:text-sm ${currentPage === totalPages
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
              Deseja realmente excluir este conteúdo?
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
                onClick={deleteConteudo}
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

export default GerenciarConteudos;
