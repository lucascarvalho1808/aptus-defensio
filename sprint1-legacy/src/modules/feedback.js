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