import type { NextFunction, Request, Response } from "express";
import httpError from "../../application/utils/custom.error.class.js";

export const errorHandlingMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Request failed");

  if (err instanceof httpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal Server Error" });
};
