
const Missoes: React.FC = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      {/* Aviso de Página em Construção */}
      <section className="pt-10 overflow-hidden bg-gray-50 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
                Agapé em Missões
                
              </h2>
              

              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 md:mt-8">
                <span className="relative inline-block">
                  <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900"></span>
                  <span className="relative"> Have a question? </span>
                </span>
                <br className="block sm:hidden" />
                Ask me on <a href="#" title="" className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline">Twitter</a>
              </p>
            </div>

            <div className="relative">
              <img className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />
              <img className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="/missoes.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Objetivos das Missões */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-red-400 text-center mb-4">Objetivos das Nossas Missões</h2>
        <ul className="text-gray-700 list-disc pl-5">
          <li>Levar a palavra de Deus a comunidades carentes</li>
          <li>Promover a inclusão e o amor cristão em ações concretas</li>
          <li>Fortalecer a fé através de encontros de oração e evangelização</li>
          <li>Auxiliar em projetos sociais e ações de caridade</li>
        </ul>
      </div>
 {/* Cards informativos (sem mudanças) */}
 <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
        <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
          <div className="order-1 sm:ml-6 xl:ml-0">
            <h3 className="mb-1 text-slate-900 font-semibold">
              <span className="mb-1 block text-sm leading-6 text-indigo-500">Headless UI</span>Completely unstyled, fully
              accessible UI components
            </h3>
            <div className="prose prose-slate prose-sm text-slate-600">
              <p>Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.</p>
            </div>
            <a
              className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
              href=""
            >
              Learn more
              <span className="sr-only">, Completely unstyled, fully accessible UI components</span>
              <svg
                className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
                width="3"
                height="6"
                viewBox="0 0 3 6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M0 0L3 3L0 6"></path>
              </svg>
            </a>
          </div>
          <img
            src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
            alt=""
            className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
            width="1216"
            height="640"
          />
        </li>
        {/* Outros cards podem ser adicionados conforme necessário */}
      </ul>
      {/* FAQ */}
      <div className="relative w-full bg-white px-6 pt-10 pb-8 mt-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10">
        <div className="mx-auto px-5">
          <div className="flex flex-col items-center">
            <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">FAQ</h2>
            <p className="mt-3 text-lg text-neutral-500 md:text-xl">Frequenty asked questions</p>
          </div>
          <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
            {/* Repetir o bloco de perguntas para FAQ */}
            <div className="py-5">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span>How does the billing work?</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-3 text-neutral-600">
                  Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services.
                </p>
              </details>
            </div>

            {/* Repetir o mesmo padrão para outras perguntas do FAQ */}

          </div>
        </div>
      </div>

      {/* Chamada para Contato */}
      <div className="p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-red-500 text-center mb-4">Chame-nos para Sua Missão!</h2>
        <p className="text-gray-700 mb-4 text-center">
          Se você deseja convidar nossa equipe para participar de uma missão ou quer saber mais sobre como podemos ajudar, entre em contato conosco!
        </p>
        <div className="text-center">
          <a href="mailto:contato@comunidadeagape.org" className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">
            Enviar e-mail
          </a>
        </div>
      </div>
    </div>
  );
};

export default Missoes;
