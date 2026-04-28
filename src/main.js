import "./style.css";
import { handleLocation } from "./router.js";
import { initMockUsers } from "./modules/storage.js"

// O sistema inicia apenas disparando o roteador
handleLocation();
initMockUsers();