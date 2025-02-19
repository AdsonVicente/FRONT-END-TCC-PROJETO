import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css"; // Importação do CSS
import ReactQuill from "react-quill";
import { api } from "../../../services/api";

interface Categoria {
  id: string;
  nome: string;
}

const EditarConteudo = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");  // Aqui, temos que garantir que o HTML seja bem interpretado
  const [autor, setAutor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar Categorias", error);
        toast.error("Erro ao buscar categorias.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchConteudo = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/conteudos/${id}`);
        const data = response.data;
        setTitulo(data.titulo);
        setDescricao(data.descricao);  // Aqui, garantimos que o HTML será corretamente interpretado
        setAutor(data.autor);
        setCategoria(data.categoria.id);
        setBannerPreview(data.banner);
      } catch (error) {
        console.error("Erro ao buscar o conteúdo", error);
        toast.error("Erro ao carregar o conteúdo.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchConteudo();
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setBanner(selectedFile);
      setBannerPreview(URL.createObjectURL(selectedFile));
    }
  };

  const updateConteudo = async () => {
    if (!titulo || !descricao || !autor) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);  // Enviar o HTML com a descrição
      formData.append("autor", autor);
      formData.append("categoria", categoria);
      if (banner) formData.append("banner", banner);

      await api.put(`/conteudos/editar/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Conteúdo atualizado com sucesso");
      navigate("/GerenciarConteudo");
    } catch (error) {
      console.error(`Erro ao atualizar o conteúdo ${id}:`, error);
      toast.error(`Erro ao atualizar o conteúdo.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-stone-600">Editar Conteúdo</h2>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-12 h-12" />
            </div>
          ) : (
            <form>
              {/* Campos de Edição com ReactQuill */}
              {[{ label: "Título", value: titulo, setValue: setTitulo }, { label: "Descrição", value: descricao, setValue: setDescricao }, { label: "Autor", value: autor, setValue: setAutor }].map(
                ({ label, value, setValue }, index) => (
                  <div key={index} className="mb-6">
                    <label className="block text-lg font-medium text-gray-700 mb-2">{label}</label>
                    <ReactQuill theme="snow" value={value} onChange={setValue} className="bg-white border border-gray-300 rounded-lg" />
                  </div>
                )
              )}

              {/* Pré-visualização do banner */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Imagem ou Vídeo</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                />
                {bannerPreview && (
                  <div className="mt-4">
                    {bannerPreview.endsWith(".mp4") || bannerPreview.endsWith(".webm") ? (
                      <video className="w-full h-auto" controls>
                        <source src={bannerPreview} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    ) : (
                      <img
                        src={bannerPreview}
                        alt="Pré-visualização"
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Seleção de Categoria */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Categoria</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botões para Salvar ou Cancelar */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={updateConteudo}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/gerenciarconteudo")}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditarConteudo;
