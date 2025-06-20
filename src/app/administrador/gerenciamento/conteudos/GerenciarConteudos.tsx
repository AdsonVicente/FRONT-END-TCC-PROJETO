'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { toast } from 'react-toastify';
import FilterForm from './filter';
import DeleteButton from './deleteButton';

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

export default function GerenciarConteudosPage() {
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const autorFiltro = searchParams.get('autor') || '';
  const dataFiltro = searchParams.get('data') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/administrador/login');
      return;
    }

    const fetchConteudos = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/conteudos`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          throw new Error('Erro ao buscar conteúdos');
        }

        const data = await res.json();

        const sorted = data.sort(
          (a: Conteudo, b: Conteudo) =>
            new Date(b.publicadoEm).getTime() -
            new Date(a.publicadoEm).getTime()
        );

        setConteudos(sorted);
      } catch (error) {
        console.error('Erro ao cadastrar conteúdo:', error);
        toast.error('Erro ao cadastrar conteúdo');
      } finally {
        setLoading(false);
      }
    };

    fetchConteudos();
  }, [router]);

  const conteudosFiltrados = conteudos
    .filter((c) =>
      autorFiltro ? c.autor.toLowerCase().includes(autorFiltro.toLowerCase()) : true
    )
    .filter((c) =>
      dataFiltro ? c.publicadoEm.startsWith(dataFiltro) : true
    );

  const totalPages = Math.max(1, Math.ceil(conteudosFiltrados.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentConteudos = conteudosFiltrados.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-5xl mx-auto bg-white/80 p-8 rounded-2xl shadow-lg border border-yellow-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-yellow-500">🔎</span> Filtrar conteúdos
        </h1>
        <FilterForm autor={autorFiltro} data={dataFiltro} />
      </div>

      <div className="max-w-5xl mx-auto bg-white/90 p-8 rounded-2xl shadow-lg border border-yellow-200 overflow-x-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-yellow-500">📚</span> Gerenciar Conteúdos
          </h2>
          <Link
            href="/administrador/gerenciamento/conteudos/cadastrar"
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 px-5 rounded-lg text-base font-semibold shadow transition"
          >
            <FaPlus className="w-4 h-4" />
            Adicionar
          </Link>
        </div>

        {loading ? (
          <p className="text-center py-10">Carregando...</p>
        ) : (
          <table className="w-full text-base border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-yellow-50 text-gray-700">
                <th className="text-left px-3 py-2">ID</th>
                <th className="text-left px-3 py-2">Título</th>
                <th className="text-left px-3 py-2">Autor</th>
                <th className="text-left px-3 py-2">Data</th>
                <th className="text-left px-3 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentConteudos.length ? (
                currentConteudos.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white hover:bg-yellow-50 border rounded-lg shadow-sm transition"
                  >
                    <td className="px-3 py-2">{item.id}</td>
                    <td className="px-3 py-2">
                      <Link
                        href={`/conteudos/${item.id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {item.titulo}
                      </Link>
                    </td>
                    <td className="px-3 py-2">{item.autor}</td>
                    <td className="px-3 py-2">
                      {new Date(item.publicadoEm).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 flex gap-3 text-blue-600">
                      <Link
                        href={`/conteudos/${item.id}`}
                        title="Ver"
                        className="hover:text-blue-800"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                      <Link
                        href={`/administrador/gerenciamento/conteudos/editar/${item.id}`}
                        title="Editar"
                        className="hover:text-blue-800"
                      >
                        <FaEdit />
                      </Link>
                      <DeleteButton id={item.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Nenhum conteúdo encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className="flex justify-center items-center mt-8 space-x-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            autor={autorFiltro}
            data={dataFiltro}
          />
        </div>
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  autor,
  data,
}: {
  currentPage: number;
  totalPages: number;
  autor: string;
  data: string;
}) {
  const getHref = (page: number) => {
    const params = new URLSearchParams();
    if (autor) params.set('autor', autor);
    if (data) params.set('data', data);
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  return (
    <>
      <Link
        href={getHref(currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition font-semibold ${currentPage === 1
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
      >
        Anterior
      </Link>
      <span className="text-base text-gray-700 font-medium">
        {currentPage} / {totalPages}
      </span>
      <Link
        href={getHref(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg transition font-semibold ${currentPage === totalPages
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
      >
        Próxima
      </Link>
    </>
  );
}
