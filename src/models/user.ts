import mongoose, { Document } from "mongoose";

export interface User extends Document {
    _id: string;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
}

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

export const UserModel = mongoose.model<User>("User", UserSchema);