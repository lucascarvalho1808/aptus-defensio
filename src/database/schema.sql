create table users (
    id uuid primary key default gen_random_uuid(),

    nome text not null,

    email text unique not null,

    matricula text unique,

    role text not null,

    status text default 'pendente',

    created_at timestamp default now()
);

create table temas (
    id uuid primary key default gen_random_uuid(),

    titulo text not null,

    descricao text,

    created_by uuid references users(id),

    created_at timestamp default now()
);

create table propostas (
    id uuid primary key default gen_random_uuid(),

    aluno_id uuid references users(id),

    tema_id uuid references temas(id),

    titulo text not null,

    tipo text,

    orientador text,

    linha_pesquisa text,

    justificativa text,

    objetivo_geral text,

    objetivos_especificos text,

    metodologia text,

    resultados text,

    trabalhos_futuros text,

    custos text,

    cronograma text,

    referencias text,

    status text default 'aguardando_orientador',

    created_at timestamp default now()
);

create table orientacoes (
    id uuid primary key default gen_random_uuid(),

    professor_id uuid references users(id),

    aluno_id uuid references users(id),

    proposta_id uuid references propostas(id),

    status text default 'ativa',

    created_at timestamp default now()
);

create table bancas (
    id uuid primary key default gen_random_uuid(),

    proposta_id uuid references propostas(id),

    data_defesa date,

    local text,

    status text default 'agendada',

    created_at timestamp default now()
);

create table membros_banca (
    id uuid primary key default gen_random_uuid(),

    banca_id uuid references bancas(id),

    professor_id uuid references users(id),

    papel text
);

create table documentos (
    id uuid primary key default gen_random_uuid(),

    proposta_id uuid references propostas(id),

    nome_arquivo text,

    url_arquivo text,

    tipo text,

    created_at timestamp default now()
);