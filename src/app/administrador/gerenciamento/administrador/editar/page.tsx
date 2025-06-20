'use client';
interface Admin {
  id: string;
  nome: string;
  email: string;
  senha?: string; // Pode ser opcional se nem sempre for enviado
  tipo: string;
}


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { getAdminIdFromToken } from '../../../../../../utils/auth';
import { api } from '@/app/services/api';

import Input from '@/app/componentes/ui/Input';
import PasswordInput from '@/app/componentes/ui/PasswordInput';

export default function EditarMeuPerfil() {
  const router = useRouter();

  const [adminData, setAdminData] = useState<Admin>({
    id: '',
    nome: '',
    email: '',
    senha: '',
    tipo: '',
  });

  const [confirmSenha, setConfirmSenha] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      const adminId = getAdminIdFromToken();
      if (!adminId) {
        toast.error('Usuário não autenticado.');
        router.push('/login');
        return;
      }

      try {
        const response = await api.get(`/administrador/${adminId}`);
        setAdminData(response.data);
      } catch {
        toast.error('Erro ao carregar dados do administrador.');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const adminId = getAdminIdFromToken();
    if (!adminId) {
      toast.error('Usuário não autenticado.');
      return;
    }

    if (adminData.senha) {
      if (adminData.senha !== confirmSenha) {
        toast.error('As senhas não coincidem.');
        return;
      }
      if (!isSenhaForte(adminData.senha)) {
        toast.error(
          'A senha deve ter ao menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo.'
        );
        return;
      }
    }

    const dataToSend = { ...adminData };
    if (!adminData.senha) delete dataToSend.senha;

    try {
      await api.put(`/administrador/${adminId}`, dataToSend);
      toast.success('Perfil atualizado com sucesso!');
      router.push('/administrador/dashboard');
    } catch {
      toast.error('Erro ao atualizar perfil.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-600">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-stone-100 px-4">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-lg border">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Editar Meu Perfil
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Nome"
            name="nome"
            type="text"
            value={adminData.nome}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={adminData.email}
            onChange={handleInputChange}
            required
          />
          <PasswordInput
            label="Nova Senha"
            name="senha"
            value={adminData.senha || ''}
            onChange={handleInputChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {adminData.senha && !isSenhaForte(adminData.senha) && (
            <p className="text-sm text-red-500 -mt-4">
              Senha fraca. Use maiúsculas, minúsculas, números e símbolos.
            </p>
          )}
          <Input
            label="Confirmar Senha"
            name="confirmSenha"
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition shadow-md"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function isSenhaForte(senha: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
  return regex.test(senha);
}
