"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrientacaoForm() {
  const inputClassName =
    "w-full rounded-lg border border-white/10 bg-black/20 p-3 text-foreground placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelClassName = "mb-2 block text-sm font-medium text-foreground/90";

  return (
    <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
      <CardHeader className="border-b border-white/5 pb-5">
        <CardTitle className="font-heading text-xl text-primary">
          Solicitar Orientação
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form className="space-y-6">
          <div>
            <label className={labelClassName}>Professor *</label>
            <select className={`${inputClassName} cursor-pointer`}>
              <option value="">Selecione um professor...</option>
            </select>
          </div>

          <div>
            <label className={labelClassName}>Mensagem *</label>
            <textarea
              rows={5}
              placeholder="Escreva uma mensagem ao professor..."
              className={inputClassName}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 md:w-auto md:px-10"
          >
            Enviar Solicitação
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}