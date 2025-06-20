'use client';

import React, { useEffect, useState } from 'react';

const mensagens = [
  '“A fé é a certeza das coisas que se esperam, a convicção de fatos que se não veem.” – Hebreus 11:1',
  '“Senhor, fazei-me instrumento de vossa paz.” – São Francisco de Assis',
  '“Tudo posso naquele que me fortalece.” – Filipenses 4:13',
  '“Não temas, porque eu estou contigo; não te assombres, porque eu sou o teu Deus.” – Isaías 41:10',
  '“A oração é a chave da manhã e o ferrolho da noite.” – Mahatma Gandhi (inspiração secular)',
  '“Aquele que tem Deus, nada lhe falta.” – Santo Agostinho',
  '“Deus não nos dá o que podemos suportar, mas nos ajuda a suportar o que nos é dado.”',
];

const MensagemEspiritual = () => {
  const [mensagem, setMensagem] = useState<string>('');

  useEffect(() => {
    const index = Math.floor(Math.random() * mensagens.length);
    setMensagem(mensagens[index]);
  }, []);

  return (
    <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-md shadow-sm mb-6 font-serif italic">
      <p>{mensagem}</p>
    </div>
  );
};

export default MensagemEspiritual;
