import React from "react";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-900 text-gray-200 pt-14 pb-8 shadow-inner">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-stone-700 pb-10 mb-10 gap-10">
                    {/* Logo & Name */}
                    <div className="flex flex-col items-center md:items-start md:w-1/3">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="text-3xl font-bold text-yellow-400 tracking-wide drop-shadow-lg">
                                Ágape
                            </span>
                        </div>
                        <span className="text-sm text-gray-400 font-medium">
                            Comunidade Católica Ágape
                        </span>
                        <span className="mt-2 text-xs text-gray-500">
                            Transformando vidas pelo amor de Cristo
                        </span>
                    </div>

                    {/* Social & Contact */}
                    <div className="flex flex-col items-center md:w-1/3">
                        <h4 className="text-lg font-semibold mb-3 text-yellow-400">Redes Sociais</h4>
                        <div className="flex space-x-6 mb-4">
                            <a
                                href="https://www.facebook.com/comcatolicaagape"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-500 transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <FaFacebookSquare className="h-8 w-8" />
                            </a>
                            <a
                                href="https://www.instagram.com/comunidadecatolicaagape/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-400 transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="h-8 w-8" />
                            </a>
                            <a
                                href="https://www.youtube.com/@comunidadecatolicaagape7242"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-red-500 transition-colors duration-300"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="h-8 w-8" />
                            </a>
                        </div>
                        <Link
                            href="/contato"
                            className="inline-block mt-2 px-5 py-2 rounded-full bg-yellow-400 text-stone-900 font-semibold shadow hover:bg-yellow-300 transition-colors duration-300 text-sm"
                        >
                            Fale Conosco
                        </Link>
                    </div>

                    {/* Association */}
                    <div className="flex flex-col items-center md:items-end md:w-1/3">
                        <h4 className="text-lg font-semibold mb-3 text-yellow-400">Associação</h4>
                        <Link
                            href="/sobre/associacao"
                            className="text-sm font-medium text-yellow-300 hover:text-red-300 transition-colors duration-300 underline underline-offset-4"
                        >
                            Saiba mais sobre a Associação da Comunidade
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-xs text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} <span className="font-semibold text-yellow-400">Comunidade Católica Ágape</span>. Todos os direitos reservados.
                    </p>
                    <p className="mt-2 italic text-gray-500">
                        “Tudo por amor, tudo pela salvação das almas.” – Santa Teresinha
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
