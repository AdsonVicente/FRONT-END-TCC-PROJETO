import React from "react";
import { Link } from "react-router-dom";

const WelcomeSection: React.FC = () => {
  return (
    <section className="hidden lg:block   sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex flex-col-reverse lg:flex-row gap-6 lg:gap-0 lg:flex-justify lg:flex">
        {/* Texto de Boas-vindas */}
        <div className="sm:text-center lg:text-left flex flex-col justify-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
            <span className="block xl:inline px-1">Bem-vindo à</span>
            <span className="block text-red-600 xl:inline">Comunidade Católica Ágape</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Nosso propósito é viver e compartilhar o amor de Deus, transformando vidas por meio da fé, do serviço e da
            comunhão. Junte-se a nós nessa missão!
          </p>
          {/* Botões de Ação */}
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link
                to="/historia"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
              >
                Saiba Mais
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link
                to="/contato"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Entre em Contato
              </Link>
            </div>
          </div>
          {/* Fim da Seção de Botões */}
        </div>

        {/* Seção da Imagem */}
        <div className="lg:w-1/2 my-4 lg:my-0 lg:inset-y-0 lg:right-0">
          <img
            className="h-56 w-full object-contain sm:h-72 md:h-96 lg:w-full lg:h-72"
            src="https://github.com/AdsonVicente/ImagensUrlDados/blob/main/logo.png?raw=true"
            alt="Logo da Comunidade Católica Ágape"
          />
        </div>
        {/* Fim da Seção da Imagem */}
      </div>
    </section>
  );
};

export default WelcomeSection;
