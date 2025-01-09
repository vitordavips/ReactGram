// URL base da API do backend
export const api = "http://localhost:5000/api";

// URL para os arquivos de upload
export const uploads = "http://localhost:5000/uploads";

// Função para configurar os parâmetros de uma requisição HTTP.
export const requestConfig = (method, data, token = null, image = null) => {

    // Variável para armazenar a configuração final da requisição.
    let config;

    // Caso a requisição envolva envio de imagem, utiliza o tipo `multipart/form-data`.
    if (image) {
        config = {
            method,        
            body: data,    
            headers: {}    
        };
    } 
    // Caso o método seja DELETE ou os dados sejam nulos, apenas define o método e cabeçalhos vazios.
    else if (method === "DELETE" || data === null) {
        config = {
            method,
            headers: {}    
        };
    } 
    // Para outros métodos, como POST ou PUT, configura o corpo em formato JSON.
    else {
        config = {
            method,             
            body: JSON.stringify(data), 
            headers: {          
                "Content-Type": "application/json"
            },
        };
    }

    // Se um token for fornecido, adiciona um cabeçalho de autenticação com Bearer Token.
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Retorna a configuração final da requisição.
    return config;
};
