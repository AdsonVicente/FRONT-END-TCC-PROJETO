import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../../services/api";
import ReactQuill from "react-quill";

interface Categoria {
  id: string;
  nome: string;
}

interface Conteudo {
  id: string;
    titulo: string;
    descricao: string;
    autor: string;
    banner: string;
    publicadoEm: string;
    categoria: {
      id: string;
      nome: string;
    };
}

const EditarConteudo = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editContent, setEditContent] = useState({
    id: "",
    titulo: "",
    descricao: "",
    autor: "",
    banner: '', // Adiciona o campo banner aqui
  });
  const [banner, setBanner] = useState<File | null>(null);

  

  // Buscar categorias
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

  // Buscar conteúdo
  useEffect(() => {
    const fetchConteudo = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/conteudos/${id}`);
        
        setEditContent(response.data);
      } catch (error) {
        console.error("Erro ao buscar o conteúdo", error);
        toast.error("Erro ao carregar o conteúdo.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchConteudo();
  }, [id]);

  // Manipulação de arquivos
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setBanner(selectedFile || null);
  };

  // Atualizar conteúdo
  const updateConteudo = async () => {
    if (
      !editContent.titulo ||
      !editContent.descricao ||
      !editContent.autor
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("titulo", editContent.titulo);
      formData.append("descricao", editContent.descricao);
      formData.append("autor", editContent.autor);
      formData.append("categoria", categoria);

      if (banner) {
        formData.append("banner", banner);
      }

      await api.put(`/conteudos/editar/${editContent.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Conteúdo atualizado com sucesso");
      navigate("/GerenciarConteudo");
    } catch (error) {
      console.error(`Erro ao atualizar o conteúdo ${editContent.id}:`, error);
      toast.error(`Erro ao atualizar o conteúdo ${editContent.id}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 ">
        <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-stone-600">
            Editar Conteúdo
          </h2>
          {isLoading ? (
            <p className="text-center text-blue-500">Carregando...</p>
          ) : (
            <form>
              <div className="mb-6">
                <label
                  htmlFor="titulo"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Título
                </label>
                <input
                  id="titulo"
                  type="text"
                  value={editContent.titulo}
                  onChange={(e) =>
                    setEditContent({ ...editContent, titulo: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  placeholder="Título"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="corpo"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Corpo
                </label>
                <ReactQuill
                  value={editContent.descricao}
                  onChange={(content) =>
                    setEditContent({ ...editContent, descricao: content })
                  }
                  className="border border-gray-300 rounded-lg w-full"
                  placeholder="Corpo"
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
                <label
                  htmlFor="autor"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Autor
                </label>
                <input
                  id="autor"
                  type="text"
                  value={editContent.autor}
                  onChange={(e) =>
                    setEditContent({ ...editContent, autor: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  placeholder="Autor"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="banner"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Imagem ou Vídeo
                </label>
                <input
                  id="banner"
                  className="block w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="categoria"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Categoria
                </label>
                <select
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={updateConteudo}
                  className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/gerenciar-conteudo")}
                  className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
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
