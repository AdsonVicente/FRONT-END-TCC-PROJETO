"use client";
import { useState } from "react";
import { FaRegClipboard } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";

export default function Doacao() {
    const chavePix = "79999504661";
    const [copiado, setCopiado] = useState(false);

    const copiarChavePix = async () => {
        try {
            await navigator.clipboard.writeText(chavePix);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        } catch (err) {
            console.error("Erro ao copiar:", err);
        }
    };

    const compartilhar = () => {
        if (navigator.share) {
            navigator
                .share({ title: "Ajude essa missão!", url: window.location.href })
                .catch((err) => console.error("Erro ao compartilhar:", err));
        } else {
            alert("Seu navegador não suporta o compartilhamento automático. Use os ícones abaixo.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6 ">
            <div className="relative p-6">
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        Ajude-nos a Evangelizar
                    </h1>
                    <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto">
                        Sua doação é essencial para que possamos continuar espalhando a Palavra de Deus!
                    </p>
                </div>
            </div>

            <div className="w-full max-w-4xl space-y-10">
                {/* Doação via Pix */}
                <section className="bg-white rounded-xl shadow-md p-6 text-center p">
                    <h2 className="text-2xl font-semibold text-gray-800 flex justify-center items-center gap-2 mb-3">
                        <FaPix className="text-green-600 text-3xl" /> Doação via Pix
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-xl font-bold text-gray-900">{chavePix}</p>
                        <button onClick={copiarChavePix} title="Copiar chave Pix" className="text-gray-600 hover:text-blue-600 transition">
                            <FaRegClipboard className="text-2xl" />
                        </button>
                    </div>
                    {copiado && <p className="mt-1 text-sm text-green-600">Chave Pix copiada!</p>}
                    <p className="mt-2 text-sm text-gray-600">
                        Copie a chave acima para doar via Pix usando seu banco ou carteira digital.
                    </p>
                </section>

                {/* Compartilhamento */}
                <section className="text-center mt-10">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Compartilhe e nos ajude a alcançar mais corações 💖
                    </h3>
                    <button
                        onClick={compartilhar}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow mx-auto"
                    >
                        <FaShareAlt className="text-xl" /> Compartilhar
                    </button>
                </section>

                {/* Localização */}
                <section className="py-10">
                    <div className="text-center mb-6">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                            Venha nos Visitar
                        </h2>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            Nossa Localização
                        </p>
                    </div>
                    <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.954186996642!2d-38.006544153571376!3d-11.188482908142564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x711b299756ed9d1%3A0xa5eaad84906cd6e1!2sLivraria%20Kair%C3%B3s!5e0!3m2!1spt-BR!2sbr!4v1717409274064!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            aria-hidden="false"
                            title="Localização da Comunidade"
                        ></iframe>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-lg font-medium text-gray-900">
                            Largo Glicério Siqueira, 248 - Tobias Barreto, SE, 49300-000
                        </p>
                        <p className="mt-1 text-lg text-gray-500">
                            📧 @comunidadecatolicaagape
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
