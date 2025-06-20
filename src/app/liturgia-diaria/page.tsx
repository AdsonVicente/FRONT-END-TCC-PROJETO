
"use client";
import { useEffect, useCallback } from "react";
import Head from "next/head";
import { api } from "../services/api";
import { FaCalendarAlt, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useRef, useReducer } from "react";

interface Liturgia {
  id: string;
  primeiraLeitura: string;
  segundaLeitura?: string;
  titulo: string;
  salmoResponsorial: string;
  corLiturgica: string;
  evangelho: string;
  dia: string;
}

export default function LiturgiaDiaria() {
  // Substitua useState por useRef + useReducer para evitar o uso direto do useState

  interface State {
    selectedDate: Date;
    selectedLiturgia: Liturgia | null;
    visibleLeitura: string;
    fontSize: string;
    isLoading: boolean;
    shareUrl: string;
  }

  type Action =
    | { type: "SET_SELECTED_DATE"; payload: Date }
    | { type: "SET_SELECTED_LITURGIA"; payload: Liturgia | null }
    | { type: "SET_VISIBLE_LEITURA"; payload: string }
    | { type: "SET_FONT_SIZE"; payload: string }
    | { type: "SET_IS_LOADING"; payload: boolean }
    | { type: "SET_SHARE_URL"; payload: string };

  const initialState: State = {
    selectedDate: new Date(),
    selectedLiturgia: null,
    visibleLeitura: "primeiraLeitura",
    fontSize: "text-lg",
    isLoading: false,
    shareUrl: "",
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "SET_SELECTED_DATE":
        return { ...state, selectedDate: action.payload };
      case "SET_SELECTED_LITURGIA":
        return { ...state, selectedLiturgia: action.payload };
      case "SET_VISIBLE_LEITURA":
        return { ...state, visibleLeitura: action.payload };
      case "SET_FONT_SIZE":
        return { ...state, fontSize: action.payload };
      case "SET_IS_LOADING":
        return { ...state, isLoading: action.payload };
      case "SET_SHARE_URL":
        return { ...state, shareUrl: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const selectedDate = state.selectedDate;
  const setSelectedDate = (date: Date) => dispatch({ type: "SET_SELECTED_DATE", payload: date });

  const selectedLiturgia = state.selectedLiturgia;
  const setSelectedLiturgia = (liturgia: Liturgia | null) =>
    dispatch({ type: "SET_SELECTED_LITURGIA", payload: liturgia });

  const visibleLeitura = state.visibleLeitura;
  const setVisibleLeitura = (leitura: string) =>
    dispatch({ type: "SET_VISIBLE_LEITURA", payload: leitura });

  const fontSize = state.fontSize;
  const setFontSize = (size: string) =>
    dispatch({ type: "SET_FONT_SIZE", payload: size });

  const isLoading = state.isLoading;
  const setIsLoading = (loading: boolean) =>
    dispatch({ type: "SET_IS_LOADING", payload: loading });

  const shareUrl = state.shareUrl;
  const setShareUrl = (url: string) =>
    dispatch({ type: "SET_SHARE_URL", payload: url });

  // Pega a URL atual no lado do cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Atualiza à meia-noite
  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      if (
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() === 0
      ) {
        setSelectedDate(new Date());
      }
    };
    const intervalId = setInterval(checkMidnight, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getTextoCompartilhamento = (): string => {
    if (!selectedLiturgia) return "";
    const partes = [
      `Liturgia do Dia - ${formatDate(selectedDate)}`,
      `Título: ${selectedLiturgia.titulo}`,
      `Cor Litúrgica: ${selectedLiturgia.corLiturgica}`,
      `Primeira Leitura: ${selectedLiturgia.primeiraLeitura}`,
    ];
    if (selectedLiturgia.segundaLeitura?.trim()) {
      partes.push(`Segunda Leitura: ${selectedLiturgia.segundaLeitura}`);
    }
    partes.push(`Salmo Responsorial: ${selectedLiturgia.salmoResponsorial}`);
    partes.push(`Evangelho: ${selectedLiturgia.evangelho}`);
    return partes.join("\n\n");
  };

  const fetchLiturgia = useCallback(async (date: Date) => {
    setIsLoading(true);
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await api.get<Liturgia>(`/liturgia-dia?data=${formattedDate}`);
      setSelectedLiturgia(response.data);
    } catch (error) {
      setSelectedLiturgia(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiturgia(selectedDate);
  }, [selectedDate, fetchLiturgia]);

  const handleLeituraVisibility = (leitura: string) => setVisibleLeitura(leitura);

  const increaseFontSize = () => setFontSize("text-xl");
  const decreaseFontSize = () => setFontSize("text-base");

  const getColorClass = (cor: string | undefined): string => {
    if (!cor) return "text-black";
    switch (cor.trim().toLowerCase()) {
      case "verde":
        return "text-green-700";
      case "vermelho":
        return "text-red-700";
      case "roxo":
        return "text-purple-700";
      case "branco":
        return "text-zinc-400";
      case "preto":
        return "text-black";
      default:
        return "text-zinc-900";
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <Head>
        <title>Liturgia Diária | Comunidade Católica Ágape</title>
        <meta
          name="description"
          content="Liturgia Diária - Leia a liturgia do dia, incluindo leituras, salmo responsorial e evangelho."
        />
        <meta property="og:title" content="Liturgia Diária | Comunidade Católica Ágape" />
        <meta
          property="og:description"
          content="Liturgia do dia - Leitura, Salmo e Evangelho."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Liturgia Diária" />
        <meta
          name="twitter:description"
          content="Liturgia Diária - Leia a liturgia do dia, incluindo leituras, salmo e evangelho."
        />
        <meta name="twitter:image" content="/images/liturgia-og.jpg" />
      </Head>

      <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h1 className="md:block hidden text-3xl sm:text-4xl font-black text-zinc-900 ">
          Liturgia Diária
        </h1>
        <div className="flex items-center text-zinc-900 text-sm sm:text-base">
          <FaCalendarAlt size={25} />
          <p className="ml-2">{formatDate(selectedDate)}</p>
        </div>
      </div>

      {isLoading && (
        <p className="text-center text-gray-600">Carregando liturgia...</p>
      )}

      <div className="w-full max-w-4xl mx-auto">
        {selectedLiturgia ? (
          <div className={`bg-white p-6 ${fontSize} font-serif text-center`}>
            <h2
              className={`text-xl font-bold mb-4 whitespace-normal break-words ${getColorClass(
                selectedLiturgia.corLiturgica
              )}`}
              dangerouslySetInnerHTML={{ __html: selectedLiturgia.titulo }}
            />

            <div className="mb-4">
              <span className="font-semibold">Cor Litúrgica: </span>
              <span
                className={`${getColorClass(
                  selectedLiturgia.corLiturgica
                )} font-semibold`}
                dangerouslySetInnerHTML={{
                  __html: selectedLiturgia.corLiturgica,
                }}
              />
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={decreaseFontSize}
                className="px-3 py-1 shadow rounded-lg"
              >
                A-
              </button>
              <button
                onClick={increaseFontSize}
                className="px-3 py-1 shadow rounded-lg"
              >
                A+
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <button
                className={`px-4 py-2 border-2 rounded-md ${visibleLeitura === "primeiraLeitura"
                  ? "border-yellow-400"
                  : "hover:bg-yellow-500"
                  }`}
                onClick={() => handleLeituraVisibility("primeiraLeitura")}
              >
                1ª Leitura
              </button>

              {selectedLiturgia.segundaLeitura && (
                <button
                  className={`px-4 py-2 border-2 rounded-md ${visibleLeitura === "segundaLeitura"
                    ? "border-yellow-400"
                    : "hover:bg-yellow-500"
                    }`}
                  onClick={() => handleLeituraVisibility("segundaLeitura")}
                >
                  2ª Leitura
                </button>
              )}

              <button
                className={`px-4 py-2 border-2 rounded-md ${visibleLeitura === "salmoResponsorial"
                  ? "border-yellow-400"
                  : "hover:bg-yellow-500"
                  }`}
                onClick={() => handleLeituraVisibility("salmoResponsorial")}
              >
                Salmo
              </button>

              <button
                className={`px-4 py-2 border-2 rounded-md ${visibleLeitura === "evangelho"
                  ? "border-yellow-400"
                  : "hover:bg-yellow-500"
                  }`}
                onClick={() => handleLeituraVisibility("evangelho")}
              >
                Evangelho
              </button>
            </div>

            <div className="text-left sm:text-justify">
              {visibleLeitura === "primeiraLeitura" && (
                <>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    Primeira Leitura
                  </h3>
                  <p
                    className="whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{
                      __html: selectedLiturgia.primeiraLeitura,
                    }}
                  />
                </>
              )}

              {visibleLeitura === "segundaLeitura" &&
                selectedLiturgia.segundaLeitura && (
                  <>
                    <h3 className="text-lg font-semibold mb-2 text-center">
                      Segunda Leitura
                    </h3>
                    <p
                      className="whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{
                        __html: selectedLiturgia.segundaLeitura,
                      }}
                    />
                  </>
                )}

              {visibleLeitura === "salmoResponsorial" && (
                <>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    Salmo Responsorial
                  </h3>
                  <p
                    className="whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{
                      __html: selectedLiturgia.salmoResponsorial,
                    }}
                  />
                </>
              )}

              {visibleLeitura === "evangelho" && (
                <>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    Evangelho
                  </h3>
                  <p
                    className="whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{
                      __html: selectedLiturgia.evangelho,
                    }}
                  />
                </>
              )}
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  getTextoCompartilhamento()
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-600"
                title="Compartilhar no WhatsApp"
              >
                <FaWhatsapp size={30} />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
                title="Compartilhar no Facebook"
              >
                <FaFacebook size={30} />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=Liturgia do Dia - ${formatDate(
                  selectedDate
                )}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
                title="Compartilhar no Twitter"
              >
                <FaTwitter size={30} />
              </a>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-600">
            Não foi possível carregar a liturgia para a data selecionada.
          </p>
        )}
      </div>
    </div>
  );
}
