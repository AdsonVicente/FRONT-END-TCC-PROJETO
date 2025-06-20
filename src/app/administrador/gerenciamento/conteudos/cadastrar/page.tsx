"use client";
import "@/styles/tiptap.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "@/app/services/api";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import * as jwt_decode from "jwt-decode";
import TiptapEditor from "@/app/componentes/TiptapEditor";
import Images from "next/image";
interface Categoria {
  id: string;
  nome: string;
}

export default function PublicarConteudo() {
  const router = useRouter();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [descricao, setDescricao] = useState(""); // Estado controlado da descrição

  // Editor controlado
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Underline,
      Blockquote,
      Heading.configure({ levels: [1, 2, 3, 4] }),
      Link.configure({ openOnClick: true }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Digite a descrição do conteúdo aqui...",
      }),
    ],
    content: descricao, // Conteúdo inicial do editor vindo do estado
    onUpdate: ({ editor }) => {
      setDescricao(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose min-h-[250px] border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500",
      },
    },
  });

  useEffect(() => {
    const fetchAdminName = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded = jwt_decode.jwtDecode<{ sub: string }>(token);
        const adminId = decoded.sub;

        const response = await api.get(`/administrador/${adminId}`);
        setAutor(response.data.nome);
      } catch (error: unknown) {
        toast.error("Erro ao buscar dados do administrador.");
      }
    };

    fetchAdminName();
  }, []);


  // Buscar categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch {
        toast.error("Erro ao carregar categorias.");
      }
    };
    fetchCategorias();
  }, []);

  // Banner Preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        toast.error("Selecione uma imagem ou vídeo válido.");
        return;
      }
      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !titulo.trim() ||
      !autor.trim() ||
      !descricao.trim() ||
      !categoria ||
      !banner
    ) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("autor", autor);
      formData.append("descricao", descricao);
      formData.append("categoria", categoria);
      formData.append("file", banner);

      await api.post("/conteudo", formData);

      toast.success("Conteúdo publicado com sucesso!");

      // Resetar
      setTitulo("");
      setCategoria("");
      setDescricao("");
      editor?.commands.clearContent();
      setBanner(null);
      setBannerPreview(null);

      router.push("/administrador/gerenciamento/conteudos");
    } catch (error) {
      console.error(error);
        console.error('erro ao publicar conteudo ' + error)

      toast.error("Erro ao publicar conteúdo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-zinc-800">
          Publicar Conteúdo
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Categoria */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Categoria
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o título"
              required
            />
          </div>

          {/* Autor */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Autor
            </label>
            <input
              type="text"
              value={autor}
              disabled
              className="w-full border border-gray-200 bg-zinc-100 rounded-md p-2"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Descrição
            </label>
            <TiptapEditor
              value={descricao}
              onChange={setDescricao}
              placeholder="Digite aqui seu conteúdo"
            />
          </div>

          {/* Banner */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">
              Banner (Imagem ou Vídeo)
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full"
              required
            />
            {bannerPreview && (
              <div className="mt-4">
                {banner?.type.startsWith("image/") ? (
                  <Images
                    src={bannerPreview}
                    alt="Preview"
                    className="max-w-full rounded-md"
                  />
                ) : (
                  <video
                    src={bannerPreview}
                    controls
                    className="max-w-full rounded-md"
                  />
                )}
              </div>
            )}
          </div>

          {/* Botão */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              {isLoading ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
