// app/radio/page.tsx

import Head from "next/head";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import FullRadioPlayer from "./PlayerPagina";
import React from "react";
import ProgramacaoSemanal from "./programacao";

const programacao = [
  {
    dia: "Segunda-feira",
    horarios: ["09:00 - Bom dia Agape", "14:00 - tarde de Fé", "18:00 - Terço Mariano", "19:00 - Noite de Louvor"],
  },
  {
    dia: "Terça-feira",
    horarios: ["09:00 - Bom dia Agape", "14:00 - tarde de Fé", "18:00 - Terço Mariano", "19:00 - Noite de Louvor"],
  },
  {
    dia: "Quarta-feira",
    horarios: ["09:00 - Bom dia Agape", "14:00 - tarde de Fé", "18:00 - Terço Mariano", "19:00 - Noite de Louvor"],
  },
  {
    dia: "Quinta-feira",
    horarios: ["09:00 - Bom dia Agape", "14:00 - tarde de Fé", "18:00 - Terço Mariano", "19:00 - Noite de Louvor"],
  },
  {
    dia: "Sexta-feira",
    horarios: ["09:00 - Bom dia Agape", "14:00 - tarde de Fé", "18:00 - Terço Mariano", "19:00 - Noite de Louvor"],
  },
  {
    dia: "Sábado",
    horarios: ["08:30 - Novas Comunidades"],
  },
  {
    dia: "Domingo",
    horarios: ["08:00 - Agape kids", "10:00 - Dia do Senhor"],
  },
];

const daysOfWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function getTodayDayName() {
  const today = new Date().getDay();
  return daysOfWeek[today];
}

export default function RadioPage({
  searchParams,
}: {
  searchParams?: { dia?: string };
}) {
  // Pega o dia selecionado da query string, ou o dia atual
  const selectedDay = searchParams?.dia && daysOfWeek.includes(searchParams.dia)
    ? searchParams.dia
    : getTodayDayName();

  const programacaoSelecionada = programacao.find((p) => p.dia === selectedDay);

  // Função para atualizar o dia na URL (sem usar useState)
  function handleSelectDay(dia: string) {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("dia", dia);
      window.location.href = url.toString();
    }
  }

  // Dummy data for aside iframes (since src and title are referenced)
  const asideIframes = [
    {
      src: "https://www.youtube.com/embed/live_stream?channel=UCs9-K-QajDGH7r-YjUmQoaA&autoplay=1",
      title: "Live da Rádio Ágape",
    },
    {
      src: 'https://www.youtube.com/embed/rC4jNeCoC_E?si=0JlxwjhZojuePS0C'
    },
    {
      src: 'https://www.youtube.com/embed/hG4Tb9U7Lh0?si=596Wrvzo39W2VHre"'
    }
    // Add more iframes here if needed
  ];

  return (
    <>
      <Head>
        <title>🎙️ Rádio Ágape Ao Vivo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col lg:flex-row font-serif">
        <main className="w-full lg:w-3/4 p-4 sm:p-8">
          <header className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-red-800 mb-2">🎙️ Rádio Ágape Ao Vivo</h1>
            <p className="text-gray-600 text-lg">Sintonize a palavra, a música e a fé em qualquer lugar!</p>
          </header>
          <div className="mb-8">
            <FullRadioPlayer />
          </div>
          <section className="mb-8 shadow-lg rounded-lg overflow-hidden border border-red-300" aria-label="Player da transmissão ao vivo no YouTube">
            <div className="relative w-full h-56 sm:h-[450px]">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/live_stream?channel=UCs9-K-QajDGH7r-YjUmQoaA&autoplay=1"
                title="Live da Rádio Ágape"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="bg-red-700 text-white p-3 text-center font-semibold tracking-wide">
              Ao Vivo — Sintonize agora
            </div>
          </section>
          <ProgramacaoSemanal
            programacao={programacao}
            daysOfWeek={daysOfWeek}
            initialDay={selectedDay}
          />
          <section className="bg-white p-6 rounded-xl shadow-md" aria-label="Informações de contato da rádio">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Contato da Rádio</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-red-600" aria-hidden="true" />
                <a href="mailto:comunidadecatolicaagape@gmail.com" className="hover:underline">
                  comunidadecatolicaagape@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-red-600" aria-hidden="true" />
                <a href="https://wa.me/5579999504661" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  (79) 9 9950-4661 (WhatsApp)
                </a>
              </li>
            </ul>
          </section>
        </main>
        <aside className="w-full lg:w-1/4 bg-white p-4 sm:p-6 overflow-auto max-h-screen border-t lg:border-t-0 lg:border-l border-gray-200">
          {asideIframes.map(({ src, title }, idx) => (
            <div key={idx} className="mb-4">
              <iframe
                className="w-full h-40 sm:h-52 rounded-lg border border-gray-300 shadow-sm"
                src={src}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 0 }}
              />
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
