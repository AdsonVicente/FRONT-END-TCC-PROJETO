import React from "react";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Associação da Comunidade */}
          <div className="mb-6 lg:mb-0 lg:w-1/3">
            <h3 className="text-xl font-semibold text-red-400 hover:text-red-300 transition-colors duration-300">
              <Link to="/associacao">Associação da Comunidade</Link>
            </h3>
          </div>

          {/* Redes Sociais */}
          <div className="lg:w-1/3 flex justify-center space-x-6 mb-6 lg:mb-0">
            <a
              href="https://www.facebook.com/agape"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors duration-300"
            >
              <FaFacebookSquare className="h-8 w-8" />
            </a>
            <a
              href="https://www.instagram.com/agape"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors duration-300"
            >
              <FaInstagram className="h-8 w-8" />
            </a>
            <a
              href="https://www.youtube.com/agape"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition-colors duration-300"
            >
              <FaYoutube className="h-8 w-8" />
            </a>
          </div>

          {/* Fale Conosco */}
          <div className="lg:w-1/3 text-center lg:text-right">
            <h3 className="text-xl font-semibold mb-2">Fale Conosco</h3>
            <Link
              to="/contato"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
            >
              Entre em contato conosco
            </Link>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Comunidade Católica Ágape. Todos
            os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
