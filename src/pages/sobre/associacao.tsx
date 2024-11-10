import React from "react";
import { Link } from "react-router-dom";

const ComunidadeAgape: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-amber-600 mb-4">
          Comunidade Católica Ágape
        </h1>
        <p className="text-lg text-gray-700">
          Associação Privada de Fiéis | Utilidade Pública Municipal e Estadual
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sobre Nós</h2>
        <p className="text-gray-700">
          A <strong>Comunidade Católica Ágape</strong> é uma associação privada,
          com utilidade pública reconhecida através da Lei Ordinária 1153/2018,
          tanto a nível municipal quanto estadual. Com uma missão que vai além
          da espiritualidade, a comunidade também se dedica ao serviço social e
          civil, impactando diversas regiões.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Missão e Carisma
        </h2>
        <p className="text-gray-700">
          A Comunidade Católica Ágape busca viver e espalhar o carisma do amor
          incondicional de Deus, refletindo isso através de seus trabalhos
          espirituais e sociais. Os projetos da associação são abrangentes,
          englobando ações que visam o bem-estar integral das pessoas, com uma
          atenção especial às necessidades espirituais e materiais.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Trabalhos e Ações
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2">
            <strong>Evangelização e Formação Espiritual:</strong> Através de
            retiros, grupos de oração e formações bíblicas, a comunidade
            proporciona o crescimento espiritual de seus membros e da comunidade
            em geral.
          </li>
          <li className="mb-2">
            <strong>Ações Sociais:</strong> Presente em zonas rurais,
            periféricas, e na sua sede, a comunidade realiza diversas ações
            sociais que incluem:
            <ul className="list-inside list-disc ml-6">
              <li>Realização de festivais comunitários.</li>
              <li>Promoção de eventos esportivos.</li>
              <li>Assistência a famílias carentes e programas de apoio.</li>
              <li>Apoio específico para jovens.</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Onde Atuamos
        </h2>
        <p className="text-gray-700">
          A <strong>Comunidade Ágape</strong> espalha seu carisma em várias
          regiões, especialmente em áreas rurais e comunidades periféricas.
          Nosso trabalho atinge locais que necessitam de apoio, levando não só o
          evangelho, mas também ações concretas de ajuda e promoção humana.
        </p>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Participe</h2>
        <p className="text-gray-700 mb-4">
          Se você deseja fazer parte dessa missão de amor e transformação, entre
          em contato conosco ou visite nossa sede. Juntos, podemos espalhar o
          carisma de Deus para os mais necessitados.
        </p>
        <button className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700">
          <Link to="contato">Entre em Contato</Link>
        </button>
      </div>
    </div>
  );
};

export default ComunidadeAgape;
