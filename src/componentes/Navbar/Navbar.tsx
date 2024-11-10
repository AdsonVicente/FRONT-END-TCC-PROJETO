import { useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faPlay,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const NavbarItems = [
  { name: "Sobre nós", href: "/historia" },
  { name: "Nossos Fundadores", href: "/fundadores" },
  { name: "Contato", href: "/contato" },
];

const NavbarMobile = [
  { name: "História", href: "/historia" },
  { name: "Fundadores", href: "/fundadores" },
  { name: "Notícias", href: "/noticias" },
  { name: "Formação", href: "/formacao" },
  { name: "Eventos", href: "/eventos" },
  { name: "Liturgia", href: "/liturgia-diaria" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery(""); // Limpa o campo de busca após a pesquisa
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md p-6">
      <nav className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Logo e Nome */}
        <div className="flex items-center w-full justify-between lg:justify-start">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl lg:text-3xl font-bold text-red-500 hover:text-yellow-600">
              Comunidade Católica Ágape
            </h1>
          </Link>
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-red-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
        </div>

        {/* Barra de Navegação Inferior Desktop */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6 lg:w-full">
          <div className="relative group">
            <button
              className="flex items-center text-gray-700 hover:text-red-600 uppercase font-semibold"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Comunidade
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>
            {dropdownOpen && (
              <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                {NavbarItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {NavbarMobile.slice(2).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 hover:text-red-600 uppercase font-semibold"
            >
              {item.name}
            </Link>
          ))}
          {/* Barra de Pesquisa e Rádio ao Vivo */}
          <form
            onSubmit={handleSearch}
            className="flex items-center space-x-4 ml-4"
          >
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="p-2 text-gray-500 hover:text-red-600"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <Link
            to="/Radio"
            target="_blank"
            className="flex items-center bg-red-600 hover:bg-red-700 rounded-full py-2 px-4 ml-4 text-white text-sm font-medium transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
          >
            <FontAwesomeIcon icon={faPlay} className="mr-2 text-lg" />
            <span className="font-semibold">Rádio</span>
          </Link>
        </div>
      </nav>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200">
          <div className="px-4 py-2">
            <form onSubmit={handleSearch} className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 w-full"
              />
              <button
                type="submit"
                className="p-2 text-gray-500 hover:text-red-600"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            {NavbarMobile.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-2 text-black hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default memo(Navbar);
