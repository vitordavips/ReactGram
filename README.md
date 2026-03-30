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
![Tela de Autenticação](./docs/login.png)
![Tela de Registro](./docs/register.png)

### Edição de Perfil
![Configurações do Perfil](./docs/edit-profile.png)

### Interação e Visualização
![Feed Principal](./docs/feed.png)
![Visualização Direta da Foto](./docs/photo-view.png)

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
