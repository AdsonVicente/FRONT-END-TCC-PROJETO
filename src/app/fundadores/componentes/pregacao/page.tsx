"use client";

import React from "react";
import { motion } from "framer-motion";
import { Facebook, Link as LinkIcon, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

const shareUrl = typeof window !== "undefined" ? window.location.href : "";

const handleCopyLink = () => {
  if (typeof window !== "undefined" && navigator?.clipboard) {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copiado com sucesso!");
  }
};

interface PregacaoSectionProps {
  title: string;
  subtitle: string;
  audioSrc: string;
  coverImage?: string;
  outrasFormacoes?: { title: string; audioSrc: string; date: string }[];
}

const PregacaoSection: React.FC<PregacaoSectionProps> = ({
  title,
  subtitle,
  audioSrc,
  coverImage,
  outrasFormacoes = [],
}) => {
  return (
    <motion.section
      className="py-16 px-4 md:px-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto bg-yellow-200 border shadow-xl rounded-2xl p-8 md:p-12 backdrop-blur">
        <div className="text-center mb-8">
          <h3 className="text-sm text-yellow-700 uppercase tracking-wide font-semibold mb-2">
            Momento com o Fundador
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-2 font-display">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-zinc-700 italic font-serif">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-10">
          {coverImage && (
            <Image
              width={600}      // ajuste para o tamanho real ou desejado
              height={400}
              src={coverImage}
              alt="Imagem do fundador"
              className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-full border-4 border-yellow-400 shadow"
            />
          )}

          <div className="flex-1 bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow w-full">
            <audio controls className="w-full mb-2 rounded-md">
              <source src={audioSrc} type="audio/mpeg" />
              Seu navegador não suporta o áudio.
            </audio>
            <p className="text-zinc-600 text-sm italic text-center">
              “Escute com fé. Deus fala através de Seus servos.”
            </p>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-3 mb-10">
          <a
            href={`https://wa.me/?text=Escute%20esta%20pregação:%20${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm shadow"
          >
            <FaWhatsapp className="w-4 h-4" /> WhatsApp
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm shadow"
          >
            <Facebook className="w-4 h-4" /> Facebook
          </a>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-800 text-white px-4 py-2 rounded-full text-sm shadow"
            type="button"
          >
            <LinkIcon className="w-4 h-4" /> Copiar link
          </button>
        </div>

        <div className="text-center mb-6">
          <Link
            href="/fundadores/componentes/corte-fundador"
            className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-800 text-white px-6 py-3 rounded-full shadow-md text-base font-medium transition duration-300"
          >
            Ver outras formações <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {outrasFormacoes.length > 0 && (
          <div className="mt-12">
            <h4 className="text-lg font-semibold text-zinc-700 mb-4">
              Outras formações
            </h4>
            <div className="grid gap-6 md:grid-cols-2">
              {outrasFormacoes.map((formacao, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <h5 className="text-sm font-medium text-zinc-800">{formacao.title}</h5>
                  <p className="text-xs text-zinc-500">{formacao.date}</p>
                  <audio controls className="w-full mt-2">
                    <source src={formacao.audioSrc} type="audio/mpeg" />
                  </audio>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default PregacaoSection;
