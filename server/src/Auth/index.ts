import { Response, Request, Router } from "express";
import token from "jsonwebtoken";

export const accessTokenSecret = "O7RYB7irdTav8j8KXeY5bHQVr";
export const jwtOptions = { secret: accessTokenSecret, algorithms: ["HS256"] };

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
    const tokenLifetimeInSeconds = 60 * 10;

    const user = dummyUsers.find((u) => u.username === username && u.password === password);

    if (user) {
        const accessToken = token.sign({ username: user.username, role: user.role }, accessTokenSecret, {
            expiresIn: tokenLifetimeInSeconds,
        });
        res.json({ accessToken });
    } else {
        res.status(401).json({ message: "incorrect login details" });
    }
});

export { router };
