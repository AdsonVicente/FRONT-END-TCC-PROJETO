'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/services/api';
import { toast } from 'react-toastify';
import { FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode';
import ConteudosModal from '@/app/administrador/ConteudoModal';

interface Admin {
  id: string;
  nome: string;
  email: string;
  tipo: string;
}

interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
}

export default function ListarAdministradoresPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isDeleteModalAdmOpen, setIsDeleteModalAdmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isConteudosModalOpen, setIsConteudosModalOpen] = useState(false);
  const [conteudos, setConteudos] = useState([]);

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(admins.length / itemsPerPage));

  // Obter ID do admin logado
  const loggedInAdminId = (() => {
    const token = localStorage.getItem('token');
    if (!token) return '';
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub;
    } catch {
      return '';
    }
  })();

  const fetchAdmins = useCallback(async () => {
    try {
      const response = await api.get('/administradoresDetalhes');
      setAdmins(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Sessão expirada. Faça login novamente.');
        router.push('/login');
      } else {
        toast.error('Erro ao carregar administradores.');
        console.error('Erro:', error);
      }
    }
  }, [router]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleVerConteudos = async (adminId: string) => {
    try {
      const response = await api.get(`/conteudosadm?autorId=${adminId}`);
      setConteudos(response.data);
      setIsConteudosModalOpen(true);
    } catch {
      toast.error('Erro ao buscar conteúdos do administrador');
    }
  };

  const handleCloseConteudosModal = () => {
    setIsConteudosModalOpen(false);
    setConteudos([]);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAdmins = admins.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteAdminConfirmation = (administradorId: string) => {
    if (administradorId === loggedInAdminId) {
      toast.error('Você não pode excluir a si mesmo.');
      return;
    }
    setDeleteId(administradorId);
    setIsDeleteModalAdmOpen(true);
  };

  const deleteAdmin = async () => {
    try {
      await api.delete(`/administradores/${deleteId}`);
      setAdmins(admins.filter((item) => item.id !== deleteId));
      toast.success('Administrador excluído com sucesso');
      setIsDeleteModalAdmOpen(false);
    } catch {
      toast.error('Erro ao excluir administrador');
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
              onClick={() => router.push('/administrador/gerenciamento/administradores/cadastrar')}
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
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">ID</th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">Nome</th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">Email</th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">Hierarquia</th>
                  <th className="p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.length ? (
                  currentAdmins.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">
                        {item.id.slice(0, 6)}...{item.id.slice(-4)}
                      </td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">{item.nome}</td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">{item.email}</td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-700">{item.tipo}</td>
                      <td className="p-2 sm:p-4 text-xs sm:text-sm flex space-x-2">
                        <button
                          onClick={() => handleVerConteudos(item.id)}
                          className="text-blue-600 hover:text-blue-800"
                          aria-label="Ver Conteúdos"
                          title="Ver Conteúdos"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDeleteAdminConfirmation(item.id)}
                          className="text-red-600 hover:text-red-800"
                          aria-label="Excluir Administrador"
                          title="Excluir"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-xs sm:text-sm text-gray-500">
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

            {/* Modal de Confirmação de Exclusão */}
            {isDeleteModalAdmOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                role="dialog"
                aria-modal="true"
              >
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                  <h3 className="text-lg font-semibold mb-4">
                    Confirmação de Exclusão
                  </h3>
                  <p className="mb-4">
                    Tem certeza que deseja excluir o administrador com o ID:
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

          {/* Paginação */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-600 py-2 px-4 rounded-lg disabled:opacity-50"
            >
              Anterior
            </button>
            <div className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-200 text-gray-600 py-2 px-4 rounded-lg disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
