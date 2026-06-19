import { navigateTo } from "../router.js";
import { verificarAutenticacao } from "../modules/auth.js";
import { showMessage } from "../modules/feedback.js";
import { saveProposta } from "../services/propostaService.js";

export function createPropostaPage() {
    const usuarioLogado = verificarAutenticacao();
    if (!usuarioLogado) {
        navigateTo('/');
        return document.createElement("div");
    }

    const fragment = document.createDocumentFragment();

    const aside = document.createElement("aside");
    aside.classList.add("prop-sidebar");
    aside.innerHTML = `
        <div class="prop-sidebar-header">
            <img src="/img/logo_capacete.png" alt="Logo" class="prop-sidebar-logo">
            <h2 class="prop-sidebar-brand">Aptus Defensio</h2>
        </div>
        <ul class="dash-nav-menu">
            <li class="dash-nav-item" data-page="dashboard"><span>Dashboard</span></li>
            <li class="dash-nav-item dash-active" data-page="propostas"><span>Minha Proposta</span></li>
            <li class="dash-nav-item" data-page="documentos"><span>Documentos</span></li>
        </ul>
        <div class="dash-nav-item dash-logout-item" id="btn-logout" style="margin-top: auto;">
            <span>Sair</span>
        </div>
    `;

    const main = document.createElement("main");
    main.classList.add("prop-main-content");

    main.innerHTML = `
    <div class="dash-content-wrapper">
        <header class="dash-header-top">
            <button class="prop-menu-toggle" id="menu-toggle">☰</button>
            <h1>Proposta de TCC</h1>
            <div class="dash-user-profile">Olá, ${usuarioLogado.nome}!</div>
        </header>

        <section class="prop-hero-integration">
            <h2 class="prop-hero-title">Registro de Proposta</h2>
            <p class="prop-hero-subtitle">
                Preencha os campos abaixo com os detalhes acadêmicos do seu projeto. 
                Sua proposta será enviada para avaliação do orientador.
            </p>
        </section>

        <div class="dash-card">
            <div class="feedback-message" style="display: none;"></div>

            <form id="proposta-form" class="prop-form-grid">
                <div class="prop-input-group">
                    <label>Título da Proposta *</label>
                    <input type="text" id="titulo" placeholder="Digite o título do TCC">
                </div>

                <div class="prop-input-group">
                    <label>Tipo de Projeto *</label>
                    <div class="prop-custom-select" id="tipo-projeto-select">
                        <div class="select-trigger">
                            <span>Projeto de Pesquisa</span>
                            <div class="arrow"></div>
                         </div>
                        <div class="select-options">
                            <div class="option selected" data-value="Pesquisa">Projeto de Pesquisa</div>
                            <div class="option" data-value="Implementacao">Projeto de Implementação</div>
                        </div>
                        <input type="hidden" id="tipo" value="Pesquisa">
                    </div>
                </div>

                <div class="prop-input-group">
                    <label>Orientador *</label>
                    <input type="text" id="orientador" placeholder="Nome do orientador">
                </div>

                <div class="prop-input-group">
                    <label>Linha de Pesquisa *</label>
                    <input type="text" id="linhaPesquisa" placeholder="Ex: Redes, IA, Segurança...">
                </div>

                <div class="prop-input-group full-width">
                    <label>Problema e Justificativa *</label>
                    <textarea id="justificativa" rows="4" placeholder="Contextualize o problema do trabalho"></textarea>
                </div>

                <div class="prop-input-group full-width">
                    <label>Objetivo Geral</label>
                    <textarea id="objetivoGeral" rows="3" placeholder="Descreva o objetivo geral"></textarea>
                </div>

                <div class="prop-input-group full-width">
                    <label>Objetivos Específicos</label>
                    <textarea id="objetivosEspecificos" rows="3" placeholder="Liste os objetivos específicos"></textarea>
                </div>

                <div class="prop-input-group full-width">
                    <label>Metodologia</label>
                    <textarea id="metodologia" rows="4" placeholder="Explique a metodologia utilizada"></textarea>
                </div>

                <div class="prop-input-group half-width">
                    <label>Resultados Esperados</label>
                    <textarea id="resultados" rows="3" placeholder="O que se espera alcançar"></textarea>
                </div>

                <div class="prop-input-group half-width">
                    <label>Trabalhos Futuros</label>
                    <textarea id="trabalhosFuturos" rows="3" placeholder="Melhorias futuras"></textarea>
                </div>

                <div class="prop-input-group half-width">
                    <label>Materiais e Recursos</label>
                    <textarea id="custos" rows="3" placeholder="Recursos necessários"></textarea>
                </div>

                <div class="prop-input-group half-width">
                    <label>Cronograma</label>
                    <textarea id="cronograma" rows="3" placeholder="Etapas do projeto"></textarea>
                </div>

                <div class="prop-input-group full-width">
                    <label>Referências</label>
                    <textarea id="referencias" rows="3" placeholder="Cite as referências (ABNT)"></textarea>
                </div>

                <div class="prop-form-actions">
                    <button type="submit" class="prop-btn-submit">
                        Enviar Proposta para Análise
                    </button>
                </div>
            </form>
        </div>
    </div>

    <footer class="dash-footer">
        <p>&copy; 2026 Aptus Defensio - Todos os direitos reservados.</p>
    </footer>
    `;

    document.addEventListener('DOMContentLoaded', () => {
        const customSelect = document.getElementById('tipo-projeto-select');
        const trigger = customSelect.querySelector('.select-trigger');
        const hiddenInput = document.getElementById('tipo');
        const options = customSelect.querySelectorAll('.option');

        // Abre/Fecha o menu
        trigger.addEventListener('click', () => {
            customSelect.classList.toggle('open');
        });

        // Seleciona a opção
        options.forEach(option => {
            option.addEventListener('click', () => {
                const val = option.getAttribute('data-value');
                const text = option.textContent;

                // Atualiza o visual
                trigger.querySelector('span').textContent = text;
                hiddenInput.value = val;

                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Fecha o menu
                customSelect.classList.remove('open');
            });
        });

        // Fecha se clicar fora dele
        document.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    });

    aside.querySelectorAll(".dash-nav-item").forEach(item => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("data-page");
            if (page) navigateTo(`/${page}`);
        });
    });

    aside.querySelector("#btn-logout").addEventListener("click", () => {
        sessionStorage.removeItem("usuarioAtivo");
        navigateTo("/");
    });

    main.querySelector("#menu-toggle").addEventListener("click", () => {
        aside.classList.toggle("active");
    });

    const form = main.querySelector("#proposta-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const dados = {
            titulo: main.querySelector("#titulo").value.trim(),
            tipo: main.querySelector("#tipo").value,
            orientador: main.querySelector("#orientador").value.trim(),
            linhaPesquisa: main.querySelector("#linhaPesquisa").value.trim(),
            justificativa: main.querySelector("#justificativa").value.trim(),
            objetivoGeral: main.querySelector("#objetivoGeral").value.trim(),
            objetivosEspecificos: main.querySelector("#objetivosEspecificos").value.trim(),
            metodologia: main.querySelector("#metodologia").value.trim(),
            resultados: main.querySelector("#resultados").value.trim(),
            trabalhosFuturos: main.querySelector("#trabalhosFuturos").value.trim(),
            custos: main.querySelector("#custos").value.trim(),
            cronograma: main.querySelector("#cronograma").value.trim(),
            referencias: main.querySelector("#referencias").value.trim(),
        };

        if (!dados.titulo || !dados.orientador || !dados.linhaPesquisa || !dados.justificativa) {
            showMessage(main, "Por favor, preencha todos os campos obrigatórios (*).", "error");
            return;
        }

        const proposta = {
            id: Date.now(),
            alunoId: usuarioLogado.id,
            alunoNome: usuarioLogado.nome,
            ...dados,
            status: "Aguardando Orientador",
            createdAt: new Date().toISOString()
        };

        saveProposta(proposta);
        showMessage(main, "Sua proposta foi registrada com sucesso!", "success");
        form.reset();
    });

    fragment.appendChild(aside);
    fragment.appendChild(main);
    return fragment;
}