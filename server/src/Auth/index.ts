import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const accessTokenSecret = "O7RYB7irdTav8j8KXeY5bHQVr";

const users = [
    {
        username: "admin",
        password: "admin",
        role: "admin",
    },
];

export const loginController = (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);

        res.json({ accessToken });
    } else {
        res.status(403).json({ message: "incorrect login details" });
    }
};
