import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Historia() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="mx-auto">
      {/* Container principal */}
      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
        {/* Component */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {/* Seção Origem e Fundação / Expansão e Reconhecimento */}
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="md:w-1/2 flex flex-col justify-center"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                Origem e Fundação
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Quem podia imaginar que uma tarde ensolarada no dia 10 de abril
                de 2004, em um colégio em Tobias Barreto, SE, transformaria
                gerações, vidas de pessoas e famílias? Cleverson Silva,
                ex-missionário da Comunidade Shalom, retornou à sua cidade natal
                e ficou chocado ao perceber que havia poucos jovens participando
                da Santa Missa. Inquieto e angustiado com a situação, procurou o
                Monsenhor local para ajudar a resgatar a juventude da cidade.
              </p>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="1000"
              className="md:w-1/2 flex flex-col justify-center"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                Expansão e Reconhecimento
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Com o tempo, o Projeto Nova Juventude evoluiu para Movimento
                Ágape, deixando de ser apenas um projeto local em Tobias Barreto
                para se tornar uma força que impactou diversas comunidades,
                cidades e estados. Na celebração de 10 anos, o fundador
                Cleverson recebeu o reconhecimento de Gilberto, coordenador das
                Novas Comunidades Internacionais, que confirmou que o carisma do
                grupo era de uma Nova Comunidade.
              </p>
            </div>
          </div>

          {/* Seção Sinal */}
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="md:w-1/2"
            >
              <img
                src="https://github.com/AdsonVicente/ImagensUrlDados/blob/main/WhatsApp%20Image%202024-08-18%20at%2020.53.56(1).jpeg?raw=true"
                alt="Missões"
                className="w-full h-72 object-cover rounded-lg shadow-lg border border-gray-200"
              />
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="1000"
              className="md:w-1/2 flex flex-col justify-center"
            >
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                Sinal
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                O coração da Comunidade Ágape bate na presença de Jesus
                Eucarístico. A Eucaristia é o centro de nossa devoção,
                lembrando-nos diariamente do sacrifício redentor de Cristo e
                inspirando-nos em nossa missão de amor e evangelização.
              </p>
            </div>
          </div>

          {/* Seção Nossa Mãe Amável */}
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="md:w-1/2"
            >
              <img
                src="https://github.com/AdsonVicente/ImagensUrlDados/blob/main/maeamavel.jpg?raw=true"
                alt="Nossa Mãe Amável"
                className="w-full h-72 object-cover rounded-lg shadow-lg border border-gray-200"
              />
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="1000"
              className="md:w-1/2 flex flex-col justify-center"
            >
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                Nossa Mãe Amável
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Entre os títulos de Nossa Senhora, a Comunidade a chama de Mãe
                Amável, refletindo nosso carisma de amor. Maria é exemplo de
                amor e devoção, intercedendo por nós e guiando-nos em nossa
                jornada de fé.
              </p>
            </div>
          </div>

          {/* Seção Hoje */}
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="md:w-1/2 flex flex-col justify-center"
            >
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                Hoje
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Atualmente, nossa comunidade cresce e evolui mantendo-se fiel
                aos seus princípios fundadores. Continuamos a realizar missões,
                eventos comunitários e atividades de evangelização, sempre
                buscando inspirar e transformar vidas pelo amor de Cristo.
              </p>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="1000"
              className="md:w-1/2"
            >
              <img
                src="https://github.com/AdsonVicente/ImagensUrlDados/blob/main/acampamento-hoje.jpg?raw=true"
                alt="Hoje"
                className="w-full h-72 object-cover rounded-lg shadow-lg border border-gray-200"
              />
            </div>
          </div>

          {/* Seção Baluartes da Comunidade */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              Baluartes da Comunidade
            </h2>
            <span className="block h-1 bg-orange-500 w-24 mx-auto mb-8"></span>

            <div className="flex flex-col md:flex-row justify-center items-center gap-16 lg:gap-24">
              {/* Texto Santa Terezinha */}
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="text-center"
              >
                <img
                  src="https://github.com/AdsonVicente/ImagensUrlDados/blob/main/teresa.jpg?raw=true"
                  alt="Santa Terezinha"
                  className="w-full max-w-xs h-auto mx-auto mb-6 shadow-lg rounded-lg"
                />
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                  Santa Terezinha
                </h3>
                <Link to="/terezinha">
                  <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
                    Conheça mais sobre Nossa Baluarte
                  </p>
                </Link>
              </div>

              {/* Texto São Francisco */}
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="text-center"
              >
                <img
                  src="https://www.sistemapositivo.com.br/wp-content/uploads/2021/07/sao_francisco_de_assis-2.jpg"
                  alt="São Francisco"
                  className="w-full max-w-xs h-auto mx-auto mb-6 shadow-lg rounded-lg"
                />
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                  São Francisco
                </h3>
                <Link to="/francisco">
                  <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
                    Conheça mais sobre Nosso Baluarte
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Seção Testemunhos */}
          <div data-aos="fade-up" data-aos-duration="1000">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
                Testemunhos
                <span className="block h-1 bg-orange-500 w-24 mx-auto mt-4"></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-600 mb-4">
                    "A mais linda história de amor!...❤️Aqui encontrei o amor
                    verdadeiro, amor de Deus, amor que não passa, que não muda,
                    que não se altera, que nada apaga... Que completa minha
                    existência! "
                  </p>
                  <p className="font-semibold text-gray-800">
                    Francielle Santana
                  </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-600 mb-4">
                    "Como sou realizado em fazer parte dessa história de amor
                    ❤️. Aquele 9 de maio de 2015 foi tão marcante que lembro
                    cada momento: o acolhimento, a oração, o seminário..❤️.
                    Completo 9 anos de caminhada, ainda jovem aprendiz nessa
                    vocação tão linda Agradeço a Deus pela minha eleição como
                    discipulado I , sinto-me realizado e feliz !!
                    Sou_feliz_sou_ágape!!❤️"
                  </p>
                  <p className="font-semibold text-gray-800">Messias Jesus</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-600 mb-4">
                    "eu sou um dos muitos que podem testemunhar a mudança de
                    vida, graças a abertura de vcs a graça de Deus, a cada
                    formador e pastores ccarrego comigo todos os momentos
                    vividos e cada formação.?🏻❤️ É nessa vocação que eu me
                    sinto feliz e realizado, e que eu possa sempre seguir a
                    vontade de Deus dentro dessa vocação"
                  </p>
                  <p className="font-semibold text-gray-800">Aquilles Silva</p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção Final */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-center py-12"
          >
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              Venha Conhecer a Comunidade Ágape
            </h2>
            <span className="block h-1 bg-orange-500 w-24 mx-auto mb-8"></span>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              A Comunidade Ágape continua a crescer em amor e fé, acolhendo
              pessoas de todas as idades e contextos. Seja parte dessa missão de
              evangelização e descubra o poder transformador do amor de Deus em
              sua vida.
            </p>
            <Link to="/contato">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-orange-600"
              >
                Entre em Contato
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
