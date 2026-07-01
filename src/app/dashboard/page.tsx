import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardModules from "@/components/dashboard/DashboardModules";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <DashboardHero />

      <section className="flex flex-col gap-6">
        <h2 className="font-heading text-2xl font-semibold tracking-wide text-primary">
          Módulos do Sistema
        </h2>

        <DashboardModules />
      </section>
    </div>
  );
}