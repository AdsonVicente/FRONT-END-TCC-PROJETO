
"use client";

import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

type Programacao = {
    dia: string;
    horarios: string[];
};

export default function ProgramacaoSemanalClient({
    programacao,
    daysOfWeek,
    initialDay,
}: {
    programacao: Programacao[];
    daysOfWeek: string[];
    initialDay: string;
}) {
    const [selectedDay, setSelectedDay] = useState(initialDay);

    const programacaoSelecionada = programacao.find((p) => p.dia === selectedDay);

    function handleSelectDay(dia: string) {
        setSelectedDay(dia);
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            url.searchParams.set("dia", dia);
            window.history.replaceState({}, "", url.toString());
        }
    }

    return (
        <section className="bg-white p-6 rounded-xl shadow-md mb-8" aria-label="Programação semanal da Rádio Ágape">
            <h2 className="text-2xl font-bold text-gray-700 flex items-center mb-4">
                <FaCalendarAlt className="mr-2 text-red-600" aria-hidden="true" /> Programação da Semana
            </h2>
            <nav className="flex gap-2 mb-4 overflow-x-auto no-scrollbar" aria-label="Seleção de dia da semana">
                {daysOfWeek.map((dia) => (
                    <form key={dia} style={{ display: "inline" }}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelectDay(dia);
                            }}
                            className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap
                ${selectedDay === dia ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-red-100"}`}
                            aria-pressed={selectedDay === dia}
                            aria-label={`Selecionar programação para ${dia}`}
                            type="submit"
                        >
                            {dia}
                        </button>
                    </form>
                ))}
            </nav>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
                {programacaoSelecionada?.horarios.map((horario, idx) => (
                    <li key={idx}>{horario}</li>
                )) || <li className="text-gray-500">Sem programação para este dia.</li>}
            </ul>
        </section>
    );
}