import Link from "next/link";
import { format } from "date-fns";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { notFound } from "next/navigation";
import { api } from "../../services/api"; // ajuste o caminho conforme seu projeto
import BackButton from "@/app/componentes/BackButton";
import { Metadata } from "next";
import Image from "next/image";

interface Noticia {
    id: string;
    titulo: string;
    descricao: string;
    autor: string;
    banner: string;
    publicadoEm: string;
    categoriaId: string;
    categoria: {
        id: string;
        nome: string;
    };
}

function stripHtmlTags(html: string) {
    if (typeof window === "undefined") {
        return html.replace(/<[^>]+>/g, "");
    } else {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
}

interface PageProps {
    params: {
        id: string;
    };
}
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = params;

    try {
        const response = await api.get(`/conteudos/${id}`);
        const data = response.data;

        const title = data.titulo || "Notícia";
        const description = data.descricao
            ? data.descricao.replace(/<[^>]*>/g, "").slice(0, 150)
            : "Confira essa notícia em nosso site.";
        const imageUrl = data.banner?.startsWith("http") ? data.banner : "";


        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: `https://comagape/conteudos/${id}`,
                type: "article",
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [imageUrl],
            },
        };
    } catch {
        return {
            title: "Conteúdo não encontrado",
            description: "Este conteúdo não foi encontrado no site.",
        };
    }
}
export default async function DetalheConteudo({ params }: PageProps) {
    const { id } = params;

    // Faz a requisição no servidor
    const response = await api.get(`/conteudos/${id}`);

    if (!response.data) {
        return notFound();
    }

    const data = response.data;

    const noticia: Noticia = {
        id: data.id,
        titulo: data.titulo,
        descricao: data.descricao,
        autor: data.autor,
        banner: data.banner,
        publicadoEm: data.publicadoEm,
        categoriaId: data.categoryId,
        categoria: data.category ?? { id: "", nome: "Sem categoria" },
    };

    const imageUrl = noticia.banner.startsWith("http")
        ? noticia.banner
        : `https://res.cloudinary.com/dd7vxtdc0/conteudos/${noticia.banner}`;

    const formattedDate = noticia.publicadoEm
        ? format(new Date(noticia.publicadoEm), "dd 'de' MMMM 'de' yyyy")
        : "Data não disponível";

    // Como estamos no servidor, window não existe. Para shareUrl, deixar vazio ou tratar no client
    const shareUrl = "";

    const getShareText = () => {
        const title = stripHtmlTags(noticia.titulo);
        const description = stripHtmlTags(noticia.descricao).slice(0, 150);
        return `${title}\n\n${description}...\n\nLeia mais em: ${shareUrl}`;
    };

    const socialMediaLinks = [
        {
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            icon: <FaFacebookF size={24} />,
            color: "text-blue-600",
            hover: "hover:text-blue-800",
        },
        {
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`,
            icon: <FaTwitter size={24} />,
            color: "text-blue-400",
            hover: "hover:text-blue-600",
        },
        {
            href: `https://wa.me/?text=${encodeURIComponent(getShareText())}`,
            icon: <FaWhatsapp size={24} />,
            color: "text-green-500",
            hover: "hover:text-green-700",
        },
    ];

    return (
        <div className="container mx-auto py-8 px-4 md:px-8 max-w-5xl relative">

            <div className="fixed top-1/3 right-4 z-50 flex flex-col space-y-4">
                {socialMediaLinks.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-white p-3 rounded-full shadow-lg transition transform hover:scale-110 ${link.color} ${link.hover}`}
                    >
                        {link.icon}
                    </a>
                ))}
            </div>

            <nav className="text-sm text-gray-600 mb-6">
                <ul className="flex flex-wrap space-x-2 items-center">
                    <li>
                        <Link href="/" className="hover:underline text-blue-600">
                            Início
                        </Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link href="/componentes/pesquisa" className="hover:underline text-blue-600">
                            Categorias
                        </Link>
                    </li>
                    <li>/</li>
                    <li>
                        <h2 className="capitalize">{noticia.categoria?.nome}</h2>
                    </li>
                    <li>/</li>
                    <li
                        className="text-gray-400 truncate max-w-xs sm:max-w-none"
                        dangerouslySetInnerHTML={{ __html: noticia.titulo }}
                    ></li>
                </ul>
            </nav>

            <div className="flex justify-between items-center mb-6">
                <BackButton />
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <p>{formattedDate}</p>
                    <span className="hidden md:block">|</span>
                    <p className="hidden md:block">
                        Autor: <span className="font-semibold" dangerouslySetInnerHTML={{ __html: noticia.autor }} />
                    </p>
                </div>
            </div>
            <h1
                className="capitalize text-4xl md:text-5xl font-bold mb-6 text-gray-800"
                dangerouslySetInnerHTML={{ __html: noticia.titulo }}
            />

            <div className="flex justify-center mb-8">
                <Image
                    src={imageUrl}
                    alt={`Imagem ilustrativa da notícia: ${stripHtmlTags(noticia.titulo)}`}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                    style={{ maxHeight: "500px" }}
                />
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 mx-auto mb-8 custom-html-content">
                {noticia.descricao.split("\n").map((paragraph, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
            </div>

            <hr className="my-8" />
            <div className="text-sm text-gray-500 text-center">
                Publicado em {formattedDate} — Categoria: <strong>{noticia.categoria.nome}</strong>
                <br />
                Autor:{" "}
                <span
                    className="font-semibold"
                    dangerouslySetInnerHTML={{ __html: noticia.autor }}
                />
            </div>
        </div>
    );
}
