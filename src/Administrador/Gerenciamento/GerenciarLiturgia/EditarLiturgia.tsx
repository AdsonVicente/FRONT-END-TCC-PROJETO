import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditarLiturgia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [dia, setDia] = useState("");
  const [titulo, setTitulo] = useState("");
  const [primeiraLeitura, setPrimeiraLeitura] = useState("");
  const [segundaLeitura, setSegundaLeitura] = useState("");
  const [salmoResponsorial, setSalmoResponsorial] = useState("");
  const [evangelho, setEvangelho] = useState("");
  const [corLiturgica, setCorLiturgica] = useState("");

  useEffect(() => {
    const fetchLiturgia = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/liturgias/${id}`);
        const data = response.data;
        setDia(data.dia);
        setTitulo(data.titulo);
        setPrimeiraLeitura(data.primeiraLeitura);
        setSegundaLeitura(data.segundaLeitura || "");
        setSalmoResponsorial(data.salmoResponsorial);
        setEvangelho(data.evangelho);
        setCorLiturgica(data.corLiturgica);
      } catch (error) {
        console.error("Erro ao buscar a liturgia", error);
        toast.error("Erro ao carregar a liturgia");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiturgia();
  }, [id]);

  const updateLiturgia = async () => {
    if (!dia || !titulo || !primeiraLeitura || !salmoResponsorial || !evangelho || !corLiturgica) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);
      const updatedData = {
        dia,
        titulo,
        primeiraLeitura,
        segundaLeitura,
        salmoResponsorial,
        evangelho,
        corLiturgica
      };

      await api.put(`/liturgias/editar/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success("Liturgia atualizada com sucesso");
      navigate("/gerenciarliturgia");
    } catch (error) {
      console.error(`Erro ao atualizar a liturgia ${id}:`, error);
      toast.error(`Erro ao atualizar a liturgia ${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-stone-600">Editar Liturgia</h2>
          {isLoading ? (
            <p className="text-center text-blue-500">Carregando...</p>
          ) : (
            <form>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Dia</label>
                <input
                  type="date"
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              {[{
                label: "Primeira Leitura",
                value: primeiraLeitura,
                setter: setPrimeiraLeitura
              }, {
                label: "Salmo Responsorial",
                value: salmoResponsorial,
                setter: setSalmoResponsorial
              }, {
                label: "Segunda Leitura (opcional)",
                value: segundaLeitura,
                setter: setSegundaLeitura
              }, {
                label: "Evangelho",
                value: evangelho,
                setter: setEvangelho
              }, {
                label: "Cor Litúrgica",
                value: corLiturgica,
                setter: setCorLiturgica
              }].map(({ label, value, setter }, index) => (
                <div key={index} className="mb-6">
                  <label className="block text-lg font-medium text-gray-700 mb-2">{label}</label>
                  <ReactQuill value={value} onChange={setter} className="bg-white border border-gray-300 rounded-lg" />
                </div>
              ))}

              <div className="flex justify-end space-x-4">
                <button type="button" onClick={updateLiturgia} className="px-6 py-3 bg-blue-500 text-white rounded-lg">Salvar</button>
                <button type="button" onClick={() => navigate("/gerenciarliturgia")} className="px-6 py-3 bg-red-500 text-white rounded-lg">Cancelar</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditarLiturgia;
