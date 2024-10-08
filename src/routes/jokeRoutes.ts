import express from "express";
import axios from "axios";
import { ERROR_MESSAGES } from "../errors/comman_message"; // Get error message json

const router = express.Router();

/* ---------------------- Get Random Chuck Norris Joke ---------------------- */
router.get("/random-joke", async (req, res) => {
    try {
        const response = await axios.get("https://api.chucknorris.io/jokes/random");
        res.json({ joke: response.data.value });
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGES.FETCH_JOKE_ERROR });
    }
});

export default router;