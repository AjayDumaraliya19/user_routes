import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users";
import { ERROR_MESSAGES } from "../errors/comman_message"; // Get error message json

const SECRET_KEY = process.env.JWT_SECRET_KEY || "my_fallback_secret_key";

/* ---------------- Define the structure of your JWT payload ---------------- */
interface JwtPayload {
    id: string;
    email: string;
}

/* ------ Extend the Express Request type to include the user property ------ */
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

/* ------------------------------ Auth function ----------------------------- */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: ERROR_MESSAGES.NO_TOKEN });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        req.user = {
            _id: decoded.id,
            email: decoded.email
        } as User;

        next();
    } catch (error) {
        res.status(403).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }
};