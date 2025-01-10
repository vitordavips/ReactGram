// Importa as URLs e a função de configuração da requisição
import { api, requestConfig } from '../utils/config.jsx';

// Função para registrar um novo usuário.
const register = async (data) => {
    // Configura os parâmetros da requisição usando o método POST e os dados fornecidos.
    const config = requestConfig("POST", data);

    try {
        // Faz a chamada à API para registrar o usuário.
        const res = await fetch(api + "/user/register", config)
            // Transforma a resposta da API em JSON e retorna.
            .then((res) => res.json())
            // Captura qualquer erro na conversão ou requisição e retorna o erro.
            .catch((error) => error);

        // Se a resposta (`res`) estiver disponível, armazena os dados do usuário no `localStorage`.
        // Os dados são armazenados como uma string JSON para persistência.
        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
    } catch (error) {
        console.log(error);
    }
};

// Objeto que encapsula os métodos do serviço de autenticação.
// Atualmente, só contém a função `register`, mas pode ser expandido com outros métodos como login ou logout.
const authService = {
    register,
};

// Exporta o objeto `authService` como padrão para que outras partes do aplicativo possam utilizá-lo.
export default authService;

