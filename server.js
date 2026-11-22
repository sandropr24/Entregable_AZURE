
import "dotenv/config";
import express from "express";
import { preguntar } from "./chatbot.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));


app.get("/api/health", (req, res) => {
    res.json({ status: "ok", proyecto: "STOREFINAL" });
});


app.post("/api/chat", async (req, res) => {
    const { mensaje } = req.body ?? {};

    if (typeof mensaje !== "string" || !mensaje.trim() || mensaje.length > 500) {
        return res.status(400).json({
            error: "El mensaje debe tener entre 1 y 500 caracteres."
        });
    }

    try {
        const respuesta = await preguntar(mensaje.trim());
        res.json({ respuesta });
    } catch (error) {
        console.error("Error Azure:", error.message);
        res.status(502).json({
            error: "No se pudo obtener una respuesta del chatbot."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
});
