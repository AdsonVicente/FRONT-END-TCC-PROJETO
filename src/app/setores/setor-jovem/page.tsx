// pages/setor-jovem.tsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Users, Flame, TentTree } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SetorJovemPage() {
    return (
        <div className="w-full">
            {/* Slide de Início */}
            <section className="relative w-full h-screen">
                <Swiper className="h-full">
                    <SwiperSlide>
                        <div className="relative h-screen bg-[url('https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746839387/setorjovem_ylkxov.jpg')] bg-cover bg-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
                                <div className="text-white px-6 md:px-20">

                                    <h2 className="text-yellow-400 text-3xl md:text-5xl font-bold mt-2 drop-shadow-md">
                                        SETOR JOVEM
                                    </h2>
                                    <p className="mt-4 text-lg md:text-xl max-w-xl drop-shadow-md">
                                        Uma missão jovem, alegre e cheia do Espírito Santo. Vem caminhar com a gente!
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

            {/* Sobre o Setor Jovem */}
            <section className="bg-white text-gray-800 py-16 px-4 md:px-20">
                <h2 className="text-3xl font-semibold text-red-600 mb-4 border-l-4 pl-2 border-red-600">
                    Sobre o Setor Jovem
                </h2>
                <p className="text-lg leading-relaxed">
                    O Setor Jovem da Comunidade Católica Ágape é formado por diversos grupos de jovens, organizados por faixa etária ou afinidade.
                    Cada grupo é acompanhado por seus respectivos coordenadores, que caminham junto com os jovens em uma jornada de fé, formação, missão e fraternidade.
                    <br /><br />
                    Nossa missão é evangelizar a juventude, despertando vocações e formando líderes que sirvam com alegria na Igreja e na sociedade.
                    Somos chamados a viver intensamente a santidade, com ousadia e alegria!
                </p>
            </section>

            <section className="bg-white py-20 px-4 md:px-20">
                <h2 className="text-4xl font-bold text-red-700 mb-12 text-center">
                    Nossos Eventos
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Acampamentos */}
                    <div className="bg-gradient-to-br from-red-100 to-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <TentTree className="text-red-700 w-10 h-10" />
                            <h3 className="text-2xl font-semibold text-red-800">Acampamentos</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Momentos intensos de oração, formação e partilha que marcam profundamente os corações.
                        </p>
                    </div>

                    {/* Grupos de Oração */}
                    <div className="bg-gradient-to-br from-red-100 to-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <Flame className="text-red-700 w-10 h-10" />
                            <h3 className="text-2xl font-semibold text-red-800">Grupos de Oração</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Reunimo-nos para escutar a Palavra, rezar e sermos preenchidos pela graça do Espírito Santo.
                        </p>
                    </div>

                    {/* Convivência */}
                    <div className="bg-gradient-to-br from-red-100 to-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <Users className="text-red-700 w-10 h-10" />
                            <h3 className="text-2xl font-semibold text-red-800">Convivência</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Vivemos a fraternidade na Sede Geral da comunidade, nos grupos, nas missas e nos momentos de lazer.
                        </p>
                    </div>
                </div>

                {/* Botão opcional */}
                <div className="text-center mt-12">
                    <Link href="/contato" legacyBehavior>
                        <a className="inline-block bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 transition">
                            Quero participar de um evento
                        </a>
                    </Link>
                </div>
            </section>

            {/* Galeria de Imagens */}
            <section className="py-16 px-4 md:px-20">
                <h2 className="text-3xl font-semibold text-red-600 mb-6">Galeria de Momentos</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Image
                        src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746839387/setorjovem_ylkxov.jpg"
                        width={400}
                        height={300}
                        alt="Imagem 1"
                        className="rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:brightness-90"
                    />
                    <Image
                        src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746839387/469225013_18322512646089849_1213953164856185744_n_nvymlq.jpg"
                        width={400}
                        height={300}
                        alt="Imagem 2"
                        className="rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:brightness-90"
                    />
                    <Image
                        src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746839568/480178325_1039931294842226_1130989653716229877_n_jy6lcn.jpg"
                        width={400}
                        height={300}
                        alt="Imagem 3"
                        className="rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:brightness-90"
                    />
                    <Image
                        src="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1746841200/comunidadecatolicaagape_1707122527707263_a82vv3.jpg"
                        width={400}
                        height={300}
                        alt="Imagem 5"
                        className="rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:brightness-90"
                    />
                </div>

                {/* Convite */}
                <section className="text-center py-16 px-4">
                    <h2 className="text-3xl font-bold text-red-700 mb-4">Venha fazer parte dessa missão!</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Se você é jovem e deseja viver algo novo com Deus, venha conhecer nossos grupos!
                    </p>
                    <Link href="/contato" legacyBehavior>
                        <a className="inline-block bg-red-600 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 transition">
                            Quero participar
                        </a>
                    </Link>
                </section>
            </section>
        </div>
    );
}
