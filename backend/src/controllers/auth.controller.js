import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessToken = async (user) => {
    try {

        const accessToken = user.generateAccessToken();

        return { accessToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}

const accessTokenOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'None',
    secure: true
};

const signup = async (req, res, next) => {
    try {

        const { email, username, password } = req.body;
        const requiredFields = ["email", "username", "password"];

        for (let field of requiredFields) {
            const fieldValue = req.body[field];
            if (!fieldValue || !fieldValue.trim()) {
                throw new ApiError(400, `${field} is required`);
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ApiError(400, "Email address is not valid");
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            throw new ApiError(409, "User with this email already exists");
        }

        const newUser = {
            email,
            username,
            password,
        }

        const createdUser = await User.create(newUser);

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering user");
        }

        const { accessToken } = await generateAccessToken(createdUser);

        createdUser.password = undefined;

        res.status(201)
            .cookie("accessToken", accessToken, accessTokenOptions)
            .json(
                new ApiResponse(201, { user: createdUser, accessToken }, "User registered successfully")
            );

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "Both email and password is required");
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            throw new ApiError(401, "Invalid credentials")
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid credentials")
        }

        const { accessToken } = await generateAccessToken(user);

        user.password = undefined;

        res.status(200)
            .cookie("accessToken", accessToken, accessTokenOptions)
            .json(
                new ApiResponse(200, { user, accessToken }, "User logged in successfully")
            );

    } catch (error) {
        next(error);
    }
}


export {
    signup,
    login,
}