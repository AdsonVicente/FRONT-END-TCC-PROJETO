'use client';

import { useState } from 'react';

interface OracaoModalProps {
  isOpen: boolean;
  onClose: (dontShowAgain: boolean) => void;
}

const OracaoModal = ({ isOpen, onClose }: OracaoModalProps) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4 font-serif">
          Oração ao Espírito Santo
        </h2>
        <div className="text-gray-800 text-justify leading-relaxed font-serif space-y-4">
          <p>
            Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei
            neles o fogo do Vosso Amor. <br />
            Enviai o Vosso Espírito e tudo será criado, e renovareis a face da
            terra.
          </p>
          <p>
            <strong>Oremos:</strong> Ó Deus, que instruístes os corações dos
            vossos fiéis com a luz do Espírito Santo, fazei que apreciemos
            retamente todas as coisas segundo o mesmo Espírito e gozemos sempre
            da Sua consolação. Por Cristo Senhor Nosso. <strong>Amém.</strong>
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            id="dont-show"
            type="checkbox"
            checked={dontShowAgain}
            onChange={() => setDontShowAgain(!dontShowAgain)}
            className="accent-blue-600"
          />
          <label htmlFor="dont-show" className="text-sm text-gray-600">
            Não mostrar novamente hoje
          </label>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onClose(dontShowAgain)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Amém, continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OracaoModal;
