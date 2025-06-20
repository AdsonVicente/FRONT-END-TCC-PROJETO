"use client";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type Atividade = {
    titulo: string;
    descricao: string;
    imagem: string;
};

const falas = [
    "Que legal te ver aqui! Vamos fazer atividades bem divertidas com Jesus? ✨🎨",
    "Jesus também foi criança como você! Vamos aprender e brincar juntos? 🙏🎉",
    "Clique nas atividades para baixar e pintar! Vai ser uma bênção! 🖍️😊",
    '"Deixai vir a mim os pequeninos!" (Mt 19,14) – Vamos com Jesus! 💖'
];

const atividades: Atividade[] = [
    {
        titulo: "Atividade 1: Pintando com Jesus",
        descricao: "Uma atividade de pintura com figuras bíblicas para colorir.",
        imagem: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748476774/WhatsApp_Image_2025-05-23_at_21.29.36_3_dwngyh.jpg",
    },
    {
        titulo: "Atividade 2: Ligando os Pontos",
        descricao: "Complete a figura da Arca de Noé ligando os pontos.",
        imagem: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748476775/WhatsApp_Image_2025-05-23_at_21.29.35_2_khjven.jpg",
    },
    {
        titulo: "Atividade 3: Caça-Palavras",
        descricao: "Encontre palavras como 'Deus', 'Amor', 'Igreja' e outras.",
        imagem: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748476787/WhatsApp_Image_2025-05-23_at_21.29.34_jvspp7.jpg",
    },
    {
        titulo: "Atividade 4: Colorir com Jesus",
        descricao: "Vamos colorir com Jesus! Uma atividade divertida para crianças.",
        imagem: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748476774/WhatsApp_Image_2025-05-23_at_21.29.36_4_yce9qo.jpg",
    },
    {
        titulo: "Atividade 5: Colorir com Jesus",
        descricao: "Vamos colorir com Jesus! Uma atividade divertida para crianças.",
        imagem: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748476786/WhatsApp_Image_2025-05-23_at_21.29.35_1_yxib2o.jpg",
    },
    {
        titulo: "Atividade 6: Colorir com Jesus",
        descricao: "Vamos colorir com Jesus! Uma atividade divertida para crianças.",
        imagem: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748476776/WhatsApp_Image_2025-05-23_at_21.29.35_3_x7rman.jpg",
    },
];

function downloadFile(url: string, filename: string) {
    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            const href = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = href;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(href);
        })
        .catch(() => alert("Falha ao baixar o arquivo. Tente novamente."));
}

const AgapinhoMascote = () => {
    const [fala, setFala] = useState<string | false>(false);

    useEffect(() => {
        if (fala) {
            const timer = setTimeout(() => setFala(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [fala]);

    const mostrarFala = () => {
        const aleatoria = falas[Math.floor(Math.random() * falas.length)];
        setFala(aleatoria);
    };

    return (
        <motion.div
            className="fixed bottom-4 right-4 z-50 cursor-pointer"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={mostrarFala}
        >
            <img
                src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746490573/agapinho_al2g4t.png"
                alt="Agapinho"
                className="w-32 drop-shadow-xl hover:scale-105 transition-transform"
            />
            {fala && (
                <div className="absolute bottom-32 right-36 bg-white shadow-lg rounded-xl p-4 text-sm text-black max-w-xs">
                    {fala}
                </div>
            )}
        </motion.div>
    );
};

export default function SetorCriancaPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 relative overflow-x-hidden">
            {/* Balões animados */}
            <motion.div
                className="absolute top-0 left-0 w-full flex justify-around pointer-events-none z-0"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-16 h-24 rounded-full bg-pink-200 opacity-70"
                        animate={{ y: [0, -30, 0] }}
                        transition={{ repeat: Infinity, duration: 3 + i }}
                        style={{ marginLeft: i % 2 === 0 ? 20 : 0 }}
                    />
                ))}
            </motion.div>

            {/* Cabeçalho */}
            <header className="relative z-10 py-8 flex flex-col items-center">
                <motion.h1
                    className="text-5xl font-extrabold text-pink-700 drop-shadow-lg mb-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                >
                    Atividades              
                      </motion.h1>
                <p className="text-lg text-pink-600 font-semibold mb-4">
                    Atividades, brincadeiras e muita diversão com Jesus!
                </p>
                <nav className="flex gap-4">
                    <Link href="/setores/setor-crianca/jogos/colorir">
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#f472b6" }}
                            className="bg-pink-300 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-pink-400 transition"
                        >
                            Atividades para Colorir
                        </motion.button>
                    </Link>
                    <Link href="/setores/setor-crianca">
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#fbbf24" }}
                            className="bg-yellow-300 text-pink-700 px-6 py-2 rounded-full font-bold shadow hover:bg-yellow-400 transition"
                        >
                            Outros Jogos
                        </motion.button>
                    </Link>
                </nav>
            </header>

            {/* Atividades */}
            <main className="relative z-10 max-w-5xl mx-auto mt-10">
                <motion.h2
                    className="text-3xl font-bold text-center text-pink-800 mb-6"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    📘 Livro de Atividades do Agapinho
                </motion.h2>
                <p className="text-center text-gray-700 mb-10">
                    Divirta-se com atividades coloridas e repletas de amor e fé!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {atividades.map((atividade, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition hover:scale-105"
                            whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #f472b6" }}
                        >
                            <img
                                src={atividade.imagem}
                                alt={`Imagem da atividade: ${atividade.titulo}`}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col gap-4">
                                <div>
                                    <h2 className="text-lg font-bold text-pink-700">
                                        {atividade.titulo}
                                    </h2>
                                    <p className="text-gray-600 text-sm">{atividade.descricao}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        downloadFile(atividade.imagem, `${atividade.titulo}.jpg`)
                                    }
                                    aria-label={`Baixar ${atividade.titulo}`}
                                    className="inline-flex items-center bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-2 rounded-full font-semibold transition"
                                >
                                    <Download className="mr-2" size={18} /> Baixar Atividade
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
            <AgapinhoMascote />
        </div>
    );
}
