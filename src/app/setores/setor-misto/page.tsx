// app/setormisto/page.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Users, Flame, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export default function SetorMistoPage() {
    return (
        <div className="w-full">
            {/* Banner inicial com imagem de fundo */}
            <section className="relative w-full h-screen">
                <Swiper className="h-full">
                    <SwiperSlide>
                        <div className="relative h-screen bg-[url('https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748275336/WhatsApp_Image_2025-05-06_at_19.01.44_1_x0ckwh.jpg')] bg-cover bg-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
                                <div className="text-white px-6 md:px-20">
                                    <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-md">
                                        COMUNIDADE CATÓLICA ÁGAPE
                                    </h1>
                                    <h2 className="text-blue-300 text-3xl md:text-5xl font-bold mt-2 drop-shadow-md">
                                        SETOR MISTO
                                    </h2>
                                    <p className="mt-4 text-lg md:text-xl max-w-xl drop-shadow-md">
                                        Homens e mulheres unidos na fé e na missão, caminhando juntos rumo à santidade.
                                    </p>
                                    <a
                                        href="https://www.instagram.com/comunidadecatolicaagape/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition duration-300 inline-block text-center"
                                    >
                                        Quero saber mais
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>

            {/* Sobre o Setor Misto */}
            <section className="bg-white text-gray-800 py-16 px-4 md:px-20">
                <h2 className="text-3xl font-semibold text-red-600 mb-4 border-l-4 pl-2 border-red-600">Sobre o Setor Misto</h2>
                <p className="text-lg leading-relaxed">
                    Nosso setor é dedicado a homens e mulheres solteiros acima de 18 anos.
                    Realizamos encontros semanais às quintas-feiras, às 19h30, onde oferecemos um momento de acolhimento, animação, oração e louvor e um momento de formação espiritual com base na Palavra de Deus. Além disso, valorizamos a fraternidade entre os irmãos.
                </p>
            </section>

            {/* Testemunhos */}
            <section className=" text-zinc-800 py-16 px-6 md:px-20">
                <h2 className="text-3xl font-bold text-red-700 text-center mb-10">Testemunhos de membros</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            texto: "O setor misto é um verdadeiro presente de Deus na minha vida. Aqui encontrei apoio, amizade e uma nova família.",
                            membro: "Adson Vicente"
                        },
                        {
                            texto: "O setor misto para mim é um espaço de crescimento espiritual e fraternidade. A cada encontro, sinto meu coração mais próximo de Deus.",
                            membro: "Leticia"
                        },
                        {
                            texto: "Aqui eu aprendi o verdadeiro significado de comunidade. Os encontros são momentos de renovação e alegria,aprendi principalmente,mesmo no silencio de Deus, Ele está agindo.",
                            membro: "Angelica"
                        },
                    ].map((t, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
                            <p className="italic">“{t.texto}”</p>
                            <p className="text-right mt-4 font-semibold text-yellow-700">– {t.membro}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Eventos do Setor Misto */}
            <section className="bg-white py-20 px-4 md:px-20">
                <h2 className="text-4xl font-bold text-red-700 mb-12 text-center">
                    Nossas Atividades
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Missões */}
                    <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <HeartHandshake className="text-blue-700 w-10 h-10" />
                            <h3 className="text-2xl font-semibold text-blue-800">Fraternidade</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Através dos grupos, retiros e convivências, vivemos com os irmãos em meio à fraternidade da comunidade.
                        </p>
                    </div>

                    {/* Grupos de Partilha */}
                    <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <Users className="text-blue-700 w-10 h-10" />
                            <h3 className="text-2xl font-semibold text-blue-800">Grupos de Partilha</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Caminhamos juntos na fé, partilhando a vida, aprendendo e crescendo como irmãos.
                        </p>
                    </div>

                    {/* Oração Comunitária */}
                    <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <Flame className="text-blue-700 w-10 h-10" />
                            <h3 className="text-2xl font-semibold text-blue-800">Grupo de oração</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Reunimo-nos regularmente para rezar, louvar e interceder uns pelos outros.
                        </p>
                    </div>
                </div>

                {/* Botão opcional */}
                <div className="text-center mt-12">
                    <Link
                        href="/contato"
                        className="inline-block bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
                    >
                        Quero participar de um encontro
                    </Link>
                </div>
            </section>

            {/* Galeria */}
            <section className="py-16 px-4 md:px-20">
                <h2 className="text-3xl font-semibold text-red-600 mb-6">Galeria de Momentos</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <img src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748275336/WhatsApp_Image_2025-05-06_at_19.01.44_kwf8g6.jpg" className="rounded-lg shadow-md hover:scale-105 transition-transform" alt="Imagem 1" />
                    <img src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748275512/WhatsApp_Image_2025-05-06_at_19.01.44_1_pww1eo.jpg" className="rounded-lg shadow-md hover:scale-105 transition-transform" alt="Imagem 2" />
                    <img src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748275573/WhatsApp_Image_2025-05-26_at_13.04.44_cf70le.jpg" className="rounded-lg shadow-md hover:scale-105 transition-transform" alt="Imagem 3" />
                </div>

                {/* Convite */}
                <section className="text-center py-16">
                    <h2 className="text-3xl font-bold text-red-700 mb-4">Venha caminhar conosco!</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Se você busca um lugar de oração, amizade e missão, o Setor Misto é para você.
                    </p>
                    <Link href="/contato" className="inline-block bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 transition">
                        Quero participar
                    </Link>
                </section>
            </section>
        </div>
    );
}
