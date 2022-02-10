import { Request, Response } from "express";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: any
) => {
  process.env.NODE_ENV !== "production" && console.log(error.message);

  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }

  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "📦" : error.stack,
  });
};
