import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  eventDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ eventDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(eventDate) - +new Date();
    let timeLeft = {
      dias: 0,
      horas: 0,
      minutos: 0,
      // segundos: 0,
    };

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        // segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval as keyof typeof timeLeft] !== 0) {
      const label =
        interval === "horas"
          ? timeLeft[interval as keyof typeof timeLeft] === 1
            ? "hora"
            : "horas"
          : interval === "minutos"
          ? timeLeft[interval as keyof typeof timeLeft] === 1
            ? "minuto"
            : "minutos"
          : interval;

      timerComponents.push(
        <span key={interval} className="mr-2">
          <span className="font-bold text-gray-900">
            {timeLeft[interval as keyof typeof timeLeft]}
          </span>{" "}
          {label}
        </span>
      );
    }
  });

  return (
    <div className="flex justify-center items-center text-lg text-gray-700">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span>Aguarde o Proximo Evento</span>
      )}
    </div>
  );
};

export default CountdownTimer;
