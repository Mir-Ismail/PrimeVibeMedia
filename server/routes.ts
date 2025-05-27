import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactRoutes } from "./routes/contact.js";
import { newsletterRoutes } from "./routes/newsletter.js";
import { corsMiddleware } from "./middleware/cors.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // CORS middleware
  app.use(corsMiddleware);

  // API routes
  app.use('/api/contact', contactRoutes);
  app.use('/api/newsletter', newsletterRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
