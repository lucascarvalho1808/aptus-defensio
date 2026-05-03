/**
 * Exibe uma mensagem visual (erro ou sucesso) dentro de um container da página.
 *  (remover esses comentários depois)
 * Como usar:
 * 1. No HTML da página, você precisa ter uma div com a classe "feedback-message":
 *    <div class="feedback-message" style="display: none;"></div>
 * 
 * 2. No JS da página, importe a função:
 *    import { showMessage } from "../modules/feedback.js";
 * 
 * 3. Use a função passando:
 *    - container → elemento principal da tela (ex: section, div, etc)
 *    - message → texto que será exibido
 *    - type → "error" (padrão) ou "success"
 * 
 *    Exemplo:
 *    showMessage(container, "Erro ao fazer login", "error");
 *    showMessage(container, "Cadastro realizado!", "success");
 */

export function showMessage(container, message, type = "error") {
    const box = container.querySelector(".feedback-message");

    if (!box) return;

    box.textContent = message;
    box.style.display = "block";

    if (type === "error") {
        box.style.backgroundColor = "rgba(139, 37, 33, 0.2)";
        box.style.borderLeft = "5px solid #8b2521";
        box.style.color = "#ff6b6b";
    }

    if (type === "success") {
        box.style.backgroundColor = "rgba(0, 128, 0, 0.2)";
        box.style.borderLeft = "5px solid green";
        box.style.color = "#90ee90";
    }

    setTimeout(() => {
        box.style.display = "none";
    }, 3000);
}