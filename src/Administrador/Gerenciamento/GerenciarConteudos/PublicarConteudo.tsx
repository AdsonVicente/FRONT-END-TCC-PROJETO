import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "quill/dist/quill.snow.css";


import ReactQuill from "react-quill";
import { api } from "../../../services/api";

interface Categoria {
  id: string;
  nome: string;
}

const PublicarConteudo: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [autor, setAutor] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
        toast.error("Erro ao carregar categorias");
      }
    };

    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded: any = jwtDecode(token);
        const adminId = decoded.id;

        try {
          const response = await api.get(`/administradores/${adminId}`);
          setAutor(response.data.nome);
        } catch (error) {
          console.error("Erro ao buscar dados do administrador", error);
          toast.error("Erro ao carregar dados do administrador");
        }
      }
    };

    fetchCategories();
    fetchAdminData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!banner) {
      setError("Por favor, adicione um banner antes de publicar.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("categoria", categoria);
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      formData.append("autor", autor);
      formData.append("banner", banner);

      await api.post("/conteudos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCategoria("");
      setTitulo("");
      setDescricao("");
      setAutor("");
      setBanner(null);
      setBannerPreview(null);
      setIsLoading(false);
      toast.success("Conteúdo publicado com sucesso!");
      navigate("/GerenciarConteudo");
    } catch (error) {
      setIsLoading(false);
      setError("Houve um erro ao publicar o conteúdo. Por favor, tente novamente.");
      toast.error("Erro ao publicar conteúdo");
      console.error("Erro ao publicar conteúdo:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        setError("Por favor, selecione um arquivo de imagem ou vídeo válido.");
        return;
      }
      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Publicar Conteúdo</h2>
        {error && <div className="mb-4 p-4 bg-red-100 text-red-700">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-38 p-3 border rounded-lg">
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>
          <div className="mb-6 ">
            <label className="block text-lg">Título</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-80 p-3 border rounded-lg"
              placeholder="Digite o título"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg">Descrição</label>
            <ReactQuill value={descricao} onChange={setDescricao} className="bg-white" />
          </div>

          <div className="mb-6">
            <label className="block text-lg">Banner</label>
            <input type="file" onChange={handleFileChange} accept="image/*,video/*" required />
            {bannerPreview && (
              banner?.type.startsWith("image/") ? (
                <img src={bannerPreview} alt="Prévia" className="mt-4 rounded" />
              ) : (
                <video src={bannerPreview} controls className="mt-4 rounded" />
              )
            )}
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">{isLoading ? "Publicando..." : "Publicar"}</button>
        </form>
      </div>
    </div>
  );
};

export default PublicarConteudo;
