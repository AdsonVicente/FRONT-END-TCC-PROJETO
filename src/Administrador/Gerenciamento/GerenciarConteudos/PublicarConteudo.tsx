import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Adicione esta linha
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
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
        console.error("Houve erro ao buscar Categorias", error);
        toast.error("Erro ao carregar categorias");
      }
    };

    const fetchAdminData = async () => {
      const token = localStorage.getItem("token"); // Assumindo que o token está no localStorage
      if (token) {
        const decoded: any = jwtDecode(token); // Decodifica o token
        const adminId = decoded.id; // Assumindo que o id do admin está no token

        try {
          const response = await api.get(`/administradores/${adminId}`);
          setAutor(response.data.nome); // Preenche o campo autor com o nome do admin
        } catch (error) {
          console.error("Erro ao buscar dados do administrador", error);
          toast.error("Erro ao carregar dados do administrador");
        }
      }
    };

    fetchCategories();
    fetchAdminData(); // Chama a função para buscar os dados do administrador
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
      setError(
        "Houve um erro ao publicar o conteúdo. Por favor, tente novamente."
      );
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

  const handleBackClick = () => {
    navigate(-1); // Retorna à página anterior
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Publicar Conteúdo
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Categoria */}
            <div>
              <label
                htmlFor="categoria"
                className="block mb-2 text-lg font-medium text-gray-700"
              >
                Categoria
              </label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.length > 0 ? (
                  categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Nenhuma categoria disponível
                  </option>
                )}
              </select>
            </div>

            {/* Título */}
            <div>
              <label
                htmlFor="titulo"
                className="block mb-2 text-lg font-medium text-gray-700"
              >
                Título
              </label>
              <input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o título"
                type="text"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            {/* Descrição */}
            <label
              htmlFor="corpo"
              className="block mb-2 text-lg font-medium text-gray-700"
            >
              Descrição
            </label>
            <ReactQuill
              id="corpo"
              value={descricao}
              onChange={setDescricao}
              className="block w-full border border-gray-300 rounded-lg"
              placeholder="Digite a descrição"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                  ["formula"],
                ],
              }}
            />
          </div>

          <div className="mb-6">
            {/* Autor */}
            <label
              htmlFor="autor"
              className="block mb-2 text-lg font-medium text-gray-700"
            >
              Autor
            </label>
            <input
              id="autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome do autor"
              type="text"
              readOnly // Adiciona a propriedade para não permitir alterações
            />
          </div>

          {/* Banner */}
          <div className="mb-6">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-12 h-12 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5
                                        .071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Clique para enviar</span> ou
                  arraste e solte
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG ou GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*, video/*"
                required
              />
            </label>
            {bannerPreview && (
              <div className="mt-4">
                {banner?.type.startsWith("image/") ? (
                  <img
                    src={bannerPreview}
                    alt="Pré-visualização do Banner"
                    className="w-full h-auto rounded"
                  />
                ) : (
                  <video
                    src={bannerPreview}
                    controls
                    className="w-full h-auto rounded"
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="w-20 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Publicando..." : "Publicar"}
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

export default PublicarConteudo;
