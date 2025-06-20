// pages/admin-galeria.tsx
import { useState, useEffect } from 'react';
import { api } from '../services/api'; // ajuste o caminho conforme sua estrutura
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminGaleria() {
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('categoria', categoria);
    formData.append('file', file);

    try {
      await api.post('/galeria', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

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
    <div
      style={{
        maxWidth: 500,
        margin: '40px auto',
        padding: 20,
        border: '1px solid #ddd',
        borderRadius: 8,
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Gerenciar Galeria</h1>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="titulo"
          style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}
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
          style={{
            width: '100%',
            padding: 8,
            marginBottom: 20,
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: 16,
          }}
        />

        <label
          htmlFor="categoria"
          style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}
        >
          Categoria:
        </label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          disabled={enviando}
          style={{
            width: '100%',
            padding: 8,
            marginBottom: 20,
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          <option value="" disabled>
            Selecione a categoria
          </option>
          <option value="eventos">Eventos</option>
          <option value="retreats">Retiros</option>
          <option value="projetos">Projetos Sociais</option>
          <option value="Acampamentos">Acampamentos</option>
          <option value="Comunidade">Comunidade</option>
          <option value="Membros">Membros</option>
          <option value="Missas">Missas</option>
          <option value="Missões">Missões</option>
          <option value="Setor Misto">Setor Misto</option>
          <option value="Setor Jovem">Setor Jovem</option>
          <option value="Setor Criança">Setor Criança</option>
          <option value="Setor Familia">Setor Familia</option>
          <option value="outros">Outros</option>
        </select>

        <label
          htmlFor="file"
          style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}
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
          style={{ marginBottom: 20 }}
        />

        {previewUrl && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontWeight: 'bold' }}>
              Confira se esta é a imagem correta antes de enviar:
            </p>
            <img
              src={previewUrl}
              alt="Prévia da imagem"
              style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={enviando}
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 16,
            cursor: enviando ? 'not-allowed' : 'pointer',
          }}
        >
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
