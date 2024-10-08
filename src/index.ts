import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import jokeRoutes from "./routes/jokeRoutes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));

/** --- Check Server Working Or not */
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("API working");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api", jokeRoutes);

// Centralized Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
    console.log("Shutting down the server...");
    server.close(() => {
        console.log("Server shut down gracefully.");
        process.exit(0);
    });
});