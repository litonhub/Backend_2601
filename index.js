require('dotenv').config()
const express = require("express");
const dbConnection = require("./config/dbConnection");
const authRoutes = require('./routes/authRoutes')
const { swaggerUi, specs } = require("./config/swagger");
const { apiLimiter } = require('./middleware/rateLimiter');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

dbConnection();

app.use("/backend2601-api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/auth", authRoutes)
app.get("/", apiLimiter, (req, res)=>{
    res.send("⚽ Welcome! This API scores goals, not 7-1 nightmares. 😭🥤")
})

app.listen(5000, () => {
  console.log("Server is Running...");
});