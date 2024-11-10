import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Conteudo {
  id: string;
  titulo: string;
}

interface ConteudosModalProps {
  isOpen: boolean;
  onClose: () => void;
  conteudos: Conteudo[];
}

const ConteudosModal: React.FC<ConteudosModalProps> = ({
  isOpen,
  onClose,
  conteudos,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(conteudos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentConteudos = conteudos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Conteúdos do Administrador
        </h3>

        {conteudos.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum conteúdo criado ainda.
          </p>
        ) : (
          <>
            <ul>
              {currentConteudos.map((conteudo) => (
                <li key={conteudo.id} className="mb-4">
                  <div className="p-4 border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <Link to={`/conteudos/${conteudo.id}`}>
                      <div className="mb-2">
                        <strong className="text-gray-700">ID:</strong>{" "}
                        {conteudo.id} <br />
                        <strong className="text-gray-700">Título:</strong>{" "}
                        {conteudo.titulo}
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                        Ver Conteúdo
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Anterior
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Próximo
              </button>
            </div>
          </>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ConteudosModal;
