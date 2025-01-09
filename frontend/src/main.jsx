import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Importa o `Provider` do pacote `react-redux`.
// O `Provider` permite que toda a aplicação tenha acesso à store do Redux.
import { Provider } from 'react-redux';

// Importa a store configurada anteriormente do arquivo `store`.
import { store } from './store';

// Renderiza o componente principal da aplicação React dentro do elemento DOM com id 'root'.
createRoot(document.getElementById('root')).render(
  // O componente `StrictMode` é uma ferramenta do React para destacar problemas potenciais no código.
  <StrictMode>
    {/* O `Provider` encapsula a aplicação React e injeta a store Redux no contexto global.
        Isso permite que os componentes da aplicação acessem o estado global e usem as funcionalidades do Redux. */}
    <Provider store={store}>
      {/* Componente principal da aplicação React. */}
      <App />
    </Provider>
  </StrictMode>,
);
