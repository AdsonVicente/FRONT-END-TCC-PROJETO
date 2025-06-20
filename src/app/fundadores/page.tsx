"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";

interface PersonSectionProps {
    imgSrc: string;
    name: string;
    description: string[];
}

const PersonSection: React.FC<PersonSectionProps> = ({ imgSrc, name, description }) => (
    <motion.div
        className="grid md:grid-cols-2 gap-8 items-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
    >
        <div className="overflow-hidden rounded-lg shadow-xl">
            <motion.img
                src={imgSrc}
                alt={name}
                className="w-full h-auto transform transition duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
            />
        </div>
        <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-yellow-500 mb- font-script ">{name}</h2>
            <div className="text-lg text-zinc-900 leading-relaxed space-y-4">
                {description.map((para, index) => (
                    <p key={index}>{para}</p>
                ))}
            </div>
        </div>
    </motion.div>
);

const QuoteSection: React.FC<{ quote: string; author: string }> = ({ quote, author }) => (
    <motion.div
        className="py-10 px-8 md:px-16 rounded-lg text-center my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
    >
        <p className="text-2xl md:text-3xl font-serif italic text-red-500 mb-6 leading-relaxed">&ldquo;{quote}&rdquo;</p>
        <p className="text-lg md:text-2xl font-semibold text-yellow-500 tracking-wide">— {author}</p>
    </motion.div>
);

const Fundadores: React.FC = () => (
    <div className="py-16">
        <Head>
            <title>Fundadores</title>
        </Head>
        <section className="container mx-auto px-4 md:px-8">
            {/* Fundador 1 */}
            <PersonSection
                imgSrc="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1745150509/cd3anl5xjz9jnxkkzka2.jpg"
                name="Cleverson Silva Santos"
                description={[
                    "Cleverson Silva Santos nasceu em Tobias Barreto, uma encantadora cidade no interior de Sergipe. Em sua adolescência, mudou-se para Aracaju com o objetivo de se preparar para o vestibular. Lá, encontrou a Comunidade Católica Shalom e teve um profundo encontro com Nosso Senhor Jesus Cristo.",
                    "Na Comunidade Shalom, Cleverson desempenhou um papel ativo como missionário e teve a oportunidade de servir em Itapipoca, no Ceará.",
                    "Ao voltar para sua cidade natal, notou a falta de opções atraentes para os jovens e a ausência de um espaço vibrante na paróquia. Decidido a fazer a diferença, procurou o pároco da época, Monsenhor, e ofereceu-se para liderar o grupo de jovens.",
                    "Com o apoio do pároco, Cleverson reabriu o grupo Água Viva. Embora o grupo tenha enfrentado desafios e sido fechado novamente, seu desejo de impactar a vida dos jovens nunca diminuiu.",
                    "No dia 10 de abril de 2004, ele lançou o Projeto Nova Juventude com um primeiro encontro no Educandário Nossa Senhora do Carmo. Desde então, sua dedicação tem transformado vidas e inspirado inúmeros jovens ao longo de 20 anos."
                ]}
            />

            {/* Cofundadora */}
            <PersonSection
                imgSrc="https://res.cloudinary.com/dd7vxtdc0/image/upload/v1745150614/n9qqa4hln0yef1dovuiw.jpg"
                name="Maria Ivone Paiva Soares"
                description={[
                    "Nossa Cofundadora, nasceu no Estado do Ceará, e desde muito cedo já era apaixonada pelas coisas do alto tendo ingressado na Comunidade Shalom, local este onde conheceu o Fundador Cleverson Silva.",
                    "Ivone e Cleverson vieram residir em Tobias Barreto – SE, local, este que inquietava os corações dos Fundadores, pela falta de jovens no meio Católico.",
                    "Ivone, é admirada por seu olhar materno e sereno, oferecendo um apoio constante e amoroso à nossa missão.",
                    "Maria Ivone foi, desde os primeiros passos desta obra, instrumento escolhido por Deus para que nossa comunidade nascesse, crescesse e se firmasse como um sinal vivo do amor de Cristo.",
                    "Com seu &apos;sim&apos; corajoso, inspirou e continua a inspirar muitos irmãos e irmãs na vivência do carisma Ágape, que é, acima de tudo, o amor que se doa sem reservas. Sua caminhada é marcada por uma espiritualidade profunda, dedicação incansável à evangelização e um amor singular pelos que buscam um encontro verdadeiro com Deus.",
                    "Maria Ivone não é apenas cofundadora, mas uma conselheira e amiga, que, com sua sabedoria, acolhe e orienta a todos com ternura e firmeza, sempre atenta à vontade de Deus e à moção do Espírito Santo.",
                    "Com seu exemplo de humildade, perseverança e zelo apostólico, inspira a todos nós a seguirmos firmes na missão, com a certeza de que Deus é fiel e conduz a Sua obra com mãos seguras."
                ]}

            />
            {/* Citação */}
            <QuoteSection quote="O Ágape é a misericórdia de Deus em minha vida." author="Cleverson Silva Santos" />

            <div className="border-t-2 border-gray-300 my-8"></div>

            {/* Chamada para Ação */}
            <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-6">Junte-se à Nossa Missão</h2>
                <p className="text-lg md:text-xl text-zinc-900 mb-8">
                    Descubra como você pode fazer a diferença e se engajar em nossa comunidade.
                </p>
                <Link
                    href="/contato"
                    className="inline-block bg-amber-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-stone-700 transition-transform duration-300 transform hover:scale-105"
                >
                    Entre em Contato
                </Link>
            </motion.div>
        </section>
    </div>
);

export default Fundadores;
