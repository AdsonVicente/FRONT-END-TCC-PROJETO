import { useEffect } from 'react';

interface ConteudosModalProps {
  isOpen: boolean;
  onClose: () => void;
  conteudos: {
    id: string;
    titulo: string;
    descricao: string;
    categoria: string;
  }[];
}

const ConteudosModal: React.FC<ConteudosModalProps> = ({ isOpen, onClose, conteudos }) => {
  // Fechar modal ao pressionar Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Bloqueia scroll da página
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose} // Fecha modal clicando fora da caixa
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Impede o fechamento clicando dentro do modal
        tabIndex={-1} // Para poder focar o container se desejar usar focus trap
      >
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          Conteúdos do Administrador
        </h2>

        {conteudos.length === 0 ? (
          <p className="text-gray-500">Nenhum conteúdo encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {conteudos.map((conteudo) => (
              <li key={conteudo.id} className="border-b pb-2">
                <h3 className="text-lg font-semibold">{conteudo.titulo}</h3>
                <p className="text-xs text-gray-500 mt-1">Categoria: {conteudo.categoria}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConteudosModal;
