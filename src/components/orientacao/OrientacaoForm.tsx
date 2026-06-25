"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateOrientacao } from "@/hooks/useCreateOrientacao";
import {
  orientacaoSchema,
  type OrientacaoSchema,
} from "@/schemas/orientacao.schema";
import { useAuthStore } from "@/store/useAuthStore";

export default function OrientacaoForm() {
  const user = useAuthStore((state) => state.user);
  const createOrientacao = useCreateOrientacao();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrientacaoSchema>({
    resolver: zodResolver(orientacaoSchema),
    defaultValues: {
      id_professor: "",
      mensagem: "",
    },
  });

  const inputClassName =
    "w-full rounded-lg border border-white/10 bg-black/20 p-3 text-foreground placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelClassName = "mb-2 block text-sm font-medium text-foreground/90";

  async function onSubmit(data: OrientacaoSchema) {
    if (!user?.id) {
      toast.error("Usuário não autenticado.");
      return;
    }

    try {
      await createOrientacao.mutateAsync({
        aluno_id: user.id,
        professor_id: data.id_professor,
        mensagem: data.mensagem,
        status: "pendente",
      });

      toast.success("Solicitação enviada com sucesso!");
      reset();
    } catch {
      toast.error("Erro ao enviar solicitação de orientação.");
    }
  }

  const isSending = isSubmitting || createOrientacao.isPending;

  return (
    <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
      <CardHeader className="border-b border-white/5 pb-5">
        <CardTitle className="font-heading text-xl text-primary">
          Solicitar Orientação
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={labelClassName}>Professor *</label>
            <select
              {...register("id_professor")}
              className={`${inputClassName} cursor-pointer`}
              disabled={isSending}
            >
              <option value="">Selecione um professor...</option>
              {/* TODO: Substituir pelas options dinâmicas da T6.2. */}
              <option value="44b9b946-e9df-44c7-a429-96af90e7c897">
                Professor Teste (Mock)
              </option>
            </select>
            {errors.id_professor && (
              <p className="mt-2 text-sm text-red-500">
                {errors.id_professor.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClassName}>Mensagem *</label>
            <textarea
              {...register("mensagem")}
              rows={5}
              placeholder="Escreva uma mensagem ao professor..."
              className={inputClassName}
              disabled={isSending}
            />
            {errors.mensagem && (
              <p className="mt-2 text-sm text-red-500">
                {errors.mensagem.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 md:w-auto md:px-10"
            disabled={isSending}
          >
            {isSending ? "Enviando..." : "Enviar Solicitação"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
