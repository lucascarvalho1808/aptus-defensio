alter table users enable row level security;

alter table temas enable row level security;

alter table propostas enable row level security;

alter table orientacoes enable row level security;

alter table bancas enable row level security;

alter table membros_banca enable row level security;

alter table documentos enable row level security;

--------------------------------------------------------
-- USERS
--------------------------------------------------------

create policy "Usuários autenticados podem visualizar usuários"
on users
for select
to authenticated
using (true);

create policy "Usuário pode atualizar apenas o próprio registro"
on users
for update
to authenticated
using (
    auth.uid() = id
)
with check (
    auth.uid() = id
);

--------------------------------------------------------
-- TEMAS
--------------------------------------------------------

create policy "Usuários autenticados podem visualizar temas"
on temas
for select
to authenticated
using (true);

create policy "Professor pode criar temas"
on temas
for insert
to authenticated
with check (
    auth.uid() = created_by
);

create policy "Professor pode atualizar seus temas"
on temas
for update
to authenticated
using (
    auth.uid() = created_by
)
with check (
    auth.uid() = created_by
);

create policy "Professor pode excluir seus temas"
on temas
for delete
to authenticated
using (
    auth.uid() = created_by
);

--------------------------------------------------------
-- PROPOSTAS
--------------------------------------------------------

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

create policy "Aluno pode atualizar a propria proposta"
on public.propostas
for update
to authenticated
using (
    auth.uid() = aluno_id
)
with check (
    auth.uid() = aluno_id
);

--------------------------------------------------------
-- ORIENTAÇÕES
--------------------------------------------------------

create policy "Aluno pode criar solicitação de orientação"
on orientacoes
for insert
to authenticated
with check (
    auth.uid() = aluno_id
);

create policy "Professor pode visualizar suas orientações"
on orientacoes
for select
to authenticated
using (
    auth.uid() = professor_id
);

create policy "Professor pode atualizar suas orientações"
on orientacoes
for update
to authenticated
using (
    auth.uid() = professor_id
)
with check (
    auth.uid() = professor_id
);