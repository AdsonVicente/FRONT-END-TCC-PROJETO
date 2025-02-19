import { useState, useEffect } from 'react';

const AgapeCasaisPage = () => {
    const [isVideoVisible, setIsVideoVisible] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsVideoVisible(window.innerWidth >= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleVideoPlay = () => {
        setIsVideoVisible(true);
    };

    return (
        <div className="bg-zinc-900">
            {/* Seção Principal */}
            <div className="flex pt-12 px-6 md:px-20 items-center justify-center bg-zinc-900 md:h-screen overflow-hidden">
                <div className="flex flex-col gap-6 md:flex-row items-center max-w-8xl">
                    {/* Texto da Seção */}
                    <div className="w-full md:w-1/2 lg:pr-32">
                        <h2 className="text-4xl lg:text-5xl text-center md:text-left text-yellow-500 leading-tight font-medium">
                            Juntos em Cristo: Um Caminho para Casais
                        </h2>
                        <h3 className="mt-6 md:mt-10 text-md lg:text-xl text-center md:text-left text-white font-light tracking-wider leading-relaxed">
                            O Ágape é um espaço dedicado a fortalecer os laços entre casais, guiando-os em sua jornada espiritual e emocional.
                            Aqui, você encontrará apoio, oração e formação para caminhar lado a lado na fé.
                        </h3>
                        <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start">
                            <button
                                className="w-full sm:w-40 px-4 py-3 rounded font-semibold text-md bg-yellow-500 text-white border-2 border-yellow-500 hover:bg-yellow-400 hover:text-gray-800 transition-colors"
                                onClick={() => window.open('https://www.instagram.com/comunidadecatolicaagape/', '_blank')}
                            >
                                Iniciar a Jornada
                            </button>
                        </div>
                    </div>

                    {/* Imagem da Sagrada Família */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <img
                            src="/sagrada-familia.jpg"
                            alt="Sagrada Família"
                            className="w-full max-w-md rounded-lg shadow-lg"
                        />
                        <p className="mt-4 text-white text-center text-lg font-light">
                            A Sagrada Família é o modelo perfeito de amor e união no matrimônio. Seguindo seu exemplo, os casais encontram forças para superar desafios e crescer juntos na fé.
                        </p>
                    </div>
                </div>
            </div>

            {/* Seção de Vídeo Convidativo */}
            <div className="py-16 bg-zinc-100 text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center gap-12">
                    {/* Vídeo */}
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
                                Um convite Especial!
                            </button>
                        )}
                    </div>

                    {/* Explicação */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl lg:text-4xl font-semibold text-zinc-900 mb-6">
                            Um Convite Especial
                        </h2>
                        <p className="text-zinc-900 text-lg leading-relaxed">
                            Descubra como fortalecer seu casamento na fé, aprender com testemunhos reais e crescer espiritualmente junto ao seu cônjuge. Assista ao vídeo e embarque nessa jornada de amor e compromisso com Cristo.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgapeCasaisPage;
