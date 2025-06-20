"use client";
import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import React from "react";
const SwiperCore = require("swiper").Swiper;
const { Swiper, SwiperSlide } = require("swiper/react");
const { Pagination } = require("swiper/modules");

const metadata: Metadata = {
  title: "História - Comunidade Ágape",
  description: "Conheça a história, missão e sinais da Comunidade Ágape.",
};

type SinalCardProps = {
  title: string;
  color: string;
  img: string;
};

function SinalCard({ title, color, img}: SinalCardProps) {
  const [imgError, setImgError] = React.useState(false);
  return (
    <motion.div
      className="bg-white   p-6 flex flex-col items-center text-center  transition"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-60 h-60 mb-4 rounded-lg overflow-hidden border-4 border-zinc-200 flex items-center justify-center bg-white">
        {!imgError ? (
          <img
            src={img}
            alt={title}
            className="object-cover w-full h-full"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-zinc-400 text-4xl">
            <span>🖼️</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ color }}>
        {title}
      </h3>     
    </motion.div>
  );
}
const sinais = [
  {
    title: "Cordão Branco",
    color: "red",
    img: "/cordão-branco.jpeg",
   
  },
  {
    title: "Cordão Bege",
    color: "coral",
    img: "/cordão-bege.jpeg",
    
  },
  {
    title: "A Corrente",
    color: "blue",
    img: "/cordão-prata.jpeg",
    
  },
];
export default function Historia() {
  return (
    <main className="mx-auto text-gray-900 bg-white min-h-screen">
      <section className="mx-auto w-full max-w-5xl px-4 py-10 md:py-16">
        <motion.header
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-3 drop-shadow-sm">
            Nossa História
          </h1>
          <p className="text-lg text-zinc-700 max-w-2xl mx-auto">
            Uma trajetória de fé, missão e amor que transforma vidas desde 2004.
          </p>
        </motion.header>

        {/* Origem e Fundação + Expansão e Reconhecimento lado a lado */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center md:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-red-600 mb-2">Origem e Fundação</h2>
            <p className="text-zinc-800">
              Quem podia imaginar que uma tarde ensolarada no dia 10 de abril de 2004, em um colégio em Tobias Barreto, SE, transformaria gerações, vidas de pessoas e famílias? Cleverson Silva, ex-missionário da Comunidade Shalom, retornou à sua cidade natal e ficou chocado ao perceber que havia poucos jovens participando da Santa Missa. Inquieto e angustiado com a situação, procurou o Monsenhor local para ajudar a resgatar a juventude da cidade.
            </p>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center md:w-1/2 "
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-red-600 mb-2">Expansão e Reconhecimento</h2>
            <p className="text-zinc-800">
              Com o tempo, o Projeto Nova Juventude evoluiu para Movimento Ágape, deixando de ser apenas um projeto local em Tobias Barreto para se tornar uma força que impactou diversas comunidades, cidades e estados. Na celebração de 10 anos, o fundador Cleverson recebeu o reconhecimento de Gilberto, coordenador das Novas Comunidades Internacionais, que confirmou que o carisma do grupo era de uma Nova Comunidade.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-extrabold text-red-600 text-center mb-2">O Sinal</h2>
          <p className="italic text-zinc-700 text-center mb-6">
            Como marca da nossa eleição e da pertença a Deus e à Comunidade, trazemos
            sobre o peito um sinal visível: o símbolo da Eucaristia — expressão do
            Amor Ágape — envolto por um ostensório de madeira, onde está inscrita, em
            grego, a palavra <b>“Ágape”</b>. Este sinal deseja recordar-nos que o Amor de Deus precisa estar gravado em nossos corações, para que tenhamos força e coragem de testemunhá-Lo, especialmente aos irmãos mais necessitados.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sinais.map((sinal) => (
              <SinalCard key={sinal.title} {...sinal} />
            ))}
          </div>

          <div className="mt-8 space-y-6 text-zinc-700">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">A Corrente</h3>
              <p>
                A corrente representa o rompimento com a escravidão do pecado. É o símbolo da libertação.
                O membro que a carrega assume a missão de romper com tudo aquilo que o aprisiona, assumindo a decisão de caminhar livremente rumo à vontade de Deus.
              </p>
              <p>
                O sinal pendurado na corrente recorda-nos que é preciso quebrar as amarras, enfrentar tudo o que nos prende e, com coragem, subir a montanha. É um chamado à decisão firme, à ousadia da fé e à consagração.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">Cordão Bege</h3>
              <p>
                O cordão bege representa a subida da montanha: um caminho difícil, escorregadio, muitas vezes enlameado, com intempéries e desafios.
              </p>
              <p>
                Aqueles que carregam este sinal estão em um tempo de formação, discernimento e amadurecimento espiritual. É um período exigente, mas profundamente fecundo, onde se aprende a confiar na Providência e a perseverar.
              </p>
              <p>
                Mesmo sem ver claramente o horizonte, já se percebe a beleza que há no alto. Como Pedro, na transfiguração do Senhor, o vocacionado é convidado a dizer:
                <i>“Senhor, é bom estarmos aqui!”</i> (Mt 17, 4).
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">Cordão Branco</h3>
              <p>
                O cordão branco simboliza o encontro com Jesus transfigurado. É sinal de quem, depois de romper com a escravidão do pecado e subir a montanha, encontrou no alto a luz de Cristo.
              </p>
              <p>
                Este sinal expressa o chamado à santidade, à vida de consagração e à doação total de si, vivendo no mundo, mas com o coração enraizado no Céu.
              </p>
              <p>
                Quem verdadeiramente encontrou Cristo não consegue mais guardar para si esta experiência. O chamado do consagrado é contemplar o Céu, mas descer da montanha e testemunhar. <b>Viver é anunciar. Anunciar é amar.</b>
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">Vocacional</h3>
              <p>
                A todos os membros da Comunidade cabe a missão de impulsionar, encorajar e ajudar os novos vocacionados a viverem esse caminho: romper com as correntes, subir a montanha e contemplar a transfiguração.
              </p>
              <p>
                E, mais do que isso, anunciar aos outros a beleza desse encontro transformador com Cristo.
              </p>
            </div>
          </div>
        </motion.div>


        {/* Nossa Mãe Amável + Atualmente lado a lado */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center md:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-red-600 mb-2">Nossa Mãe Amável</h2>
            <div className="flex flex-col items-center">
              <img
                src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746142183/maeamavel_srnvei.jpg"
                alt="Nossa Mãe Amável"
                className="rounded-xl w-full h-56 object-cover mt-4 mb-4"
                loading="lazy"
                onError={e => (e.currentTarget.src = "/fallback.jpg")}
              />
              <p className="text-zinc-800 text-justify">
                Entre os títulos de Nossa Senhora, a Comunidade a chama de <b>Mãe Amável</b>, refletindo nosso carisma de amor. Maria é exemplo de amor e devoção, intercedendo por nós e guiando-nos em nossa jornada de fé.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center md:w-1/2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-red-600 mb-2">Atualmente</h2>
            <div className="flex flex-col items-center">
              <img
                src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746142338/acampamento-hoje_ci0prc.jpg"
                alt="Atividades atuais da Comunidade Ágape"
                className="rounded-xl w-full h-56 object-cover mt-4 mb-4"
                loading="lazy"
                onError={e => (e.currentTarget.src = "/fallback.jpg")}
              />
              <p className="text-zinc-800 text-justify">
                Atualmente, nossa comunidade cresce e evolui mantendo-se fiel aos seus princípios fundadores. Continuamos a realizar missões, eventos comunitários e atividades de evangelização, sempre buscando inspirar e transformar vidas pelo amor de Cristo.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Seção Baluartes da Comunidade */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-red-600 mb-6">
            Baluartes da Comunidade
          </h2>
          <span className="block h-1 bg-red-600 w-24 mx-auto mb-8"></span>

          <div className="flex flex-col md:flex-row justify-center items-center gap-16 lg:gap-24">
            {/* Texto Santa Terezinha */}
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="text-center transform transition-transform hover:scale-105 duration-300"
            >
              <Link href="/sobre/santos/terezinha" className="block">
                <img
                  src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746142407/teresa_wtwvzp.jpg"
                  alt="Santa Terezinha"
                  className="w-full max-w-xs h-auto mx-auto mb-6 shadow-lg rounded-lg border-4 hover:border-yellow-500 transition-all duration-300"
                />
                <h3 className="text-3xl md:text-4xl font-semibold text-red-500 mb-4">
                  Santa Terezinha
                </h3>
                <p className="text-lg text-zinc-900 leading-relaxed max-w-lg mx-auto mb-4">
                  “A caridade é o caminho mais seguro e verdadeiro.” Conheça mais sobre nossa Baluarte!
                </p>
                <button className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300">
                  Saiba mais
                </button>
              </Link>
            </div>

            {/* Texto São Francisco */}
            <div
              data-aos="fade-left"
              data-aos-duration="1000"
              className="text-center transform transition-transform hover:scale-105 duration-300"
            >
              <Link href="/sobre/santos/francisco" className="block">
                <img
                  src="https://educasc.com.br/wp-content/uploads/2023/10/iStock-1499149822.jpg"
                  alt="São Francisco"
                  className="w-full max-w-xs h-auto mx-auto mb-6 shadow-lg rounded-lg border-4 hover:border-yellow-500 transition-all duration-300"
                />
                <h3 className="text-3xl md:text-4xl font-semibold text-red-500 mb-4">
                  São Francisco
                </h3>
                <p className="text-lg text-zinc-900 leading-relaxed max-w-lg mx-auto mb-4">
                  “Comece fazendo o que é necessário, depois o que é possível, em breve estarás fazendo o impossível!”
                </p>
                <button className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300">
                  Saiba mais
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Depoimentos - Swiper */}
        {typeof window !== "undefined" && (
          <>
            {/* Import Swiper only on client side to avoid SSR issues */}
            {(() => {
              require("swiper/css");
              require("swiper/css/pagination");
              return (
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  spaceBetween={30}
                  slidesPerView={1}
                  className="w-full max-w-2xl mx-auto mb-16"
                >
                  <SwiperSlide>
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                      <h2 className="text-2xl font-bold text-red-500 mb-4">Testemunhos</h2>
                      <p className="italic text-zinc-800 text-lg mb-4">
                        "A mais linda história de amor!...❤️ Aqui encontrei o amor verdadeiro,
                        amor de Deus, amor que não passa, que não muda, que não se altera, que
                        nada apaga... Que completa minha existência!"
                      </p>
                      <p className="font-bold text-red-500">Francielle Santana</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                      <p className="italic text-zinc-800 text-lg mb-4">
                        "Como sou realizado em fazer parte dessa história de amor ❤️. Aquele 9 de
                        maio de 2015 foi tão marcante que lembro cada momento: o acolhimento, a
                        oração, o seminário...❤️. Completo 9 anos de caminhada, ainda jovem aprendiz
                        nessa vocação tão linda. Agradeço a Deus pela minha eleição como discipulado I,
                        sinto-me realizado e feliz!! Sou_feliz_sou_ágape!!❤️"
                      </p>
                      <p className="font-bold text-red-500">Messias Jesus</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                      <p className="italic text-zinc-800 text-lg mb-4">
                        "Eu sou um dos muitos que podem testemunhar a mudança de vida, graças à
                        abertura de vcs à graça de Deus, a cada formador e pastores. Carrego comigo
                        todos os momentos vividos e cada formação. 🙏❤️ É nessa vocação que me sinto
                        feliz e realizado, e que eu possa sempre seguir a vontade de Deus dentro
                        dessa vocação."
                      </p>
                      <p className="font-bold text-red-500">Aquilles Silva</p>
                    </div>
                  </SwiperSlide>
                </Swiper>
              );
            })()}
          </>
        )}

        {/* Seção Final */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-center py-12"
        >
          <h2 className="text-4xl font-extrabold text-red-500 mb-6">
            Venha Conhecer a Comunidade Ágape
          </h2>
          <span className="block h-1 bg-red-500 w-24 mx-auto mb-8"></span>
          <p className="text-lg text-zinc-900 leading-relaxed mb-8">
            A Comunidade Ágape continua a crescer em amor e fé, acolhendo
            pessoas de todas as idades e contextos. Seja parte dessa missão de
            evangelização e descubra o poder transformador do amor de Deus em
            sua vida.
          </p>
          <Link href="/contato">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-red-500 text-zinc-900 text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600"
            >
              Entre em Contato
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
}
