import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";

interface Admin {
  id: string;
  nome: string;
  email: string;
  tipo: string;
  senha: string;
}

const EditarMeuPerfil: React.FC = () => {
  const [adminData, setAdminData] = useState<Admin>({
    id: "",
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });
  const [confirmSenha, setConfirmSenha] = useState(""); // Estado para confirmar senha
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Função para decodificar o token JWT e obter o ID do administrador
  const getAdminIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.id;
    }
    return null;
  };

  // Busca os dados do administrador ao carregar a página
  useEffect(() => {
    const fetchAdmin = async () => {
      const adminId = getAdminIdFromToken();
      if (adminId) {
        try {
          const response = await api.get(`/administradores/${adminId}`);
          setAdminData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Erro ao buscar os dados do administrador:", error);
          toast.error("Erro ao carregar dados do administrador.");
          setLoading(false);
        }
      }
    };

    fetchAdmin();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleConfirmSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmSenha(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifica se a senha e a confirmação são iguais
    if (adminData.senha !== confirmSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const adminId = getAdminIdFromToken();
      await api.put(`/administradores/${adminId}`, adminData);
      toast.success("Perfil atualizado com sucesso!");
      navigate("/dashboard"); // Redireciona após sucesso
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil.");
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Redefinir Senha</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="nome"
            >
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
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
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
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="senha"
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={adminData.senha}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="confirmSenha"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmSenha"
              name="confirmSenha"
              value={confirmSenha}
              onChange={handleConfirmSenhaChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Redefinir Senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarMeuPerfil;
