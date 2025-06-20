interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  showPassword,
  setShowPassword,
}: PasswordInputProps) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-semibold mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-8 text-sm text-gray-500"
      >
        {showPassword ? '🙈' : '👁️'}
      </button>
    </div>
  );
}
