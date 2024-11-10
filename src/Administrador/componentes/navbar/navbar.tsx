import { useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavbarItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Gerenciar Conteúdo", href: "/gerenciarconteudo" },
  { name: "Gerenciar Liturgia", href: "/gerenciarliturgia" },
  { name: "Gerenciar Evento", href: "/gerenciarevento" },
  { name: "Gerenciar Categoria", href: "/gerenciarcategoria" },
  { name: "Perfil", href: "/perfil" },
];

const NavbarMobile = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Gerenciar Conteúdo", href: "/gerenciarconteudo" },
  { name: "Gerenciar Liturgia", href: "/gerenciarliturgia" },
  { name: "Gerenciar Evento", href: "/gerenciarevento" },
  { name: "Gerenciar Categoria", href: "/gerenciarcategoria" },
  { name: "Perfil", href: "/perfil" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <header className="relative bg-zinc-900 text-white shadow-md p-4">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Button to open mobile menu */}
        <button
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
          type="button"
          className="inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Abrir menu</span>
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link to="/dashboard" className="text-xl font-bold text-red-500">
          Administração Comunidade
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden sm:flex items-center space-x-6">
          {NavbarItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-white hover:text-blue-400 font-semibold"
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center p-2 text-red-500 hover:text-red-400 font-semibold"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
            Sair da Conta
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <aside
          id="mobile-menu"
          className="fixed top-0 left-0 z-40 w-64 h-screen bg-zinc-900 transition-transform transform sm:translate-x-0"
        >
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-lg font-bold text-white">Menu</h2>
            <button
              aria-label="Fechar menu"
              className="text-gray-500 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2">
              {NavbarMobile.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center p-2 text-white hover:bg-gray-700 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 text-red-500 hover:bg-gray-700 rounded-lg w-full"
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="mr-2 text-red-500"
                  />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </header>
  );
};

export default memo(Navbar);
