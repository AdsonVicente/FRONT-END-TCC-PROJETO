import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BemVindoSecao = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src =
      "https://github.com/AdsonVicente/ImagensUrlDados/blob/main/slide.jpg?raw=true";
    img.onload = () => setLoading(false);
  }, []);

  return (
    <section
      className="hidden lg:flex lg:items-center lg:justify-center relative h-screen overflow-hidden"
      style={{
        backgroundImage: `url('https://github.com/AdsonVicente/ImagensUrlDados/blob/main/slide.jpg?raw=true')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "60vh",
        maxHeight: "80vh",
        width: "100%",
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 lg:h-16 lg:w-16">
            {/* Loader animation */}
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              Bem-Vindo
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            >
              Junte-se a nós em uma jornada de fé e amor. Explore nossas
              atividades, eventos e muito mais!
            </motion.p>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default BemVindoSecao;
