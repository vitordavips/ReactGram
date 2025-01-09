// Importa a função configureStore do pacote @reduxjs/toolkit.
// Essa função é usada para configurar a store central do Redux, onde o estado global é gerenciado.
import { configureStore } from "@reduxjs/toolkit";

// Configura a store do Redux.
// A store é o local onde o estado global da aplicação será armazenado.
export const store = configureStore({
    // Aqui você define os "reducers" (redutores), que são funções responsáveis por atualizar o estado.
    // No momento, a lista de reducers está vazia, o que significa que não há nenhum estado sendo gerenciado.
    reducer: {},
});
