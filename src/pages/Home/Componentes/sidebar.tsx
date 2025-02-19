import {
  FaYoutube,
  FaDonate,
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
          dangerouslySetInnerHTML={{ __html: title }}
        ></Link>

      </div>
    </div>
  );
};

const Sidebar = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchConteudo = async () => {
      try {
        const response = await api.get("/conteudos");
        const filteredNews = response.data
          .slice(0, 6)
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



        setNews(filteredNews);

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

        {/* Seção de Liturgia Diária */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Liturgia Diária
          </h3>
          <div className="text-center">
            <Link to="/liturgia-diaria" className="text-red-600 font-semibold hover:underline">
              Acesse aqui
            </Link>
          </div>
        </div>

        {/* Destaques */}
        <div className="bg-white rounded-lg mt-4">
          <h2 className="text-2xl font-normal text-gray-800 mb-4">Destaques</h2>
          {news.map((item: any) => (
            <NewsCard
              key={item.id}
              date={item.date}
              title={item.title}
              imageUrl={item.imageUrl}
              link={`/conteudos/${item.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
