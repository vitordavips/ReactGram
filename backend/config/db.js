const mongoose = require("mongoose");

// connection
const dbUser = "";
const dbPassword = "";

const conn = async () => {
    try{
        const dbConn = await mongoose.connect(
            `mongodb+srv://<db_username>:<db_password>@cluster0.6dpyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        )

        console.log("Conectou ao banco!");
        
        return dbConn;

    } catch(error) {
        console.log(error);
    }
};

conn();

module.exports = conn;