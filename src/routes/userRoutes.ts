
import { config } from "dotenv";
import express, { Request, Response, Router, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { authenticateToken } from "../middlewares/authMiddleware";
import { UserModel } from "../models/users";
import { ERROR_MESSAGES } from "../errors/comman_message"; // Get error message json

const router: Router = express.Router();

/** --- Load environment variables from .env file --- */
config();

/** --- MongoDB Connection --- */
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI as string);
mongoose.connection.on("error", (error: Error) => console.log(error));

/* ------------------------------ Signup Route ------------------------------ */
const signupHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { first_name, last_name, password, email } = req.body;

        if (!first_name || !last_name || !password || !email) {
            res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
            return;
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: ERROR_MESSAGES.EMAIL_EXISTS });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            ...req.body,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
        if (error.code === 11000) {
            console.error("Error in signup:", error.message);
            res.status(500).json({ message: ERROR_MESSAGES.ERROR_CREATING_USER });
        } else {
            res.status(500).send({ message: ERROR_MESSAGES.SERVER_ERROR });
        }
    }
};

/* ------------------------------- Login Route ------------------------------ */
const loginHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
            return;
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
            return;
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1d" }
        );

        res.json({ token, message: "Logged in successfully" });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: ERROR_MESSAGES.ERROR_LOGIN });
    }
};

/* ------------------------------ Logout Route ------------------------------ */
const logoutHandler = (req: Request, res: Response, next: NextFunction): void => {
    // In a real-world scenario, you might want to invalidate the token here
    res.json({ message: "Logged out successfully" });
};

/* ------------------------------ Profile Route ----------------------------- */
const profile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const fullUser = await UserModel.findById(req.user?._id).select("-password -__v");
        if (!fullUser) {
            res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
            return;
        }
        res.json(fullUser);
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
}

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.get("/logout", authenticateToken, logoutHandler);
router.get("/me", authenticateToken, profile);

export default router;