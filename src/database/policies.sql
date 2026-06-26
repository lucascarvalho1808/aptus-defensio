alter table users enable row level security;

alter table temas enable row level security;

alter table propostas enable row level security;

alter table orientacoes enable row level security;

alter table bancas enable row level security;

alter table membros_banca enable row level security;

alter table documentos enable row level security;

create policy "allow all"
on users
for all
using (true)
with check (true);

create policy "allow all temas"
on temas
for all
using (true)
with check (true);

create policy "allow authenticated students to create orientacoes"
on orientacoes
for insert
to authenticated
with check ((select auth.uid()) = aluno_id);

create policy "Aluno pode criar a propria proposta"
on propostas
for insert
to authenticated
with check (
    auth.uid() = aluno_id
);

create policy "Aluno pode visualizar a propria proposta"
on propostas
for select
to authenticated
using (
    auth.uid() = aluno_id
);