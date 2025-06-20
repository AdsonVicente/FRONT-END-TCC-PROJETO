"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const BemVindo: React.FC = () => {
  return (
    <section className="hidden lg:flex relative py-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-16">
        {/* Texto */}
        <div className="lg:w-1/2 text-left font-serif">
          <h1 className="text-6xl font-extrabold text-red-800 leading-tight tracking-tight mb-6 drop-shadow-md">
            Bem-vindo à <br />
            <span className="text-yellow-600 italic underline decoration-red-500 decoration-4">
              Comunidade Católica Ágape
            </span>
          </h1>
          <p className="text-xl text-gray-800 max-w-lg mb-10 leading-relaxed">
            Vivemos e compartilhamos o amor de Deus, transformando vidas pela fé, serviço e comunhão. Junte-se a nós nessa missão de esperança!
          </p>

          {/* Botões */}
          <div className="flex gap-6">
            <Link
              href="/sobre"
              className="inline-flex items-center px-8 py-3 bg-red-700 text-white font-semibold rounded-full shadow-lg
                         hover:bg-red-800 hover:shadow-xl transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Quem Somos <FaArrowRight className="ml-3" />
            </Link>
            <Link
              href="/doe-aqui"
              className="inline-flex items-center px-8 py-3 border-2 border-red-700 text-red-700 font-semibold rounded-full
                         hover:bg-red-100 hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Fazer uma Doação
            </Link>
          </div>
        </div>

        {/* Ilustração */}
        <div className="lg:w-1/2 flex justify-center relative">
          <div className="rounded-xl overflow-hidden animate-float">
            <Image
              src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1745150137/oe2poj9xtudbt4dumeir.png"
              alt="Ilustração Comunidade Ágape"
              className="w-full max-w-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* Efeito de brilho suave no fundo */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full bg-gradient-radial from-yellow-200 via-transparent to-transparent opacity-20"></div>

    </section>
  );
};

export default BemVindo;
