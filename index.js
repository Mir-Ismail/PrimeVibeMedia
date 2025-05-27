// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/routes/contact.js
import { Router } from "express";
import { validationResult } from "express-validator";

// server/middleware/validation.js
import { body } from "express-validator";
var validateContact = [
  body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters").escape(),
  body("email").isEmail().withMessage("Please provide a valid email address").normalizeEmail(),
  body("company").optional().trim().isLength({ max: 100 }).withMessage("Company name must not exceed 100 characters").escape(),
  body("message").trim().isLength({ min: 10, max: 1e3 }).withMessage("Message must be between 10 and 1000 characters").escape()
];
var validateNewsletter = [
  body("email").isEmail().withMessage("Please provide a valid email address").normalizeEmail()
];

// server/models/emailTemplates.js
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// server/storage.ts
var MemStorage = class {
  users;
  contacts;
  newsletters;
  currentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.newsletters = /* @__PURE__ */ new Map();
    this.currentId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createContact(insertContact) {
    const id = this.currentId++;
    const contact = {
      ...insertContact,
      id,
      company: insertContact.company || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async createNewsletter(insertNewsletter) {
    const id = this.currentId++;
    const newsletter = {
      ...insertNewsletter,
      id,
      subscribed: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  async getNewsletterByEmail(email) {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email && newsletter.subscribed
    );
  }
  async unsubscribeNewsletter(email) {
    for (const newsletter of this.newsletters.values()) {
      if (newsletter.email === email) {
        newsletter.subscribed = false;
        break;
      }
    }
  }
};
var storage = new MemStorage();

// server/routes/contact.js
var contactRoutes = Router();
contactRoutes.post("/", validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }
    const { name, email, company, message } = req.body;
    const contact = await storage.createContact({
      name,
      email,
      company,
      message
    });
    console.log("Contact form submitted:", { name, email, company, message });
    res.status(201).json({
      message: "Contact form submitted successfully",
      id: contact.id
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      message: "Failed to process contact form",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
});

// server/routes/newsletter.js
import { Router as Router2 } from "express";
import { validationResult as validationResult2 } from "express-validator";
var newsletterRoutes = Router2();
newsletterRoutes.post("/subscribe", validateNewsletter, async (req, res) => {
  try {
    const errors = validationResult2(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }
    const { email } = req.body;
    const existing = await storage.getNewsletterByEmail(email);
    if (existing) {
      return res.status(409).json({
        message: "Email already subscribed to newsletter"
      });
    }
    const subscription = await storage.createNewsletter({ email });
    console.log("Newsletter subscription:", email);
    res.status(201).json({
      message: "Successfully subscribed to newsletter",
      id: subscription.id
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      message: "Failed to subscribe to newsletter",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
});
newsletterRoutes.delete("/unsubscribe", validateNewsletter, async (req, res) => {
  try {
    const errors = validationResult2(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }
    const { email } = req.body;
    const subscription = await storage.getNewsletterByEmail(email);
    if (!subscription) {
      return res.status(404).json({
        message: "Email not found in newsletter subscriptions"
      });
    }
    await storage.unsubscribeNewsletter(email);
    res.json({
      message: "Successfully unsubscribed from newsletter"
    });
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    res.status(500).json({
      message: "Failed to unsubscribe from newsletter",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
});

// server/middleware/cors.js
import cors from "cors";
var corsMiddleware = cors({
  origin: process.env.NODE_ENV === "production" ? ["https://amazonpro.com", "https://www.amazonpro.com"] : ["http://localhost:5000", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.use(corsMiddleware);
  app2.use("/api/contact", contactRoutes);
  app2.use("/api/newsletter", newsletterRoutes);
  app2.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "/PrimeVibeMedia/",
  // Update if deploying to GitHub Pages under a repo
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: ".",
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port http://localhost:5000`);
  });
})();
