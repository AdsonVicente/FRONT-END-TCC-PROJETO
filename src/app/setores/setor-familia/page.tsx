'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Head from 'next/head';

const TESTEMUNHOS = [
    {
        texto:
            'Em meio aos desafios do casamento, o Setor Família foi essencial. Encontramos apoio, partilha e a Palavra de Deus, que nos fortaleceu. Aprendemos com outros casais e vivemos muitas graças. O Setor Família é um espaço de crescimento e presença de Deus.',
        casal: 'Douglas e Flavia',
    },
    {
        texto:
            'A presença de Cristo transformou nosso casamento. Nos encontros do Ágape, recebemos direção e apoio para seguir juntos.',
        casal: 'Ana e Rafael',
    },
    {
        texto:
            'Hoje rezamos juntos e enfrentamos os desafios unidos. A fé renovou nosso sentido como casal.',
        casal: 'Patrícia e Lucas',
    },
];

export default function SetorFamiliaPage() {
    const [isVideoVisible, setIsVideoVisible] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsVideoVisible(window.innerWidth >= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleVideoPlay = () => setIsVideoVisible(true);

    return (
        <>
            <Head>
                <title>Setor Família | Comunidade Católica Ágape</title>
                <meta
                    name="description"
                    content="O Setor Família fortalece casais e famílias, guiando-os na caminhada espiritual e emocional."
                />
            </Head>
            <main className="bg-white text-zinc-900">
                {/* Hero Section */}
                <section className="relative w-full min-h-[70vh] flex items-center justify-center">
                    <Swiper className="w-full h-full">
                        <SwiperSlide>
                            <div
                                className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746909681/Nosso_setor_fam%C3%ADlia_Qr_saber_como_participar_Fique_ligado_em_nosso_pr%C3%B3ximo_reels_lmmalv.jpg')",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                                <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between max-w-7xl px-6 py-12 md:py-20">
                                    <div className="max-w-2xl text-white text-center md:text-left">
                                        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
                                            Setor Família
                                        </h1>
                                        <h2 className="text-yellow-400 text-xl md:text-3xl font-bold mb-4 drop-shadow-md">
                                            Comunidade Católica Ágape
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </section>

                {/* Sobre o Setor Família */}
                <section className="py-16 px-6 md:px-20 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-4">Sobre o Setor Família</h2>
                        <p className="text-lg md:text-xl text-zinc-700">
                            O Setor Família da Comunidade Católica Ágape é um espaço para casais e famílias que desejam viver o matrimônio segundo o coração de Deus. Promovemos encontros, partilhas, oração e formação para que cada família seja um lar de amor, fé e esperança.
                        </p>
                        <p className="mb-6 text-base md:text-lg drop-shadow">
                            Aqui você fortalece os laços do matrimônio, cresce na fé e caminha junto com outras famílias. Encontre apoio, oração e formação para viver o amor de Deus no dia a dia.
                        </p>
                        <a
                            href="/contato"
                            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
                        >
                            Quero Participar
                        </a>
                    </div>
                </section>

                {/* Testemunhos */}
                <section className="py-16 px-6 md:px-20 ">
                    <h2 className="text-2xl md:text-3xl font-bold text-red-700 text-center mb-10">Testemunhos de Amor</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {TESTEMUNHOS.map((t, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-zinc-100 flex flex-col h-full">
                                <p className="italic text-zinc-700 flex-1">“{t.texto}”</p>
                                <p className="text-right mt-4 font-semibold text-yellow-700">– {t.casal}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Citação */}
                <section className="py-12 px-6 bg-yellow-50">
                    <blockquote className="max-w-3xl mx-auto text-center italic text-lg text-zinc-700">
                        “O amor conjugal exige dos esposos a consciência da grande dignidade de sua vocação: formar com seu amor uma comunidade de vida e de amor.”
                        <span className="block text-yellow-700 font-semibold mt-2">– São João Paulo II</span>
                    </blockquote>
                </section>

                {/* Vídeo Convidativo */}
                <section className="py-16 text-zinc-900">
                    <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2 flex justify-center">
                            {isVideoVisible ? (
                                <video
                                    className="w-full max-w-[600px] h-auto md:h-[340px] rounded-lg shadow-lg"
                                    controls
                                    loop
                                    playsInline
                                    poster="/caminho/para/imagem-de-capa.jpg"
                                >
                                    <source src="/setorfamilia.mp4" type="video/mp4" />
                                    Seu navegador não suporta o elemento de vídeo.
                                </video>
                            ) : (
                                <button
                                    onClick={handleVideoPlay}
                                    className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition-colors"
                                >
                                    Um Convite Especial, Clique aqui!
                                </button>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-red-700">Um Convite Especial</h2>
                            <p className="text-lg leading-relaxed text-zinc-700">
                                Fortaleça seu casamento na fé, aprenda com testemunhos reais e cresça espiritualmente junto ao seu cônjuge.
                                Assista ao vídeo e embarque nessa jornada de amor e compromisso com Cristo.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
