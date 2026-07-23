require('dotenv').config()
const express = require("express");
const dbConnection = require("./config/dbConnection");

const app = express();

app.use(express.json());

dbConnection();

app.get("/", (req, res) => {
    res.send("Hello");
    
})

app.listen(5000, () => {
  console.log("Server is Running...");
});