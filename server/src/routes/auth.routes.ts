import { Response, Request, Router } from "express";
import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";

import { Token } from "./../models/Token";
import { User } from "./../models/User";
import { createToken, tokenSecret } from "./../util/token";

export const DUMMY_USERS: User[] = [
  {
    email: "admin@test.com",
    password: process.env.ADMIN_PW,
    role: "admin",
  },
];

const router = Router();

/**
 * @swagger
 * /auth/token:
 *    post:
 *      description: Get a token
 *      tags:
 *        - auth
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  example: admin@test.com
 *                password:
 *                  type: string
 *                  example: admin
 *      responses:
 *        200:
 *          description: Returns a jwt token
 */
router.post("/token", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = DUMMY_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(403).json({ message: "Incorrect login credentials" });
  }

  const token = createToken(user);
  const decodedToken = jwt.decode(token) as Token;

  res.json({
    token,
    userInfo: {
      email: decodedToken.email,
      role: decodedToken.role,
    },
    expiresAt: decodedToken.exp,
  });
});

// auth middleware
export const requireAuth = (): expressJwt.RequestHandler => {
  return expressJwt({
    secret: tokenSecret,
    audience: "isp-api",
    issue: "isp-api",
    algorithms: ["HS256"],
  });
};

export default router;
