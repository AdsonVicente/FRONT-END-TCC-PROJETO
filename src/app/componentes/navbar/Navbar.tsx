"use client";

import { useState, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark,
    faChevronDown,
    faPlay,
    faSearch,
    faHeart,
    faInfoCircle,
    faUsers,
    faEnvelope,
    faImages,
    faBookOpen,
    faNewspaper,
    faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavbarItems = [
    { name: "Sobre Nós", href: "/sobre", icon: faInfoCircle },
    { name: "Fundadores", href: "/fundadores", icon: faUsers },
    { name: "Contato", href: "/contato", icon: faEnvelope },
    { name: "Galeria", href: "/galeria", icon: faImages },
];

const NavbarLinks = [
    { name: "Liturgia Diária", href: "/liturgia-diaria", icon: faBookOpen },
    { name: "Notícias", href: "/conteudos", icon: faNewspaper },
    { name: "Formação", href: "/formacao", icon: faBookOpen },
    { name: "Eventos", href: "/eventos", icon: faCalendarAlt },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            router.push(`/componentes/pesquisa?query=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
            setMobileMenuOpen(false);
        }
    };


    return (
        <header className="w-full top-0 z-50 bg-yellow-400 shadow-md">
            <nav className="container mx-auto relative flex items-center justify-between p-4 lg:p-6">
                {/* Logo */}
                <div className="flex items-center text-white font-bold text-xl sm:text-2xl">
                    <Link href="/">
                        <span className="sm:inline text-red-700 font-serif">
                            Comunidade Ágape
                        </span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8">
                    {/* Dropdown */}
                    <div className="relative group">
                        <button
                            className="flex items-center text-white uppercase font-semibold hover:text-red-500"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            Comunidade
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className="ml-1 transition-transform duration-300 group-hover:rotate-180"
                            />
                        </button>
                        {dropdownOpen && (
                            <div
                                className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-48 z-50"
                                onMouseLeave={() => setDropdownOpen(false)}
                            >
                                {NavbarItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white transition flex items-center gap-2"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <FontAwesomeIcon icon={item.icon} />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Other Links */}
                    {NavbarLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-white uppercase font-semibold hover:text-red-500 transition flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            {item.name}
                        </Link>
                    ))}

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 rounded-full focus:ring-2 bg-white focus:ring-white outline-none text-gray-700"
                            aria-label="Buscar conteúdos"
                        />
                        <button
                            type="submit"
                            className="text-white hover:text-red-500 transition"
                            aria-label="Pesquisar"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>

                    {/* Rádio Button */}
                    <Link
                        href="/radio"
                        target="_blank"
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-full px-6 py-2 flex items-center shadow-lg transition-transform hover:scale-105"
                    >
                        <FontAwesomeIcon icon={faPlay} className="mr-2" /> Rádio
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden text-white text-2xl"
                >
                    <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <nav className="fixed top-0 left-0 w-64 max-w-full h-full bg-white z-50 p-5 flex flex-col shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-semibold text-red-700">Menu</span>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-red-700 hover:text-red-900 transition"
                        >
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 overflow-y-auto flex-grow pr-2">
                        {NavbarLinks.concat(NavbarItems).map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-800 hover:text-red-700 text-base font-medium flex items-center gap-3 px-2 py-3 rounded-md transition"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Search */}
                    <form
                        onSubmit={handleSearch}
                        className="mt-5 flex items-center gap-2 w-full"
                    >
                        <input
                            type="search"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700"
                        />
                        <button
                            type="submit"
                            className="text-red-700 hover:text-red-900 transition"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>

                    {/* Rádio e Doação */}
                    <div className="mt-8 flex flex-col gap-3">
                        <Link
                            href="/radio"
                            target="_blank"
                            className="bg-yellow-400 text-white rounded-full px-5 py-2 flex items-center justify-center shadow-sm hover:bg-yellow-500 transition transform hover:scale-105"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <FontAwesomeIcon icon={faPlay} className="mr-2" /> Rádio
                        </Link>
                        <Link
                            href="/doe-aqui"
                            className="text-red-700 hover:text-yellow-500 font-semibold flex items-center justify-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <FontAwesomeIcon icon={faHeart} className="mr-2" /> Doar Agora
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default memo(Navbar);
