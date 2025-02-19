import React, { useState, useEffect } from "react";
import { api } from "../../../services/api"; // Verifique se a URL base está correta no arquivo api.js
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const CreateCategoryForm: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [_error, setError] = useState<string | null>(null);
  const [_success, setSuccess] = useState<string | null>(null);
  const [categorias, setCategorias] = useState([]); // Estado para armazenar categorias
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // Estados para controle da paginação
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Número de itens por página
  const totalPages = Math.ceil(categorias.length / itemsPerPage); // Total de páginas com base nas categorias

  // Função para buscar categorias do banco de dados
  const fetchCategorias = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (err: any) {
      console.error("Erro ao buscar categorias:", err);
      toast.error("Erro ao buscar categorias.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []); // Executa apenas uma vez ao montar o componente

  // Função para enviar o formulário e cadastrar a categoria
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await api.post(
        "/categorias",
        { nome },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Categoria criada com sucesso!");
      setNome("");
      setError(null);
      toast.success("Categoria criada com sucesso!");
      fetchCategorias();
    } catch (err: any) {
      console.error("Erro ao criar categoria:", err);
      setError(
        err.response?.data?.message || "Ocorreu um erro ao criar a categoria."
      );
      toast.error(
        "Erro ao criar categoria: " +
          (err.response?.data?.message || "Tente novamente.")
      );
    }
  };

  const handleDeleteClick = (eventId: number) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEventId === null) return;

    try {
      await api.delete(`/categorias/${selectedEventId}`);
      toast.success("Evento excluído com sucesso!");
      fetchCategorias(); // Atualiza a lista de categorias após a exclusão
    } catch (err: any) {
      console.error("Erro ao excluir evento:", err);
      toast.error("Erro ao excluir evento.");
    } finally {
      setShowModal(false);
      setSelectedEventId(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEventId(null);
  };

  const ConfirmationModal: React.FC<{
    onClose: () => void;
    onConfirm: () => void;
  }> = ({ onClose, onConfirm }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Confirmação de Exclusão
          </h3>
          <p>Tem certeza de que deseja excluir esta categoria?</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Função para calcular as categorias da página atual
  const currentCategories = categorias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Funções de navegação da paginação
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white">
      <div className="header my-3 h-12 px-10 flex items-center justify-between">
        <h1 className="font-medium text-2xl">Cadastrar Nova Categoria</h1>
      </div>
      <div className="flex flex-col mx-3 mt-6 lg:flex-row">
        <div className="w-full lg:w-1/3 m-1">
          <form
            className="w-full bg-white shadow-md p-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoria_nome"
                >
                  Nome da Categoria
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome da Categoria"
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6">
                <button
                  type="submit"
                  className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  Adicionar Categoria
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Listagem de Categorias com paginação */}
        <div className="w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
          <div className="overflow-x-auto rounded-lg p-3">
            <table className="table-auto w-full">
              <thead className="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Categoria</th>
                  <th className="p-2 text-center">Ação</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.length > 0 ? (
                  currentCategories.map((categoria: any) => (
                    <tr key={categoria.id} className="text-sm text-gray-700">
                      <td className="p-2 text-center">{categoria.id}</td>
                      <td className="p-2">{categoria.nome}</td>
                      <td className="p-2">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleDeleteClick(categoria.id)}
                            className="rounded-md hover:bg-red-100 text-red-600 p-2 flex items-center"
                          >
                            <FaTrash className="w-4 h-4 mr-1" />
                            Excluir
                          </button>
                        </div>
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
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500"
                    : "bg-gray-100 hover:bg-gray-200"
                } px-4 py-2 rounded`}
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index + 1)}
                  className={`mx-1 px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? "bg-zinc-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500"
                    : "bg-gray-100 hover:bg-gray-200"
                } px-4 py-2 rounded`}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ConfirmationModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default CreateCategoryForm;
