"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/app/services/api";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import TiptapEditor from "@/app/componentes/TiptapEditor";

interface InscricaoEvento {
  id: string;
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

interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  local: string;
  horario: string;
  banner?: string;
}

export default function GerenciarEventos() {
  const router = useRouter();

  const [events, setEvents] = useState<Evento[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [horario, setHorario] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showInscritosModal, setShowInscritosModal] = useState(false);
  const [inscritosDoEvento, setInscritosDoEvento] = useState<InscricaoEvento[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/eventos");
      setEvents(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar os eventos.");
    }
  };

  const fetchInscricoesEvento = async () => {
    try {
      const response = await api.get("/inscricoes");
      setInscritosDoEvento(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar inscrições.");
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchInscricoesEvento();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBanner(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      formData.append("data", data);
      formData.append("local", local);
      formData.append("horario", horario);
      if (banner) formData.append("file", banner);

      const token = localStorage.getItem("token");

      await api.post("/evento", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Evento criado com sucesso!");
      setTitulo("");
      setDescricao("");
      setData("");
      setLocal("");
      setHorario("");
      setBanner(null);
      fetchEvents();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar o evento.");
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedEventId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEventId) return;
    try {
      await api.delete(`/eventos/${selectedEventId}`);
      toast.success("Evento excluído com sucesso!");
      fetchEvents();
    } catch (error) {
      toast.error("Erro ao excluir o evento.");
    } finally {
      setShowModal(false);
      setSelectedEventId(null);
    }
  };

  const handleEditClick = (id: string) => {
    router.push(`/administrador/gerenciamento/eventos/editar/${id}`);
  };

  const handleVerInscritos = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/inscricoes/evento/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInscritosDoEvento(response.data);
      setShowInscritosModal(true);
    } catch (error) {
      toast.error("Erro ao buscar inscritos.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Gerenciar Eventos</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 mb-6"
      >
        <div className="mb-4">
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label>Descrição</label>
          <TiptapEditor
            value={descricao}
            onChange={setDescricao}
            placeholder="Digite a descrição do evento..."
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label>Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex-1">
            <label>Horário</label>
            <input
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label>Local</label>
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label>Banner</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Criar Evento
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Título</th>
              <th className="border px-4 py-2">Data</th>
              <th className="border px-4 py-2">Local</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evento) => (
              <tr key={evento.id}>
                <td className="border px-4 py-2">{evento.titulo}</td>
                <td className="border px-4 py-2">{evento.data}</td>
                <td className="border px-4 py-2">{evento.local}</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(evento.id)}
                      className="text-blue-600 hover:underline"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(evento.id)}
                      className="text-red-600 hover:underline"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => handleVerInscritos(evento.id)}
                      className="text-blue-600 hover:underline"
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
        <Modal
          message="Deseja realmente excluir este evento?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      {showInscritosModal && (
        <Modal onCancel={() => setShowInscritosModal(false)}>
          <h2 className="text-xl mb-4">Inscritos no Evento</h2>
          <ul>
            {inscritosDoEvento.length === 0 ? (
              <li>Nenhum inscrito neste evento.</li>
            ) : (
              inscritosDoEvento.map((inscrito) => (
                <li key={inscrito.id}>
                  {inscrito.nome} - {inscrito.email} - {inscrito.telefone}
                </li>
              ))
            )}
          </ul>
        </Modal>
      )}
    </div>
  );
}

const Modal = ({
  message,
  onConfirm,
  onCancel,
  children,
}: {
  message?: string;
  onConfirm?: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md">
        {children ?? <p>{message}</p>}
        <div className="flex justify-end gap-4 mt-4">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Confirmar
            </button>
          )}
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
