import PropostaHero from "@/components/proposta/PropostaHero";
import PropostaForm from "@/components/proposta/PropostaForm";

export default function PropostaPage() {
  return (
    <div className="flex flex-col gap-8">
      <PropostaHero />
      <PropostaForm />
    </div>
  );
}