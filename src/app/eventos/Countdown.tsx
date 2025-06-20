"use client";

import React from "react";

export default function Countdown({ date }: { date: string }) {
    const [days, setDays] = React.useState<number | null>(null);

    React.useEffect(() => {
        function calculateDays() {
            const eventDate = new Date(date);
            const now = new Date();
            const diff = eventDate.getTime() - now.getTime();
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }

        setDays(calculateDays());

        const interval = setInterval(() => {
            setDays(calculateDays());
        }, 60 * 1000); // Atualiza a cada minuto

        return () => clearInterval(interval);
    }, [date]);

    if (days === null) return null;

    if (days < 0)
        return (
            <span className="text-gray-500 text-lg md:text-2xl font-semibold text-center w-full block">
                Evento encerrado
            </span>
        );
    if (days === 0)
        return (
            <span className="text-green-600 text-lg md:text-4xl font-bold text-center w-full block">
                
                <span className="block md:hidden">Hoje!</span>
                <span className="hidden md:block">É hoje!</span>
            </span>
        );
    return (
        <span className="text-orange-600 text-lg md:text-5xl font-bold text-center w-full block">
            <span className="block md:hidden">{days}d</span>
            <span className="hidden md:block">Faltam {days} dias</span>
        </span>
    );
}
