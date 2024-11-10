import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";

interface Admin {
  id: string;
  nome: string;
  email: string;
  tipo: string;
}

const EditarAdm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const [adminData, setAdminData] = useState<Admin>({
    id: "",
    nome: "",
    email: "",
    tipo: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Busca os dados do administrador pelo ID ao carregar a página
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await api.get(`/administradores/${id}`);
        setAdminData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados do administrador:", error);
        toast.error("Erro ao carregar dados do administrador.");
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.put(`/administradores/${id}`, adminData);
      toast.success("Administrador atualizado com sucesso!");
      navigate("/dashboard"); // Redireciona após sucesso
    } catch (error) {
      console.error("Erro ao atualizar administrador:", error);
      toast.error("Erro ao atualizar administrador.");
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Editar Administrador</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={adminData.nome}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={adminData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />

          <label
            htmlFor="tipo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tipo
          </label>
          <select
            id="tipo"
            name="tipo"
            value={adminData.tipo}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            required
          >
            <option value="" disabled>
              Selecione o tipo de administrador
            </option>
            <option value="ADMGERAL">ADMGERAL</option>
            <option value="ADMCONTEUDOS">ADMCONTEUDOS</option>
            <option value="ADMEVENTOS">ADMEVENTOS</option>
            <option value="ADMLITURGIA">ADMLITURGIA</option>
            <option value="ADMEVENTOS_E_CONTEUDOS">
              ADMEVENTOS_E_CONTEUDOS
            </option>
            <option value="ADMEVENTOS_CONTEUDOS_E_LITURGIA">
              ADMEVENTOS_CONTEUDOS_E_LITURGIA
            </option>
            <option value="ADMEVENTOS_E_LITURGIA">ADMEVENTOS_E_LITURGIA</option>
            <option value="ADMCONTEUDOS_E_LITURGIA">
              ADMCONTEUDOS_E_LITURGIA
            </option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarAdm;
