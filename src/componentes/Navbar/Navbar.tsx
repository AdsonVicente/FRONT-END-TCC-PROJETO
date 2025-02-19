import { useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faPlay,
  faSearch,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const NavbarItems = [
  { name: "Sobre Nós", href: "/historia" },
  { name: "Fundadores", href: "/fundadores" },
  { name: "Contato", href: "/contato" },
];

const NavbarMobile = [
  { name: "Notícias", href: "/noticias" },
  { name: "Formação", href: "/formacao" },
  { name: "Eventos", href: "/eventos" },
  { name: "Liturgia", href: "/liturgia-diaria" },
  { name: "Multimidia", href: "/multimidia" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-red-500 to-yellow-500 shadow-md">
      <nav className="container mx-auto flex flex-wrap items-center justify-between p-4 lg:p-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-3 text-white text-xl sm:text-2xl  font-bold"
          >
            <img
              src="https://github.com/AdsonVicente/ImagensUrlDados/blob/main/logo.png?raw=true"
              alt="Logo Comunidade Ágape"
              className="h-10 sm:h-12 w-auto"
            />
            <div className="lg:hidden px-5 text-white">
              <span>Comunidade Ágape</span>
            </div>
            <div className="hidden lg:block text-white">
              <span>Comunidade Ágape</span>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <div className="relative group">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white uppercase font-medium hover:text-yellow-200 flex items-center"
            >
              Comunidade
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`ml-2 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white rounded-lg shadow-lg mt-2 p-4 z-50">
                {NavbarItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white rounded-md transition-all"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NavbarMobile.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-white uppercase font-medium hover:text-yellow-200 transition-all"
            >
              {item.name}
            </Link>
          ))}

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button type="submit" className="text-white hover:text-yellow-200 transition-all">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          {/* Radio Button */}
          <Link
            to="/Radio"
            target="_blank"
            className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full px-6 py-2 flex items-center shadow-md transition-transform transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faPlay} className="mr-2" /> Rádio
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="p-4">
            {NavbarItems.concat(NavbarMobile).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-gray-700 py-2 px-4 hover:bg-yellow-500 hover:text-white rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
{/* Rádio Button */}
<Link
  to="/Radio"
  target="_blank"
  className="flex items-center justify-center bg-red-600 text-white py-2 rounded-md mt-4 shadow-md"
  onClick={() => setMobileMenuOpen(false)}
>
  <FontAwesomeIcon icon={faPlay} className="mr-2 text-lg" /> Rádio
</Link>

{/* Doação Button */}
<Link
  to="/Doacao"
  className="flex items-center justify-center bg-yellow-400 text-white 400 py-2 rounded-md mt-4 "
  onClick={() => setMobileMenuOpen(false)}
>
  <FontAwesomeIcon icon={faHeart} className="mr-2 text-lg" /> Doar Agora
</Link>

          </div>
        </div>
      )}
    </header>

  );
};

export default memo(Navbar);
