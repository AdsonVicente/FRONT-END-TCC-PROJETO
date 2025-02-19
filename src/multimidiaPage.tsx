import { useState } from "react";

export default function MultimediaPage() {
    const imagens = [
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8814.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8817.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8738.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8741.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8743.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8746.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8747.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8748.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8751.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8764.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8793.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8806.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8807.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8821.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8823.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8828.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8822.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8824.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8825.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8818.JPG?raw=true",

        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8809.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8779.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8784.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8768.JPG?raw=true",
        "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/IMG_8787.JPG?raw=true",







    ];
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 6;

    const indexOfLastImage = currentPage * imagesPerPage;
    const currentImages = imagens.slice(0, indexOfLastImage);
    const hasMore = indexOfLastImage < imagens.length;

    return (
        <div className="text-center font-sans p-6 bg-white min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Galeria da Comunidade</h1>
            <p className="text-lg text-gray-600 mb-8">Momentos especiais vividos pela nossa comunidade.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentImages.map((img, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-lg bg-white relative">
                        <img
                            src={img}
                            alt={`Imagem ${index + 1}`}
                            className="w-full h-64 object-cover transform transition duration-500 hover:scale-105"
                            loading="lazy"

                        />
                        <a
                            href={img}
                            download
                            className="absolute bottom-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition"
                        >
                            Baixar
                        </a>
                    </div>
                ))}
            </div>

          
            {hasMore && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        Carregar Mais
                    </button>
                </div>
            )}
        </div>
    );
}
