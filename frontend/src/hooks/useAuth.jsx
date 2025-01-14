import { useState, useEffect } from "react";
import {useSelector} from "react-redux";

export const useAuth = () => {
    // Utiliza o useSelector para acessar o estado global e obter o usuário atual da aplicação
    const { user } = useSelector((state) => state.auth);

    // Declaração de um estado local chamado "auth" para representar o status de autenticação
    const [auth, setAuth] = useState(false); // Inicialmente falso
    // Declaração de um estado "loading" para controlar se a verificação de autenticação está em andamento
    const [loading, setLoading] = useState(true); // Inicialmente verdadeiro

    // useEffect é usado para executar um efeito colateral sempre que o valor de "user" mudar
    useEffect(() => {
        // Verifica se o usuário está definido
        if (user) {
            setAuth(true); // Se estiver, atualiza o estado de autenticação como verdadeiro
        } else {
            setAuth(false); // Caso contrário, define como falso
        }

        setLoading(false);

        // Após a verificação do usuário, altera "loading" para falso, indicando que o carregamento terminou
        setLoading(false);
    }, [user]); // O efeito será executado sempre que o "user" mudar
    
    return{auth, loading};
};

