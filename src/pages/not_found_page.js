export function createNotFoundPage() {
    const container = document.createElement("div");
    container.classList.add("error-section");

    container.innerHTML = `
        <div class="error-card">
            <div class="error-brand">
                <img src="/img/logo_capacete.png" class="error-logo" alt="Logo Aptus Defensio">
            </div>
            <h1 class="error-code">404</h1>
            <h2 class="error-title">Você se perdeu?</h2>
            <p class="error-message">
                A página que você procurou não foi encontrada.
            </p>
            <button id="btn-back-home" class="btn-error">
                Retornar ao Início
            </button>
        </div>
    `;

    container.querySelector("#btn-back-home").addEventListener("click", () => {
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent('popstate'));
    });

    return container;
}