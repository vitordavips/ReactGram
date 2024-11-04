// criando as models do bd
const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
}, {
    // configurações
    // o timestamps vai criar o campo de data e hora
    timestamps: true
});

// definindo o model com o schema
const User = mongoose.model("User", userSchema);

module.exports = User;