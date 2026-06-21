import ProfessoresHero from "@/components/professores/ProfessoresHero";
import ProfessoresTable from "@/components/professores/ProfessoresTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfessoresPage() {
  return (
    <div className="flex flex-col gap-8">
      <ProfessoresHero />

      <Card className="border-white/10 bg-sidebar/50 shadow-lg backdrop-blur-sm">
        <CardHeader className="border-b border-white/5 pb-5">
          <CardTitle className="font-heading text-xl text-primary">
            Professores ativos no sistema
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <ProfessoresTable />
        </CardContent>
      </Card>
    </div>
  );
}