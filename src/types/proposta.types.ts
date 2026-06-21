import {
  Tables,
  TablesInsert,
} from "@/database.types";

export type Proposta =
  Tables<"propostas">;

export type NovaProposta =
  TablesInsert<"propostas">;