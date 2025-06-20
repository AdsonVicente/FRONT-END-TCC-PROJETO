import React, { Suspense } from 'react';
import GerenciarConteudosPage from './GerenciarConteudos';

export default function Page() {
  return (
    <div>
      <h1>Minha página</h1>
      <Suspense fallback={<div>Carregando...</div>}>
        <GerenciarConteudosPage />
      </Suspense>
    </div>
  );
}
