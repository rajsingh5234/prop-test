import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

const MONGODB_URI = process.env.MONGODB_URI;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;

export {
    PORT,
    MONGODB_URI,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
}