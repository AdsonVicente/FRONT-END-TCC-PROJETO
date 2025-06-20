
export default function SantaTerezinhaPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Imagem de Santa Terezinha */}
        <div className="text-center mb-12">
          <img
            src="https://github.com/AdsonVicente/ImagensUrlDados/blob/main/teresa.jpg?raw=true"
            alt="Santa Terezinha"
            className="w-full max-w-sm h-auto mx-auto mb-6 shadow-lg rounded-lg"
          />
          <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-800 uppercase tracking-wide mb-4">
            Santa Terezinha do Menino Jesus
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Santa Terezinha, também conhecida como Santa Teresinha do Menino Jesus e da Sagrada Face, foi uma freira carmelita francesa. Ela é conhecida por sua espiritualidade infantil e sua "Pequena Via" para a santidade.
          </p>
        </div>

        {/* Biografia de Santa Terezinha */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Biografia</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Santa Terezinha nasceu em 2 de janeiro de 1873, em Alençon, na França. Ela entrou no convento das carmelitas aos 15 anos de idade. Sua vida foi marcada pela simplicidade, humildade e amor pelas pequenas coisas.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ela é autora da autobiografia <span className="italic">História de uma Alma</span>, que documenta sua jornada espiritual. Santa Terezinha faleceu em 30 de setembro de 1897, aos 24 anos de idade, e foi canonizada em 1925 pelo Papa Pio XI.
          </p>
        </div>

        {/* Devoção e Oração */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Devoção e Oração</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Santíssima Trindade, Pai, Filho e Espírito Santo, eu vos agradeço todos os favores, todas as graças com que enriquecestes a alma de Vossa serva Santa Terezinha do Menino Jesus, durante os 24 anos que passou na terra; e pelos méritos de tão querida Santinha, concedei-me a graça que ardentemente Vos peço, se for conforme a Vossa Santíssima vontade e para salvação de minha alma (faça aqui o seu pedido).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Santa Terezinha, ajudai a minha fé e minha esperança, cumprindo mais uma vez vossa promessa de que ninguém Vos invocaria em vão, fazendo-me ganhar uma rosa, sinal de que alcançarei a graça solicitada. Reze 24 vezes em seguida: <span className="font-semibold">"Glória ao Pai, ao Filho e ao Espírito Santo. Assim como era no princípio, agora e sempre, por todos os séculos, amém. Santa Terezinha do Menino Jesus, rogai por nós."</span>
          </p>
          <p className="text-gray-700 leading-relaxed">
            Para encerrar, rezar uma Ave Maria e um Pai Nosso.
          </p>
        </div>

        {/* Importância para a Comunidade */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Importância para a Comunidade</h2>
          <p className="text-gray-700 leading-relaxed">
            Santa Terezinha é baluarte da comunidade para ser exemplo aos seus membros de que em tudo que fizeres, mesmo que pequeno seja a tarefa, o amor, zelo e cuidado deve ser praticado.
          </p>
        </div>
      </div>
    </div>
  );
}
