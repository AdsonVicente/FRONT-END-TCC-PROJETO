import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface PersonSectionProps {
  imgSrc: string;
  name: string;
  description: JSX.Element;
}

const PersonSection: React.FC<PersonSectionProps> = ({
  imgSrc,
  name,
  description,
}) => (
  <motion.div
    className="grid md:grid-cols-2 gap-8 items-center mb-16"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <div className="overflow-hidden rounded-lg shadow-xl">
      <motion.img
        src={imgSrc}
        alt={name}
        className="w-full h-auto transform transition duration-300 hover:scale-105"
        whileHover={{ scale: 1.05 }}
      />
    </div>
    <div>
      <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4">
        {name}
      </h2>
      <div className="text-lg text-gray-700 leading-relaxed space-y-4">
        {description}
      </div>
    </div>
  </motion.div>
);

interface QuoteSectionProps {
  quote: string;
  author: string;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ quote, author }) => (
  <motion.div
    className=" py-10 px-8 md:px-16 rounded-lg  text-center my-16 transform transition-all duration-500"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <p className="text-2xl md:text-3xl font-serif italic text-red-500 mb-6 leading-relaxed">
      "{quote}"
    </p>
    <p className="text-lg md:text-2xl font-semibold text-zinc-900 tracking-wide">
      — {author}
    </p>
  </motion.div>
);

export const Fundadores: React.FC = () => (
  <div className="bg-white py-16">
    <section className="container mx-auto px-4 md:px-8">
      <PersonSection
        imgSrc="https://github.com/AdsonVicente/ImagensUrlDados/blob/3eda69f28672dc55a1f3334322b4c116f27e04ad/fundador.jpg?raw=true"
        name="Cleverson Silva Santos"
        description={
          <>
            <p>
              Cleverson Silva Santos nasceu em Tobias Barreto, uma encantadora
              cidade no interior de Sergipe. Em sua adolescência, mudou-se para
              Aracaju com o objetivo de se preparar para o vestibular. Lá,
              encontrou a Comunidade Católica Shalom e teve um profundo encontro
              com Nosso Senhor Jesus Cristo.
            </p>
            <p>
              Na Comunidade Shalom, Cleverson desempenhou um papel ativo como
              missionário e teve a oportunidade de servir em Itapipoca, no
              Ceará.
            </p>
            <p>
              Ao voltar para sua cidade natal, notou a falta de opções atraentes
              para os jovens e a ausência de um espaço vibrante na paróquia.
              Decidido a fazer a diferença, procurou o pároco da época,
              Monsenhor, e ofereceu-se para liderar o grupo de jovens.
            </p>
            <p>
              Com o apoio do pároco, Cleverson reabriu o grupo Água Viva. Embora
              o grupo tenha enfrentado desafios e sido fechado novamente, seu
              desejo de impactar a vida dos jovens nunca diminuiu.
            </p>
            <p>
              No dia 10 de abril de 2004, ele lançou o Projeto Nova Juventude
              com um primeiro encontro no Educandário Nossa Senhora do Carmo.
              Desde então, sua dedicação tem transformado vidas e inspirado
              inúmeros jovens ao longo de 20 anos.
            </p>
          </>
        }
      />

      <PersonSection
        imgSrc="https://github.com/AdsonVicente/ImagensUrlDados/blob/3eda69f28672dc55a1f3334322b4c116f27e04ad/CoFundadora.jpg?raw=true"
        name="Maria Ivone Paiva Soares"
        description={
          <>
            <p>
              Maria Ivone Paiva Soares, nossa cofundadora, é uma presença
              constante ao lado de Cleverson. Conheceram-se na Comunidade Shalom
              e juntos trouxeram o carisma de Amor para Tobias Barreto, SE.
            </p>
            <p>
              Conhecida carinhosamente como "mãe", Ivone é admirada por seu
              olhar materno e sereno, oferecendo um apoio constante e amoroso à
              nossa missão.
            </p>
          </>
        }
      />

      <QuoteSection
        quote="O Ágape é a misericórdia de Deus em minha vida."
        author="Cleverson Silva Santos"
      />
      <div className="border-t-2 border-gray-300 my-8"></div>

      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
          Junte-se à Nossa Missão
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Descubra como você pode fazer a diferença e se engajar em nossa
          comunidade.
        </p>
        <Link
          to="/contato"
          className="inline-block bg-stone-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-stone-700 transition-transform duration-300 transform hover:scale-105"
        >
          Entre em Contato
        </Link>
      </motion.div>
    </section>
  </div>
);

export default Fundadores;
