import { Response, Request, Router } from "express";
import token from "jsonwebtoken";
import jwt from "express-jwt";

export const accessTokenSecret = process.env.OAUTH2_SECRET || "";
export const jwtOptions: jwt.Options = { secret: accessTokenSecret, algorithms: ["HS256"] };

export const dummyUsers = [
    {
        username: "admin",
        password: "admin",
        role: "admin",
    },
];

const router = Router();

router.post("/token", (req: Request, res: Response) => {
    const { username, password } = req.body;
    const tokenLifetimeInMinutes = 0.1;

    const user = dummyUsers.find((u) => u.username === username && u.password === password);

    if (user) {
        const accessToken = token.sign({ username: user.username, role: user.role }, accessTokenSecret, {
            expiresIn: 60 * tokenLifetimeInMinutes,
        });
        res.json({ accessToken });
    } else {
        res.status(401).json({ message: "incorrect login details" });
    }
});

export const requireAuth = (): jwt.RequestHandler => jwt(jwtOptions);
export { router };
