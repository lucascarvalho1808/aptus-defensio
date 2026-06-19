# Aptus Defensio 

O **Aptus Defensio** é um sistema para a gestão ágil de qualificações e defesas de TCC, dissertações e teses. Desenvolvido para simplificar a burocracia da pós-graduação, a plataforma permite que alunos, professores e coordenações foquem no que realmente importa: a excelência acadêmica e a pesquisa.

Projeto desenvolvido para as disciplinas de Programação Web II e Engenharia de Requisitos, no curso superior Bacharelado em Engenharia de Software do Instituto Federal da Paraíba (IFPB).

**Equipe de Desenvolvimento:**
* Vinícius Rocha Leite Gomes
* Lucas Montenegro de Carvalho
* José Carlos Abreu 
* Gabriel Reis

---

## 🚀 Como Executar o Projeto

O projeto foi inicializado utilizando o template Vanilla do **Vite**. Para rodar localmente, siga os passos:

1. Clone o repositório.
   ```bash
   git clone https://github.com/lucascarvalho1808/aptus-defensio.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```


## 🛠️ Parte Técnica

Este projeto foi construído com foco em simplicidade, performance e boas práticas para aplicações web modernas. Principais pontos técnicos:

- Stack:
   - Frontend: Vanilla JavaScript + Vite (bundler/dev server)
   - Estilos: CSS tradicional (arquivo style.css) com uso de grid e flexbox
   - Build/Dev: Node.js + npm

- Estrutura do projeto:
   - src/: código-fonte do frontend
   - public/: ativos estáticos (imagens, ícones)
   - scripts utilitários: módulos como feedback.js para notificações e módulos de proteção de rota

- Boas práticas adotadas:
   - Separação clara entre lógica, marcação e estilos
   - Componentização simples via módulos ES (import/export)
   - Tratamento de erros e feedbacks ao usuário sem dependência de alerts nativos
   - Rotas protegidas e controle de acesso básico no frontend (redirecionamento amigável para 404 quando necessário)

- Requisitos de desenvolvimento:
   - Node.js v14+ 
   - npm v6+

## 🎨 UX/UI
O design do **Aptus Defensio** foi planejado com rigor estético e funcional:
* **Responsividade**: O sistema de grids e flexbox foi utilizado no `style.css` para garantir que as tabelas de dados, formulários e painéis administrativos se adaptem organicamente a dispositivos móveis e desktops.
* **Feedback Visual**: Implementação do módulo unificado `feedback.js`, que injeta dinamicamente notificações (sucesso/erro) contextuais na tela, evitando a dependência de `alerts` nativos intrusivos.
* **Segurança na Experiência**: Telas protegidas redirecionam de forma invisível usuários sem permissão de acesso (ex: alunos tentando acessar `admin.js`), retornando uma página 404 amigável.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

