
import "dotenv/config";
import express from "express";
import { randomUUID } from "node:crypto";
import { preguntar } from "./chatbot.js";

const app = express();
const PORT = process.env.PORT || 3000;
const sesiones = new Map();

const MAX_MENSAJES = 10;
const DURACION = 30 * 60 * 1000;

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

    const ahora = Date.now();
    const idRecibido = req.get("X-Chat-Id");
    let id = idRecibido && sesiones.has(idRecibido) ? idRecibido : randomUUID();
    let sesion = sesiones.get(id);

    if (!sesion || ahora - sesion.ultimaActividad > DURACION) {
        id = randomUUID();
        sesion = { historial: [], ultimaActividad: ahora };
        sesiones.set(id, sesion);
    }

    if (sesion.ocupada) {
        return res.status(409).json({
            error: "Espera a que termine la respuesta anterior."
        });
    }

    sesion.ocupada = true;

    try {
        const pregunta = mensaje.trim();
        const respuesta = await preguntar(pregunta, sesion.historial);

        const bloqueado = "Lo siento, has utilizado un término inadecuado.";
        if (!respuesta.startsWith(bloqueado)) {
            sesion.historial.push(
                { role: "user", content: pregunta },
                { role: "assistant", content: respuesta }
            );
            sesion.historial = sesion.historial.slice(-MAX_MENSAJES);
        }

        sesion.ultimaActividad = Date.now();
        res.json({ respuesta, chatId: id });
    } catch (error) {
        console.error("Error Azure:", error.message);
        res.status(502).json({
            error: "No se pudo obtener una respuesta del chatbot."
        });
    } finally {
        sesion.ocupada = false;
    }
});

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
});
