import express from "express"
import userRoutes from "./routes/users.js"
import cors from "cors"

const app = express()

// Middleware para analisar o corpo das requisições
app.use(express.json())

// Middleware para permitir requisições de origens diferentes
app.use(cors())

// Rotas da API de usuários
app.use("/", userRoutes)

// Inicializa o servidor para escutar na porta 8800
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
