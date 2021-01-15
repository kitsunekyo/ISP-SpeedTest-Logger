import jwt from "jsonwebtoken";
import { User } from "src/models/User";

export const tokenSecret = process.env.OAUTH2_SECRET || "";

export const createToken = (user: User): string => {
    if (!user.role) {
        throw new Error("No user role specified");
    }

    return jwt.sign(
        {
            email: user.email,
            role: user.role,
            iss: "isp-api",
            aud: "isp-api",
        },
        tokenSecret,
        { algorithm: "HS256", expiresIn: "1h" }
    );
};
