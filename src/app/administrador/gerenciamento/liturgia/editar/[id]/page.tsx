"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "@/app/services/api";
import TiptapEditor from "@/app/componentes/TiptapEditor"; // ajuste o caminho conforme seu projeto

export default function EditarLiturgia() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const diaRef = useRef<HTMLInputElement>(null);
  const tituloRef = useRef<HTMLInputElement>(null);
  const corLiturgicaRef = useRef<HTMLInputElement>(null);

  const [primeiraLeitura, setPrimeiraLeitura] = useState("");
  const [segundaLeitura, setSegundaLeitura] = useState("");
  const [salmoResponsorial, setSalmoResponsorial] = useState("");
  const [evangelho, setEvangelho] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchLiturgia = async () => {
      try {
        setIsFetching(true);
        const response = await api.get(`/liturgia/${id}`);
        const liturgia = response.data;

        if (diaRef.current) diaRef.current.value = liturgia.dia || "";
        if (tituloRef.current) tituloRef.current.value = liturgia.titulo || "";
        if (corLiturgicaRef.current) corLiturgicaRef.current.value = liturgia.corLiturgica || "";

        setPrimeiraLeitura(liturgia.primeiraLeitura || "");
        setSegundaLeitura(liturgia.segundaLeitura || "");
        setSalmoResponsorial(liturgia.salmoResponsorial || "");
        setEvangelho(liturgia.evangelho || "");
      } catch (error: unknown) {
        console.error('erro ao carregar liturgia' + error)
        toast.error("Erro ao carregar a liturgia para edição.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchLiturgia();
  }, [id]);

  const updateLiturgia = async () => {
    if (isLoading) return;

    const dia = diaRef.current?.value.trim() || "";
    const titulo = tituloRef.current?.value.trim() || "";
    const corLiturgica = corLiturgicaRef.current?.value.trim() || "";

    if (!dia || !titulo || !primeiraLeitura || !salmoResponsorial || !evangelho || !corLiturgica) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);
    try {
      const updatedData = {
        dia,
        titulo,
        primeiraLeitura,
        segundaLeitura,
        salmoResponsorial,
        evangelho,
        corLiturgica,
      };

      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

      await api.put(`/liturgia/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Liturgia atualizada com sucesso!");
      router.push("/administrador/gerenciamento/liturgia");
    } catch {
      toast.error("Erro ao atualizar a liturgia.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Carregando liturgia...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-stone-100 items-center justify-center px-2">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-100">
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-8 text-blue-700 text-center tracking-tight">
          Editar Liturgia
        </h2>
        <form
          className="space-y-6"
          onSubmit={e => {
            e.preventDefault();
            updateLiturgia();
          }}
        >
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-1">
              Dia
            </label>
            <input
              type="date"
              ref={diaRef}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              ref={tituloRef}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-700 mb-1">
              Primeira Leitura
            </label>
            <TiptapEditor
              value={primeiraLeitura}
              onChange={setPrimeiraLeitura}
              placeholder="Digite a primeira leitura..."
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-700 mb-1">
              Segunda Leitura (opcional)
            </label>
            <TiptapEditor
              value={segundaLeitura}
              onChange={setSegundaLeitura}
              placeholder="Digite a segunda leitura (se houver)..."
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-700 mb-1">
              Salmo Responsorial
            </label>
            <TiptapEditor
              value={salmoResponsorial}
              onChange={setSalmoResponsorial}
              placeholder="Digite o salmo responsorial..."
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-700 mb-1">
              Evangelho
            </label>
            <TiptapEditor
              value={evangelho}
              onChange={setEvangelho}
              placeholder="Digite o evangelho..."
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-700 mb-1">
              Cor Litúrgica
            </label>
            <input
              type="text"
              ref={corLiturgicaRef}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition disabled:opacity-60"
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/administrador/gerenciamento/liturgia")}
              className="w-full sm:w-auto px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg shadow transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
