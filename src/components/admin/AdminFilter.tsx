"use client";

interface AdminFilterProps {
  value: string;
  onChange: (value: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
}

export default function AdminFilter({
  value,
  onChange,
  search,
  onSearchChange,
}: AdminFilterProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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

      {onSearchChange && (
        <input
          type="text"
          value={search ?? ""}
          placeholder="Buscar por nome ou e-mail..."
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          className="rounded-lg border border-white/10 bg-sidebar px-3 py-2 text-sm text-white outline-none placeholder:text-white/40"
        />
      )}
    </div>
  );
}