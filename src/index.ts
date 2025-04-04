import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import leadRoutes from './routes/lead';
import accountRouter from './routes/account';
import campaignRouter from './routes/campaign';
import campaignLeadMessageRouter from './routes/campaign-lead-message';
import path from 'path';
import aiRouter from './routes/ai';
import crawlerRouter from './routes/crawler';
// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.ENV || "production";

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/leads', leadRoutes);
app.use('/api/accounts', accountRouter);
app.use('/api/campaigns', campaignRouter);
app.use('/api/campaign-messages', campaignLeadMessageRouter)
app.use('/api/ai', aiRouter)
app.use('/api/crawler', crawlerRouter)


if (NODE_ENV === "production") {
    console.log("Serving React build in production mode");

    app.use(express.static(path.join(__dirname, "public")));
    app.get("/*name", (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });
} else {
    console.log("Running in development mode");
}

// Catch-all route to serve the React app
// Start the server
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
