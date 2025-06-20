"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "@/app/services/api";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import TiptapEditor from "@/app/componentes/TiptapEditor";
import Images from "next/image";

interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  local: string;
  horario: string;
  banner: string;
}

export default function EditarEvento() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;

  const [evento, setEvento] = useState<Evento | null>(null);
  const [descricao, setDescricao] = useState<string>("");


  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [horario, setHorario] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose min-h-[200px] border rounded-md p-3 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await api.get(`/evento/${id}`);
        const data = response.data;
        setEvento(data);
        setTitulo(data.titulo);
        setData(data.data);
        setLocal(data.local);
        setHorario(data.horario);
        setDescricao(data.descricao);


      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar evento.");
      }
    };
    if (id) {
      fetchEvento();
    }
  }, [id, editor]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editor) return;
    const descricao = editor.getHTML();

    if (!titulo || !descricao || !data || !local || !horario) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      formData.append("data", data);
      formData.append("local", local);
      formData.append("horario", horario);
      if (bannerFile) {
        formData.append("file", bannerFile);
      }

      await api.put(`/eventos/${id}`, formData);

      toast.success("Evento atualizado com sucesso!");
      router.push("/administrador/eventos");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o evento.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerFile(e.target.files[0]);
    }
  };

  if (!evento) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando evento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto bg-zinc-50 p-8 rounded-lg shadow">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Editar Evento
        </h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full border rounded-md p-2"
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Horário</label>
              <input
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Local</label>
            <input
              type="text"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Banner Atual</label>
            {evento.banner && (
              <Images
                src={evento.banner}
                alt="Banner atual"
                className="w-full rounded-md mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
