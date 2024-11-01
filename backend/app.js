// chamando o dotenv
require("dotenv").config()

// pegando as bibliotecas
const express = require("express");
const path = require("path");
const cors = require("cors");

// porta do backend
const port = process.env.PORT;

// executando o express
const app = express();

// config JSON and form data responde
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
const router = require("./routes/Router");

app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});