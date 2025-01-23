import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/serverConfig.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
    try {
        const token =
            req?.cookies?.accessToken ||
            req?.header("Authorization")?.replace("Bearer ", "") ||
            req?.body?.accessToken;

        if (!token) {
            throw new ApiError(401, "Token is missing")
        }

        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid token")
        }

        req.user = user;
        next();
    } catch (error) {
        next(error)
    }
}

export { verifyJWT };