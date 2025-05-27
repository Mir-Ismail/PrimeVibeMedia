import cors from 'cors';

export const corsMiddleware = cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://amazonpro.com', 'https://www.amazonpro.com']
    : ['http://localhost:5000', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
