import ProfessoresTable from "@/components/professores/ProfessoresTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfessoresPage() {
  return (
    <div className="space-y-6">

      <section className="rounded-xl border p-6">
        <h1 className="text-3xl font-bold">
          Professores
        </h1>

        <p className="text-muted-foreground">
          Gestão do corpo docente.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>
            Professores ativos no sistema
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ProfessoresTable />
        </CardContent>
      </Card>

    </div>
  );
}