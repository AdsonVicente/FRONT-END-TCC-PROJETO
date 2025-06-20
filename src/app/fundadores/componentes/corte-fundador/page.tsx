"use client";
import Image from "next/image";
import { Facebook, Link as LinkIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

interface Corte {
    id: number;
    title: string;
    audioSrc: string;
    coverImage: string;
}

const cortesDoFundador: Corte[] = [
    {
        id: 1,
        title: "Marcos 4:35-41 - Jesus acalma a tempestade",
        audioSrc:
            "https://res.cloudinary.com/dd7vxtdc0/video/upload/v1748956062/Cortes_Do_Fundador_evangelho_de_Marcos_4.35_-_41_mp3jkn.mp3",
        coverImage:
            "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748955861/4.35_-_41_hsq39d.jpg",
    },
    {
        id: 2,
        title: "A tempestade em Marcos 4:35-41 (2)",
        audioSrc: "https://res.cloudinary.com/dd7vxtdc0/video/upload/v1748956685/Cortes_Do_Nosso_Fundador_texto_em_Marcos_4_vers%C3%ADculo_35_jhi2mw.mp3",
        coverImage: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748956787/yjbiyadf9h1hpy4k3meksuaarh16_l1eqma.jpg",
    },
    {
        id: 3,
        title: "Evangelho Transcrito em Lucas 9,57-62",
        audioSrc: "https://res.cloudinary.com/dd7vxtdc0/video/upload/v1748957431/cortes_Do_Nosso_Fundador_do_evangelho_transcrito_em_Lc_9_57-62_tmv4s0.mp3",
        coverImage: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748957372/800px-Lasset_die_Kindlein_zu_mir_kommen_c1840_dkuosy.jpg",
    },
    {
        id: 4,
        title: "Cortes do Nosso Fundador – Comentando o Evangelho de Mc 4,35-41",
        audioSrc: "https://res.cloudinary.com/dd7vxtdc0/video/upload/v1748958916/Cortes_Do_Nosso_Fundador_Hoje_comentando_Sobre_o_Evangelho_transcrito_em_Mc_4_35-41_frczdl.mp3",
        coverImage: "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748958912/pexels-nuno-obey-127160_i5twhp.jpg",
    }
];

const OutrosCortesFundador = () => {
    const pathname = usePathname();
    const [shareBaseUrl, setShareBaseUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setShareBaseUrl(window.location.origin + pathname);
        }
    }, [pathname]);

    const handleCopy = (title: string, url: string) => {
        navigator.clipboard.writeText(`${title} - ${url}`);
        alert("Link copiado para a área de transferência!");
    };

    return (
        <section className="bg-white py-20 px-4 md:px-12">
            <Head>
                <title>Outros Cortes do Fundador | Comunidade Católica Ágape</title>
                <meta
                    name="description"
                    content="Formações curtas e profundas do fundador da Comunidade Católica Ágape"
                />
                <meta property="og:title" content="Cortes do Fundador" />
                <meta
                    property="og:description"
                    content="Escute e compartilhe formações que edificam a fé e a espiritualidade."
                />
                <meta
                    property="og:image"
                    content="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748955861/4.35_-_41_hsq39d.jpg"
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={shareBaseUrl} />
            </Head>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl text-red-800 font-bold text-center mb-2">
                    Outros Cortes do Fundador
                </h2>
                <p className="text-center text-zinc-600 mb-10 text-lg">
                    Escute outras formações que edificam e orientam nossa caminhada de fé.
                </p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {cortesDoFundador.map((corte) => {
                        const fullShareUrl = `${shareBaseUrl}#corte-${corte.id}`;

                        return (
                            <div
                                key={corte.id}
                                id={`corte-${corte.id}`}
                                className="bg-white border border-yellow-200 rounded-xl shadow-md p-4 flex flex-col items-center"
                            >
                                <div className="w-full h-48 relative mb-4">
                                    <Image
                                        src={corte.coverImage}
                                        alt={corte.title}
                                        fill
                                        className="object-cover rounded-lg"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-center text-zinc-800 mb-2">
                                    {corte.title}
                                </h3>
                                <audio controls className="w-full mb-3 rounded-md">
                                    <source src={corte.audioSrc} type="audio/mpeg" />
                                    Seu navegador não suporta o áudio.
                                </audio>

                                <div className="flex flex-wrap gap-2 justify-center">
                                    <a
                                        href={`https://wa.me/?text=Escute%20esta%20formação:%20${encodeURIComponent(
                                            corte.title + " - " + fullShareUrl
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm shadow"
                                    >
                                        <FaWhatsapp className="w-4 h-4" />
                                        WhatsApp
                                    </a>

                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                            fullShareUrl
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm shadow"
                                    >
                                        <Facebook className="w-4 h-4" />
                                        Facebook
                                    </a>

                                    <button
                                        onClick={() => handleCopy(corte.title, fullShareUrl)}
                                        className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-800 text-white px-3 py-1 rounded-full text-sm shadow"
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                        Copiar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OutrosCortesFundador;
