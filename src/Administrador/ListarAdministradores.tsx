import React, { useState, useEffect, useCallback } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { api } from "../services/api";
import AdminModal from "./componentes/modal/AdminModal"; // Importando AdminModal
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConteudosModal from "./ConteudosModal";

const ListarAdministradoresPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [admins, setAdmins] = useState<
    {
      id: string;
      nome: string;
      email: string;
      tipo: string;
    }[]
  >([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalAdmOpen, setIsDeleteModalAdmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [isConteudosModalOpen, setIsConteudosModalOpen] = useState(false);
  const [conteudos, setConteudos] = useState([]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(admins.length / itemsPerPage);

  const fetchAdmins = useCallback(async () => {
    try {
      const response = await api.get("/administradores");
      setAdmins(response.data);
    } catch (error) {
      console.error("Houve um erro ao buscar os administradores", error);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // @ts-ignore
  const handleVerConteudos = async (adminId: string, nomeAdmin: string) => {
    try {
      const response = await api.get(
        `/conteudosadm?autor=${encodeURIComponent(nomeAdmin)}`
      );
      setConteudos(response.data);
      setIsConteudosModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar conteúdos do administrador", error);
      toast.error("Erro ao buscar conteúdos do administrador");
    }
  };

  const handleCloseConteudosModal = () => {
    setIsConteudosModalOpen(false);
    setConteudos([]);
  };

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
  const currentAdmins = admins.slice(startIndex, startIndex + itemsPerPage);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddAdmin = () => {
    setIsAddModalOpen(true); // Abre o modal de adicionar
  };

  const handleEdit = (content: { id: string }) => {
    navigate(`/administradores/${content.id}`);
  };

  const handleDeleteAdminConfirmation = (administrador_Id: string) => {
    setDeleteId(administrador_Id);
    setIsDeleteModalAdmOpen(true);
  };

  const deleteAdmin = async () => {
    try {
      await api.delete(`/administradores/${deleteId}`);
      setAdmins(admins.filter((item) => item.id !== deleteId));
      toast.success("Administrador excluído com sucesso");
      setIsDeleteModalAdmOpen(false);
    } catch (error) {
      console.error(
        `Houve um erro ao excluir o administrador ${deleteId}:`,
        error
      );
      toast.error(`Erro ao excluir o administrador ${deleteId}`);
    }
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-full sm:max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Administradores
            </h3>
            <button
              onClick={handleAddAdmin}
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
                    Nome
                  </th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">
                    Email
                  </th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">
                    Hierarquia
                  </th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.length ? (
                  currentAdmins.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {item.id}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {item.nome}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {item.email}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {item.tipo}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                          aria-label="Editar Administrador"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteAdminConfirmation(item.id)}
                          className="text-red-600 hover:text-red-800"
                          aria-label="Excluir Administrador"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => handleVerConteudos(item.id, item.nome)}
                          className="text-green-600 hover:text-green-800"
                          aria-label="Ver Conteúdos"
                        >
                          Ver Conteúdos
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
                      Nenhum administrador encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Modal de Conteúdos */}
            <ConteudosModal
              isOpen={isConteudosModalOpen}
              onClose={handleCloseConteudosModal}
              conteudos={conteudos}
            />

            {/* Modal de Adicionar Administrador */}
            {isAddModalOpen && (
              <AdminModal
                isOpen={isAddModalOpen}
                onClose={handleCloseModal}
                onSuccess={fetchAdmins} // Renomeado para onSuccess
              />
            )}

            {/* Modal de Confirmação de Exclusão para Administradores */}
            {isDeleteModalAdmOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                  <h3 className="text-lg font-semibold mb-4">
                    Confirmação de Exclusão
                  </h3>
                  <p className="mb-4">
                    Você tem certeza de que deseja excluir o administrador com o
                    ID:
                  </p>
                  <div className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-4 text-gray-700">
                    {deleteId}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsDeleteModalAdmOpen(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={deleteAdmin}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-600 py-2 px-4 rounded-lg"
            >
              Anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-200 text-gray-600 py-2 px-4 rounded-lg"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarAdministradoresPage;
