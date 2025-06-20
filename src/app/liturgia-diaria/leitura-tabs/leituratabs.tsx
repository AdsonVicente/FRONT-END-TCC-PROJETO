'use client';
import { useState } from 'react';

export default function LeituraTabs({
  liturgia,
}: {
  liturgia: {
    primeiraLeitura: string;
    segundaLeitura?: string;
    salmoResponsorial: string;
    evangelho: string;
  };
}) {
  const [leituraSelecionada, setLeituraSelecionada] = useState<'primeira' | 'segunda' | 'salmo' | 'evangelho'>(
    'primeira'
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => setLeituraSelecionada('primeira')}
          className={`px-4 py-2 border-2 rounded-md ${
            leituraSelecionada === 'primeira' ? 'border-yellow-400' : 'hover:bg-yellow-500'
          } text-zinc-900`}
        >
          1ª Leitura
        </button>

        {liturgia.segundaLeitura?.trim() && (
          <button
            onClick={() => setLeituraSelecionada('segunda')}
            className={`px-4 py-2 border-2 rounded-md ${
              leituraSelecionada === 'segunda' ? 'border-yellow-400' : 'hover:bg-yellow-500'
            } text-zinc-900`}
          >
            2ª Leitura
          </button>
        )}

        <button
          onClick={() => setLeituraSelecionada('salmo')}
          className={`px-4 py-2 border-2 rounded-md ${
            leituraSelecionada === 'salmo' ? 'border-yellow-400' : 'hover:bg-yellow-500'
          } text-zinc-900`}
        >
          Salmo
        </button>

        <button
          onClick={() => setLeituraSelecionada('evangelho')}
          className={`px-4 py-2 border-2 rounded-md ${
            leituraSelecionada === 'evangelho' ? 'border-yellow-400' : 'hover:bg-yellow-500'
          } text-zinc-900`}
        >
          Evangelho
        </button>
      </div>

      <div className="text-left sm:text-justify">
        {leituraSelecionada === 'primeira' && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-center">Primeira Leitura</h3>
            <p
              className="font-normal text-base whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: liturgia.primeiraLeitura }}
            />
          </div>
        )}

        {leituraSelecionada === 'segunda' && liturgia.segundaLeitura?.trim() && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-center">Segunda Leitura</h3>
            <p
              className="font-normal text-base whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: liturgia.segundaLeitura }}
            />
          </div>
        )}

        {leituraSelecionada === 'salmo' && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-center">Salmo Responsorial</h3>
            <p
              className="font-normal text-base whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: liturgia.salmoResponsorial }}
            />
          </div>
        )}

        {leituraSelecionada === 'evangelho' && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-center">Evangelho</h3>
            <p
              className="font-normal text-base whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: liturgia.evangelho }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
