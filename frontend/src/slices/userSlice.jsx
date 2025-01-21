import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import userService from '../services/userService';

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
};

// Importa o método createAsyncThunk
export const profile = createAsyncThunk(
    "user/profile", // Identificador da ação
    async(user, thunkAPI) => {
        // obtém o token do usuário a partir do estado de autentificação
        const token = thunkAPI.getState().auth.user.token;

        // chama o serviço para buscar os dados do perfil do usuário
        const data = await userService.profile(user, token);

        return data;
    },
    {
        extraReducers: (builder) => {
            builder
                  .addCase(profile.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  
                  // Lida com o estado quando a ação register é concluída com sucesso
                  .addCase(profile.fulfilled, (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.error = null;
                    state.user = action.payload;
                  });
        },
    },
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        resetMessage:(state) => {
            state.message = null;
        },
    },
});

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;
