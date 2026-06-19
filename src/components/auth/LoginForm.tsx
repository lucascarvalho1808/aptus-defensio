"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginForm() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");

    setLoading(true);

    const { data, error } = await authService.signIn({
      email,
      password,
    });

    if (error) {
      setErrorMessage("E-mail ou senha inválidos.");

      setLoading(false);

      return;
    }

    setUser(data.user);

    router.push("/");
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-[#1a2c41] p-8 shadow-lg">
      <h1 className="mb-8 text-center text-3xl font-bold text-[#c9a063]">
        Aptus Defensio
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm text-white">
            E-mail
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white">
            Senha
          </label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-transparent p-3 text-white"
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-red-400">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#8b2521] p-3 font-semibold text-white"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}