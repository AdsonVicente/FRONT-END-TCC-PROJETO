"use client";

import Image from 'next/image';

export default function SantaTerezinhaPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Imagem de Santa Terezinha */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="https://raw.githubusercontent.com/AdsonVicente/ImagensUrlDados/main/teresa.jpg"
              alt="Imagem de Santa Terezinha do Menino Jesus"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-800 uppercase tracking-wide mb-4">
            Santa Terezinha do Menino Jesus
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Santa Terezinha, também conhecida como Santa Teresinha do Menino Jesus e da Sagrada Face, foi uma freira carmelita francesa. Ela é conhecida por sua espiritualidade infantil e sua &quot;Pequena Via&quot; para a santidade.
          </p>
        </section>

        {/* Biografia */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Biografia</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Santa Terezinha nasceu em <strong>2 de janeiro de 1873</strong>, em Alençon, na França. Ela entrou no convento das carmelitas aos <strong>15 anos de idade</strong>. Sua vida foi marcada pela simplicidade, humildade e amor pelas pequenas coisas.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ela é autora da autobiografia <span className="italic">&quot;História de uma Alma&quot;</span>, que documenta sua jornada espiritual. Santa Terezinha faleceu em <strong>30 de setembro de 1897</strong>, aos <strong>24 anos de idade</strong>, e foi canonizada em <strong>1925</strong> pelo Papa Pio XI.
          </p>
        </section>

        {/* Devoção e Oração */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Devoção e Oração</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço todos os favores, todas as graças com que enriquecestes a alma de Vossa serva Santa Terezinha do Menino Jesus, durante os 24 anos que passou na terra; e pelos méritos de tão querida Santinha, concedei-me a graça que ardentemente Vos peço, se for conforme a Vossa Santíssima vontade e para salvação de minha alma <em>(faça aqui o seu pedido)</em>.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Santa Terezinha, ajudai a minha fé e minha esperança, cumprindo mais uma vez vossa promessa de que ninguém Vos invocaria em vão, fazendo-me ganhar uma rosa, sinal de que alcançarei a graça solicitada.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Reze 24 vezes em seguida:
          </p>
          <p className="text-blue-800 font-semibold leading-relaxed mb-4">
            &quot;Glória ao Pai, ao Filho e ao Espírito Santo. Assim como era no princípio, agora e sempre, por todos os séculos. Amém. Santa Terezinha do Menino Jesus, rogai por nós.&quot;
          </p>
          <p className="text-gray-700 leading-relaxed">
            Para encerrar, rezar uma <strong>Ave Maria</strong> e um <strong>Pai Nosso</strong>.
          </p>
        </section>

        {/* Importância para a Comunidade */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Importância para a Comunidade</h2>
          <p className="text-gray-700 leading-relaxed">
            Santa Terezinha é baluarte da nossa comunidade, sendo exemplo para seus membros de que em tudo que fizermos, mesmo que pequena seja a tarefa, o amor, o zelo e o cuidado devem ser praticados. Sua &quot;Pequena Via&quot; nos inspira a buscar a santidade nas pequenas coisas do dia a dia.
          </p>
        </section>

      </div>
    </div>
  );
}
