// /src/app/Pages/Home/PaginaPrincipal.tsx (adaptado para Next.js)

"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "./home/componentes/sidebar";
import MusicasSecao from "./home/componentes/musicas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPeopleGroup, faUsers } from "@fortawesome/free-solid-svg-icons";
import BemVindo from "./home/componentes/SeçãoInicial";
import PregacaoSection from "./fundadores/componentes/pregacao/pregacao-section";
import CampBanner from "@/app/componentes/Cards/CampBanner";
import Head from "next/head";
import Navbar from "./componentes/navbar/Navbar";
import Footer from "./componentes/footer/page";

interface Categoria {
  id: string;
  nome: string;
}

interface Conteudo {
  id: string;
  titulo: string;
  descricao: string;
  autor: string;
  banner: string;
  publicadoEm: string;
  categoria: Categoria;
}
interface ConteudoAPI {
  id: string;
  titulo: string;
  descricao: string;
  autor: string;
  banner: string;
  publicadoEm: string;
  category?: {
    id: string;
    nome: string;
  }
}


const fetchConteudos = async (): Promise<Conteudo[]> => {
  const res = await fetch(
    "https://back-end-comunidadeagape-production.up.railway.app/conteudos",
    {
      headers: { Origin: "https://www.comagape.org" },
    }
  );
  if (!res.ok) throw new Error("Erro ao buscar os conteúdos.");
  const data: ConteudoAPI[] = await res.json();

  // Remover duplicados por ID
  const uniqueMap = new Map<string, Conteudo>();
  data.forEach((c) => {
    if (!uniqueMap.has(c.id)) {
      uniqueMap.set(c.id, {
        id: c.id,
        titulo: c.titulo,
        descricao: c.descricao,
        autor: c.autor,
        banner: c.banner,
        publicadoEm: c.publicadoEm,
        categoria: {
          id: c.category?.id ?? '',
          nome: c.category?.nome ?? '',
        },
      });
    }
  });
  return Array.from(uniqueMap.values());
};


function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
}

const Home = () => {
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [newsLimit, setNewsLimit] = useState(12);

  useEffect(() => {
    fetchConteudos()
      .then((data) => {
        setConteudos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Houve um erro ao buscar os conteúdos. Tente novamente mais tarde.");
        setLoading(false);
      });
  }, []);

  // Filtrar conteúdos válidos e garantir IDs únicos por seção
  const filteredConteudos = conteudos.filter((c) => c.categoria && c.categoria.nome);

  // IDs já usados para evitar repetição entre seções
  const usedIds = new Set<string>();

  // Destaques
  const destaqueConteudos = filteredConteudos
    .filter((c) => {
      if (!usedIds.has(c.id) && usedIds.size < 5) {
        usedIds.add(c.id);
        return true;
      }
      return false;
    });

  // Conteúdo principal (primeiro não usado)
  const conteudoPrincipal = filteredConteudos.find((c) => !usedIds.has(c.id));
  if (conteudoPrincipal) usedIds.add(conteudoPrincipal.id);

  // Restante das notícias
  const remainingConteudos = filteredConteudos.filter((c) => !usedIds.has(c.id));

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mx-auto">
      <Navbar />
      <Head>
        <title>Comunidade Católica Ágape</title>
        <meta name="description" content="Evangelização com amor, fé e missão." />
        <meta property="og:title" content="Comunidade Católica Ágape" />
        <meta property="og:description" content="Evangelização com amor, fé e missão." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={destaqueConteudos[0]?.banner || ""} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <CampBanner />
      <div className="pt-12" />
      <div className="container mx-auto lg:px-4 lg:mt-12 max-w-7xl">
        <BemVindo />
        {/* Destaques */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Card de destaque maior */}
              {destaqueConteudos[0] && (
                <div className="w-full lg:w-1/2">
                  <div className="relative h-full w-full overflow-hidden shadow-lg group">
                    <Link href={`/conteudos/${destaqueConteudos[0].id}`}>
                      <Image
                        width={600}      // ajuste para o tamanho real ou desejado
                        height={400}
                        className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                        src={destaqueConteudos[0].banner}
                        alt={destaqueConteudos[0].titulo}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent px-6 py-6 flex flex-col justify-end">
                        <h2
                          className="text-3xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300"
                          dangerouslySetInnerHTML={{ __html: destaqueConteudos[0].titulo }}
                        />
                        <span
                          className="text-red-500 font-medium uppercase"
                          dangerouslySetInnerHTML={{ __html: destaqueConteudos[0].categoria.nome }}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              )}
              {/* Cards menores */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {destaqueConteudos.slice(1).map((item) => (
                    <div key={item.id} className="relative h-48 shadow-lg overflow-hidden group">
                      <Link href={`/conteudos/${item.id}`}>
                        <Image
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={item.banner}
                          alt={item.titulo}
                          width={600}      // ajuste para o tamanho real ou desejado
                          height={400}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent px-4 py-4 flex flex-col justify-end">
                          <h3
                            className="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors duration-300 truncate w-full"
                            dangerouslySetInnerHTML={{
                              __html: item.titulo.length > 30 ? `${item.titulo.substring(0, 30)}...` : item.titulo,
                            }}
                          />
                          <span
                            className="text-red-500 font-medium capitalize"
                            dangerouslySetInnerHTML={{ __html: item.categoria.nome }}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ágape para Todos */}
        <section className="py-12 justify-center text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-zinc-600 mb-8">Ágape para Todos</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-red-300 transition-transform transform hover:scale-105">
                <FontAwesomeIcon icon={faHeart} className="text-red-500 text-5xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Setor Família</h3>
                <p className="text-gray-600 mb-4">
                  Fortalecendo o amor conjugal com espiritualidade e união.
                </p>
                <Link
                  href="/setores/setor-familia"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                >
                  Saiba Mais
                </Link>

              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-yellow-300 transition-transform transform hover:scale-105">
                <Image
                  src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748476774/WhatsApp_Image_2025-05-16_at_14.20.59_yi907h.jpg"
                  className="w-32 mx-auto mb-4"
                  width={600}      // ajuste para o tamanho real ou desejado
                  height={400}
                  alt="Mascote Agapinho"
                />
                <h3 className="text-xl font-semibold mb-2">Setor Criança</h3>
                <p className="text-gray-600 mb-4">
                  Ensinar os pequenos sobre o amor de Deus de forma lúdica e educativa.
                </p>
                <Link
                  href="/setores/setor-crianca"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                >
                  Saiba Mais
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-indigo-300 transition-transform transform hover:scale-105">
                <FontAwesomeIcon icon={faUsers} className="text-indigo-500 text-5xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Setor Jovem</h3>
                <p className="text-gray-600 mb-4">
                  Uma juventude apaixonada por Cristo, em formação, missão e amizade.
                </p>
                <Link
                  href="/setores/setor-jovem"
                  className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                >
                  Saiba Mais
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-cyan-500 transition-transform transform hover:scale-105">
                <FontAwesomeIcon icon={faPeopleGroup} className="text-cyan-500 text-5xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Setor Misto</h3>
                <p className="text-gray-600 mb-4">
                  Espaço para adultos vivenciarem a espiritualidade e fraternidade na comunidade
                </p>
                <Link
                  href="/setores/setor-misto"
                  className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Conteúdo Principal */}
          <div className="flex-1">
            <section className="mt-6 lg:mt-24">
              {conteudoPrincipal && (
                <div className="block mb-8">
                  <Image
                    alt={conteudoPrincipal.titulo}
                    src={conteudoPrincipal.banner}
                    width={600}      // ajuste para o tamanho real ou desejado
                    height={400}
                    className="h-64 w-full object-cover sm:h-80 lg:h-96 shadow-md"
                  />
                  <Link href={`/conteudos/${conteudoPrincipal.id}`}>
                    <h3
                      className="mt-4 text-lg font-serif font-bold text-gray-900 hover:text-red-700 sm:text-xl"
                      dangerouslySetInnerHTML={{ __html: conteudoPrincipal.titulo }}
                    />
                    <div className="mt-2 text-sm text-gray-500 font-serif">
                      <span dangerouslySetInnerHTML={{ __html: conteudoPrincipal.autor }} /> |
                      <span>{new Date(conteudoPrincipal.publicadoEm).toLocaleDateString()}</span>
                    </div>
                    <div
                      className="line-clamp-3 overflow-hidden text-ellipsis mt-3 text-base font-serif"
                      dangerouslySetInnerHTML={{ __html: conteudoPrincipal.descricao }}
                    />
                  </Link>
                </div>
              )}
              <h2 className="text-3xl font-medium text-zinc-700 mb-4 border-l-4 pl-2 border-zinc-600">
                Noticias e Formações
              </h2>
              {/* Notícias */}
              <section className="py-8 px-4 md:px-0 sm:py-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {remainingConteudos.slice(0, newsLimit).map((conteudo) => (
                    <div key={conteudo.id} className="lg:block bg-white overflow-hidden">
                      <Link href={`/conteudos/${conteudo.id}`}>
                        <Image
                          src={conteudo.banner}
                          alt={conteudo.titulo}
                          width={600}      // ajuste para o tamanho real ou desejado
                          height={400}
                          className="w-full h-48 object-cover"
                        />
                        <div className="mt-2">
                          <div className="flex items-center mb-1">
                            <span
                              style={{
                                backgroundColor: stringToColor(conteudo.categoria?.nome || "default"),
                                color: "white",
                              }}
                              className="text-xs uppercase font-bold px-2 py-1 inline-block"
                            >
                              {conteudo.categoria?.nome
                                ? conteudo.categoria.nome.charAt(0).toUpperCase() + conteudo.categoria.nome.slice(1)
                                : "Categoria Indisponível"}
                            </span>
                          </div>
                          <h2
                            className="text-base font-medium tracking-tight text-neutral-800"
                            dangerouslySetInnerHTML={{
                              __html: conteudo.titulo || "Título Indisponível",
                            }}
                          />
                          <div
                            className="line-clamp-2 text-sm text-neutral-600 mt-2 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: conteudo.descricao || "<p>Descrição Indisponível</p>",
                            }}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {remainingConteudos.length > newsLimit && !showMore && (
                  <button
                    onClick={() => {
                      setShowMore(true);
                      setNewsLimit((prev) => prev + 4);
                    }}
                    className="px-4 py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Ver Mais
                  </button>
                )}
              </section>
            </section>
            {/* Seção de Vídeo */}
            <section className="py-8 md:px-0 px-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Explore os nossos contéudos
              </h2>
              <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <iframe
                  src="https://www.youtube.com/embed/CBAW7OtdREI?si=dUjKz8OlqqgCvv0-"
                  title="Vídeo da Comunidade"
                  className="absolute inset-0 w-full h-full object-cover"
                  allowFullScreen
                />
              </div>
            </section>
            <MusicasSecao />
          </div>
          <Sidebar />
        </div>
      </div>
      <main>
      <PregacaoSection
        coverImage="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1745150509/cd3anl5xjz9jnxkkzka2.jpg"
        title="Corte do Fundador"
        subtitle="Comentando o Evangelho de Mc 4,35-41"
        audioSrc="/pregacao.mpeg"
      />
    </main>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Visite-nos
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Nossa Localização
            </p>
          </div>
          <div className="mt-10">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.954186996642!2d-38.006544153571376!3d-11.188482908142564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x711b299756ed9d1%3A0xa5eaad84906cd6e1!2sLivraria%20Kair%C3%B3s!5e0!3m2!1spt-BR!2sbr!4v1717409274064!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                frameBorder="0"
                aria-hidden="false"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg leading-6 font-medium text-gray-900">
                Largo Glicério Siqueira, 248 - Tobias Barreto, SE, 49300-000
              </p>
              <p className="mt-1 text-lg leading-6 text-gray-500">
                📧 @comunidadecatolicaagape
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
