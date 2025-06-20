"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Puzzle, BookOpen, Paintbrush, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";

const Baloon = ({
    color,
    left,
    delay,
}: {
    color: string;
    left: string;
    delay: number;
}) => (
    <motion.div
        className={`absolute top-0 ${left} z-0`}
        initial={{ y: 0, opacity: 0.7 }}
        animate={{ y: [0, -80, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 7, delay }}
        style={{ pointerEvents: "none" }}
    >
        <div
            className={`w-12 h-16 rounded-full ${color} shadow-lg border-2 border-white`}
            style={{ filter: "blur(0.5px)" }}
        />
    </motion.div>
);

const SetorCrianca = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [fala, setFala] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setFala(true); // Agapinho fala ao entrar
    }, []);

    useEffect(() => {
        if (fala) {
            const timer = setTimeout(() => setFala(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [fala]);

    const atividades = [
        {
            icon: <Paintbrush className="text-red-700 w-6 h-6 mr-2" />,
            title: "Quiz com o Agapinho",
            desc: "Responda perguntas do Agapinho!",
            path: "/setores/setor-crianca/jogos/jogo-quiz",
            bg: "bg-red-100",
        },
        {
            icon: <BookOpen className="text-yellow-700 w-6 h-6 mr-2" />,
            title: "Atividades do Setor Criança",
            desc: "Pinte e aprenda com o Setor Criança!",
            path: "/setores/setor-crianca/jogos/colorir",
            bg: "bg-yellow-100",
        },
        {
            icon: <Puzzle className="text-blue-700 w-6 h-6 mr-2" />,
            title: "Jogo da Memória",
            desc: "Encontre os pares com símbolos da nossa fé!",
            path: "/setores/setor-crianca/jogos/jogo-da-memoria",
            bg: "bg-blue-100",
        },
    ];

    const imagens = [
        "/crianças.jpg",
        "/setor-kids.jpg",
        "/setor-congresoo.jpg",
        "/criança-bricando.jpg",
        "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746841418/IMG_9891_d4uvnk.jpg",
    ];

    const openImage = (src: string) => setSelectedImage(src);
    const closeModal = () => setSelectedImage(null);

    const AgapinhoMascote = () => (
        <motion.div
            className="fixed bottom-4 right-4 z-50"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
            <Image
                onClick={() => setFala(true)}
                src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746490573/agapinho_al2g4t.png"
                alt="Agapinho"
                className="w-32 drop-shadow-md hover:scale-105 transition-transform cursor-pointer"
            />
            {fala && (
                <div className="absolute bottom-32 right-36 bg-white border border-red-300 rounded-xl p-4 text-sm text-red-900 max-w-xs shadow-lg select-none">
                    Oi amiguinho! Vamos brincar e aprender com Jesus? 😄
                </div>
            )}
        </motion.div>
    );

    // Cores e posições dos balões
    const baloonColors = [
        "bg-pink-300",
        "bg-yellow-300",
        "bg-blue-300",
        "bg-green-300",
        "bg-purple-300",
        "bg-red-200",
        "bg-orange-200",
        "bg-teal-200",
    ];

    return (
        <>
            <Head>
                <title>Setor Criança - Comunidade Ágape</title>
            </Head>
            {/* Fundo total com gradiente e balões */}
            <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-yellow-50 to-blue-100" />
                {[...Array(18)].map((_, i) => {
                    const leftPercent = (i * 100) / 17;
                    const color = baloonColors[i % baloonColors.length];
                    const delay = (i % 5) * 0.7 + (i % 3) * 0.2;
                    return (
                        <Baloon
                            key={i}
                            color={color}
                            left={`${leftPercent}%`}
                            delay={delay}
                        />
                    );
                })}

            </div>

            <div className="relative z-10 container max-w-7xl px-6 mx-auto flex flex-col items-center justify-center min-h-screen text-center font-sans">
                <AgapinhoMascote />

                {/* Introdução */}
                <section className="mb-10 text-center max-w-3xl px-4">
                    <h1 className="text-4xl font-serif font-bold text-red-700 mb-4 leading-tight drop-shadow-sm">
                        Setor Criança
                    </h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        O Setor Criança é a missão da Comunidade Ágape com os pequenos! Com amor e criatividade, oferecemos catequese, brincadeiras, músicas e atividades que apresentam Jesus às crianças de forma acessível, alegre e verdadeira.
                    </p>

                    <div className="mt-8 bg-red-50 border border-red-200 p-6 rounded-xl shadow-sm">
                        <h2 className="text-2xl font-semibold text-red-700 mb-3 flex items-center justify-center gap-2">
                            <HeartHandshake className="inline w-6 h-6 text-red-400" />
                            Evangelização com Amor
                        </h2>
                        <p className="text-red-900 text-base leading-relaxed">
                            Cada encontro com as crianças é um momento de aprendizado e espiritualidade. Nossa missão é fazê-las crescer em graça e sabedoria, inseridas na vivência comunitária e no amor de Deus.
                        </p>
                    </div>
                </section>

                {/* Atividades */}
                <section className="mb-12 w-full max-w-5xl px-4">
                    <h2 className="text-3xl font-serif font-bold text-red-700 mb-6 text-center flex items-center justify-center gap-2">
                        <Puzzle className="w-8 h-8 text-red-400" />
                        Diversão que Ensina: Atividades com o Agapinho!
                    </h2>
                    <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Com jogos e brincadeiras, as crianças aprendem sobre Jesus de forma leve, alegre e cheia de amor. Clique em uma das atividades abaixo e venha se divertir com o Agapinho!
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {atividades.map((activity, index) => (
                            <button
                                key={index}
                                onClick={() => router.push(activity.path)}
                                className={`cursor-pointer ${activity.bg} p-6 rounded-2xl shadow-md border border-red-200 transition transform hover:shadow-lg hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-red-400 text-left relative overflow-hidden`}
                                aria-label={activity.title}
                            >
                                <div className="flex items-center mb-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        {activity.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-red-800 ml-3 font-serif">
                                        {activity.title}
                                    </h3>
                                </div>
                                <p className="text-red-700 text-sm">{activity.desc}</p>
                                <span className="absolute top-2 right-2 text-lg select-none">🎈</span>
                            </button>
                        ))}
                    </div>
                </section>

                <div className="my-12 w-full text-center">
                    <span className="text-4xl select-none">🌟</span>
                </div>

                {/* Galeria de imagens */}
                <section className="mb-10 w-full max-w-6xl px-4">
                    <h2 className="text-2xl font-serif font-bold text-gray-700 mb-6 text-center select-none">
                        📸 Momentos com as Crianças
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {imagens.map((src, index) =>
                            src.startsWith("http") ? (
                                <Image
                                    key={index}
                                    src={src}
                                    alt={`Imagem ${index + 1}`}
                                    className="rounded-2xl shadow-md w-full object-cover h-64 cursor-pointer hover:scale-105 transition-transform"
                                    onClick={() => openImage(src)}
                                    loading="lazy"
                                />
                            ) : (
                                <Image
                                    key={index}
                                    src={src}
                                    alt={`Imagem ${index + 1}`}
                                    className="rounded-2xl shadow-md cursor-pointer"
                                    width={400}
                                    height={256}
                                    style={{ objectFit: "cover" }}
                                    onClick={() => openImage(src)}
                                    priority={false}
                                />
                            )
                        )}
                    </div>

                    {/* Modal */}
                    {selectedImage && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                            onClick={closeModal}
                            role="dialog"
                            aria-modal="true"
                        >
                            <Image
                                src={selectedImage}
                                alt="Imagem ampliada"
                                className="max-w-4xl max-h-[90vh] rounded-lg shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-6 text-white text-4xl font-bold focus:outline-none"
                                aria-label="Fechar imagem"
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default SetorCrianca;
