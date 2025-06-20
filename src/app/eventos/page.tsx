import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { format, isBefore, isAfter} from "date-fns";
import React from "react";

export const metadata: Metadata = {
    title: "Eventos | Comunidade",
    description: "Confira os próximos eventos e acampamentos da comunidade.",
};

interface Evento {
    id: string;
    titulo: string;
    descricao: string;
    data: string;
    banner: string;
    local: string;
    horario: string;
}

interface Conteudo {
    id: string;
    titulo: string;
    descricao: string;
    autor: string;
    banner: string;
    publicadoEm: string;
    categoriaId: string;
    categoria: {
        nome: string;
    };
}


async function fetchEventos(): Promise<Evento[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eventos`, {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Erro ao buscar eventos");
    return res.json();
}

function separarEventos(eventos: Evento[]) {
    const hoje = new Date();
    const startOfToday = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        hoje.getDate()
    );
    const futuros = eventos.filter((evento) => {
        const dataEvento = new Date(evento.data);
        return (
            isAfter(dataEvento, startOfToday) ||
            format(dataEvento, "yyyy-MM-dd") === format(startOfToday, "yyyy-MM-dd")
        );
    });
    const passados = eventos.filter((evento) => {
        const dataEvento = new Date(evento.data);
        return isBefore(dataEvento, startOfToday);
    });
    return { futuros, passados };
}

function Countdown({ date }: { date: string }) {
    const eventDate = new Date(date);
    const now = new Date();
    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );
    if (isBefore(eventDate, startOfToday)) {
        return <span className="text-gray-500">Evento encerrado</span>;
    }
    if (format(eventDate, "yyyy-MM-dd") === format(startOfToday, "yyyy-MM-dd")) {
        return <span className="text-green-600">É hoje!</span>;
    }
    const diff = eventDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return <span className="text-orange-600">Faltam {days} dias</span>;
}

function CardEvento({ evento }: { evento: Evento }) {
    const descricaoSanitizada = DOMPurify.sanitize(evento.descricao);
    return (
        <div className="flex flex-col h-full">

            <Link href={`/eventos/${evento.id}`}>
                <Image
                    src={evento.banner}
                    alt={evento.titulo}
                    width={600}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            </Link>
            <div className="p-5 flex flex-col flex-1 justify-between">
                <Link href={`/eventos/${evento.id}`}>
                    <h3 className="text-2xl font-bold text-gray-800 font-display mb-2 hover:text-orange-500 transition-colors">
                        {evento.titulo.charAt(0).toUpperCase() + evento.titulo.slice(1)}
                    </h3>
                </Link>
                <div
                    className="line-clamp-3 text-gray-700 font-medium text-sm mb-4"
                    dangerouslySetInnerHTML={{ __html: descricaoSanitizada }}
                />
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-gray-500">
                        {format(new Date(evento.data), "dd/MM/yyyy")} - {evento.local}
                    </span>
                    <Link
                        href="/inscricao"
                        className="bg-red-500 text-white py-2 px-2 rounded-md font-semibold hover:bg-red-600 transition-colors"
                    >
                        Inscrever-se
                    </Link>
                </div>
            </div>

        </div>
    );
}

function CardEventoRecente({ evento }: { evento: Conteudo }) {
    return (
        <div className="p-4 rounded-lg transition-transform transform hover:scale-105 bg-white shadow flex flex-col h-full">
            <Link href={`/eventos/${evento.id}`} className="block">
                <Image
                    src={evento.banner}
                    alt={evento.titulo}
                    width={600}
                    height={240}
                    className="w-full h-60 object-cover rounded-t-lg mb-4"
                />
                <h1
                    className="text-xl font-semibold text-gray-800 mb-2 truncate"
                    dangerouslySetInnerHTML={{ __html: evento.titulo }}
                />
                <p
                    className="text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(evento.descricao),
                    }}
                />
            </Link>
        </div>
    );
}

function FAQ() {
    const faqs = [
        {
            question:
                "Quais são as idades permitidas para participar dos acampamentos?",
            answer:
                "O Acampamento está destinado a jovens participantes dos grupos de oração ou jovens que irão ter sua primeira experiência no acampamento. As idades variam de 12 a 18 anos, mas temos atividades para todas as idades.",
        },
        {
            question: "O que devo levar para o acampamento?",
            answer:
                "Recomendamos trazer itens pessoais de higiene, roupas confortáveis, Bíblia, caderno e caneta para anotações.",
        },
        {
            question: "Há custo para participar do acampamento?",
            answer:
                "Sim, há uma taxa de inscrição que cobre alimentação, hospedagem e materiais de apoio. Consulte os detalhes no momento da inscrição.",
        },
    ];
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-lg border bg-white shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {faq.question}
                    </h3>
                    <p className="text-gray-700">{faq.answer}</p>
                </div>

            ))}

        </div>
    );
}

export default async function Page() {
    let eventos: Evento[] = [];
    try {
        eventos = await fetchEventos();
    } catch {
        
    }

    const { futuros, passados } = separarEventos(eventos);

    const eventosRecentes: Conteudo[] = passados.map((evento) => ({
        id: evento.id,
        titulo: evento.titulo,
        descricao: evento.descricao,
        autor: "",
        banner: evento.banner,
        publicadoEm: evento.data,
        categoriaId: "",
        categoria: { nome: "evento" },
    }));

    return (
        <main className="max-w-7xl mx-auto px-4 py-10">
            <section className="mb-16">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
                    Próximos Eventos
                    <span className="block h-1 bg-gradient-to-r from-red-500 to-orange-400 w-32 mx-auto mt-4 rounded"></span>
                </h2>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Events Area */}
                    <div className="flex-1">
                        {futuros.length === 0 ? (
                            <div className="text-center text-gray-600 bg-white rounded-lg shadow p-8">
                                Nenhum evento encontrado para a data selecionada.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Destaque para o evento mais próximo */}
                                {futuros[0] && (
                                    <div className="md:col-span-2">
                                        <div className="bg-gradient-to-br from-orange-100 to-white rounded-xl shadow-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-orange-200 transition-shadow">
                                            <div className="w-full md:w-2/5">
                                                <Image
                                                    src={futuros[0].banner}
                                                    alt={futuros[0].titulo}
                                                    width={600}
                                                    height={250}
                                                    className="w-full h-56 object-cover rounded-lg shadow"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col gap-2">
                                                <Link href={`/eventos/${futuros[0].id}`}>
                                                    <h3 className="text-3xl font-bold text-gray-800 font-display hover:text-orange-500 transition-colors">
                                                        {futuros[0].titulo.charAt(0).toUpperCase() + futuros[0].titulo.slice(1)}
                                                    </h3>
                                                </Link>
                                                <div
                                                    className="line-clamp-4 text-gray-700 font-medium text-base mb-2"
                                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(futuros[0].descricao) }}
                                                />
                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="text-base text-gray-500">
                                                        {format(new Date(futuros[0].data), "dd/MM/yyyy")} - {futuros[0].local}
                                                    </span>
                                                    <Countdown date={futuros[0].data} />
                                                    <Link
                                                        href="/inscricao"
                                                        className="bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600 transition-colors"
                                                    >
                                                        Inscrever-se
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Outros eventos futuros */}
                                {futuros.slice(1, 4).map((evento) => (
                                    <div key={evento.id}>
                                        <CardEvento evento={evento} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Sidebar */}
                    <aside className="hidden lg:block w-80">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h4 className="text-lg font-bold text-gray-800 mb-4">Links Úteis</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/noticias" className="text-orange-600 hover:underline">
                                            Noticias
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contato" className="text-orange-600 hover:underline">
                                            Fale conosco
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/galeria" className="text-orange-600 hover:underline">
                                            Nossa Galeria 
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-r from-orange-200 to-yellow-100 rounded-xl shadow p-4">
                                <h5 className="font-semibold text-gray-700 mb-2">Próximos Eventos</h5>
                                <ul className="space-y-1">
                                    {futuros.slice(0, 3).map((ev) => (
                                        <li key={ev.id}>
                                            <Link href={`/eventos/${ev.id}`} className="text-sm text-gray-800 hover:text-orange-600">
                                                {format(new Date(ev.data), "dd/MM")} - {ev.titulo}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
                    Eventos Recentes
                    <span className="block h-1 bg-gradient-to-r from-green-500 to-blue-400 w-24 mx-auto mt-4 rounded"></span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {eventosRecentes.slice(0, 6).map((evento) => (
                        <CardEventoRecente key={evento.id} evento={evento} />
                    ))}
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
                    Acampamentos
                </h2>
                <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
                    <div className="md:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            Nosso Acampamento
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Nossos acampamentos são momentos especiais de encontro e vivência
                            da fé. Oferecemos atividades para todas as idades, com foco na
                            espiritualidade e na convivência comunitária.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <iframe
                                src="https://www.youtube.com/embed/CrIm88niszM"
                                title="Vídeo do Acampamento 1"
                                className="w-full h-48 rounded-lg shadow-lg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <iframe
                                src="https://www.youtube.com/embed/ZeOVn5QaaG8"
                                title="Vídeo do Acampamento 2"
                                className="w-full h-48 rounded-lg shadow-lg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>

            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                    Dúvidas sobre os Acampamentos?
                </h2>
                <FAQ />
            </section>
        </main>
    );
}
