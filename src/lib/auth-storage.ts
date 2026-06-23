export function clearStoredAuth() {
  if (typeof window === "undefined") return;

  window.sessionStorage.removeItem("usuarioAtivo");
  window.localStorage.removeItem("usuarioAtivo");

  Object.keys(window.localStorage).forEach((key) => {
    if (key.startsWith("sb-") && key.includes("auth-token")) {
      window.localStorage.removeItem(key);
    }
  });
}
