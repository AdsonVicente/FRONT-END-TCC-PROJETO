import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { api } from "../../services/api";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

interface Noticia {
  id: string;
  titulo: string;
  descricao: string;
  autor: string;
  banner: string;
  publicadoEm: string;
  categoria: {
    nome: string;
  };
}

const DetalheConteudo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [conteudo, setConteudo] = useState<Noticia | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConteudo = async () => {
      try {
        const response = await api.get(`conteudos/${id}`);
        setConteudo(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchConteudo();
  }, [id]);

  if (!conteudo) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );
  }

  const formattedDate = format(
    new Date(conteudo.publicadoEm),
    "dd 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  );

  const shareUrl = window.location.href;
  const shareText = `Confira este artigo: ${conteudo.titulo}`;
  const socialMediaLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      icon: <FaFacebookF size={24} />,
      color: "text-blue-600",
      hoverColor: "hover:text-blue-800",
    },
    {
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      icon: <FaTwitter size={24} />,
      color: "text-blue-400",
      hoverColor: "hover:text-blue-600",
    },
    {
      href: `https://wa.me/?text=${encodeURIComponent(
        shareText + " " + shareUrl
      )}`,
      icon: <FaWhatsapp size={24} />,
      color: "text-green-500",
      hoverColor: "hover:text-green-700",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-5xl relative">
      {/* Botões de Compartilhamento Flutuantes */}
      <div className="fixed top-1/3 right-4 z-50 flex flex-col space-y-4">
        {socialMediaLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} ${link.hoverColor} bg-white p-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110`}
          >
            {link.icon}
          </a>
        ))}
      </div>

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-6">
        <ul className="flex flex-wrap space-x-2 items-center">
          <li>
            <Link to="/" className="hover:underline text-blue-600">
              Início
            </Link>
          </li>
          <li className="hidden sm:inline">/</li>
          <li>
            <Link to="/search" className="hover:underline text-blue-600">
              Categorias
            </Link>
          </li>
          <li className="hidden sm:inline">/</li>
          <li>
            <h2 className=" capitalize">{conteudo.categoria.nome}</h2>
          </li>
          <li className="hidden sm:inline">/</li>
          <li className="text-gray-400 truncate max-w-xs sm:max-w-none">
            {conteudo.titulo}
          </li>
        </ul>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center space-x-2"
        >
          <span>&larr;</span>
          <span>Voltar</span>
        </button>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <p>{formattedDate}</p>
          <span className="hidden md:block">|</span>
          <p className="hidden md:block">
            Autor: <span className="font-semibold">{conteudo.autor}</span>
          </p>
        </div>
      </div>

      <h1 className="capitalize text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 leading-tight">
        {conteudo.titulo}
      </h1>

      <div className="flex justify-center mb-8">
        <img
          src={`http://localhost:3000/${conteudo.banner}`}
          alt={conteudo.titulo}
          className="w-full h-auto object-cover rounded-lg shadow-md"
          style={{ maxHeight: "500px", maxWidth: "1200px" }}
        />
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 mx-auto mb-8">
        {conteudo.descricao.split("\n").map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>

      <div className="flex justify-center items-center text-gray-600">
        <p>
          {formattedDate} - Autor:{" "}
          <span className="font-semibold">{conteudo.autor}</span>
        </p>
      </div>
    </div>
  );
};

export default DetalheConteudo;
