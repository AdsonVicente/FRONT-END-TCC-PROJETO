import React, { useRef } from "react";
import Sidebar from "../../pages/Home/Componentes/sidebar"; // Adjust the import path as necessary

const RadioPlayer: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const programacao = [
    {
      dia: "Segunda-feira",
      horarios: ["09:00 - Programa da Manhã", "14:00 - Programa da Tarde"],
    },
    {
      dia: "Terça-feira",
      horarios: ["10:00 - Entrevistas", "16:00 - Debate ao Vivo"],
    },
    {
      dia: "Quarta-feira",
      horarios: ["11:00 - Palestra Especial", "15:00 - Música ao Vivo"],
    },
    {
      dia: "Quinta-feira",
      horarios: [
        "10:00 - Bom Dia Ágape",
        "13:00 - Tarde de Fé",
        "15:00 - Sede Santos",
        "17:00 - Resenha de Boleiros",
        "18:00 - Mãe Amável",
        "19:00 - Santa Missa",
        "20:00 - Noite de Louvor",
      ],
    },
    {
      dia: "Sexta-feira",
      horarios: ["08:00 - Programa Inicial", "18:00 - Notícias do Dia"],
    },
    {
      dia: "Sábado",
      horarios: ["12:00 - Programa de Sábado", "20:00 - Evento Especial"],
    },
    {
      dia: "Domingo",
      horarios: ["10:00 - Celebração Matinal", "18:00 - Reflexões da Semana"],
    },
  ];

  const getDayOfWeek = () => {
    const daysOfWeek = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const today = new Date().getDay();
    return daysOfWeek[today];
  };

  const diaAtual = getDayOfWeek();
  const programacaoAtual = programacao.find((item) => item.dia === diaAtual);

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Seção de Introdução */}
      <div className="flex-grow">
        {/* Layout principal */}
        <div className="container mx-auto py-8 px-4 flex flex-col lg:flex-row lg:gap-8">
          {/* Lives da Rádio */}
          <div className="lg:w-3/4 mb-8 lg:mb-0">
            <section className="bg-white p-6 rounded-lg  mb-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">
                  Programação de Hoje - {diaAtual}
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {programacaoAtual ? (
                    programacaoAtual.horarios.map((horario, index) => (
                      <li key={index} className="text-lg">
                        {horario}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 text-lg">
                      Não há programação definida para hoje.
                    </li>
                  )}
                </ul>
              </div>
            </section>

            {/* Player de Rádio */}
            <div className="bg-white shadow-lg py-4 mb-8">
              <div className="container mx-auto text-center">
                <iframe
                  className="bg-white"
                  src="https://p.stmip.net/Dr58668/kplay.html"
                  frameBorder="0"
                  width="100%"
                  height="90"
                  scrolling="no"
                  allow="autoplay"
                  ref={iframeRef}
                  title="Player de Rádio"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Sidebar */}

          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
