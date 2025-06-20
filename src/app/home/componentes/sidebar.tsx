// app/components/sidebar/Sidebar.tsx
'use client';

import { FaYoutube, FaDonate } from 'react-icons/fa';
import Link from 'next/link';
import IconsSection from './itens';
import { useEffect, useState } from 'react';
import { api } from '@/app/services/api';

interface NewsType {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  category: string;
  date: string;
}
interface Categoria {
  id: string;
  nome: string;
}

interface Conteudo {
  id: string;
  titulo: string;
  banner: string;
  publicadoEm: string;
  category?: Categoria | null;
}
export default function Sidebar() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConteudo = async () => {
      try {
        const response = await api.get(`/conteudos`);

        const categoriasPermitidas = ['6a87d133-94c4-4eb7-aaac-489f0eafc0eb'];
        const filteredNews = response.data
          .filter((conteudo: Conteudo) => categoriasPermitidas.includes(conteudo.category?.id ?? ''))
          .slice(0, 6)
          .map((conteudo: Conteudo) => ({
            id: conteudo.id,
            title: conteudo.titulo,
            imageUrl: conteudo.banner,
            link: `/conteudos/${conteudo.id}`,
            category: conteudo.category?.nome ?? 'Sem categoria',
            date: new Date(conteudo.publicadoEm).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
          }));


        setNews(filteredNews);
      } catch (error) {
        console.error(error);
        setError('Houve um erro ao buscar os conteúdos.');
      } finally {
        setLoading(false);
      }
    };

    fetchConteudo();
  }, []);

  const NewsCard = ({ date, title, imageUrl, link }: NewsType) => (
    <Link
      href={link}
      className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition shadow-sm mb-4"
    >
      <div
        className="w-20 h-20 rounded-md bg-cover bg-center flex-shrink-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="flex-1">
        <p className="text-xs text-gray-400 mb-1">{date}</p>
        <h4
          className="text-base text-gray-800 font-medium leading-snug line-clamp-2 hover:text-red-600 transition"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h4>
      </div>
    </Link>
  );

  return (
    <div className="hidden lg:block lg:w-1/4 lg:pl-6 lg:pr-4 lg:mt-14 lg:sticky lg:top-12">
      <div className="space-y-8">
        {/* Conecte-se */}
        <div className="p-6 bg-white rounded-lg">
          <h3 className="text-2xl mb-3 text-gray-700">Conecte-se</h3>
          <div className="space-y-4">
            <a
              href="http://www.youtube.com/@comunidadecatolicaagape7242"
              className="flex items-center space-x-3 p-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-2xl" />
              <span>Canal do YouTube</span>
            </a>
            <Link
              href="/doe-aqui"
              className="flex items-center space-x-3 p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              <FaDonate className="text-2xl" />
              <span>Faça uma Doação</span>
            </Link>
          </div>
        </div>

        {/* Galeria */}
        <div className="relative p-6 bg-gradient-to-br from-yellow-200 via-yellow-50 to-white rounded-xl shadow text-center">
          <h3 className="text-2xl font-bold mb-2 text-gray-800">Galeria Ágape</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Veja momentos especiais da nossa comunidade registrados em fotos
          </p>
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 bg-yellow-600 text-white font-medium px-5 py-2 rounded-full hover:bg-red-700 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553 2.276A1 1 0 0120 13.118v.764a1 1 0 01-.447.842L15 17m0 0l-4.553 2.276A1 1 0 019 18.882v-.764a1 1 0 01.447-.842L15 15m0 2v-2m0 0V9m0 6l-4.553-2.276A1 1 0 019 11.118v-.764a1 1 0 01.447-.842L15 7"
              />
            </svg>
            Acesse a Galeria
          </Link>
        </div>

        <IconsSection />

        {/* Destaques */}
        <div className="bg-white rounded-lg mt-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Destaques</h2>
          {loading ? (
            <div className="text-center text-gray-500">Carregando...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            news.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                date={item.date}
                title={item.title}
                imageUrl={item.imageUrl}
                link={item.link}
                category={item.category}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
