import React, { useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";

interface Liturgia {
  primeiraLeitura: string;
  segundaLeitura?: string;
  salmoResponsorial: string;
  titulo: string;
  evangelho: string;
  corLiturgica: string;
  dia: Date;
}

const PublicarLiturgia: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [primeiraLeitura, setPrimeiraLeitura] = useState("");
  const [segundaLeitura, setSegundaLeitura] = useState("");
  const [salmoResponsorial, setSalmoResponsorial] = useState("");
  const [evangelho, setEvangelho] = useState("");
  const [dia, setDia] = useState<Date | null>(null);
  const [corLiturgica, setCorLiturgica] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validar campos obrigatórios
    if (
      !titulo ||
      !primeiraLeitura ||
      !salmoResponsorial ||
      !evangelho ||
      !corLiturgica ||
      !dia
    ) {
      setIsLoading(false);
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const liturgia: Liturgia = {
        titulo,
        primeiraLeitura,
        segundaLeitura,
        salmoResponsorial,
        evangelho,
        corLiturgica,
        dia: dia || new Date(),
      };

      console.log("Enviando dados da liturgia:", liturgia);

      await api.post("/liturgias", liturgia, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTitulo("");
      setPrimeiraLeitura("");
      setSegundaLeitura("");
      setSalmoResponsorial("");
      setEvangelho("");
      setCorLiturgica("");
      setDia(null);
      setIsLoading(false);
      toast.success("Leitura litúrgica publicada com sucesso!");
    } catch (error) {
      setIsLoading(false);
      setError(
        "Houve um erro ao publicar a leitura litúrgica. Por favor, tente novamente."
      );
      console.error("Erro ao publicar leitura litúrgica:", error);
    }
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Retorna à página anterior
  };

  return (
    <div className="flex items-center justify-center w-full h-ful">
      <div className="bg-white p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">
          Publicar Leitura Litúrgica
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="dia"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dia
            </label>
            <input
              id="dia"
              type="date"
              value={dia ? dia.toISOString().substr(0, 10) : ""}
              onChange={(e) => setDia(new Date(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="titulo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Título
            </label>
            <ReactQuill
              id="titulo"
              value={titulo}
              onChange={setTitulo}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o título"
            />
          </div>

          <div>
            <label
              htmlFor="corLiturgica"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cor Litúrgica
            </label>
            <ReactQuill
              id="corLiturgica"
              value={corLiturgica}
              onChange={setCorLiturgica}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a cor litúrgica"
            />
          </div>

          <div>
            <label
              htmlFor="primeiraLeitura"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Primeira Leitura
            </label>
            <ReactQuill
              id="primeiraLeitura"
              value={primeiraLeitura}
              onChange={setPrimeiraLeitura}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a primeira leitura"
            />
          </div>
          <div>
            <label
              htmlFor="salmoResponsorial"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Salmo Responsorial
            </label>
            <ReactQuill
              id="salmoResponsorial"
              value={salmoResponsorial}
              onChange={setSalmoResponsorial}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o salmo responsorial"
            />
          </div>

          <div>
            <label
              htmlFor="segundaLeitura"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Segunda Leitura (opcional)
            </label>
            <ReactQuill
              id="segundaLeitura"
              value={segundaLeitura}
              onChange={setSegundaLeitura}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a segunda leitura"
            />
          </div>

          <div>
            <label
              htmlFor="evangelho"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Evangelho
            </label>
            <ReactQuill
              id="evangelho"
              value={evangelho}
              onChange={setEvangelho}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o evangelho"
            />
          </div>
          <div className="flex space-x-3">
            <button
              className="w-f64 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Publicar"
              )}
            </button>
            <button
              className="flex"
              onClick={handleBackClick}
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicarLiturgia;
