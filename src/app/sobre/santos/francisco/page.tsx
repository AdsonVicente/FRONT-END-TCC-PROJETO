import Image from "next/image";

export default function SaoFranciscoPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <section className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Header */}
        <header className="flex flex-col items-center mb-10">
          <Image
            src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1750274315/sao_francisco_de_assis-2021-772891_g3sypl.jpg"
            alt="São Francisco de Assis"
            width={320}
            height={400}
            className="rounded-xl shadow-lg mb-6 object-cover"
            priority
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 uppercase tracking-wide text-center">
            São Francisco de Assis
          </h1>
          <span className="mt-2 text-lg text-gray-600 font-medium tracking-wide">
            Nosso Baluarte
          </span>
        </header>

        {/* Biografia */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-amber-400 pl-3">
            Biografia
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Francisco nasceu em Assis, na Úmbria (Itália) em 1182. Jovem orgulhoso, vaidoso e rico, que se tornou o mais italiano dos santos e o mais santo dos italianos. Com 24 anos, renunciou a toda riqueza para desposar a “Senhora Pobreza”.
            </p>
            <p>
              Aconteceu que Francisco foi para a guerra como cavaleiro, mas doente ouviu e obedeceu a voz do Patrão que lhe dizia: “Francisco, a quem é melhor servir, ao amo ou ao criado?”. Ele respondeu que ao amo. “Porque, então, transformas o amo em criado?”, replicou a voz.
            </p>
            <p>
              No início de sua conversão, foi como peregrino a Roma, vivendo como eremita e na solidão, quando recebeu a ordem do Santo Cristo na igrejinha de São Damião: “Vai restaurar minha igreja, que está em ruínas”. Partindo em missão de paz e bem, seguiu com perfeita alegria o Cristo pobre, casto e obediente.
            </p>
            <p>
              No campo de Assis havia uma ermida de Nossa Senhora chamada Porciúncula. Este foi o lugar predileto de Francisco e dos seus companheiros, pois na Primavera do ano de 1200 já não estava só; tinham-se unido a ele alguns valentes que pediam também esmola, trabalhavam no campo, pregavam, visitavam e consolavam os doentes.
            </p>
            <p>
              A partir daí, Francisco dedica-se a viagens missionárias: Roma, Chipre, Egito, Síria… Peregrinando até aos Lugares Santos. Quando voltou à Itália, em 1220, encontrou a Fraternidade dividida. Parte dos Frades não compreendia a simplicidade do Evangelho.
            </p>
            <p>
              Em 1223, foi a Roma e obteve a aprovação mais solene da Regra, como ato culminante da sua vida. Na última etapa de sua vida, recebeu no Monte Alverne os estigmas de Cristo, em 1224. Já enfraquecido por tanta penitência e cego por chorar pelo amor que não é amado, São Francisco de Assis, na igreja de São Damião, encontra-se rodeado pelos seus filhos espirituais e assim, recita ao mundo o cântico das criaturas.
            </p>
            <p>
              O seráfico pai, São Francisco de Assis, retira-se então para a Porciúncula, onde morre deitado nas humildes cinzas a 3 de outubro de 1226. Passados dois anos incompletos, a 16 de julho de 1228, o Pobrezinho de Assis era canonizado por Gregório IX. São Francisco de Assis, rogai por nós!
            </p>
          </div>
        </section>

        {/* Devoção e Oração */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-amber-400 pl-3">
            Devoção e Oração
          </h2>
          <p className="text-gray-700 mb-4">
            Rezemos juntos a oração de São Francisco:
          </p>
          <blockquote className="bg-white border-l-4 border-amber-400 p-4 rounded-lg shadow text-gray-800 whitespace-pre-line font-medium">
            Senhor, fazei de mim um instrumento da Vossa paz.
            Onde houver ódio, que eu leve o amor.
            Onde houver ofensa, que eu leve o perdão.
            Onde houver discórdia, que eu leve a união.
            Onde houver dúvidas, que eu leve a fé.
            Onde houver erro, que eu leve a verdade.
            Onde houver desespero, que eu leve a esperança.
            Onde houver tristeza, que eu leve a alegria.
            Onde houver trevas, que eu leve a luz.
            Ó Mestre, fazei que eu procure mais:
            consolar, que ser consolado;
            compreender, que ser compreendido;
            amar, que ser amado.
            Pois é dando que se recebe.
            É perdoando que se é perdoado.
            E é morrendo que se vive para a vida eterna.
          </blockquote>
        </section>

        {/* Importância para a Comunidade */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-amber-400 pl-3">
            Importância para a Comunidade
          </h2>
          <p className="text-gray-700 leading-relaxed">
            São Francisco é baluarte da Comunidade para ensinar aos seus membros sobre a pobreza e a necessidade de despojamento.
          </p>
        </section>
      </section>
    </main>
  );
}
