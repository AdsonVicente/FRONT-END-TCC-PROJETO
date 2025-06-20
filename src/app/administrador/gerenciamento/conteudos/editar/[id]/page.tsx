"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";

import { api } from "@/app/services/api";

import Head from "next/head";

import {
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TiptapEditor from "@/app/componentes/TiptapEditor";

interface Categoria {
  id: string;
  nome: string;
}

const EditarConteudo = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const verificarAutenticacao = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Você precisa estar logado.");
      router.push("/administardor/login");
      return false;
    }
    return true;
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
    ],
    content: descricao,
    onUpdate: ({ editor }) => {
      setDescricao(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[200px] border rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-200",
      },
    },
  });

  useEffect(() => {
    if (!verificarAutenticacao()) return;

    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch {
        toast.error("Erro ao buscar categorias.");
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    if (!verificarAutenticacao()) return;
    if (!id) return;

    const fetchConteudo = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/conteudos/${id}`);
        const data = response.data;

        setTitulo(data.titulo);
        setAutor(data.autor);
        setCategoria(data.categoria);
        setBannerPreview(data.banner);
        setDescricao(data.descricao || "");

        editor?.commands.setContent(data.descricao || "");
      } catch {
        toast.error("Erro ao carregar o conteúdo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConteudo();
  }, [id, editor]);

  useEffect(() => {
    return () => {
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
  }, [bannerPreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const updateConteudo = async () => {
    if (!titulo.trim() || !autor.trim() || !categoria.trim()) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!verificarAutenticacao()) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      formData.append("autor", autor);
      formData.append("categoria", categoria);
      if (banner) formData.append("file", banner);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado.");

      await api.put(`/conteudos/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Conteúdo atualizado com sucesso.");
      router.push("/gerenciarconteudo");
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        toast.error("Erro ao atualizar o conteúdo.");
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Editar Conteúdo | Painel Administrativo</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-stone-600">
              Editar Conteúdo
            </h2>

            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-12 h-12" />
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateConteudo();
                }}
              >
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="block w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>


                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2">
                    Descrição
                  </label>
                  <TiptapEditor
                    value={descricao}
                    onChange={setDescricao}
                    placeholder="Digite a descrição aqui..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    className="block w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2">
                    Imagem ou Vídeo
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="block w-full p-3 border border-gray-300 rounded-lg"
                  />
                  {bannerPreview && (
                    <div className="mt-4">
                      {bannerPreview.endsWith(".mp4") ||
                        bannerPreview.endsWith(".webm") ? (
                        <video
                          controls
                          className="max-w-full rounded"
                          src={bannerPreview}
                        />
                      ) : (
                        <img
                          src={bannerPreview}
                          alt={`Preview do banner`}
                          className="max-w-full rounded"
                        />
                      )}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2">
                    Categoria
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="block w-full p-3 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="" disabled>
                      Selecione uma categoria
                    </option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isLoading ? "Atualizando..." : "Atualizar Conteúdo"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarConteudo;
