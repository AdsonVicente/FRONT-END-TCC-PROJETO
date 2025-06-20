"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Head from "next/head";
import Image from "next/image";

const quiz = [
  {
    question: "O que Jesus nos ensinou?",
    options: ["Brigar com os outros", "Amar o próximo", "Guardar brinquedos"],
    answer: "Amar o próximo",
  },
  {
    question: "O que é rezar?",
    options: ["Conversar com Deus", "Correr na rua", "Brincar de pique-esconde"],
    answer: "Conversar com Deus",
  },
  {
    question: "Quem é nosso amigo do céu?",
    options: ["Agapinho", "Papai Noel", "Jesus"],
    answer: "Jesus",
  },
  {
    question: "Qual é o livro que fala sobre Deus?",
    options: ["Revista", "Bíblia", "Dicionário"],
    answer: "Bíblia",
  },
  {
    question: "Quem é a mãe de Jesus?",
    options: ["Maria", "Ana", "Eva"],
    answer: "Maria",
  },
  {
    question: "Onde Jesus nasceu?",
    options: ["Jerusalém", "Belém", "Nazaré"],
    answer: "Belém",
  },
  {
    question: "Qual é o dia do Senhor?",
    options: ["Segunda-feira", "Domingo", "Sábado"],
    answer: "Domingo",
  },
  {
    question: "Com quem devemos dividir nossos brinquedos?",
    options: ["Com ninguém", "Com os amigos", "Com adultos apenas"],
    answer: "Com os amigos",
  },
  {
    question: "O que é o amor?",
    options: ["Um sentimento feio", "Brincar sozinho", "Cuidar dos outros com carinho"],
    answer: "Cuidar dos outros com carinho",
  },
  {
    question: "Quem criou o mundo?",
    options: ["Deus", "Os homens", "Os animais"],
    answer: "Deus",
  },
  {
    question: "Quem foi colocado na arca para se salvar do dilúvio?",
    options: ["Moisés", "Noé", "Abraão"],
    answer: "Noé",
  },
  {
    question: "O que devemos fazer antes de comer?",
    options: ["Brincar", "Cantar", "Agradecer a Deus"],
    answer: "Agradecer a Deus",
  },
  {
    question: "O que Jesus fez por nós na cruz?",
    options: ["Dormiu", "Cantou", "Morreu por amor"],
    answer: "Morreu por amor",
  },
  {
    question: "O que é pecado?",
    options: ["Fazer coisas boas", "Desobedecer a Deus", "Ajudar os outros"],
    answer: "Desobedecer a Deus",
  },
  {
    question: "Quem é o Papa?",
    options: ["Um jogador", "Um cantor", "O líder da Igreja"],
    answer: "O líder da Igreja",
  },
  {
    question: "O que fazemos na missa?",
    options: ["Corremos", "Rezamos e louvamos a Deus", "Dormimos"],
    answer: "Rezamos e louvamos a Deus",
  },
  {
    question: "Como devemos tratar as pessoas?",
    options: ["Com respeito", "Com gritos", "Com ignorância"],
    answer: "Com respeito",
  },
];

interface Result {
  name: string;
  score: number;
  date: string;
}

export default function AgapinhoQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [childName, setChildName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [history, setHistory] = useState<Result[]>([]);
  const [answerFeedback, setAnswerFeedback] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("agapinho-history");
      if (stored) setHistory(JSON.parse(stored));
    }
  }, []);

  const handleAnswer = (option: string) => {
    const isCorrect = option === quiz[current].answer;
    setAnswerFeedback(isCorrect ? "correct" : "wrong");
    setTimeout(() => {
      setAnswerFeedback(null);
      const newScore = isCorrect ? score + 1 : score;
      const newSelected = [...selectedAnswers, option];
      setSelectedAnswers(newSelected);
      setScore(newScore);

      const next = current + 1;
      if (next < quiz.length) {
        setCurrent(next);
      } else {
        setShowResult(true);
        const newResult: Result = {
          name: childName,
          score: newScore,
          date: new Date().toLocaleDateString(),
        };
        const updatedHistory = [newResult, ...history.slice(0, 9)];
        setHistory(updatedHistory);
        if (typeof window !== "undefined") {
          localStorage.setItem("agapinho-history", JSON.stringify(updatedHistory));
        }
      }
    }, 700);
  };

  const goBack = () => {
    if (current > 0) {
      const prev = current - 1;
      const wasCorrect = selectedAnswers[prev] === quiz[prev].answer;
      if (wasCorrect) setScore(score - 1);
      setSelectedAnswers(selectedAnswers.slice(0, prev));
      setCurrent(prev);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswers([]);
    setQuizStarted(false);
    setChildName("");
    setAnswerFeedback(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 px-4 py-8 font-[Comic Sans MS,Comic Sans,cursive]">
      <Head>
        <title>Agapinho - Quiz</title>
      </Head>


      <h1 className="text-3xl md:text-4xl font-extrabold text-pink-600 mb-2 drop-shadow-lg tracking-tight text-center">
        Quiz do Agapinho
      </h1>

      {!quizStarted ? (
        <div className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border-4 border-yellow-300 animate-fade-in">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Vamos brincar?</h2>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full mb-4 px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none text-lg"
          />
          <button
            onClick={() => childName && setQuizStarted(true)}
            className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white px-8 py-3 rounded-2xl text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200"
            disabled={!childName}
          >
            Começar!
          </button>
        </div>
      ) : !showResult ? (
        <div className={`relative bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border-4 border-blue-200 animate-fade-in`}>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <span className="bg-yellow-300 text-pink-700 px-4 py-1 rounded-full font-bold shadow-md text-lg">
              Pergunta {current + 1} / {quiz.length}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Descubra com o Agapinho!</h2>
          <p className="text-lg font-medium text-pink-800 mb-6 animate-fade-in">{quiz[current].question}</p>
          <div className="space-y-4 mb-6">
            {quiz[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => !answerFeedback && handleAnswer(opt)}
                className={`
                  w-full py-3 px-4 rounded-2xl text-lg font-bold shadow-md transition-all duration-200
                  border-2 border-pink-200
                  ${answerFeedback && opt === quiz[current].answer
                    ? "bg-green-300 text-green-900 scale-105 animate-pop"
                    : answerFeedback && selectedAnswers.length === current && opt === selectedAnswers[current]
                      ? "bg-red-300 text-red-900 animate-shake"
                      : "bg-pink-100 text-pink-900 hover:bg-yellow-200 hover:scale-105"
                  }
                  ${answerFeedback ? "cursor-not-allowed" : ""}
                `}
                disabled={!!answerFeedback}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <button
              onClick={goBack}
              disabled={current === 0 || !!answerFeedback}
              className={`flex items-center gap-2 text-md px-4 py-2 rounded-xl border-2 font-bold shadow
                ${current === 0 || !!answerFeedback
                  ? "text-gray-400 border-gray-200 bg-gray-100"
                  : "text-blue-700 border-blue-300 bg-blue-100 hover:bg-blue-200 hover:scale-105"
                } transition-all`}
            >
              <ArrowLeft size={18} />
              Voltar
            </button>
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 text-md px-4 py-2 rounded-xl border-2 text-yellow-700 border-yellow-300 bg-yellow-100 hover:bg-yellow-200 hover:scale-105 font-bold shadow transition-all"
            >
              <RefreshCw size={18} />
              Reiniciar
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-md border-4 border-green-200 animate-fade-in">
          <h2 className="text-2xl font-extrabold text-green-700 mb-4 animate-pop">
            Parabéns, {childName}!
          </h2>
          <p className="text-lg text-pink-800 mb-4">
            Você acertou <strong>{score}</strong> de <strong>{quiz.length}</strong> perguntas!
          </p>
          <Image
            src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746490573/agapinho_al2g4t.png"
            alt="Agapinho feliz"
            className="w-32 mx-auto mb-4 animate-bounce"
          />
          <p className="text-md text-pink-600 mb-4">
            {score === quiz.length ? (
              <>Uau! Você acertou tudo! Que alegria ver seu conhecimento sobre o amor de Deus crescendo sempre mais!</>
            ) : score >= quiz.length / 2 ? (
              <>Muito bem! Você acertou mais da metade. Continue aprendendo e crescendo no amor de Deus!</>
            ) : (
              <>Não desanime! Aprender é uma caminhada. Continue tentando e pedindo a ajuda de Deus. Estamos torcendo por você!</>
            )}
          </p>
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-green-400 to-blue-400 text-white py-3 px-8 rounded-2xl text-xl font-bold shadow-lg hover:scale-105 transition-all"
          >
            Jogar novamente
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-white/80 mt-10 p-6 rounded-2xl shadow-md w-full max-w-md border-2 border-pink-200 animate-fade-in">
          <h3 className="text-lg font-bold text-pink-700 mb-4">Histórico de Resultados</h3>
          <ul className="space-y-2 text-left text-md text-gray-700">
            {history.map((entry, i) => (
              <li key={i} className="flex justify-between">
                <span className="font-bold text-blue-700">{entry.name}</span>
                <span>
                  <span className="font-bold text-green-700">{entry.score}</span>/{quiz.length} - <span className="text-gray-500">{entry.date}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes pop {
          0% { transform: scale(1); }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .animate-pop { animation: pop 0.5s; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.4s; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 0.6s; }
      `}</style>
    </div>
  );
}
