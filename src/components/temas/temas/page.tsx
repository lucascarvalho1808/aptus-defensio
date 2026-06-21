import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TemasHero from "@/components/temas/TemasHero";
import TemaForm from "@/components/temas/TemaForm";
import TemasTable from "@/components/temas/TemasTable";

export default function TemasPage() {
  return (
    <div className="space-y-6">

      <TemasHero />

      <Card>
        <CardHeader>
          <CardTitle>
            Adicionar Novo Tema
          </CardTitle>
        </CardHeader>

        <CardContent>
          <TemaForm onCreated={() => window.location.reload()} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Temas Cadastrados
          </CardTitle>
        </CardHeader>

        <CardContent>
          <TemasTable />
        </CardContent>
      </Card>

    </div>
  );
}