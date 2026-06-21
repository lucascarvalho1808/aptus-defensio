import AlunosTable from "@/components/alunos/AlunosTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AlunosPage() {
  return (
    <div className="space-y-6">

      <section className="rounded-xl border p-6">
        <h1 className="text-3xl font-bold">
          Alunos
        </h1>

        <p className="text-muted-foreground">
          Gestão dos discentes cadastrados.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>
            Alunos ativos no sistema
          </CardTitle>
        </CardHeader>

        <CardContent>
          <AlunosTable />
        </CardContent>
      </Card>

    </div>
  );
}