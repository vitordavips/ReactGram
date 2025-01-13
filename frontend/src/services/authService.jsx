// Importa as URLs e a função de configuração da requisição
import { api, requestConfig } from '../utils/config.jsx';

// Register a user
const register = async (data) => {
    const config = requestConfig("POST", data);
  
    try {
      const res = await fetch(api + "/users/register", config)
      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || "Erro na requisição");
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

const authService = {
    register,
  };

export default authService;