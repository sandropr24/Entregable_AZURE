
import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", proyecto: "STOREFINAL" });
});

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
});
