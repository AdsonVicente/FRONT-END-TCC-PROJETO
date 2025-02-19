import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [dia, setDia] = useState<Date | null>(null);
  const [titulo, setTitulo] = useState<string>("");
  const [primeiraLeitura, setPrimeiraLeitura] = useState<string>("");
  const [segundaLeitura, setSegundaLeitura] = useState<string>("");
  const [salmoResponsorial, setSalmoResponsorial] = useState<string>("");
  const [evangelho, setEvangelho] = useState<string>("");
  const [corLiturgica, setCorLiturgica] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!titulo || !primeiraLeitura || !salmoResponsorial || !evangelho || !corLiturgica || !dia) {
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

      await api.post("/liturgias", liturgia, {
        headers: { "Content-Type": "application/json" },
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
      setError("Houve um erro ao publicar a leitura litúrgica. Por favor, tente novamente.");
      console.error("Erro ao publicar leitura litúrgica:", error);
    }
  };

  const handleBackClick = () => navigate(-1);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="bg-white p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">Publicar Leitura Litúrgica</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="dia" className="block text-sm font-medium text-gray-700 mb-1">Dia</label>
            <input
              id="dia"
              type="date"
              value={dia ? dia.toISOString().substr(0, 10) : ""}
              onChange={(e) => setDia(new Date(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {[
            { label: "Título", value: titulo, setter: setTitulo },
            { label: "Cor Litúrgica", value: corLiturgica, setter: setCorLiturgica },
            { label: "Primeira Leitura", value: primeiraLeitura, setter: setPrimeiraLeitura },
            { label: "Salmo Responsorial", value: salmoResponsorial, setter: setSalmoResponsorial },
            { label: "Segunda Leitura (opcional)", value: segundaLeitura, setter: setSegundaLeitura },
            { label: "Evangelho", value: evangelho, setter: setEvangelho },
          ].map(({ label, value, setter }, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <ReactQuill theme="snow" value={value} onChange={setter} className="bg-white border border-gray-300 rounded-lg" />
            </div>
          ))}

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-64 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading ? "Publicando..." : "Publicar"}
            </button>
            <button
              type="button"
              onClick={handleBackClick}
              className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700"
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
