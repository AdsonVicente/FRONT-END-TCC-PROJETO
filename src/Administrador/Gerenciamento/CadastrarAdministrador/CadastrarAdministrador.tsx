// src/components/Gerenciamento/CadastrarAdministrador/CadastrarAdministrador.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../../services/api";

interface CadastrarAdministradorProps {
  onSuccess?: () => void; // Função de callback opcional
}

const CadastrarAdministrador: React.FC<CadastrarAdministradorProps> = ({
  onSuccess,
}) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [tipoAdm, setTipoAdm] = useState("ADMGERAL"); // Valor padrão


  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      await api.post("/administradores", { nome, email, senha, tipo: tipoAdm });

      toast.success("Administrador cadastrado com sucesso!");
      if (onSuccess) onSuccess(); // Chama a função de callback se fornecida
      navigate("/dashboard"); // Redireciona após o sucesso
    } catch (error) {
      toast.error("Erro ao cadastrar administrador.");
      console.error("Erro ao cadastrar administrador:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Cadastrar Administrador
        </h2>
        <form onSubmit={handleRegister} className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="nome" className="text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="senha" className="text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="confirm-password" className="text-gray-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirme sua senha"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="tipo-adm" className="text-gray-700">
              Tipo de Administrador
            </label>
            <select
              id="tipo-adm"
              value={tipoAdm}
              onChange={(e) => setTipoAdm(e.target.value)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="ADMGERAL">Administrador Geral</option>
              <option value="ADMEVENTOS">Administrador de Eventos</option>
              <option value="ADMCONTEUDOS">Administrador de Conteúdos</option>
              <option value="ADMLITURGIA">Administrador de Liturgia</option>
              <option value="ADMEVENTOS_E_CONTEUDOS">Eventos e Conteúdos</option>
              <option value="ADMEVENTOS_CONTEUDOS_E_LITURGIA">
                Eventos, Conteúdos e Liturgia
              </option>
              <option value="ADMEVENTOS_E_LITURGIA">Eventos e Liturgia</option>
              <option value="ADMCONTEUDOS_E_LITURGIA">Conteúdos e Liturgia</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Registrar Administrador
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarAdministrador;
