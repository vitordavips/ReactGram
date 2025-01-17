// Essas funções são utilizadas para simplificar a criação de reducers e gerenciamento de ações assíncronas.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Importa o serviço de autenticação que contém funções relacionadas ao registro e login de usuários.
import authService from "../services/authService.jsx";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Register a user and sign in
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const data = await authService.register(user);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Logout a user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Sing in a user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const data = await authService.login(user);

  // Check for errors
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// Importa a função createslice do Redux Toolkit para criar o slice
export const authSlice = createSlice({
  // define o nome do slice
  name: "auth",

  // define o estado inicial do slice
  initialState,

  // define os reducers sincronizados (ações que atualizam diretamente o estado)
  reducers: {
    // redefine os valores do estado para os padrões
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },

  // define os extraReducers (ações assíncronas processadas pelo slice)
  extraReducers: (builder) => {
    // lida com o estado quando a ação register está pendente
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      // Lida com o estado quando a ação register é concluída com sucesso
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      //Lida com o estado quando a ação register falha
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      // Lida com o estado quando a ação logout é concluída com sucesso
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      // Lida com o estado quando a ação login está pendente
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Lida com o estado quando a ação login é concluída com sucesso
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      // Lida com o estado quando a ação login falha
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;