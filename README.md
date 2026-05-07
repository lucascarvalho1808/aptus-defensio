# Aptus Defensio 

O **Aptus Defensio** é um sistema para a gestão ágil de qualificações e defesas de TCC, dissertações e teses. Desenvolvido para simplificar a burocracia da pós-graduação, a plataforma permite que alunos, professores e coordenações foquem no que realmente importa: a excelência acadêmica e a pesquisa.

Projeto desenvolvido para as disciplinas de Programação Web II e Engenharia de Requisitos, no curso superior Bacharelado em Engenharia de Software do Instituto Federal da Paraíba (IFPB).

**Equipe de Desenvolvimento:**
* Vinícius Rocha Leite Gomes
* Lucas Montenegro de Carvalho
* José Carlos Abreu 
* Gabriel Reis
* Renan Lucena

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