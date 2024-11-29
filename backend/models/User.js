// Importa o módulo Mongoose, que facilita a conexão e manipulação do banco de dados MongoDB
const mongoose = require("mongoose");

// Extrai a classe Schema do objeto mongoose, usada para definir a estrutura do documento no MongoDB
const { Schema } = mongoose;

// Define um novo esquema (schema) para o modelo de usuário, especificando os campos e seus tipos de dados
const userSchema = new Schema(
  {
    // Define o campo 'name' como uma string
    name: String,
    
    // Define o campo 'email' como uma string
    email: String,
    
    // Define o campo 'password' como uma string
    password: String,
    
    // Define o campo 'profileImage' como uma string (para armazenar URLs de imagem de perfil)
    profileImage: String,
    
    // Define o campo 'bio' como uma string (para armazenar uma breve biografia do usuário)
    bio: String,
  },
  {
    // Ativa a criação automática dos campos 'createdAt' e 'updatedAt' no documento
    timestamps: true,
  }
);

// Cria um modelo chamado 'User' com base no esquema definido, vinculado à coleção 'users' no MongoDB
const User = mongoose.model("User", userSchema);

// Exporta o modelo 'User' para que possa ser utilizado em outros arquivos do projeto
module.exports = User;
