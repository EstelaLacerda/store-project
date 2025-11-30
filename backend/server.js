import express, { json } from "express";
import cors from "cors";

import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

async function start() {
    try {
        await sequelize.authenticate();
        console.log("Conectado ao MariaDB com sucesso!");

        await sequelize.sync();

        app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
    } catch (err) {
        console.error("Erro ao conectar no banco:", err);
    }
}

start();
