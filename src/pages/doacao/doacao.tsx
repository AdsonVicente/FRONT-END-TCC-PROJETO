import React from "react";

const Doacao: React.FC = () => {
  const chavePix = "79999504661"; // Sua chave Pix aqui

  return (
    <div className="flex flex-col items-center min-h-screen p-5 ">
      <div className="bg-white p-8 w-full max-w-3xl space-y-6 ">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Ajude-nos a Evangelizar
        </h1>
        <p className="text-lg text-gray-700 mt-2 text-center">
          Sua contribuição é fundamental para nossa missão. Cada doação nos
          ajuda a espalhar a palavra e a promover ações que transformam vidas.
        </p>

        {/* Pix Key Section */}
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Chave Pix
          </h2>
          <p className="text-xl font-bold text-gray-900">{chavePix}</p>
          <p className="mt-2 text-sm text-gray-600">
            Utilize a chave acima para realizar sua doação via Pix. Agradecemos
            por sua generosidade!
          </p>
        </div>

        {/* Visit Us Section */}
        <section className="py-12">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Venha nos Visitar
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Nossa Localização
            </p>
          </div>
          <div className="mt-10">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.954186996642!2d-38.006544153571376!3d-11.188482908142564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x711b299756ed9d1%3A0xa5eaad84906cd6e1!2sLivraria%20Kair%C3%B3s!5e0!3m2!1spt-BR!2sbr!4v1717409274064!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                frameBorder="0"
                aria-hidden="false"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg leading-6 font-medium text-gray-900">
                Largo Glicério Siqueira, 248 - Tobias Barreto, SE, 49300-000
              </p>
              <p className="mt-1 text-lg leading-6 text-gray-500">
                📧 @comunidadecatolicaagape
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Doacao;
