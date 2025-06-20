"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Head from "next/head";
import { api } from "../../services/api";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

interface Evento {
    id: string;
    titulo: string;
    descricao: string;
    data: string;
    banner: string;
    local: string;
    horario: string;
    createdAt: string;
}

const DetalheEvento: React.FC = () => {
    const params = useParams();
    const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";
    const [evento, setEvento] = useState<Evento | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await api.get(`evento/${id}`);
                setEvento(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        if (id) fetchEvento();
    }, [id]);

    if (!evento) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Carregando...
            </div>
        );
    }

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = `Confira este evento: ${evento.titulo}`;
    const socialMediaLinks = [
        {
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            icon: <FaFacebookF size={24} />,
            color: "text-blue-600",
            hoverColor: "hover:text-blue-800",
        },
        {
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            icon: <FaTwitter size={24} />,
            color: "text-blue-400",
            hoverColor: "hover:text-blue-600",
        },
        {
            href: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
            icon: <FaWhatsapp size={24} />,
            color: "text-green-500",
            hoverColor: "hover:text-green-700",
        },
    ];

    return (
        <>
            <Head>
                <title>{evento.titulo} | Detalhes do Evento</title>
                <meta name="description" content={evento.descricao.slice(0, 150)} />
                <meta property="og:title" content={evento.titulo} />
                <meta property="og:description" content={evento.descricao.slice(0, 150)} />
                <meta property="og:image" content={evento.banner} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={shareUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={evento.titulo} />
                <meta name="twitter:description" content={evento.descricao.slice(0, 150)} />
                <meta name="twitter:image" content={evento.banner} />
            </Head>
            <div className="container mx-auto py-8 px-4 md:px-8 max-w-5xl relative">
                {/* Social Media Sharing Buttons */}
                <div className="fixed top-1/3 right-4 z-50 flex flex-col space-y-4">
                    {socialMediaLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${link.color} ${link.hoverColor} bg-white p-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110`}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center space-x-2"
                    >
                        <span>&larr;</span>
                        <span>Voltar</span>
                    </button>
                </div>

                <h1 className="capitalize text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 leading-tight">
                    {evento.titulo}
                </h1>

                <div className="flex justify-center mb-8">
                    <img
                        src={evento.banner}
                        alt={evento.titulo}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                        style={{ maxHeight: "500px", maxWidth: "1200px" }}
                    />
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 mx-auto mb-8">
                    {evento.descricao.split("\n").map((paragraph, index) => (
                        <p
                            className="whitespace-normal break-words"
                            key={index}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default DetalheEvento;
