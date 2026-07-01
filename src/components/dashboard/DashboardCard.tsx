import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface DashboardCardProps {
  titulo: string;
  itens: string[];
  botao: string;
}

export default function DashboardCard({
  titulo,
  itens,
  botao,
}: DashboardCardProps) {
  return (
    <Card className="flex h-full flex-col border-white/10 bg-sidebar/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader>
        <CardTitle className="font-heading text-xl tracking-wide text-primary">
          {titulo}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        <ul className="mb-6 flex-1 space-y-3">
          {itens.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Button className="mt-auto w-full border border-primary/20 bg-sidebar-border/50 text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary">
          {botao}
        </Button>
      </CardContent>
    </Card>
  );
}