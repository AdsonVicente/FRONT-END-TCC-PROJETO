'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  FaUser,
  FaCalendar,
  FaFileAlt,
  FaCog,
  FaTag,
  FaImage,
} from 'react-icons/fa';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import MensagemEspiritual from './frases/page';
import { api } from '@/app/services/api';

interface Statistics {
  administradores: number;
  eventos: number;
  conteudos: number;
}

const menuItems = [
  { to: '/administrador/gerenciamento/eventos/gerenciar', label: 'Gerenciar Eventos', icon: <FaCalendar className="w-5 h-5 text-blue-700" /> },
  { to: '/administrador/gerenciamento/administrador/listar', label: 'Gerenciar Usuários', icon: <FaUser className="w-5 h-5 text-blue-700" /> },
  { to: '/administrador/galeria', label: 'Galeria', icon: <FaImage className="w-5 h-5 text-blue-700" /> },
  { to: '/administrador/gerenciamento/conteudos', label: 'Gerenciar Conteúdos', icon: <FaFileAlt className="w-5 h-5 text-blue-700" /> },
  { to: '/administrador/gerenciamento/conteudos/cadastrar', label: 'Publicar Conteúdo', icon: <FaFileAlt className="w-5 h-5 text-blue-700" /> },
  { to: '/administrador/gerenciamento/categoria', label: 'Gerenciar Categorias', icon: <FaTag className="w-5 h-5 text-blue-700" /> },
  { to: '/administrador/gerenciamento/administrador/editar', label: 'Configurações', icon: <FaCog className="w-5 h-5 text-blue-700" /> },
];

const Dashboard = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    try {
      setError(null);
      const response = await api.get('/estatisticas');
      setStatistics(response.data);
    } catch (error: unknown) {
      setError('Erro ao buscar estatísticas. Tente novamente mais tarde.');
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
        <p className="text-red-600 text-xl italic font-serif text-center">
          {error}
        </p>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
        <p className="text-gray-600 text-xl italic font-serif text-center">
          Carregando as estatísticas da Comunidade Católica, por favor aguarde...
        </p>
      </div>
    );
  }

  const data = [
    { name: 'Administradores', value: statistics.administradores || 1 },
    { name: 'Eventos', value: statistics.eventos || 1 },
    { name: 'Conteúdos', value: statistics.conteudos || 1 },
  ];

  // Cards de estatísticas
  const statsCards = [
    {
      label: 'Administradores',
      value: statistics.administradores,
      icon: <FaUser className="w-8 h-8 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      label: 'Eventos',
      value: statistics.eventos,
      icon: <FaCalendar className="w-8 h-8 text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      label: 'Conteúdos',
      value: statistics.conteudos,
      icon: <FaFileAlt className="w-8 h-8 text-purple-600" />,
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-blue-900 tracking-tight">
            Painel do Administrador
          </h1>
          <div className="hidden md:block">
            <MensagemEspiritual />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="bg-white rounded-2xl shadow-lg p-6 h-fit border border-blue-100">
          <h3 className="text-xl font-serif font-semibold text-blue-900 mb-6 border-b border-blue-200 pb-3">
            Gerenciamento
          </h3>
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-900 font-medium hover:bg-blue-100 transition"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 flex flex-col gap-8">
          {/* Mensagem espiritual mobile */}
          <div className="md:hidden mb-2">
            <MensagemEspiritual />
          </div>

          {/* Estatísticas em cards */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {statsCards.map((card) => (
              <div
                key={card.label}
                className={`rounded-xl shadow-md p-6 flex items-center gap-4 ${card.bg} border border-blue-100`}
              >
                <div>{card.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-blue-900">{card.value}</div>
                  <div className="text-sm text-blue-700 font-serif">{card.label}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Gráficos */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 flex flex-col">
              <h4 className="text-lg font-semibold text-blue-800 mb-4 border-b border-blue-100 pb-2">
                Distribuição Geral
              </h4>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#2c5282"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#f0f5ff', borderRadius: 8 }}
                    itemStyle={{ color: '#2c5282', fontWeight: '600' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 flex flex-col">
              <h4 className="text-lg font-semibold text-blue-800 mb-4 border-b border-blue-100 pb-2">
                Comparação de Dados
              </h4>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fill: '#2c5282', fontFamily: 'serif' }} />
                  <YAxis tick={{ fill: '#2c5282', fontFamily: 'serif' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#f0f5ff', borderRadius: 8 }}
                    itemStyle={{ color: '#2c5282', fontWeight: '600' }}
                  />
                  <Legend wrapperStyle={{ color: '#2c5282', fontFamily: 'serif', fontWeight: '600' }} />
                  <Bar dataKey="value" fill="#2b6cb0" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
