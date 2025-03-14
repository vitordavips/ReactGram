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
                  })
        },
});

// Update user details
export const updateProfile = createAsyncThunk(
    "user/update", 
    async(user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await userService.updateProfile(user, token);

        //check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;    
    }
);

// Get user details
export const getUserDetails = createAsyncThunk(
    "user/get",
    async (id, thunkAPI) => {
        const data = await userService.getUserDetails(id);

        return data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        resetMessage:(state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) =>{
        builder
            .addCase(profile.pending, (state) => {
                 state.loading = true;
                 state.error = false;
            })
            .addCase(profile.fulfilled, (state, action) =>{
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })  
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
                state.message = "Usuário atualizado com sucesso!"
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = {};
            })
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            });
    },
});

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;
