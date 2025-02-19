import { motion } from "framer-motion";


const AgapeKidsEvangelizationPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-semibold text-red-500">Página em Construção</h1>
        <p className="text-gray-700 mt-4">
          Estamos trabalhando para trazer esta página o mais rápido possível. Volte em breve!
        </p>
        <motion.div
          className="mt-6"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          🚧
        </motion.div>
      </motion.div>
    </div>
    );
};

export default AgapeKidsEvangelizationPage;
