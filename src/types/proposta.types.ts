import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/database.types";

export type StatusProposta =
  | "Aguardando Orientador"
  | "Aceita"
  | "Recusada";

export type Proposta =
  Omit<Tables<"propostas">, "status"> & {
    status: StatusProposta | null;
  };

export type NovaProposta =
  Omit<TablesInsert<"propostas">, "status"> & {
    status?: StatusProposta;
  };

export type AtualizarProposta =
  Omit<TablesUpdate<"propostas">, "status"> & {
    status?: StatusProposta;
  };