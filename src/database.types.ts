export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bancas: {
        Row: {
          created_at: string | null
          data_defesa: string | null
          id: string
          local: string | null
          proposta_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          data_defesa?: string | null
          id?: string
          local?: string | null
          proposta_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          data_defesa?: string | null
          id?: string
          local?: string | null
          proposta_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bancas_proposta_id_fkey"
            columns: ["proposta_id"]
            isOneToOne: false
            referencedRelation: "propostas"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos: {
        Row: {
          created_at: string | null
          id: string
          nome_arquivo: string | null
          proposta_id: string | null
          tipo: string | null
          url_arquivo: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome_arquivo?: string | null
          proposta_id?: string | null
          tipo?: string | null
          url_arquivo?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nome_arquivo?: string | null
          proposta_id?: string | null
          tipo?: string | null
          url_arquivo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentos_proposta_id_fkey"
            columns: ["proposta_id"]
            isOneToOne: false
            referencedRelation: "propostas"
            referencedColumns: ["id"]
          },
        ]
      }
      membros_banca: {
        Row: {
          banca_id: string | null
          id: string
          papel: string | null
          professor_id: string | null
        }
        Insert: {
          banca_id?: string | null
          id?: string
          papel?: string | null
          professor_id?: string | null
        }
        Update: {
          banca_id?: string | null
          id?: string
          papel?: string | null
          professor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "membros_banca_banca_id_fkey"
            columns: ["banca_id"]
            isOneToOne: false
            referencedRelation: "bancas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membros_banca_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      orientacoes: {
        Row: {
          aluno_id: string | null
          created_at: string | null
          id: string
          mensagem: string | null
          professor_id: string | null
          proposta_id: string | null
          status: string | null
        }
        Insert: {
          aluno_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string | null
          professor_id?: string | null
          proposta_id?: string | null
          status?: string | null
        }
        Update: {
          aluno_id?: string | null
          created_at?: string | null
          id?: string
          mensagem?: string | null
          professor_id?: string | null
          proposta_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orientacoes_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orientacoes_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orientacoes_proposta_id_fkey"
            columns: ["proposta_id"]
            isOneToOne: false
            referencedRelation: "propostas"
            referencedColumns: ["id"]
          },
        ]
      }
      propostas: {
        Row: {
          aluno_id: string | null
          created_at: string | null
          cronograma: string | null
          custos: string | null
          id: string
          justificativa: string | null
          linha_pesquisa: string | null
          metodologia: string | null
          objetivo_geral: string | null
          objetivos_especificos: string | null
          orientador: string | null
          referencias: string | null
          resultados: string | null
          status: string | null
          tema_id: string | null
          tipo: string | null
          titulo: string
          trabalhos_futuros: string | null
        }
        Insert: {
          aluno_id?: string | null
          created_at?: string | null
          cronograma?: string | null
          custos?: string | null
          id?: string
          justificativa?: string | null
          linha_pesquisa?: string | null
          metodologia?: string | null
          objetivo_geral?: string | null
          objetivos_especificos?: string | null
          orientador?: string | null
          referencias?: string | null
          resultados?: string | null
          status?: string | null
          tema_id?: string | null
          tipo?: string | null
          titulo: string
          trabalhos_futuros?: string | null
        }
        Update: {
          aluno_id?: string | null
          created_at?: string | null
          cronograma?: string | null
          custos?: string | null
          id?: string
          justificativa?: string | null
          linha_pesquisa?: string | null
          metodologia?: string | null
          objetivo_geral?: string | null
          objetivos_especificos?: string | null
          orientador?: string | null
          referencias?: string | null
          resultados?: string | null
          status?: string | null
          tema_id?: string | null
          tipo?: string | null
          titulo?: string
          trabalhos_futuros?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "propostas_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "propostas_tema_id_fkey"
            columns: ["tema_id"]
            isOneToOne: false
            referencedRelation: "temas"
            referencedColumns: ["id"]
          },
        ]
      }
      temas: {
        Row: {
          created_at: string | null
          created_by: string | null
          descricao: string | null
          id: string
          titulo: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          descricao?: string | null
          id?: string
          titulo: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          descricao?: string | null
          id?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "temas_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          matricula: string | null
          nome: string
          role: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          matricula?: string | null
          nome: string
          role: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          matricula?: string | null
          nome?: string
          role?: string
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
