import DashboardCard from "./DashboardCard";

export default function DashboardModules() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
      <DashboardCard
        titulo="Proposta de TCC"
        botao="Ver Detalhes"
        itens={[
          "Sistema de autenticação",
          "Cadastro de temas",
          "Envio de proposta",
          "Cadastro de Professores e Alunos",
        ]}
      />

      <DashboardCard
        titulo="Desenvolvimento"
        botao="Acessar Módulo"
        itens={[
          "Acompanhamento de progresso",
          "Registro de reuniões",
          "Visualização de Orientados",
          "Envio de documentos",
        ]}
      />

      <DashboardCard
        titulo="Defesa"
        botao="Iniciar Processo"
        itens={[
          "Inscrição para defesa",
          "Agendamento de banca",
          "Convite de avaliadores",
        ]}
      />
    </div>
  );
}