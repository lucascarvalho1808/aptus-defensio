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
          className="text-sm font-medium text-foreground/70"
        >
          Perfil:
        </label>

        <select
          id="role-filter"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-sidebar px-3 py-2 text-sm text-foreground outline-none shadow-sm dark:shadow-none"
        >
          <option value="todos" className="text-neutral-900 dark:text-white bg-white dark:bg-sidebar">
            Todos
          </option>

          <option value="aluno" className="text-neutral-900 dark:text-white bg-white dark:bg-sidebar">
            Alunos
          </option>

          <option value="professor" className="text-neutral-900 dark:text-white bg-white dark:bg-sidebar">
            Professores
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
           className="rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-sidebar px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 shadow-sm dark:shadow-none"
        />
      )}
    </div>
  );
}