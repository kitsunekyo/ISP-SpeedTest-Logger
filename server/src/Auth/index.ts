import { Request, Response } from "express";
import { Router } from "express";
import token from "jsonwebtoken";
import jwt from "express-jwt";

export const accessTokenSecret = "O7RYB7irdTav8j8KXeY5bHQVr";

export const users = [
    {
        username: "admin",
        password: "admin",
        role: "admin",
    },
];

const router = Router();

router.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        const accessToken = token.sign({ username: user.username, role: user.role }, accessTokenSecret);

        res.json({ accessToken });
    } else {
        res.status(403).json({ message: "incorrect login details" });
    }
});

router.get("/secret", jwt({ secret: accessTokenSecret, algorithms: ["HS256"] }), (req: any, res) => {
    if (!req.user) return res.json({message: 'not authenticated 👎'});
    res.json({message: 'authenticated 👍'})
});

export { router };
