import { navigateTo } from "../router.js";

export async function hashPassword(senha) {
    // Transforma o texto em um array de bytes 
    const encoder = new TextEncoder();
    const data = encoder.encode(senha);

    // Chama a web crypto api para gerar o hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Converte o buffer em um array normal 
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Converte os bytes para o formato hexadecimal e junta tudo em uma string
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Retorno da senha com hash
    return hashHex
}

export function verificarAutenticacao() {
    const usuarioLogado = sessionStorage.getItem("usuarioAtivo");
    
    // Se o sessionStorage estiver vazio redireciona de volta para o login
    if (!usuarioLogado) {
        navigateTo("/");
        return null;
    }
    
    // Se estiver logado devolve o objeto do usuário pronto para ser usado na tela
    return JSON.parse(usuarioLogado);
}