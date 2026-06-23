"use client";

interface AdminFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AdminFilter({
  value,
  onChange,
}: AdminFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="role-filter"
        className="text-sm font-medium text-white/70"
      >
        Perfil:
      </label>

      <select
        id="role-filter"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="rounded-lg border border-white/10 bg-sidebar px-3 py-2 text-sm text-white outline-none"
      >
        <option value="todos">
          Todos
        </option>

        <option value="aluno">
          Alunos
        </option>

        <option value="professor">
          Professores
        </option>

        <option value="coordenador">
          Coordenadores
        </option>
      </select>
    </div>
  );
}