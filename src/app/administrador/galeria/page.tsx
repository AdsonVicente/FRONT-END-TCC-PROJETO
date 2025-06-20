'use client';

import { useState, useEffect, FormEvent } from 'react';
import { api } from '@/app/services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

export default function AdminGaleriaPage() {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error('Por favor, selecione uma imagem.');
      return;
    }
    if (!categoria) {
      toast.error('Por favor, selecione uma categoria.');
      return;
    }

    setEnviando(true);

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('categoria', categoria);
      formData.append('file', file);

      await api.post('/galeria', formData);

      toast.success('Imagem enviada com sucesso!');
      setTitulo('');
      setCategoria('');
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao enviar imagem.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Gerenciar Galeria
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div>
            <label
              htmlFor="titulo"
              className="block font-medium text-gray-700 mb-1"
            >
              Título da imagem:
            </label>
            <input
              id="titulo"
              type="text"
              placeholder="Digite o título da imagem"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              disabled={enviando}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categoria */}
          <div>
            <label
              htmlFor="categoria"
              className="block font-medium text-gray-700 mb-1"
            >
              Categoria:
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              disabled={enviando}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Selecione a categoria
              </option>
              <option value="eventos">Eventos</option>
              <option value="retreats">Retiros</option>
              <option value="projetos">Projetos Sociais</option>
              <option value="acampamentos">Acampamentos</option>
              <option value="comunidade">Comunidade</option>
              <option value="membros">Membros</option>
              <option value="missas">Missas</option>
              <option value="missoes">Missões</option>
              <option value="setor-misto">Setor Misto</option>
              <option value="setor-jovem">Setor Jovem</option>
              <option value="setor-crianca">Setor Criança</option>
              <option value="setor-familia">Setor Família</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          {/* Imagem */}
          <div>
            <label
              htmlFor="file"
              className="block font-medium text-gray-700 mb-1"
            >
              Selecione uma imagem:
            </label>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              disabled={enviando}
              className="w-full"
            />
          </div>

          {/* Preview da imagem */}
          {previewUrl && (
            <div>
              <p className="font-medium mb-2">
                Confira se esta é a imagem correta:
              </p>
              <Image
                src={previewUrl}
                alt="Prévia da imagem"
                className="w-full max-h-64 object-contain border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={enviando}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              enviando
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {enviando ? 'Enviando...' : 'Enviar'}
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </main>
  );
}
