import { FaSpotify, FaYoutube } from "react-icons/fa";

const MusicasSecao = () => {
  const musicas = [
    {
      titulo: "É Amor",
      imagem:
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/WhatsApp%20Image%202024-09-08%20at%2021.31.18.jpeg?raw=true",
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
    <section className="py-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Ouça Nossas Músicas
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {musicas.map((musica) => (
          <div
            key={musica.titulo}
            className="relative bg-white shadow-md overflow-hidden "
          >
            <img
              src={musica.imagem}
              alt={musica.titulo}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 via-transparent">
              <h3 className="text-lg font-semibold text-white mb-2">
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
    </section>
  );
};

export default MusicasSecao;
