import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Interface para inscrições de eventos
interface InscricaoEvento {
  id: string; // Adicione o id para identificação
  nome: string;
  email: string;
  telefone: string;
  setor: string;
  grupo: string;
  idade: number;
  eventId: {
    id: string;
    titulo: string;
  };
}

const GerenciarEventos: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [horario, setHorario] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [inscricoesEventos, setInscricoesEventos] = useState<InscricaoEvento[]>(
    []
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteInscricaoId, setDeleteInscricaoId] = useState<string>("");
  const [filtroEvento, setFiltroEvento] = useState("");
  const [showInscritosModal, setShowInscritosModal] = useState(false);
  const [inscritosDoEvento, setInscritosDoEvento] = useState<InscricaoEvento[]>(
    []
  );
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await api.get("/eventos");
      setEvents(response.data);
    } catch (err: any) {
      console.error("Erro ao buscar eventos:", err);
      toast.error("Erro ao buscar eventos.");
    }
  };

  useEffect(() => {
    fetchInscricoesEventos();
    fetchEvents();
  }, []);

  const fetchInscricoesEventos = async () => {
    try {
      const response = await api.get("/inscricoes");
      setInscricoesEventos(response.data);
    } catch (error) {
      console.error("Houve um erro ao buscar as inscrições de eventos", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      formData.append("data", data);
      formData.append("local", local);
      formData.append("horario", horario);

      if (banner) {
        formData.append("banner", banner);
      }

      await api.post("/eventos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTitulo("");
      setDescricao("");
      setData("");
      setLocal("");
      setHorario("");
      setBanner(null);
      setError(null);
      toast.success("Evento criado com sucesso!");
      navigate("/gerenciarevento");
      fetchEvents(); // Atualiza a lista de eventos após a criação
    } catch (err: any) {
      console.error("Erro ao criar evento:", err);
      setError(
        err.response?.data?.message || "Ocorreu um erro ao criar o evento."
      );
      toast.error(
        "Erro ao criar evento: " +
          (err.response?.data?.message || "Tente novamente.")
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBanner(e.target.files[0]);
    }
  };

  const handleDeleteClick = (eventId: number) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEventId === null) return;

    try {
      await api.delete(`/eventos/${selectedEventId}`);
      toast.success("Evento excluído com sucesso!");
      fetchEvents(); // Atualiza a lista de eventos após a exclusão
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

  const handleEditClick = (eventId: string) => {
    navigate(`/eventos/editar/${eventId}`);
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
          <p>Tem certeza de que deseja excluir este evento?</p>
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

  const handleDeleteInscricaoConfirmation = (inscricaoId: string) => {
    setDeleteInscricaoId(inscricaoId);
    setIsDeleteModalOpen(true);
  };

  const deleteInscricao = async () => {
    try {
      await api.delete(`/inscricoes/${deleteInscricaoId}`);
      setInscricoesEventos(
        inscricoesEventos.filter((item) => item.id !== deleteInscricaoId)
      );
      toast.success("Inscrição excluída com sucesso");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(
        `Houve um erro ao excluir a inscrição ${deleteInscricaoId}:`,
        error
      );
      toast.error(`Erro ao excluir a inscrição ${deleteInscricaoId}`);
    }
  };

  const handleVerInscritos = async (eventId: string) => {
    const inscritos = inscricoesEventos.filter(
      (item) => item.eventId.id === eventId
    );
    setInscritosDoEvento(inscritos);
    setShowInscritosModal(true);
  };

  const handleCloseInscritosModal = () => {
    setShowInscritosModal(false);
    setInscritosDoEvento([]);
  };

  return (
    <div className="bg-white">
      <div className="header my-3 h-12 px-10 flex items-center justify-between">
        <h1 className="font-medium text-2xl">Gerenciar Eventos</h1>
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
                  htmlFor="event_title"
                >
                  Título do Evento
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  name="title"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Título do Evento"
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="event_description"
                >
                  Descrição
                </label>
                <textarea
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  name="description"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição do Evento"
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="event_date"
                >
                  Data do Evento
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="date"
                  name="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="event_location"
                >
                  Local do Evento
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  name="location"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Local do Evento"
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="event_time"
                >
                  Horário do Evento
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="time"
                  name="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="event_banner"
                >
                  Banner do Evento
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  type="submit"
                  className="bg-[#98c01d] text-white px-4 py-2 rounded-md"
                >
                  Criar Evento
                </button>
              </div>
              {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
          </form>
        </div>

        <div className="w-full m-1">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-400">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-400">Título</th>
                  <th className="px-4 py-2 border border-gray-400">Data</th>
                  <th className="px-4 py-2 border border-gray-400">Local</th>
                  <th className="px-4 py-2 border border-gray-400">Ações</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="border px-4 py-2">{event.titulo}</td>
                    <td className="border px-4 py-2">{event.data}</td>
                    <td className="border px-4 py-2">{event.local}</td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditClick(event.id)}
                          className="rounded-md hover:bg-blue-100 text-blue-600 p-2 flex items-center"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(event.id)}
                          className="rounded-md hover:bg-red-100 text-red-600 p-2 flex items-center"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => handleVerInscritos(event.id)}
                          className="rounded-md hover:bg-blue-100 text-blue-600 p-2 flex items-center"
                        >
                          Ver Inscritos
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <ConfirmationModal
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}
            />
          )}

          {isDeleteModalOpen && (
            <ConfirmationModal
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={deleteInscricao}
            />
          )}

          {showInscritosModal && (
            <InscritosModal
              onClose={handleCloseInscritosModal}
              inscritos={inscritosDoEvento}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const InscritosModal: React.FC<{
  onClose: () => void;
  inscritos: InscricaoEvento[];
}> = ({ onClose, inscritos }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h3 className="text-lg font-semibold mb-4">Inscritos para o Evento</h3>
        <div className="max-h-60 overflow-y-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="p-2">Nome</th>
                <th className="p-2">E-mail</th>
                <th className="p-2">Grupo</th>
                <th className="p-2">Idade</th>
                <th className="p-2">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {inscritos.length > 0 ? (
                inscritos.map((inscrito) => (
                  <tr key={inscrito.id} className="text-sm text-gray-700">
                    <td className="p-2">{inscrito.nome}</td>
                    <td className="p-2">{inscrito.email}</td>
                    <td className="p-2">{inscrito.grupo}</td>
                    <td className="p-2">{inscrito.idade}</td>
                    <td className="p-2">{inscrito.telefone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    Nenhum inscrito encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GerenciarEventos;
