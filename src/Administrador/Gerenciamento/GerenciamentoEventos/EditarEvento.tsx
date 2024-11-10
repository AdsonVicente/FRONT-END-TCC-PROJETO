import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

const EditarEvento: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [editContent, setEditContent] = useState({
    id: "",
    titulo: "",
    descricao: "",
    data: "",
    local: "",
    horario: "",
    banner: "",
  });
  const [banner, setBanner] = useState<File | null>(null);

  // Buscar conteúdo
  useEffect(() => {
    const fetchEvento = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/eventos/${id}`);
        setEditContent(response.data);
      } catch (error) {
        console.error("Erro ao buscar o evento", error);
        toast.error("Erro ao carregar o evento.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvento();
  }, [id]);

  // Atualizar conteúdo
  const updateEvento = async () => {
    if (
      !editContent.id ||
      !editContent.titulo ||
      !editContent.descricao ||
      !editContent.data ||
      !editContent.local ||
      !editContent.horario
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("id", editContent.id);
      formData.append("titulo", editContent.titulo);
      formData.append("descricao", editContent.descricao);
      formData.append("data", editContent.data);
      formData.append("local", editContent.local);
      formData.append("horario", editContent.horario);

      if (banner) {
        formData.append("banner", banner);
      }

      await api.put(`/eventos/editar/${editContent.id}`, formData);

      toast.success("Evento atualizado com sucesso");
      navigate("/gerenciarevento");
    } catch (error) {
      console.error(`Erro ao atualizar o evento ${editContent.id}:`, error);
      toast.error(`Erro ao atualizar o evento ${editContent.id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBanner(e.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Editar Evento</h1>
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="titulo"
            >
              Título
            </label>
            <input
              id="titulo"
              type="text"
              value={editContent.titulo}
              onChange={(e) =>
                setEditContent({ ...editContent, titulo: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="descricao"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              value={editContent.descricao}
              onChange={(e) =>
                setEditContent({ ...editContent, descricao: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="data"
            >
              Data
            </label>
            <input
              id="data"
              type="date" // Changed to "date" for better date input handling
              value={editContent.data}
              onChange={(e) =>
                setEditContent({ ...editContent, data: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="local"
            >
              Local
            </label>
            <input
              id="local"
              type="text"
              value={editContent.local}
              onChange={(e) =>
                setEditContent({ ...editContent, local: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="horario"
            >
              Horário
            </label>
            <input
              id="horario"
              type="time" // Changed to "time" for better time input handling
              value={editContent.horario}
              onChange={(e) =>
                setEditContent({ ...editContent, horario: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="banner"
            >
              Banner
            </label>
            <input
              id="banner"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm"
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={updateEvento}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarEvento;
