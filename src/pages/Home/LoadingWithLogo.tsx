import { useState, useEffect } from "react";
import "./LoadingWithLogo.css"; // Importe o CSS para animação

const LoadingWithLogo = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento da página por 3 segundos
    const timer = setTimeout(() => {
      setLoading(false); // Após 3 segundos, a logo desaparece e o conteúdo é carregado
    }, 3000);

    return () => clearTimeout(timer); // Limpa o timer quando o componente for desmontado
  }, []);

  return (
    <div className={`loading-screen ${loading ? "show" : "hide"}`}>
      {loading ? (
        <div className="logo-container">
          <img
            src="https://github.com/AdsonVicente/ImagensUrlDados/blob/main/logo.png?raw=true"
            alt="Logo"
            className="logo"
          />
        </div>
      ) : (
        <div className="content">
          {/* Aqui você pode renderizar o conteúdo principal da página */}
        </div>
      )}
    </div>
  );
};

export default LoadingWithLogo;
