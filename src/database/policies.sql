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