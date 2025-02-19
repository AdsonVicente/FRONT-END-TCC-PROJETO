import React, { useState, useEffect } from "react";
import { Evento } from "../../types/interfaces";
import { api } from "../../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isBefore, isAfter } from "date-fns";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { ptBR } from "date-fns/locale";

const baseUrl = import.meta.env.VITE_BASE_URL;

const PaginaDeEventos: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredEventos, setFilteredEventos] = useState<Evento[]>([]);
  const [eventosRecentes, setEventosRecentes] = useState<Conteudo[]>([]);
  const [visibleEventosCount, setVisibleEventosCount] = useState(2); // Estado para controlar a quantidade de eventos visíveis

  interface Evento {
    id: string;
    titulo: string;
    descricao: string;
    data: string;
    banner: string;
    local: string;
    horario: string;
  }

  interface Conteudo {
    id: string;
    titulo: string;
    descricao: string;
    autor: string;
    banner: string;
    publicadoEm: string;
    categoriaId: string;
    categoria: {
      nome: string;
    };
  }

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get<Evento[]>("/eventos");

        // Todos os eventos recebidos
        const eventosRecebidos = response.data;

        // Data atual, sem considerar horas (normalização)
        const currentDate = new Date();
        const startOfToday = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );


        // Filtrar eventos futuros (incluindo o dia atual)
        const futuros = eventosRecebidos.filter((evento) =>
          isAfter(new Date(evento.data), startOfToday) ||
          format(new Date(evento.data), "yyyy-MM-dd") === format(startOfToday, "yyyy-MM-dd")
        );

        // Filtrar eventos passados
        const passados = eventosRecebidos.filter((evento) =>
          isBefore(new Date(evento.data), startOfToday)
        );

        // Atualizar estados
        setEventos(eventosRecebidos); // Todos os eventos
        setFilteredEventos(futuros); // Eventos futuros
        setEventosRecentes(
          passados.map((evento) => ({
            id: evento.id,
            titulo: evento.titulo,
            descricao: evento.descricao,
            autor: "",
            banner: evento.banner,
            publicadoEm: evento.data,
            categoriaId: "",
            categoria: {
              nome: "evento",
            },
          }))
        );
      } catch (error) {
        console.error("Houve erro ao buscar eventos", error);
      }
    };

    fetchEventos();
  }, []);


  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setFilteredEventos(
        eventos.filter((evento) => evento.data.startsWith(formattedDate))
      );
    } else {
      const currentDate = new Date();
      const futuros = eventos.filter((evento) =>
        isAfter(new Date(evento.data), currentDate)
      );
      setFilteredEventos(futuros);
    }
  }, [selectedDate, eventos]);

  const handleShowMore = () => {
    setVisibleEventosCount((prevCount) => prevCount + 2);
  };

  const [visibleCount, setVisibleCount] = useState(6); // Número de eventos a serem mostrados inicialmente

  // Função para carregar mais 3 eventos
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };


  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {/* Seção de Filtragem e Calendário */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 lg:block flex justify-center">
              Próximos Eventos
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
              {filteredEventos.length === 0 ? (
                <div className="text-center text-gray-600">
                  Nenhum evento encontrado para a data selecionada.
                </div>
              ) : (
                <>
                  {filteredEventos
                    .slice(0, visibleEventosCount)
                    .map((evento) => (
                      <CardEvento key={evento.id} evento={evento} />
                    ))}
                  {filteredEventos.length > visibleEventosCount && (
                    <button
                      onClick={handleShowMore}
                      className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Ver Mais Eventos
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center lg:mt-20">
            <Calendar

              value={selectedDate}
              className="shadow-lg rounded-lg mb-4"
            />
            <button
              onClick={() => setSelectedDate(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Separador Visual */}
        <div className="border-t-2 border-gray-300 my-8"></div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
              Eventos Recentes
              <span className="block h-1 bg-green-500 w-24 mx-auto mt-4"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {/* Mostrar apenas o número limitado de eventos */}
              {eventosRecentes.slice(0, visibleCount).map((evento) => (
                <div
                  key={evento.id}
                  className=" p-4 rounded-lg  transition-transform transform hover:scale-105"
                >
                  <a
                    href={`/eventos/${evento.id}`} // Atualize a URL conforme necessário
                    className="block text-xl font-semibold text-gray-800 mb-2 truncate hover:underline"
                  >
                    <img
                      src={`${baseUrl}/${evento.banner}`}
                      alt={evento.titulo}
                      className="w-full h-60 object-cover rounded-t-lg mb-4"
                    />

                    {evento.titulo}

                    <p
                      className="text-gray-600 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(evento.descricao),
                      }}
                    />
                  </a>
                </div>
              ))}
            </div>

            {/* Mostrar o botão "Ver mais eventos" apenas se houver mais eventos a serem exibidos */}
            {visibleCount < eventosRecentes.length && (
              <button
                onClick={handleLoadMore}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors mt-8"
              >
                Ver mais eventos
              </button>
            )}
          </div>
        </div>

        <div className="border-t-2 border-gray-300 my-8"></div>

        <div className="container mx-auto px-4 py-8">
          <div className="py-8 -100">
            <section className="mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
                Acampamentos
              </h2>
              <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Nosso Acampamento
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Nossos acampamentos são momentos especiais de encontro e vivência
                    da fé. Oferecemos atividades para todas as idades, com foco na
                    espiritualidade e na convivência comunitária.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <iframe
                      src="https://www.youtube.com/embed/CrIm88niszM"
                      title="Vídeo do Acampamento 1"
                      className="w-full h-48 rounded-lg shadow-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <iframe
                      src="https://www.youtube.com/embed/ZeOVn5QaaG8"
                      title="Vídeo do Acampamento 2"
                      className="w-full h-48 rounded-lg shadow-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
            
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                Duvidas sobre os Acampamentos?
              </h2>
              <FAQ />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardEvento: React.FC<{ evento: Evento }> = ({ evento }) => {
  const truncatedContent =
    DOMPurify.sanitize(evento.descricao).slice(0, 100) + "..."; // Limita o conteúdo para exibir apenas um resumo

  return (
    <div className="md:flex mb-4 bg-white rounded-lg overflow-hidden  transition-transform transform hover:scale-105">
      <div className="flex-shrink-0">
        <Link to={`/eventos/${evento.id}`}>
          <img
            src={`${baseUrl}/${evento.banner}`}
            alt={evento.titulo}
            className="w-full h-48 object-cover"
            style={{
              minHeight: "180px",
              maxHeight: "200px",
              maxWidth: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Link>
      </div>

      <div className="md:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-2">
            <span className="text-3xl font-bold text-red-500 mr-2">
              {format(new Date(evento.data), "dd")}
            </span>
            <span className="text-xl text-gray-600">
              {format(new Date(evento.data), "MMM", { locale: ptBR })}
            </span>
          </div>

          <Link to={`/eventos/${evento.id}`}>
            <h3 className="text-2xl font-semibold text-gray-800 font-display mb-2 transition-colors hover:text-orange-500">
              {`${evento.titulo.charAt(0).toUpperCase()}${evento.titulo.slice(
                1
              )}`}
            </h3>
          </Link>

          {/* Display the event description, ensuring it's truncated appropriately */}
          <div className="line-clamp-3 text-gray-700 font-medium text-sm mb-4">
            {truncatedContent}
          </div>
        </div>

        <div className="mt-4">
          <Link
            to={`/inscricao`}
            className="w-full text-center bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600 transition-colors"
          >
            Garantir sua Vaga
          </Link>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question:
        "Quais são as idades permitidas para participar dos acampamentos?",
      answer:
        "Os acampamentos são destinados a todas as idades, com atividades específicas para cada faixa etária.",
    },
    {
      question: "O que devo levar para o acampamento?",
      answer:
        "Recomendamos trazer itens pessoais de higiene, roupas confortáveis, Bíblia, caderno e caneta para anotações.",
    },
    {
      question: "Há custo para participar do acampamento?",
      answer:
        "Sim, há uma taxa de inscrição que cobre alimentação, hospedagem e materiais de apoio. Consulte os detalhes no momento da inscrição.",
    },
  ];

  return (
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div key={index} className="p-4 rounded-lg border bg-white shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {faq.question}
          </h3>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default PaginaDeEventos;
