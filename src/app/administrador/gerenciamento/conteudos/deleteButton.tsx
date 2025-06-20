"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { api } from "@/app/services/api";
import { toast } from "react-toastify";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/conteudos/${id}`);
      toast.success("Conteúdo deletado com sucesso!");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar:", error);
      toast.error("Erro ao deletar o conteúdo.");
    }
  };

  return (
    <>
      {/* Botão */}
      <button
        onClick={() => setIsOpen(true)}
        title="Deletar"
        className="text-red-600 hover:text-red-800"
      >
        <FaTrash />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Confirmar Exclusão
            </h2>
            <p className="mb-6">
              Tem certeza que deseja <strong>deletar este conteúdo</strong>? Essa ação é
              irreversível.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
