import React from "react";
import { FaSpotify, FaYoutube } from "react-icons/fa";

const MusicasSecao: React.FC = () => {
  const musicas = [
    {
      titulo: "É Amor",
      imagem:
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/Portada%20de%20%C3%A1lbum%20de%20m%C3%BAsica%20vintage%20naranja%20oscuro%20y%20amarillo.png?raw=true",
      spotifyLink:
        "https://open.spotify.com/intl-pt/track/2c0BRz0SYgZ1X8WwySUgrG?si=e8c5ac63ad074c6c",
      youtubeLink: "https://youtu.be/OXQ9TuCu2ig?si=oxkTk7xrleyAm1xt",
    },
    {
      titulo: "Sempre Amigos",
      imagem:
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/WhatsApp%20Image%202024-09-08%20at%2021.31.18.jpeg?raw=true",
      spotifyLink:
        "https://open.spotify.com/intl-pt/track/2FFhyXDGuEJ1rgoz7EkUAQ?si=2855988feb0b42d7",
      youtubeLink: "https://youtu.be/CfSH4hy4t94?si=Fe8du5KPiZHAAqO6",
    },
    // Adicione mais músicas conforme necessário
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Ouça as Músicas da Comunidade
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Experimente nossas canções inspiradoras que tocam o coração e levam a
          mensagem de fé e amor.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {musicas.map((musica) => (
            <div
              key={musica.titulo}
              className="group bg-white  overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Imagem */}
              <img
                src={musica.imagem}
                alt={musica.titulo}
                className="w-full h-64 object-cover"
              />
              {/* Conteúdo */}
              <div className="p-4">
                <h3 className="text-lg font-extralight text-gray-800 mb-2 group-hover:text-red-600">
                  {musica.titulo}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href={musica.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-400 transition-colors"
                  >
                    <FaSpotify size={24} />
                  </a>
                  <a
                    href={musica.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <FaYoutube size={24} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicasSecao;
