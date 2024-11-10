import React, { useState, useEffect, useCallback } from "react";
import { FaUser, FaCalendar, FaFileAlt, FaCog, FaTag } from "react-icons/fa";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";

const Dashboard: React.FC = () => {
  const [statistics, setStatistics] = useState<{
    users: number;
    events: number;
    contents: number;
  } | null>(null);

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await api.get("/statistics");
      setStatistics(response.data);
    } catch (error) {
      console.error("Erro ao buscar estatísticas", error);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return (
    <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Sidebar */}
      <div className="bg-white sm: grid-col p-6 w-full lg:w-1/4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Gerenciamento
        </h3>
        <Link to="/gerenciarevento">
          <button className="flex items-center w-full p-4   hover:bg-gray-200 transition mb-2">
            <FaCalendar className="w-6 h-6 text-green-500 mr-4" />
            Gerenciar Eventos
          </button>
        </Link>
        <Link to="/gerenciarusuarios">
          <button className="flex items-center w-full p-4   hover:bg-gray-200 transition mb-2">
            <FaUser className="w-6 h-6 text-blue-500 mr-4" />
            Gerenciar Usuários
          </button>
        </Link>
        <Link to="/gerenciarconteudo">
          <button className="flex items-center w-full p-4   hover:bg-gray-200 transition mb-2">
            <FaFileAlt className="w-6 h-6 text-red-500 mr-4" />
            Gerenciar Conteúdos
          </button>
        </Link>
        <Link to="/conteudo/publicar">
          <button className="flex items-center w-full p-4   hover:bg-gray-200 transition mb-2">
            <FaFileAlt className="w-6 h-6 text-purple-500 mr-4" />
            Publicar Conteúdo
          </button>
        </Link>
        <Link to="/gerenciarcategoria">
          <button className="flex items-center w-full p-4   hover:bg-gray-200 transition mb-2">
            <FaTag className="w-6 h-6 text-teal-500 mr-4" />
            Gerenciar Categorias
          </button>
        </Link>
        <Link to="/perfil">
          <button className="flex items-center w-full p-4   hover:bg-gray-200 transition mb-2">
            <FaCog className="w-6 h-6 text-yellow-500 mr-4" />
            Configurações
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-full sm:max-w-5xl bg-white p-6 rounded-lg">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Estatísticas do Site
        </h3>

        {statistics ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Object.entries(statistics).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md"
              >
                {/* Icons for each statistic */}
                {key === "users" && (
                  <FaUser className="w-6 h-6 text-blue-500 mr-4" />
                )}
                {key === "events" && (
                  <FaCalendar className="w-6 h-6 text-green-500 mr-4" />
                )}
                {key === "contents" && (
                  <FaFileAlt className="w-6 h-6 text-red-500 mr-4" />
                )}

                <div>
                  <p className="text-sm sm:text-base font-semibold text-gray-700 capitalize">
                    {key}
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Carregando estatísticas...</p>
        )}

        {/* Gráficos */}
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Gráficos de Desempenho
          </h3>
          <div className="flex flex-col md:flex-row md:space-x-4">
            {/* Gráfico de Conteúdos */}
            {statistics && (
              <div className="bg-white p-4 rounded-lg shadow-md w-full">
                <h4 className="font-semibold mb-2">
                  Distribuição de Conteúdos
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Usuários", value: statistics.users },
                        { name: "Eventos", value: statistics.events },
                        { name: "Conteúdos", value: statistics.contents },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name }) => name}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
