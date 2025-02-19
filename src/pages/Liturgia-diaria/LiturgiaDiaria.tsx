import React, { useState, useEffect, useCallback } from "react";
import { api } from "../../services/api";
import { FaCalendarAlt } from "react-icons/fa";

interface Liturgia {
  id: string;
  primeiraLeitura: string;
  segundaLeitura?: string;
  titulo: string;
  salmoResponsorial: string;
  corLiturgica: string;
  evangelho: string;
  dia: Date;
}

const LiturgiaDiaria: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLiturgia, setSelectedLiturgia] = useState<Liturgia | null>(null);
  const [visibleLeitura, setVisibleLeitura] = useState<string>("primeiraLeitura");
  const [fontSize, setFontSize] = useState("text-lg");
  const [cache, setCache] = useState<Record<string, Liturgia | null>>({});

  const fetchLiturgias = useCallback(async (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];

    if (cache[formattedDate]) {
      setSelectedLiturgia(cache[formattedDate]);
      return;
    }

    try {
      const response = await api.get<Liturgia[]>(`/liturgias?dia=${formattedDate}`);
      const liturgia = response.data.length > 0 ? response.data[0] : null;
      setCache((prevCache) => ({ ...prevCache, [formattedDate]: liturgia }));
      setSelectedLiturgia(liturgia);
    } catch (error) {
      console.error("Erro ao buscar liturgias:", error);
    }
  }, [cache]);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    fetchLiturgias(today);
  }, []);

  useEffect(() => {
    if (selectedLiturgia) {
      setVisibleLeitura("primeiraLeitura");
    }
  }, [selectedLiturgia]);

  const handleLeituraVisibility = useCallback((leitura: string) => {
    setVisibleLeitura(leitura);
  }, []);

  const increaseFontSize = () => setFontSize("text-xl");
  const decreaseFontSize = () => setFontSize("text-base");

  const formatDate = (date: Date) =>
    date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-24 px-4 sm:px-8 lg:px-24 flex justify-between items-center">
        <h1 className="hidden lg:block text-3xl sm:text-4xl font-serif text-zinc-900 truncate">
          Liturgia
        </h1>
        <div className="flex items-center text-zinc-900 text-sm sm:text-base">
          <FaCalendarAlt size={25} />
          <p className="ml-2">{formatDate(selectedDate)}</p>
        </div>
      </div>

      <div className="container w-full sm:w-2/3 mb-4 sm:mb-0 px-4">
        {selectedLiturgia ? (
          <div className={`bg-white text-left p-6 ${fontSize} font-serif text-zinc-900`}>
            <h2
              className="text-xl font-bold mb-4 whitespace-normal break-words text-red-600"
              dangerouslySetInnerHTML={{ __html: selectedLiturgia.titulo }}
            />
            <p className="flex m-2 mb-4 font-light text-sm">
              Cor Litúrgica:{" "}
              <span className="mb-2 px-2" dangerouslySetInnerHTML={{ __html: selectedLiturgia.corLiturgica }} />
            </p>

            <div className="flex mb-4 justify-end">
              <button onClick={decreaseFontSize} className="px-3 sm:px-4 py-1 sm:py-2 shadow-xl rounded-lg">
                A-
              </button>
              <button onClick={increaseFontSize} className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-xl ml-2">
                A+
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <button
                className={`w-auto px-4 py-2 text-zinc-900 border-2 rounded-md ${visibleLeitura === "primeiraLeitura" ? "border-yellow-400" : "hover:bg-yellow-500"
                  }`}
                onClick={() => handleLeituraVisibility("primeiraLeitura")}
              >
                1° Leitura
              </button>
              {selectedLiturgia?.segundaLeitura && selectedLiturgia.segundaLeitura.trim() !== "" ? (
                <button
                  className={`w-auto px-4 py-2 text-zinc-900 border-2 rounded-md ${visibleLeitura === "segundaLeitura" ? "border-yellow-400" : "hover:bg-yellow-500"
                    }`}
                  onClick={() => handleLeituraVisibility("segundaLeitura")}
                >
                  2° Leitura
                </button>
              ) : null}



              <button
                className={`w-auto px-4 py-2 text-zinc-900 border-2 rounded-md ${visibleLeitura === "salmoResponsorial" ? "border-yellow-400" : "hover:bg-yellow-500"
                  }`}
                onClick={() => handleLeituraVisibility("salmoResponsorial")}
              >
                Salmo Responsorial
              </button>
              <button
                className={`w-auto px-4 py-2 text-zinc-900 border-2 rounded-md ${visibleLeitura === "evangelho" ? "border-yellow-400" : "hover:bg-yellow-500"
                  }`}
                onClick={() => handleLeituraVisibility("evangelho")}
              >
                Evangelho
              </button>
            </div>

            <div className="mb-4 text-zinc-900">
              {visibleLeitura === "primeiraLeitura" && (
                <div>
                  <h3 className="text-lg font-semibold">Primeira Leitura</h3>
                  <p className="font-sans whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: selectedLiturgia.primeiraLeitura }} />
                </div>
              )}
              {visibleLeitura === "segundaLeitura" &&
                selectedLiturgia.segundaLeitura &&
                selectedLiturgia.segundaLeitura.trim() !== "" && (
                  <div>
                    <h3 className="text-lg font-semibold">Segunda Leitura</h3>
                    <p className="font-sans whitespace-pre-wrap break-words " dangerouslySetInnerHTML={{ __html: selectedLiturgia.segundaLeitura }} />
                  </div>
                )}
              {visibleLeitura === "salmoResponsorial" && (
                <div>
                  <h3 className="text-lg font-semibold">Salmo Responsorial</h3>
                  <p className="font-sans whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: selectedLiturgia.salmoResponsorial }} />
                </div>
              )}
              {visibleLeitura === "evangelho" && (
                <div>
                  <h3 className="text-lg font-semibold">Evangelho</h3>
                  <p className="font-sans whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: selectedLiturgia.evangelho }} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className={`text-center ${fontSize} text-zinc-900`}>Nenhuma liturgia disponível para a data selecionada.</p>
        )}
      </div>
    </div>
  );
};

export default LiturgiaDiaria;
