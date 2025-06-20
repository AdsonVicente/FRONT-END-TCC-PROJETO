"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type Card = {
  id: number;
  name: string;
  img: string;
  link?: string;
};

const initialCards: Card[] = [
  {
    id: 1,
    name: "Jesus",
    img: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1747791088/WhatsApp_Image_2025-05-16_at_22.58.33_a43hap.jpg",
  },
  {
    id: 2,
    name: "Cruz",
    img: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746911402/ChatGPT_Image_10_de_mai._de_2025_18_09_28_lex1ym.png",
  },
  {
    id: 3,
    name: "Bíblia",
    img: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1747791087/WhatsApp_Image_2025-05-16_at_22.58.32_2_vci2cd.jpg",
  },
  {
    id: 4,
    name: "Agape",
    img: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1747791088/WhatsApp_Image_2025-05-16_at_22.58.32_ggnncp.jpg",
  },
  {
    id: 5,
    name: "Agapinho",
    img: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1747791087/WhatsApp_Image_2025-05-16_at_22.58.33_1_vbmk48.jpg",
  },
  {
    id: 6,
    name: "Virgem Maria",
    img: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1747791087/WhatsApp_Image_2025-05-16_at_22.58.32_1_tzbrtf.jpg",
  },
];

type CardWithUUID = Card & { uuid: number };

const shuffleCards = (): CardWithUUID[] => {
  const doubled = [...initialCards, ...initialCards];
  return doubled
    .map((card) => ({ ...card, uuid: Math.random() }))
    .sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState<CardWithUUID[]>(shuffleCards());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [canPlayAudio, setCanPlayAudio] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].name === cards[second].name) {
        setMatched((prev) => [...prev, cards[first].name]);
      }
      setTimeout(() => setFlipped([]), 900);
    }
  }, [flipped, cards]);

  useEffect(() => {
    setCanPlayAudio(true);
  }, []);

  useEffect(() => {
    if (matched.length === initialCards.length && canPlayAudio) {
      const audio = new Audio("/sounds/parabens.mp3");
      audio.play();
    }
  }, [matched, canPlayAudio]);

  const handleClick = (index: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(cards[index].name)
    )
      return;
    setFlipped([...flipped, index]);
  };

  const resetGame = () => {
    setCards(shuffleCards());
    setMatched([]);
    setFlipped([]);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-4 relative overflow-x-hidden">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-4 drop-shadow-lg animate-bounce">
        Jogo da Memória
      </h1>
      <p className="mb-6 text-lg text-blue-700 font-semibold text-center max-w-xl">
        Encontre todos os pares! Clique nas cartas para revelar imagens de fé e alegria!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mb-6">
        {cards.map((card, index) => {
          const isFlipped =
            flipped.includes(index) || matched.includes(card.name);
          return (
            <button
              key={card.uuid}
              className="w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-48 perspective focus:outline-none group"
              onClick={() => handleClick(index)}
              aria-label={isFlipped ? card.name : "Carta virada"}
              tabIndex={isFlipped ? -1 : 0}
              disabled={isFlipped}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""
                  }`}
              >
                {/* Card Back */}
                <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center bg-gradient-to-br from-yellow-300 via-pink-200 to-blue-200 rounded-2xl shadow-xl border-4 border-pink-300 group-hover:scale-105 transition-transform">
                  <span className="text-5xl animate-spin-slow">🎁</span>
                  <span className="text-lg font-bold text-pink-600 mt-2">?</span>
                </div>
                {/* Card Front */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl border-4 border-blue-200">
                  <Image
                    src={card.img}
                    alt={card.name}
                    width={80}
                    height={80}
                    className="rounded-xl object-contain drop-shadow-lg"
                  />
                  <span className="mt-2 text-base font-bold text-blue-700 drop-shadow">{card.name}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {matched.length === initialCards.length && (
        <div className="mt-6 p-6 bg-green-200 rounded-2xl shadow-xl text-green-900 text-lg font-bold flex flex-col items-center animate-fade-in">
          <Image
            src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746490573/agapinho_al2g4t.png"
            alt="Agapinho Parabenizando"
            width={120}
            height={120}
            className="mb-2 animate-bounce"
          />
          <p className="text-center">
            Parabéns! Você encontrou todos os pares! Jesus está muito feliz com você! 🌟
          </p>
        </div>
      )}
      <button
        onClick={resetGame}
        className="mt-8 px-6 py-3 bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 hover:from-yellow-400 hover:to-blue-400 rounded-xl text-pink-800 font-extrabold shadow-lg border-2 border-pink-400 transition-all duration-300 animate-wiggle"
      >
        Jogar Novamente
      </button>
      {/* Efeitos decorativos */}
      <div className="absolute left-0 top-0 w-32 h-32 bg-pink-200 rounded-full opacity-40 blur-2xl animate-float" />
      <div className="absolute right-0 bottom-0 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl animate-float2" />
    </main>
  );
}

// Adicione ao seu globals.css ou tailwind.config.js para as animações extras:
