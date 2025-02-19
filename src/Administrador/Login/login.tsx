import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../services/api";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newError: { email?: string; senha?: string } = {};

    if (!email) {
      newError.email = "O campo de email é obrigatório.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = "Formato de email inválido.";
      valid = false;
    }

    if (!senha) {
      newError.senha = "O campo de senha é obrigatório.";
      valid = false;
    } else if (senha.length < 6) {
      newError.senha = "A senha deve ter no mínimo 6 caracteres.";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await api.post("/administradores/autenticacao", {
        email,
        senha,
      });
      const token = response.data;

      // Salvando o token no local storage
      localStorage.setItem("token", token);

      setUser(response.data);

      toast.success("Bem-vindo!");
      navigate("/Dashboard");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error("Email ou senha incorretos. Verifique suas credenciais.");
      } else if (error.message === "Network Error") {
        toast.error("Erro de rede. Verifique sua conexão.");
      } else {
        toast.error("Erro ao tentar fazer login. Por favor, tente novamente.");
        console.error("Erro durante o login:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-r from-yellow-400 to-yellow-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Acesso - Comunidade Católica Ágape
        </h2>

        <form onSubmit={signIn} noValidate>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 ${error.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="Digite seu email"
              autoComplete="email"
              type="email"
              required
              aria-label="Email"
              aria-invalid={!!error.email}
              aria-describedby="email-error"
            />
            {error.email && (
              <span id="email-error" className="text-red-500 text-sm mt-1">
                {error.email}
              </span>
            )}
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={`w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 ${error.password ? "border-red-500" : "border-gray-300"}`}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              required
              aria-label="Senha"
              aria-invalid={!!error.password}
              aria-describedby="password-error"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <HiEyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <HiEye className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {error.password && (
              <span id="password-error" className="text-red-500 text-sm mt-1">
                {error.password}
              </span>
            )}
          </div>

          <button
            className={`w-full p-4 rounded-md text-white font-semibold transition duration-300 ease-in-out focus:outline-none ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            type="submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Esqueceu sua senha?{" "}
            <a href="mailto:admin@agape.com" className="text-blue-500 hover:underline">
              Entre em contato com o administrador
            </a>{" "}
            para recuperação de conta.
          </p>
        </div>
      </div>
    </div>
  );
}
