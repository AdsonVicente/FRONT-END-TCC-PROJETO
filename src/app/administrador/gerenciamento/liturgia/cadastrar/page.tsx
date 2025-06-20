
"use client";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import TiptapEditor from "@/app/componentes/TiptapEditor";
import { api } from "@/app/services/api";

interface Liturgia {
  primeiraLeitura: string;
  segundaLeitura?: string;
  salmoResponsorial: string;
  titulo: string;
  evangelho: string;
  corLiturgica: string;
  dia: string;
}


export default function CadastrarLiturgia() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Liturgia>({
    defaultValues: {
      primeiraLeitura: "",
      segundaLeitura: "",
      salmoResponsorial: "",
      titulo: "",
      evangelho: "",
      corLiturgica: "",
      dia: "",
    },
  });

  const onSubmit = async (data: Liturgia) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.dia)) {
      setError("dia", { message: "Data inválida. Use o formato YYYY-MM-DD." });
      return;
    }
    const dataISO = new Date(`${data.dia}T00:00:00`).toISOString();

    try {
      await api.post(
        "/liturgia",
        { ...data, dia: dataISO },
        { headers: { "Content-Type": "application/json" } }
      );

      reset();
      toast.success("Leitura litúrgica publicada com sucesso!");
      router.push("/administrador/gerenciamento/liturgia");
    } catch {
      toast.error("Houve um erro ao publicar a leitura litúrgica.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-2xl p-8 md:p-12">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-8">
          Publicar Leitura Litúrgica
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo Dia */}
          <div>
            <label className="block mb-1">Dia *</label>
            <input
              type="date"
              {...register("dia", { required: "Campo obrigatório" })}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 ${errors.dia ? "border-red-400" : "border-gray-300"
                }`}
            />
            {errors.dia && (
              <span className="text-xs text-red-500">{errors.dia.message}</span>
            )}
          </div>

          {/* Título */}
          <div>
            <label className="block mb-1">Título *</label>
            <input
              type="text"
              {...register("titulo", { required: "Campo obrigatório" })}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 ${errors.titulo ? "border-red-400" : "border-gray-300"
                }`}
              placeholder="Ex: 3º Domingo do Tempo Comum"
            />
            {errors.titulo && (
              <span className="text-xs text-red-500">{errors.titulo.message}</span>
            )}
          </div>

          {/* Cor Litúrgica */}
          <div>
            <label className="block mb-1">Cor Litúrgica *</label>
            <select
              {...register("corLiturgica", { required: "Campo obrigatório" })}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 ${errors.corLiturgica ? "border-red-400" : "border-gray-300"
                }`}
            >
              <option value="">Selecione a cor</option>
              <option value="verde">Verde</option>
              <option value="vermelho">Vermelho</option>
              <option value="roxo">Roxo</option>
              <option value="branco">Branco</option>
              <option value="preto">Preto</option>
            </select>
            {errors.corLiturgica && (
              <span className="text-xs text-red-500">
                {errors.corLiturgica.message}
              </span>
            )}
          </div>

          {/* Primeira Leitura */}
          <div>
            <label className="block mb-1">Primeira Leitura *</label>
            <Controller
              name="primeiraLeitura"
              control={control}
              rules={{ required: "Campo obrigatório" }}
              render={({ field }) => (
                <TiptapEditor
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Digite a primeira leitura..."
                />
              )}
            />
            {errors.primeiraLeitura && (
              <span className="text-xs text-red-500">
                {errors.primeiraLeitura.message}
              </span>
            )}
          </div>

          {/* Salmo Responsorial */}
          <div>
            <label className="block mb-1">Salmo Responsorial *</label>
            <Controller
              name="salmoResponsorial"
              control={control}
              rules={{ required: "Campo obrigatório" }}
              render={({ field }) => (
                <TiptapEditor
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Digite o salmo responsorial..."
                />
              )}
            />
            {errors.salmoResponsorial && (
              <span className="text-xs text-red-500">
                {errors.salmoResponsorial.message}
              </span>
            )}
          </div>

          {/* Segunda Leitura */}
          <div>
            <label className="block mb-1">Segunda Leitura</label>
            <Controller
              name="segundaLeitura"
              control={control}
              render={({ field }) => (
                <TiptapEditor
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Digite a segunda leitura (se houver)..."
                />
              )}
            />
          </div>

          {/* Evangelho */}
          <div>
            <label className="block mb-1">Evangelho *</label>
            <Controller
              name="evangelho"
              control={control}
              rules={{ required: "Campo obrigatório" }}
              render={({ field }) => (
                <TiptapEditor
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Digite o evangelho..."
                />
              )}
            />
            {errors.evangelho && (
              <span className="text-xs text-red-500">{errors.evangelho.message}</span>
            )}
          </div>

          {/* Botões */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-1/2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-all shadow-md disabled:opacity-60"
            >
              {isSubmitting ? "Publicando..." : "Publicar"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full md:w-1/2 bg-gray-500 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
