import {
  FaYoutube,
  FaDonate,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import CountdownTimer from "./timer";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Link } from "react-router-dom";

const eventDate = "2024-09-27T00:00:00";
const baseUrl = import.meta.env.VITE_BASE_URL;

const NewsCard = ({ date, title, imageUrl, link }: any) => {
  return (
    <div className="flex items-center mb-6 border-b border-gray-200 pb-4">
      <Link to={link} className="flex-shrink-0 mr-4">
        <div
          className="w-20 h-20 bg-cover bg-center rounded-md"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </Link>
      <div className="flex-1">
        <p className="text-gray-500 text-sm mb-1">{date}</p>
        <Link
          to={link}
          className="text-gray-900 font-semibold hover:text-red-600 leading-tight"
        >
          {title}
        </Link>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [news, setNews] = useState([]);
  const [santoSemana, setSantoSemana] = useState<any>(null);

  useEffect(() => {
    const fetchConteudo = async () => {
      try {
        const response = await api.get("/conteudos");
        const filteredNews = response.data
          .filter((conteudo: any) =>
            ["papo jovem", "fundador"].includes(conteudo.categoria.name)
          )
          .map((conteudo: any) => ({
            id: conteudo.id,
            title: conteudo.titulo,
            imageUrl: `${baseUrl}/${conteudo.banner}`,
            link: `/conteudo/${conteudo.id}`,
            category: conteudo.categoria.name,
            date: new Date(conteudo.publicadoEm).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          }));

        // Filtrando pelo conteúdo que pertence à categoria 'destaque'
        const santo = response.data.find(
          (conteudo: any) => conteudo.categoria.name === "destaque"
        );

        setNews(filteredNews);
        setSantoSemana(santo);
      } catch (error) {
        console.error("Houve um erro ao buscar os conteúdos", error);
      }
    };

    fetchConteudo();
  }, []);

  return (
    <div className="hidden lg:block lg:w-1/4 lg:pl-6 lg:pr-4 lg:mt-14 lg:sticky lg:top-12">
      <div className="space-y-8">
        {/* Seção de Conexão */}
        <div className="p-6 bg-white rounded-lg">
          <h3 className="text-2xl font-semibold mb-3 text-gray-700 text-center">
            Conecte-se
          </h3>

          <div className="space-y-4">
            <a
              href="http://www.youtube.com/@comunidadecatolicaagape7242"
              className="flex items-center space-x-3 p-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-2xl" />
              <span>Canal do YouTube</span>
            </a>
            <a
              href="/doacao"
              className="flex items-center space-x-3 p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDonate className="text-2xl" />
              <span>Faça uma Doação</span>
            </a>
          </div>
        </div>

        {/* Seção de Eventos */}
        <section className="p-4 rounded-lg shadow-md flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
            Próximo Evento
          </h2>
          <div className="w-full flex justify-center">
            <CountdownTimer eventDate={eventDate} />
          </div>
        </section>

        {/* Seção de Redes Sociais */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Encontre-nos
          </h3>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.facebook.com/comcatolicaagape"
              className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="mailto:example@example.com"
              className="p-3 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <FaEnvelope className="text-2xl" />
            </a>
            <a
              href="https://www.instagram.com/comunidadecatolicaagape?igshid=YmMyMTA2M2Y%3D"
              className="p-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Santo da Semana */}
        {santoSemana && (
          <a
            href={`/conteudo/${santoSemana.id}`}
            className="group relative block bg-black overflow-hidden shadow-md"
          >
            <img
              alt={santoSemana.titulo}
              src={`${baseUrl}/${santoSemana.banner}`}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />
            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-yellow-500">
                Santo da Semana
              </p>
              <p className="text-xl font-bold text-white sm:text-2xl">
                {santoSemana.titulo}
              </p>
              <div className="mt-32 sm:mt-48 lg:mt-64">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white">{santoSemana.resumo}</p>
                </div>
              </div>
            </div>
          </a>
        )}
      </div>
      {/* Destaques */}
      <div className=" bg-white rounded-lg mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Destaques</h2>
        {news.map((item: any) => (
          <NewsCard
            key={item.id}
            date={item.date}
            title={item.title}
            imageUrl={item.imageUrl}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
