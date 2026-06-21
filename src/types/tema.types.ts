import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/database.types";

export type Tema = Tables<"temas">;

export type TemaInsert =
  TablesInsert<"temas">;

export type TemaUpdate =
  TablesUpdate<"temas">;