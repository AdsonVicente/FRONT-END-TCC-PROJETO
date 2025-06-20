// /src/app/contato/page.tsx
import ContactForm from "./ContatoFormulario";

export const metadata = {
  title: "Contato - Ágape",
  description: "Página de contato da Comunidade Católica Ágape.",
};

const faqs: { question: string; answer: string }[] = [
  {
    question: "Onde está localizada a Comunidade Católica Àgape?",
    answer:
      "A Comunidade Católica Àgape está localizada em Tobias Barreto, Sergipe, no coração do nosso querido estado.",
  },
  {
    question:
      "Qual é o principal evento realizado pela nossa comunidade católica?",
    answer:
      "Nosso principal evento é o acampamento espiritual anual. Este evento oferece momentos profundos de oração, reflexão e convivência, sendo uma oportunidade para fortalecer nossa fé e criar laços.",
  },
  {
    question: "Quais são as atividades oferecidas para crianças e jovens?",
    answer:
      "Oferecemos catequese para crianças, grupos de jovens e diversas atividades recreativas. Estas iniciativas ajudam na formação espiritual e moral dos jovens, preparando-os para viver os valores cristãos.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto py-8 px-4 md:px-8">
        <div className="flex flex-wrap justify-between">
          <ContactForm />
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Perguntas Frequentes
            </h2>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <details className="group">
                  <summary className="flex items-center justify-between w-full rounded-md py-2 px-4 text-left cursor-pointer">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {faq.question}
                    </h3>
                  </summary>
                  <p className="text-gray-700 mt-2">{faq.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Visite-nos
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
                frameBorder={0}
                aria-hidden="false"
                title="Mapa da Comunidade Católica Ágape"
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
        </div>
      </section>
    </div>
  );
}
