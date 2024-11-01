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

// Solve cors - vai permite a interação com o domínio do frontend
app.use(cors({credentials: true, origin:"http://localhost:3000"}));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


//DB connection
require("./config/db.js");

//routes
const router = require("./routes/Router");

app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});