import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

interface Event {
  id: string;
  titulo: string;
  data: string; // Assuming you have a 'data' field in your event interface
}

const EventosInscricaoForm: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [grupo, setGrupo] = useState("");
  const [idade, setIdade] = useState<number | undefined>(undefined);
  const [setor, setSetor] = useState("");
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/eventos");
        const currentDate = new Date();

        // Filter events to only include those that are today or in the future
        const filteredEvents = response.data.filter((event: Event) => {
          const eventDate = new Date(event.data);
          return eventDate >= currentDate;
        });

        setEvents(filteredEvents);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        toast.error("Erro ao buscar eventos. Por favor, tente novamente.");
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nome || !email || !eventId) {
      toast.error("Nome, email e ID do evento são obrigatórios.");
      return;
    }

    try {
      const response = await api.post("/inscricoes", {
        nome,
        email,
        telefone,
        grupo,
        setor,
        eventId,
        idade,
      });

      console.log("Resposta da inscrição:", response.data);
      toast.success("Sua inscrição foi realizada com sucesso!");
      setNome("");
      setEmail("");
      setTelefone("");
      setGrupo("");
      setIdade(undefined);
      setSetor("");
      setEventId("");
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
      toast.error(
        "Houve um erro ao realizar sua inscrição. Por favor, tente novamente."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg px-8 py-10"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Inscrição</h2>

        <div className="mb-5">
          <label
            htmlFor="evento"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Selecione o Evento
          </label>
          <select
            id="evento"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="form-select w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Escolha um evento</option>
            {events.length > 0 ? (
              events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.titulo}
                </option>
              ))
            ) : (
              <option disabled value="">
                Nenhum evento disponível
              </option>
            )}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome Completo
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="form-input w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="telefone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="form-input w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite seu telefone"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="grupo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Grupo de Oração (Opcional)
          </label>
          <input
            type="text"
            id="grupo"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            className="form-input w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite o nome do seu grupo"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="setor"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Setor (Opcional)
          </label>
          <input
            type="text"
            id="setor"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            className="form-input w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite o nome do seu setor"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="idade"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Idade
          </label>
          <input
            type="number"
            id="idade"
            value={idade !== undefined ? idade : ""}
            onChange={(e) => setIdade(Number(e.target.value))}
            className="form-input w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite sua idade"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Inscrever-se
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventosInscricaoForm;
