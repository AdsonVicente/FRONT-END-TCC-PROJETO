import React, { Suspense } from 'react';
import SearchPage from './pesquisar';

export default function Page() {
  return (
    <div>
      <h1>Minha página</h1>
      <Suspense fallback={<div>Carregando...</div>}>
        <SearchPage />
      </Suspense>
    </div>
  );
}
