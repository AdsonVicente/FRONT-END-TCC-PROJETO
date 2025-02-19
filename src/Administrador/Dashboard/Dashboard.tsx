import React, { useState, useEffect, useCallback } from "react";
import { FaUser, FaCalendar, FaFileAlt, FaCog, FaTag } from "react-icons/fa";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { ResponsiveContainer, PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

interface Statistics {
  administradores: number;
  eventos: number;
  conteudos: number;
}

const Dashboard: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await api.get("/statistics");
      setStatistics(response.data);
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  // Se os dados ainda não chegaram, exibe um carregando...
  if (!statistics) {
    return <p className="text-gray-600">Carregando estatísticas...</p>;
  }

  const data = [
    { name: "Administradores", value: statistics.administradores || 1 },
    { name: "Eventos", value: statistics.eventos || 1 },
    { name: "Conteúdos", value: statistics.conteudos || 1 },
  ];

  const menuItems = [
    { to: "/gerenciarevento", label: "Gerenciar Eventos", icon: <FaCalendar className="w-6 h-6 text-green-500 mr-4" /> },
    { to: "/gerenciarusuarios", label: "Gerenciar Usuários", icon: <FaUser className="w-6 h-6 text-blue-500 mr-4" /> },
    { to: "/gerenciarconteudo", label: "Gerenciar Conteúdos", icon: <FaFileAlt className="w-6 h-6 text-red-500 mr-4" /> },
    { to: "/conteudo/publicar", label: "Publicar Conteúdo", icon: <FaFileAlt className="w-6 h-6 text-purple-500 mr-4" /> },
    { to: "/gerenciarcategoria", label: "Gerenciar Categorias", icon: <FaTag className="w-6 h-6 text-teal-500 mr-4" /> },
    { to: "/perfil", label: "Configurações", icon: <FaCog className="w-6 h-6 text-yellow-500 mr-4" /> },
  ];


  return (
    <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Sidebar */}
      <aside className="bg-white p-6 w-full lg:w-1/4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Gerenciamento</h3>
        {menuItems.map((item) => (
          <Link key={item.to} to={item.to}>
            <button className="flex items-center w-full p-4 hover:bg-gray-200 transition rounded-lg mb-2">
              {item.icon}
              {item.label}
            </button>
          </Link>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-full sm:max-w-5xl bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Estatísticas do Site
        </h3>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Gráfico de Pizza */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Distribuição das Estatísticas</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Barras */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Comparação de Estatísticas</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
