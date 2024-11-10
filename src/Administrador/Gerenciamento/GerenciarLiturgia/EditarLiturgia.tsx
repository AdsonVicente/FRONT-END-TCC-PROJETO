import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../../services/api";
import ReactQuill from "react-quill";





const EditarLiturgia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editContent, setEditContent] = useState({
    id: "",
    titulo: "",
    primeiraLeitura: "",
    segundaLeitura: "",
    salmoResponsorial: "",
    evangelho: "",
    corLiturgica: "",
    dia: ""
  });
  

  

 

  // Buscar conteúdo
  useEffect(() => {
    const fetchLiturgia = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/liturgias/${id}`);
        
        setEditContent(response.data);
      } catch (error) {
        console.error("Erro ao buscar a liturgia", error);
        toast.error("Erro ao carregar a liturgia");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiturgia();
  }, [id]);

 

  // Atualizar conteúdo
  const updateLiturgia = async () => {
    if (
      !editContent.id ||
      !editContent.titulo ||
      !editContent.primeiraLeitura ||
      !editContent.segundaLeitura ||
      !editContent.salmoResponsorial ||
      !editContent.evangelho ||
      !editContent.corLiturgica ||
      !editContent.dia
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("id", editContent.id);
      formData.append("titulo", editContent.titulo);
      formData.append("primeiraLeitura", editContent.primeiraLeitura);
      formData.append("segundaLeitura", editContent.segundaLeitura);
      formData.append("salmoResponsorial", editContent.salmoResponsorial);
      formData.append("evangelho", editContent.evangelho);
      formData.append("corLiturgica", editContent.corLiturgica);
      formData.append("dia", editContent.dia);


      await api.put(`/liturgias/editar/${editContent.id}`, formData);

      toast.success("Liturgia atualizada com sucesso");
      navigate("/gerenciarliturgia");
    } catch (error) {
      console.error(`Erro ao atualizar a liturgia ${editContent.id}:`, error);
      toast.error(`Erro ao atualizar a liturgia ${editContent.id}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 ">
        <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-stone-600">
            Editar Liturgia
          </h2>
          {isLoading ? (
            <p className="text-center text-blue-500">Carregando...</p>
          ) : (
            <form>
                <div>
            <label
              htmlFor="dia"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dia
            </label>
            <input
              id="dia"
              type="date"
              value={editContent.dia}
              onChange={(e) =>
                setEditContent({ ...editContent, dia: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

              <div>
            <label
              htmlFor="primeiraLeitura"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Primeira Leitura
            </label>
            <ReactQuill
              id="primeiraLeitura"
              value={editContent.primeiraLeitura}
              onChange={(e) =>
                setEditContent({ ...editContent, primeiraLeitura: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a primeira leitura"
            />
          </div>

          <div>
            <label
              htmlFor="salmoResponsorial"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Salmo Responsorial
            </label>
            <ReactQuill
              id="salmoResponsorial"
              value={editContent.salmoResponsorial}
              onChange={(e) =>
                setEditContent({ ...editContent, salmoResponsorial: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o salmo responsorial"
            />
          </div>

          <div>
            <label
              htmlFor="segundaLeitura"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Segunda Leitura (opcional)
            </label>
            <ReactQuill
              id="segundaLeitura"
              value={editContent.segundaLeitura}
              onChange={(e) =>
                setEditContent({ ...editContent, segundaLeitura: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a segunda leitura"
            />
          </div>

          <div>
            <label
              htmlFor="evangelho"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Evangelho
            </label>
            <ReactQuill
              id="evangelho"
              value={editContent.evangelho}
              onChange={(e) =>
                setEditContent({ ...editContent, evangelho: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o evangelho"
            />
          </div>

          <div>
            <label
              htmlFor="corLiturgica"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cor Litúrgica
            </label>
            <ReactQuill
              id="corLiturgica"
              value={editContent.corLiturgica}
              onChange={(e) =>
                setEditContent({ ...editContent, corLiturgica: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a cor litúrgica"
            />
          </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={updateLiturgia}
                  className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/gerenciarliturgia")}
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

export default EditarLiturgia;
