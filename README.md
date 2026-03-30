# ReactGram

O ReactGram é uma rede social baseada em compartilhamento de fotos, inspirada no modelo do Instagram. O projeto foi construído utilizando a stack MERN.

## Tecnologias

A aplicação foi desenvolvida com as seguintes tecnologias:

- Frontend: React e React Router Dom
- Gerenciamento de Estado: Redux (Redux Toolkit)
- Estilos: CSS Puro (com Glassmorphism e Dark Mode)
- Backend: Node.js e Express
- Banco de Dados: MongoDB (com Mongoose)
- Autenticação e Segurança: JSON Web Token (JWT) e Bcrypt

## Funcionalidades

- Criação de conta e login protegido por token.
- Gerenciamento do perfil de usuário (nome, biografia, e foto de avatar).
- Publicação de novas fotos.
- Visualização de painel com as fotos postadas em ordem cronológica.
- Sistema reativo de "Likes" (curtidas).
- Adição e exibição de comentários nas fotos.
- Busca por fotos específicas com base nos títulos.

## Capturas de Tela

Crie uma pasta chamada "docs" e adicione as imagens lá para que possam ser carregadas pelo GitHub:

### Autenticação 
(./docs/l<img width="1348" height="590" alt="Captura de tela 2026-03-29 212936" src="https://github.com/user-attachments/assets/d1334c54-2ff1-4201-aebd-328494d919db" />
ogin.png)
<img width="1359" height="591" alt="Captura de tela 2026-03-29 212955" src="https://github.com/user-attachments/assets/a9d9808b-0514-4ca4-928b-1caee4a31647" />


### Edição de Perfil
<img width="1355" height="594" alt="Captura de tela 2026-03-29 213049" src="https://github.com/user-attachments/assets/c7974550-551c-47b6-a5eb-d5d9c6875b8a" />

<img width="1342" height="584" alt="Captura de tela 2026-03-29 213129" src="https://github.com/user-attachments/assets/36988f14-bf0f-4080-96b0-130ce637033c" />


### Interação e Visualização
<img width="1353" height="588" alt="Captura de tela 2026-03-29 213208" src="https://github.com/user-attachments/assets/e6c6c17f-85a1-4d2a-86f6-64e9a7a3b0cb" />

## Como rodar o projeto localmente

Para executar essa aplicação, será necessário seguir três passos simples.

**1. Clone o projeto**
```bash
git clone https://github.com/vitordavips/ReactGram.git
```

**2. Executando a API (Backend)**
Na pasta principal do projeto, vá para a subpasta `backend`, instale as dependências e inicie o servidor:

```bash
cd backend
npm install
npm run server
```
*Observação: Não esqueça de adicionar as variáveis de ambiente necessárias (como a chave secreta do JWT e a chave do Banco de Dados MongoDB) em um arquivo `.env`.*

**3. Executando a Interface (Frontend)**
Com o servidor ainda rodando no terminal, abra uma nova janela de terminal, navegue até a pasta `frontend` e rode a aplicação:

```bash
cd frontend
npm install
npm run dev
```

A aplicação deverá rodar perfeitamente acessível localmente.
