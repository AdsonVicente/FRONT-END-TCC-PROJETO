import React, { useState, useEffect, useCallback } from "react";
import { api } from "../../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
  const [selectedLiturgia, setSelectedLiturgia] = useState<Liturgia | null>(
    null
  );
  const [visibleLeitura, setVisibleLeitura] =
    useState<string>("primeiraLeitura");
  const [fontSize, setFontSize] = useState("text-base");
  const [cache, setCache] = useState<Record<string, Liturgia | null>>({});

  const fetchLiturgias = useCallback(
    async (date: Date) => {
      const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
      if (cache[formattedDate]) {
        setSelectedLiturgia(cache[formattedDate]);
        return;
      }

      try {
        // Passa a data na URL como parâmetro
        const response = await api.get<Liturgia[]>(
          `/liturgias?data=${formattedDate}` // Buscar liturgia pela data
        );
        const liturgia = response.data.length > 0 ? response.data[0] : null;
        setCache((prevCache) => ({ ...prevCache, [formattedDate]: liturgia }));
        setSelectedLiturgia(liturgia);
      } catch (error) {
        console.error("Erro ao buscar liturgias:", error);
      }
    },
    [cache]
  );

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today); // Definir a data atual ao carregar o componente
    fetchLiturgias(today); // Busca a liturgia do dia ao carregar o componente
  }, [fetchLiturgias]);

  useEffect(() => {
    if (selectedLiturgia) {
      setVisibleLeitura("primeiraLeitura");
    }
  }, [selectedLiturgia]);

  const handleLeituraVisibility = useCallback((leitura: string) => {
    setVisibleLeitura(leitura);
  }, []);

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
  };

  const increaseFontSize = () => {
    setFontSize("text-lg");
  };

  const decreaseFontSize = () => {
    setFontSize("text-sm");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient mb-4 sm:mb-6 transition-transform transform hover:scale-105">
          Liturgia Diária
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="block sm:hidden mb-4">
          <div className="flex justify-center">
            <Calendar
              onChange={(value) => handleDateChange(value as Date)} // Cast to Date
              value={selectedDate}
              className="react-calendar w-full"
            />
          </div>
        </div>

        <div className="w-full sm:w-2/3 sm:pr-4 mb-4 sm:mb-0">
          {selectedLiturgia ? (
            <div className={`bg-white text-left p-4 sm:p-6 ${fontSize}`}>
              <h2
                className="text-xl font-bold mb-4 text-center whitespace-normal break-words"
                dangerouslySetInnerHTML={{ __html: selectedLiturgia.titulo }}
              />
              <p className="flex justify-center m-2 text-lg font-medium mb-4">
                Cor Litúrgica:{" "}
                <span
                  className="mb-2 px-2"
                  dangerouslySetInnerHTML={{
                    __html: selectedLiturgia.corLiturgica,
                  }}
                />
              </p>
              <div className="flex mb-4 justify-end">
                <button
                  onClick={decreaseFontSize}
                  className="px-3 sm:px-4 py-1 sm:py-2 rounded"
                >
                  A-
                </button>
                <button
                  onClick={increaseFontSize}
                  className="px-3 sm:px-4 py-1 sm:py-2 rounded"
                >
                  A+
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end mb-6">
                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-md text-zinc-900 ${
                    visibleLeitura === "primeiraLeitura"
                      ? "bg-amber-600"
                      : "bg-amber-400 hover:bg-amber-500"
                  }`}
                  onClick={() => handleLeituraVisibility("primeiraLeitura")}
                >
                  1° Leitura
                </button>
                {selectedLiturgia.segundaLeitura && (
                  <button
                    className={`w-full sm:w-auto px-4 py-2 rounded-md text-zinc-900 ${
                      visibleLeitura === "segundaLeitura"
                        ? "bg-amber-600"
                        : "bg-amber-400 hover:bg-amber-500"
                    }`}
                    onClick={() => handleLeituraVisibility("segundaLeitura")}
                  >
                    2° Leitura
                  </button>
                )}
                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-md text-zinc-900 ${
                    visibleLeitura === "salmoResponsorial"
                      ? "bg-amber-600"
                      : "bg-amber-400 hover:bg-amber-500"
                  }`}
                  onClick={() => handleLeituraVisibility("salmoResponsorial")}
                >
                  Salmo Responsorial
                </button>
                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-md text-zinc-900 ${
                    visibleLeitura === "evangelho"
                      ? "bg-amber-600"
                      : "bg-amber-400 hover:bg-amber-500"
                  }`}
                  onClick={() => handleLeituraVisibility("evangelho")}
                >
                  Evangelho
                </button>
              </div>

              <div className="mb-4">
                {visibleLeitura === "primeiraLeitura" && (
                  <div>
                    <h3 className="text-lg font-semibold">Primeira Leitura</h3>
                    <p
                      className="whitespace-normal break-words"
                      dangerouslySetInnerHTML={{
                        __html: selectedLiturgia.primeiraLeitura,
                      }}
                    />
                  </div>
                )}
                {visibleLeitura === "segundaLeitura" &&
                  selectedLiturgia.segundaLeitura && (
                    <div>
                      <h3 className="text-lg font-semibold">Segunda Leitura</h3>
                      <p
                        className="whitespace-normal break-words"
                        dangerouslySetInnerHTML={{
                          __html: selectedLiturgia.segundaLeitura,
                        }}
                      />
                    </div>
                  )}
                {visibleLeitura === "salmoResponsorial" && (
                  <div>
                    <h3 className="text-lg font-semibold">
                      Salmo Responsorial
                    </h3>
                    <p
                      className="whitespace-normal break-words"
                      dangerouslySetInnerHTML={{
                        __html: selectedLiturgia.salmoResponsorial,
                      }}
                    />
                  </div>
                )}
                {visibleLeitura === "evangelho" && (
                  <div>
                    <h3 className="text-lg font-semibold">Evangelho</h3>
                    <p
                      className="whitespace-normal break-words"
                      dangerouslySetInnerHTML={{
                        __html: selectedLiturgia.evangelho,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className={`text-center ${fontSize}`}>
              Nenhuma liturgia disponível para a data selecionada.
            </p>
          )}
        </div>

        <div className="hidden sm:block sm:w-1/3 sm:pl-4">
          <div className="flex justify-center">
            <Calendar
              onChange={(value) => handleDateChange(value as Date)} // Cast to Date
              value={selectedDate}
              className="react-calendar w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiturgiaDiaria;
