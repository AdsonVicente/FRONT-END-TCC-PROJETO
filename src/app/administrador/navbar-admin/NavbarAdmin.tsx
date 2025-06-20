'use client';

import { useState, memo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const NAV_ITEMS = [
  { name: 'Painel Principal', href: '/administrador/dashboard' },
  { name: 'Gerenciar Conteúdo', href: '/administrador/gerenciamento/conteudos' },
  { name: 'Gerenciar Liturgia', href: '/administrador/gerenciamento/liturgia' },
  { name: 'Gerenciar Evento', href: '/administrador/gerenciamento/eventos/gerenciar' },
  { name: 'Gerenciar Categoria', href: '/administrador/gerenciamento/categoria' },
  { name: 'Meus Dados', href: '/administrador/gerenciamento/administrador/editar' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <header className=" top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between  py-4">
        {/* Logo */}
        <Link
          href="/administrador/dashboard"
          className="text-2xl font-extrabold tracking-wide text-white hover:text-blue-200 transition"
        >

        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="sm:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded p-2"
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="w-6 h-6" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium text-lg px-3 py-1 rounded transition-colors duration-200 ${isActive
                    ? 'bg-white bg-opacity-20 text-yellow-300 underline underline-offset-4'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 text-red-400 hover:text-red-500 hover:bg-white hover:bg-opacity-10 rounded transition focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Sair
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <aside className="fixed top-0 left-0 w-72 h-screen bg-white z-50 shadow-2xl animate-slide-in">
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200">
            <h2 className="text-xl font-bold text-blue-800">Menu</h2>
            <button
              onClick={toggleMobileMenu}
              aria-label="Fechar menu"
              className="text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-2"
            >
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col px-4 py-6 gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-4 py-2 text-lg font-medium transition-colors duration-200 ${isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-blue-900 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 px-4 py-2 mt-6 text-red-500 hover:bg-red-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sair da Conta
            </button>
          </nav>
        </aside>
      )}

      {/* Mobile Sidebar Animation */}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.2s ease;
        }
      `}</style>
    </header>
  );
};

export default memo(Navbar);
