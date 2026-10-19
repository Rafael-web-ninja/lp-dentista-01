import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";
const isProduction = process.env.NODE_ENV === "production";
app.use(express.json());
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    app: "Sorria+ Odontologia Premium",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: isProduction ? "production" : "development"
  });
});
app.post("/api/leads", (req, res) => {
  const { name, phone, treatment, period } = req.body || {};
  console.log(`[Lead Recebido] Nome: ${name} | Tel: ${phone} | Tratamento: ${treatment} | Per\xEDodo: ${period}`);
  res.status(200).json({
    success: true,
    message: "Solicita\xE7\xE3o registrada com sucesso."
  });
});
async function startServer() {
  if (isProduction) {
    const distPath = path.resolve(__dirname, "dist");
    app.use(
      express.static(distPath, {
        maxAge: "1d",
        index: false
      })
    );
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, HOST, () => {
    console.log(`\u{1F680} Sorria+ Web App rodando em http://${HOST}:${PORT}`);
    console.log(`\u{1F4E6} Ambiente: ${isProduction ? "Produ\xE7\xE3o" : "Desenvolvimento"}`);
  });
}
startServer().catch((err) => {
  console.error("Falha ao iniciar o servidor:", err);
  process.exit(1);
});
