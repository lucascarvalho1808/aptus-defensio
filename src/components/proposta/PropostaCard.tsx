import type { Proposta } from "@/types/proposta.types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PropostaCardProps {
  proposta: Proposta;
}

export default function PropostaCard({
  proposta,
}: PropostaCardProps) {
  return (
    <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-primary">
          Minha Proposta de TCC
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Título
          </p>
          <p className="font-medium">
            {proposta.titulo}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Orientador
          </p>
          <p>{proposta.orientador}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Linha de Pesquisa
          </p>
          <p>{proposta.linha_pesquisa}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Status
          </p>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            {proposta.status}
          </span>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Data de Criação
          </p>
          <p>
            {proposta.created_at
              ? new Date(
                  proposta.created_at
                ).toLocaleDateString("pt-BR")
              : "-"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}