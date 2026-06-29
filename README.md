# Aptus Defensio 

## Grupo

- Lucas Montenegro de Carvalho
- José Carlos Abreu
- Gabriel Reis
- Vinícius Rocha

---

## Sobre o Projeto

O **Aptus Defensio** é uma plataforma acadêmica para apoiar o fluxo de propostas, orientações, temas e acompanhamento de projetos de TCC. O projeto foi construído para uma stack moderna baseada em **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Supabase** e **Zustand**.

A aplicação contempla três perfis principais:

- **Aluno**: cadastra proposta e solicita orientação.
- **Professor**: visualiza solicitações recebidas e acompanha orientandos.
- **Coordenador**: administra usuários, professores, alunos e temas.

---

## Funcionalidades Implementadas

### Autenticação e Perfis

- Login com Supabase Auth.
- Cadastro de usuários com confirmação de e-mail.
- Recuperação do perfil do usuário pela tabela `users`.
- Controle de status do cadastro, incluindo bloqueio de usuários pendentes.
- Estado global de autenticação com Zustand.
- Persistência e hidratação da sessão ao recarregar a aplicação.
- Logout completo com limpeza de estado local e sessão Supabase.

### Controle de Acesso

- Rotas protegidas por middleware.
- Controle de acesso por perfil usando RBAC.
- Menus laterais renderizados de acordo com o tipo de usuário.
- Redirecionamento de usuários sem sessão para `/login`.
- Redirecionamento de usuários autenticados para `/dashboard`.

Regras principais:

- `coordenador`: dashboard, administração, professores, alunos, temas e orientações recebidas.
- `professor`: dashboard, temas e orientações recebidas.
- `aluno`: dashboard, proposta e solicitação de orientação.

### Dashboard e Layout

- Shell global com `Sidebar`, `Header` e área central para conteúdo.
- Layout responsivo para desktop e mobile.
- Tema claro/escuro com `next-themes`.
- Identidade visual com paleta azul escuro, dourado e vinho.
- Header com botão de alternância de tema e menu de perfil.

### Administração

- Página administrativa para coordenadores.
- Listagem de usuários pendentes.
- Aprovação e rejeição de cadastros.
- Listagem de usuários ativos.
- Filtros por nome, e-mail e perfil.

### Temas

- Cadastro de temas de pesquisa.
- Listagem de temas cadastrados.
- Exclusão de temas.
- Acesso para coordenadores e professores.

### Propostas

- Página para o aluno preencher proposta de TCC.
- Validação e envio da proposta.
- Exibição da proposta já enviada.
- Persistência dos dados na tabela `propostas`.

### Orientações

- Formulário para aluno solicitar orientação.
- Seleção dinâmica de professores ativos.
- Envio da solicitação para a tabela `orientacoes`.
- Mensagem do aluno persistida no banco.
- Fila de solicitações recebidas pelo professor.
- Ações de aceitar e recusar orientação.
- Página de orientandos aceitos.

---

## Tecnologias Utilizadas

- **Next.js 16** com App Router.
- **React 19**.
- **TypeScript**.
- **Tailwind CSS 4**.
- **Supabase Auth** para autenticação.
- **Supabase Database** como backend principal.
- **Zustand** para estado global de autenticação.
- **TanStack Query** para cache e mutações assíncronas.
- **React Hook Form** para formulários.
- **Zod** para validação de dados.
- **Sonner** para feedback visual com toasts.
- **Lucide React** para ícones.
- **next-themes** para tema claro/escuro.
- **shadcn/ui** como base de componentes de interface.

---

## Estrutura do Projeto

```txt
src/
  app/                  Rotas do App Router
  components/           Componentes visuais e de layout
  components/ui/        Componentes base da interface
  config/               Configurações globais, como RBAC
  hooks/                Hooks de sessão, guards e React Query
  lib/                  Clientes e utilitários compartilhados
  providers/            Providers globais da aplicação
  schemas/              Schemas Zod de validação
  services/             Camada de acesso ao Supabase
  store/                Stores Zustand
  types/                Tipos compartilhados
  database/             Schema SQL, policies e tipos do banco

public/
  img/                  Imagens e identidade visual

supabase/
  .temp/                Configurações temporárias locais do Supabase
```

---

## Banco de Dados

O projeto utiliza Supabase com as principais tabelas:

- `users`: perfis da aplicação, status e papéis.
- `temas`: temas de pesquisa cadastrados.
- `propostas`: propostas enviadas pelos alunos.
- `orientacoes`: solicitações e vínculos de orientação.

Os arquivos locais de referência ficam em:

- `src/database/schema.sql`
- `src/database/policies.sql`
- `src/database.types.ts`

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica-anon-ou-publishable
```

Esses valores ficam no painel do Supabase em:

```txt
Project Settings > API
```
---

## Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/lucascarvalho1808/aptus-defensio.git
cd aptus-defensio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie `.env.local` com as variáveis do Supabase.

### 4. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

### 5. Rode as verificações

```bash
npm run lint
npm run build
```

---

## Scripts Disponíveis

```bash
npm run dev
```

Inicia o servidor local de desenvolvimento.

```bash
npm run build
```

Gera o build de produção.

```bash
npm run start
```

Executa o build de produção localmente.

```bash
npm run lint
```

Executa o ESLint.

---

## Boas Práticas Adotadas

- Separação entre componentes, serviços, hooks, schemas e estado global.
- Regras de acesso centralizadas em `src/config/rbac.ts`.
- Formulários validados com Zod e React Hook Form.
- Acesso ao Supabase isolado em services.
- Feedback de ações por toast, sem dependência de `alert`.
- Client Components usados apenas quando necessário.
- Sidebar e rotas protegidas sincronizadas com os perfis da aplicação.
- Middleware responsável por proteger rotas privadas.
- Estado global mínimo com Zustand para sessão e perfil.
- Cache e mutações assíncronas com TanStack Query.
- Design responsivo e consistente com a identidade visual da Sprint 1.

---