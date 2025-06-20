'use client';

import { useEffect, useState } from 'react';
import { api } from '../services/api';
import Image from 'next/image';

interface ImagemGaleria {
    id: number;
    titulo: string;
    imagemUrl: string;
    categoria: string;
}

interface GaleriaPorCategoria {
    categoria: string;
    imagens: ImagemGaleria[];
}

export default function GaleriaPage() {
    const [galeria, setGaleria] = useState<GaleriaPorCategoria[]>([]);
    const [categoriaAberta, setCategoriaAberta] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        api.get<ImagemGaleria[]>('/galeria')
            .then((res) => {
                const imagens = res.data;

                const agrupado = imagens.reduce((acc: GaleriaPorCategoria[], imagem: ImagemGaleria) => {
                    const cat = imagem.categoria ?? 'Sem Categoria';
                    const grupo = acc.find(g => g.categoria === cat);

                    if (grupo) {
                        grupo.imagens.push(imagem);
                    } else {
                        acc.push({ categoria: cat, imagens: [imagem] });
                    }


                    return acc;
                }, []);

                setGaleria(agrupado);
            })
            .catch((err: Error) => {
                console.error('Erro ao buscar galeria:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const handleToggleCategoria = (categoria: string) => {
        setCategoriaAberta((prev) => (prev === categoria ? null : categoria));
    };

    if (loading) {
        return (
            <p className="text-center text-lg mt-10">
                Carregando galeria...
            </p>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10">
                📷 Galeria da Comunidade
            </h1>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mb-10">
                {galeria.map(({ categoria, imagens }) => {
                    const imagemCapa = imagens[0];

                    return (
                        <div
                            key={categoria}
                            onClick={() => handleToggleCategoria(categoria)}
                            className={`cursor-pointer rounded-xl overflow-hidden transition ${categoriaAberta === categoria
                                ? 'ring-4 ring-blue-600'
                                : 'shadow-md'
                                } bg-white`}
                        >
                            <Image
                                width={600}
                                height={400}
                                src={imagemCapa?.imagemUrl}
                                alt={`Capa da categoria ${categoria}`}
                                className="w-full h-40 object-cover"
                            />
                            <div className="py-3 text-center font-semibold bg-gray-50">
                                {categoria}
                            </div>
                        </div>
                    );
                })}
            </div>

            {categoriaAberta && (
                <section className="mb-20">
                    <h2 className="text-2xl text-blue-600 text-center mb-6">
                        📁 {categoriaAberta}
                    </h2>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
                        {galeria
                            .find((g) => g.categoria === categoriaAberta)
                            ?.imagens.map(({ id, titulo, imagemUrl }) => (
                                <div
                                    key={id}
                                    className="rounded-lg overflow-hidden shadow-sm bg-white flex flex-col"
                                >
                                    <Image
                                        width={600}
                                        height={400}
                                        src={imagemUrl}
                                        alt={titulo}
                                        className="w-full h-36 object-cover"
                                    />
                                    <div className="p-2 text-center font-medium text-sm bg-gray-100">
                                        {titulo}
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            )}
        </div>
    );
}
