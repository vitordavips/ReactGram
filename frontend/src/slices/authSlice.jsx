// Essas funções são utilizadas para simplificar a criação de reducers e gerenciamento de ações assíncronas.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Importa o serviço de autenticação que contém funções relacionadas ao registro e login de usuários.
import authService from "../services/authService.jsx";

// Recupera o usuário armazenado no `localStorage` (se houver) e o converte de JSON para objeto JavaScript.
const user = JSON.parse(localStorage.getItem("user"));

// Define o estado inicial da slice de autenticação.
// Contém informações sobre o usuário, além de indicadores de erro, sucesso e carregamento.
const initialState = {
    user: user ? user : null,  
    error: false,             
    success: false,           
    loading: false,           
};

// Cria uma ação assíncrona para registrar o usuário.
export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        // Chama o método de registro no serviço de autenticação.
        const data = await authService.register(user);

        // Verifica se houve erros retornados pela API.
        if (data.errors) {
            // Rejeita a ação e retorna o primeiro erro para ser tratado no estado.
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        // Retorna os dados do usuário registrados com sucesso.
        return data;
    }
);

// Cria uma slice de autenticação com o Redux Toolkit.
export const authSlice = createSlice({
    name: "auth",            // Nome da slice, usado como prefixo nas ações.
    initialState,            // Estado inicial definido anteriormente.
    reducers: {
        // Redefine os indicadores de estado para os valores iniciais.
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        // Gerencia os estados da ação assíncrona `register`.

        // Quando a requisição é enviada (pendente).
        builder.addCase(register.pending, (state) => {
            state.loading = true;  // Marca o estado como carregando.
            state.error = false;   // Reseta erros anteriores.
        });

        // Quando a requisição é concluída com sucesso.
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;  // Finaliza o carregamento.
            state.success = true;   // Marca o estado como bem-sucedido.
            state.error = null;     // Reseta quaisquer erros.
            state.user = action.payload; // Atualiza o estado com os dados do usuário.
        });

        // Quando a requisição falha.
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;  // Finaliza o carregamento.
            state.error = action.payload; // Define o erro retornado pela API.
            state.user = null;      // Garante que o estado do usuário seja nulo.
        });
    },
});

// Exporta a ação `reset` para ser usada em componentes React.
// Essa ação é útil para redefinir estados após operações, como ao sair de uma página de autenticação.
export const { reset } = authSlice.actions;

// Exporta o reducer da slice de autenticação para ser usado na store Redux.
export default authSlice.reducer;
