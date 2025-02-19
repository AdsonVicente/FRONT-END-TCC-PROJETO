import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  banner: string;
  local: string;
  horario: string;
  createdAt: string;
}

const DetalheEvento: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [evento, setEvento] = useState<Evento | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await api.get(`eventos/${id}`);
        setEvento(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchEvento();
  }, [id]);

  if (!evento) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Carregando...
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Confira este evento: ${evento.titulo}`;
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
      {/* Social Media Sharing Buttons */}
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

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center space-x-2"
        >
          <span>&larr;</span>
          <span>Voltar</span>
        </button>
      </div>

      <h1 className="capitalize text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 leading-tight">
        {evento.titulo}
      </h1>

      <div className="flex justify-center mb-8">
        <img
          src={`http://localhost:3000/${evento.banner}`}
          alt={evento.titulo}
          className="w-full h-auto object-cover rounded-lg shadow-md"
          style={{ maxHeight: "500px", maxWidth: "1200px" }}
        />
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 mx-auto mb-8">
        {evento.descricao.split("\n").map((paragraph, index) => (
          <p
            className="whitespace-normal break-words"
            key={index}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>

      <div className=" p-4 rounded-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Localização</h2>
        <p className="text-lg text-gray-600">{evento.local}</p>
      </div>

      <div className=" p-4 rounded-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Horário</h2>
        <p className="text-lg text-gray-600">{evento.horario}</p>
      </div>

    </div>
  );
};

export default DetalheEvento;
