// app/login/page.tsx

"use client";
import { AxiosError } from "axios";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaCross } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { api } from "@/app/services/api";

type FormData = {
    email: string;
    senha: string;
};

export default function Login() {
    const { setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({ mode: "onTouched" });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const response = await api.post("/login", data);
            const admin = response.data;

            if (admin && admin.id && admin.token) {
                localStorage.setItem("token", admin.token);
                setUser(admin);
                toast.success(`Bem-vindo, ${admin.nome}!`);
                try {
                    await api.get(`/administradorDetalhes?id=${admin.id}`);
                } catch (error: unknown) {
                    // Detalhes do admin são opcionais
                }
                router.push("/administrador/dashboard");
            } else {
                setError("senha", { message: "Email ou senha inválidos." });
                toast.error("Email ou senha inválidos.");
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const message =
                    (error.response?.data as { message?: string })?.message ||
                    "Erro ao tentar logar. Tente novamente.";
                console.error('erro ao tentar logar ' + error)

                setError("senha", { message });
                toast.error(message);
            } else {
                toast.error("Erro inesperado. Tente novamente.");
            }
        }


    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 px-4">
            <section
                className="bg-white border border-yellow-200 rounded-2xl shadow-xl p-8 max-w-md w-full"
                aria-labelledby="login-title"
            >
                <div className="flex justify-center mb-4 text-yellow-600">
                    <FaCross className="text-3xl" aria-hidden="true" />
                </div>
                <h1
                    id="login-title"
                    className="text-2xl font-serif text-center text-gray-800 font-semibold mb-1"
                >
                    Paz e Bem!
                </h1>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Acesse o painel da Comunidade Católica Ágape
                </p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700 mb-1 block"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register("email", {
                                required: "O campo de email é obrigatório.",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Formato de email inválido.",
                                },
                            })}
                            className={`w-full p-3 rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"
                                } focus:ring-yellow-400 focus:outline-none`}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            placeholder="seuemail@exemplo.com"
                        />
                        {errors.email && (
                            <span
                                id="email-error"
                                className="text-red-500 text-sm mt-1"
                                role="alert"
                            >
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="mb-5 relative">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700 mb-1 block"
                        >
                            Senha
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            {...register("senha", {
                                required: "O campo de senha é obrigatório.",
                                minLength: {
                                    value: 6,
                                    message: "A senha deve ter no mínimo 6 caracteres.",
                                },
                            })}
                            className={`w-full p-3 rounded-md border ${errors.senha ? "border-red-500" : "border-gray-300"
                                } focus:ring-yellow-400 focus:outline-none`}
                            aria-invalid={!!errors.senha}
                            aria-describedby={errors.senha ? "password-error" : undefined}
                            placeholder="Digite sua senha"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            tabIndex={0}
                        >
                            {showPassword ? <HiEyeOff /> : <HiEye />}
                        </button>
                        {errors.senha && (
                            <span
                                id="password-error"
                                className="text-red-500 text-sm mt-1"
                                role="alert"
                            >
                                {errors.senha.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-md text-white font-medium transition-all ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600"
                            }`}
                        aria-busy={loading}
                    >
                        {loading ? "Carregando..." : "Entrar"}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-600 text-sm">
                    Esqueceu sua senha?{" "}
                    <p
                        className="text-blue-500 hover:underline"
                    >
                        Contate o administrador
                    </p>
                </div>
            </section>
        </main>
    );
}
