import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Health check endpoint for container / web app monitoring
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    app: 'Sorria+ Odontologia Premium',
    timestamp: new Date().toISOString(),
    environment: isProduction ? 'production' : 'development',
  });
});

// API route for recording booking requests / leads
app.post('/api/leads', (req: Request, res: Response) => {
  const { name, phone, treatment, period } = req.body || {};
  console.log(`[Lead Recebido] Nome: ${name} | Tel: ${phone} | Tratamento: ${treatment} | Período: ${period}`);
  res.status(200).json({
    success: true,
    message: 'Solicitação registrada com sucesso.',
  });
});

async function startServer() {
  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    // Serve production static assets with caching headers
    app.use(
      express.static(distPath, {
        maxAge: '1d',
        index: false,
      })
    );

    // SPA fallback: any non-API request gets index.html
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // In development, mount Vite dev server as middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    console.log(`🚀 Sorria+ Web App rodando em http://${HOST}:${PORT}`);
    console.log(`📦 Ambiente: ${isProduction ? 'Produção' : 'Desenvolvimento'}`);
  });
}

startServer().catch((err) => {
  console.error('Falha ao iniciar o servidor:', err);
  process.exit(1);
});
